import test from 'node:test';
import assert from 'node:assert';
import http from 'node:http';
import { createApiServer } from '../apps/api/src/server.ts';
import { CloudSyncEngine } from '../apps/api/src/sync-engine.ts';
import { LocalEdgeStore } from '../apps/mobile/src/db/sqlite-store.ts';
import { CounterPOSService } from '../apps/mobile/src/billing/counter-pos.ts';
import { reconcileStockBalance } from '../packages/core/src/sync/index.ts';

function postJson(server: http.Server, path: string, body: any): Promise<{ status: number; body: any }> {
  return new Promise((resolve, reject) => {
    const addr = server.address() as any;
    const req = http.request(
      {
        host: '127.0.0.1',
        port: addr.port,
        path,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      },
      (res) => {
        let resBody = '';
        res.on('data', (c) => (resBody += c));
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
    req.write(JSON.stringify(body));
    req.end();
  });
}

function getJson(server: http.Server, path: string): Promise<{ status: number; body: any }> {
  return new Promise((resolve, reject) => {
    const addr = server.address() as any;
    const req = http.request(
      {
        host: '127.0.0.1',
        port: addr.port,
        path,
        method: 'GET'
      },
      (res) => {
        let resBody = '';
        res.on('data', (c) => (resBody += c));
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
    req.end();
  });
}

test('E2E Sync Testing Playbook — Multi-Node Offline Simulation', async (t) => {
  const engine = new CloudSyncEngine();
  const server = createApiServer(engine);
  await new Promise<void>((resolve) => server.listen(0, resolve));

  t.after(() => {
    server.close();
  });

  const tenantId = 'org-radhe-001';

  // 1. Register Device D01 and Device D02 on Cloud
  const d01Reg = await postJson(server, '/api/v1/devices/register', {
    tenantId,
    deviceCode: 'D01',
    displayName: 'Counter Phone 1'
  });
  const d02Reg = await postJson(server, '/api/v1/devices/register', {
    tenantId,
    deviceCode: 'D02',
    displayName: 'Counter Tablet 2'
  });

  const devD01Id = d01Reg.body.device.id;
  const devD02Id = d02Reg.body.device.id;

  // 2. Initialize Edge Local Stores
  const storeD01 = new LocalEdgeStore('D01');
  const storeD02 = new LocalEdgeStore('D02');

  const posD01 = new CounterPOSService(storeD01);
  const posD02 = new CounterPOSService(storeD02);

  // Common Product & Lot setup
  const product = {
    id: 'prod-rayon-14kg',
    sku: 'SKU-RYN-14',
    name: 'Rayon Floral Print',
    hsnCode: '5407',
    primaryUnit: 'meter',
    salePrice: 85,
    gstRate: 5 as const
  };

  storeD01.setProduct(product);
  storeD02.setProduct(product);

  storeD01.setLot({ lotId: 'RL-2291', productId: 'prod-rayon-14kg', availableMetres: 40, godownName: 'Godown 1' });
  storeD02.setLot({ lotId: 'RL-2291', productId: 'prod-rayon-14kg', availableMetres: 40, godownName: 'Godown 1' });

  // 3. SIMULATE NETWORK PARTITION (Both devices go completely offline)
  // Device D01 issues 25 bills offline
  for (let i = 1; i <= 25; i++) {
    posD01.checkout({
      lines: [{ productId: 'prod-rayon-14kg', lotId: 'RL-2291', qty: i === 1 ? 30 : 5, rate: 85 }],
      paymentMode: 'cash'
    });
  }

  // Device D02 issues 25 bills offline
  for (let i = 1; i <= 25; i++) {
    posD02.checkout({
      lines: [{ productId: 'prod-rayon-14kg', lotId: 'RL-2291', qty: i === 1 ? 25 : 5, rate: 85 }],
      paymentMode: 'upi'
    });
  }

  // Assert local monotonic bill numbers
  assert.strictEqual(storeD01.getBill('INV-D01-000001')?.billNo, 'INV-D01-000001');
  assert.strictEqual(storeD01.getBill('INV-D01-000025')?.billNo, 'INV-D01-000025');
  assert.strictEqual(storeD02.getBill('INV-D02-000001')?.billNo, 'INV-D02-000001');
  assert.strictEqual(storeD02.getBill('INV-D02-000025')?.billNo, 'INV-D02-000025');

  const pendingD01 = storeD01.getOutboxPending();
  const pendingD02 = storeD02.getOutboxPending();
  assert.strictEqual(pendingD01.length, 25);
  assert.strictEqual(pendingD02.length, 25);

  // 4. SIMULATE NETWORK RECOVERY: Push both batches to Cloud Gateway
  const pushD01 = await postJson(server, '/api/v1/sync/push', {
    tenantId,
    deviceId: devD01Id,
    idempotencyKey: 'batch-d01-001',
    events: pendingD01
  });
  assert.strictEqual(pushD01.status, 200);
  assert.strictEqual(pushD01.body.processedCount, 25);

  const pushD02 = await postJson(server, '/api/v1/sync/push', {
    tenantId,
    deviceId: devD02Id,
    idempotencyKey: 'batch-d02-001',
    events: pendingD02
  });
  assert.strictEqual(pushD02.status, 200);
  assert.strictEqual(pushD02.body.processedCount, 25);

  // 5. Verify Cloud State (Zero Bill Loss & Anti-Collision)
  const pullCloud = await getJson(server, `/api/v1/sync/pull?tenantId=${tenantId}&sinceCursor=0&limit=100`);
  assert.strictEqual(pullCloud.status, 200);
  assert.strictEqual(pullCloud.body.changes.length, 50); // Exactly 50 bills

  // Verify unique bill numbers
  const billNos = new Set(pullCloud.body.changes.map((c: any) => c.entityId));
  assert.strictEqual(billNos.size, 50); // Zero collisions!

  // 6. Verify CRDT Stock Reconciliation for Lot RL-2291
  const crdtResult = reconcileStockBalance('RL-2291', 40, [
    { deviceId: 'D01', billNo: 'INV-D01-000001', lotId: 'RL-2291', quantitySold: 30, timestamp: '2026-11-20T10:00:00Z' },
    { deviceId: 'D02', billNo: 'INV-D02-000001', lotId: 'RL-2291', quantitySold: 25, timestamp: '2026-11-20T10:05:00Z' }
  ]);

  assert.strictEqual(crdtResult.finalStock, -15);
  assert.strictEqual(crdtResult.isNegative, true);
  assert.strictEqual(crdtResult.conflictAlert.needed, true);
});
