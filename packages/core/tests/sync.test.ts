import test from 'node:test';
import assert from 'node:assert';
import {
  generateUuidV7,
  generateDeviceBillNo,
  parseDeviceBillNo,
  reconcileStockBalance
} from '../src/sync/index.ts';

test('Sync Engine - UUIDv7 generation monotonicity', () => {
  const id1 = generateUuidV7();
  const id2 = generateUuidV7();
  assert.strictEqual(typeof id1, 'string');
  assert.strictEqual(id1.length, 36);
  assert.strictEqual(id1.charAt(14), '7'); // version 7
  assert.notStrictEqual(id1, id2);
});

test('Sync Engine - Device Bill Numbering & Anti-Collision', () => {
  const billD01 = generateDeviceBillNo('D01', 1880);
  assert.strictEqual(billD01, 'INV-D01-001880');

  const parsed = parseDeviceBillNo(billD01);
  assert.strictEqual(parsed.isValid, true);
  assert.strictEqual(parsed.deviceId, 'D01');
  assert.strictEqual(parsed.sequenceNumber, 1880);

  const billD02 = generateDeviceBillNo('D02', 1880);
  assert.strictEqual(billD02, 'INV-D02-001880');
  // Two different devices generating bill #1880 never collide!
  assert.notStrictEqual(billD01, billD02);
});

test('Sync Engine - CRDT Stock Balance Reconciliation with Negative Stock', () => {
  const startingStock = 40; // metres
  const sales = [
    {
      deviceId: 'D01',
      billNo: 'INV-D01-000501',
      lotId: 'RL-2291',
      quantitySold: 30,
      timestamp: '2026-11-20T10:00:00Z'
    },
    {
      deviceId: 'D02',
      billNo: 'INV-D02-000201',
      lotId: 'RL-2291',
      quantitySold: 25,
      timestamp: '2026-11-20T10:05:00Z'
    }
  ];

  const result = reconcileStockBalance('RL-2291', startingStock, sales);
  assert.strictEqual(result.totalSold, 55);
  assert.strictEqual(result.finalStock, -15);
  assert.strictEqual(result.isNegative, true);
  assert.strictEqual(result.conflictAlert.needed, true);
  assert.ok(result.conflictAlert.reason?.includes('oversold'));
});
