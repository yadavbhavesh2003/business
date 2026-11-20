import test from 'node:test';
import assert from 'node:assert';
import http from 'node:http';
import { LocalEdgeStore } from '../src/db/sqlite-store.ts';
import { CounterPOSService } from '../src/billing/counter-pos.ts';
import { MobileSyncService } from '../src/sync-service.ts';
import { createApiServer } from '../../api/src/server.ts';
import { CloudSyncEngine } from '../../api/src/sync-engine.ts';

test('Mobile Edge Sync Service - Local to Cloud Push/Pull', async (t) => {
  const engine = new CloudSyncEngine();
  const server = createApiServer(engine);

  await new Promise<void>((resolve) => server.listen(0, resolve));
  const addr = server.address() as any;
  const apiUrl = `http://127.0.0.1:${addr.port}`;

  t.after(() => {
    server.close();
  });

  const tenantId = 'org-skt-001';
  const device = engine.registerDevice(tenantId, 'D01', 'Counter 1 POS');

  const store = new LocalEdgeStore('D01');
  store.setProduct({
    id: 'prd-001',
    sku: 'CTN-60S',
    name: 'Cotton Than 60s',
    gujaratiName: 'સુતરાઉ થાણ ૬૦',
    hsnCode: '5208',
    primaryUnit: 'meter',
    salePrice: 65,
    gstRate: 5
  });

  const pos = new CounterPOSService(store);
  const sync = new MobileSyncService(store, {
    apiUrl,
    tenantId,
    deviceId: device.id
  });

  await t.test('checkout creates offline bill and outbox pending entry', () => {
    const res = pos.checkout({
      customerName: 'Shreeji Saree Depot',
      paymentMode: 'cash',
      lines: [{ productId: 'prd-001', qty: 10, rate: 65 }]
    });

    assert.strictEqual(res.success, true);
    assert.ok(res.bill.billNo.startsWith('INV-D01-'));
    const pending = store.getOutboxPending();
    assert.strictEqual(pending.length, 1);
  });

  await t.test('MobileSyncService pushes pending outbox events to cloud', async () => {
    const pushRes = await sync.pushOutbox();
    assert.strictEqual(pushRes.success, true);
    assert.strictEqual(pushRes.pushedCount, 1);

    const pendingAfter = store.getOutboxPending();
    assert.strictEqual(pendingAfter.length, 0);
  });

  await t.test('MobileSyncService pulls delta changes from cloud', async () => {
    const pullRes = await sync.pullDelta();
    assert.strictEqual(pullRes.success, true);
    assert.ok(pullRes.latestCursor >= 1);
  });
});
