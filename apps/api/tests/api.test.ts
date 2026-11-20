import test from 'node:test';
import assert from 'node:assert';
import http from 'node:http';
import { createApiServer } from '../src/server.ts';
import { CloudSyncEngine } from '../src/sync-engine.ts';
import { generateUuidV7, generateDeviceBillNo } from '@udyamos/core';

function makeRequest(
  server: http.Server,
  method: string,
  path: string,
  body?: any,
  headers: Record<string, string> = {}
): Promise<{ status: number; body: any }> {
  return new Promise((resolve, reject) => {
    const addr = server.address() as any;
    const req = http.request(
      {
        host: '127.0.0.1',
        port: addr.port,
        path,
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        }
      },
      (res) => {
        let resBody = '';
        res.on('data', (chunk) => {
          resBody += chunk.toString();
        });
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode || 500, body: JSON.parse(resBody) });
          } catch {
            resolve({ status: res.statusCode || 500, body: resBody });
          }
        });
      }
    );
    req.on('error', reject);
    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

test('API Gateway - End-to-End Integration Suite', async (t) => {
  const engine = new CloudSyncEngine();
  const server = createApiServer(engine);

  await new Promise<void>((resolve) => server.listen(0, resolve));

  t.after(() => {
    server.close();
  });

  const tenantId = 'org-radhe-001';

  // 1. Health check
  await t.test('GET /api/v1/health returns healthy', async () => {
    const res = await makeRequest(server, 'GET', '/api/v1/health');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.status, 'healthy');
  });

  // 2. Register Device
  let deviceId = '';
  await t.test('POST /api/v1/devices/register pairs counter D01', async () => {
    const res = await makeRequest(server, 'POST', '/api/v1/devices/register', {
      tenantId,
      deviceCode: 'D01',
      displayName: 'Main Shop Counter'
    });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.success, true);
    assert.strictEqual(res.body.device.deviceCode, 'D01');
    deviceId = res.body.device.id;
    assert.ok(deviceId.startsWith('dev-d01-'));
  });

  // 3. Batch Push with 10 bills
  const idempotencyKey = 'batch-tx-20261120-001';
  await t.test('POST /api/v1/sync/push ingests batch events', async () => {
    const events = [];
    for (let i = 1; i <= 10; i++) {
      const billNo = generateDeviceBillNo('D01', i);
      events.push({
        eventId: generateUuidV7(),
        tenantId,
        deviceId,
        eventType: 'BILL_CREATED' as const,
        entityId: billNo,
        payload: { billNo, amount: 1500, customer: 'Cash' },
        clientCreatedAt: new Date().toISOString(),
        idempotencyKey: `evt-${billNo}`
      });
    }

    const res = await makeRequest(
      server,
      'POST',
      '/api/v1/sync/push',
      { tenantId, deviceId, idempotencyKey, events },
      { 'X-Idempotency-Key': idempotencyKey }
    );

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.processedCount, 10);
    assert.strictEqual(res.body.newCursor, 10);

    // 4. Test Idempotent Retry (Same request payload must return exact response without creating duplicate records)
    const retryRes = await makeRequest(
      server,
      'POST',
      '/api/v1/sync/push',
      { tenantId, deviceId, idempotencyKey, events },
      { 'X-Idempotency-Key': idempotencyKey }
    );
    assert.strictEqual(retryRes.status, 200);
    assert.strictEqual(retryRes.body.processedCount, 10);
    assert.strictEqual(retryRes.body.newCursor, 10); // Cursor has NOT advanced
  });

  // 5. Delta Pull
  await t.test('GET /api/v1/sync/pull retrieves incremental changes', async () => {
    const res = await makeRequest(
      server,
      'GET',
      `/api/v1/sync/pull?tenantId=${tenantId}&sinceCursor=0&limit=50`
    );
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.changes.length, 10);
    assert.strictEqual(res.body.latestCursor, 10);
    assert.strictEqual(res.body.changes[0].entityType, 'BILL_CREATED');
  });

  // 6. Zero-Knowledge Support Grant
  await t.test('POST /api/v1/support/grant creates time-boxed access', async () => {
    const staffUserId = 'staff-nirav-01';
    assert.strictEqual(engine.isSupportGrantActive(tenantId, staffUserId), false);

    const res = await makeRequest(server, 'POST', '/api/v1/support/grant', {
      tenantId,
      staffUserId,
      durationHours: 2,
      grantedBy: 'usr-owner-001',
      reason: 'Diagnose sync latency issue'
    });

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.success, true);
    assert.strictEqual(res.body.grant.staffUserId, staffUserId);

    // Now active!
    assert.strictEqual(engine.isSupportGrantActive(tenantId, staffUserId), true);
  });
});

