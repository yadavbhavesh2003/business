import test from 'node:test';
import assert from 'node:assert';
import {
  formatTwoColumns,
  formatItemRow32,
  formatItemRow48,
  buildUpiUrl,
  buildUpiQrBytes
} from '../src/escpos/index.ts';

test('ESC/POS Engine - Monospaced Column Alignment', () => {
  // 32-column key-value row
  const row32 = formatTwoColumns('Subtotal', '6125.00', 32);
  assert.strictEqual(row32.length, 32);
  assert.ok(row32.startsWith('Subtotal'));
  assert.ok(row32.endsWith('6125.00'));

  // 32-column item row
  const itemRow32 = formatItemRow32('Cotton Than 60s', '40m', '65', '2600.00');
  assert.strictEqual(itemRow32.length, 32);

  // 48-column item row
  const itemRow48 = formatItemRow48('Chanderi Silk Saree', '5208', '10m', '140', '1400.00');
  assert.strictEqual(itemRow48.length, 48);
});

test('ESC/POS Engine - Dynamic UPI QR Bytes Generation', () => {
  const details = {
    vpa: 'radhetextiles@icici',
    merchantName: 'Radhe Radhe Textiles',
    amount: 6431.00,
    billNo: 'INV-D01-001880'
  };

  const upiUrl = buildUpiUrl(details);
  assert.ok(upiUrl.startsWith('upi://pay?pa=radhetextiles%40icici'));
  assert.ok(upiUrl.includes('am=6431.00'));
  assert.ok(upiUrl.includes('cu=INR'));

  const qrBytes = buildUpiQrBytes(details);
  assert.ok(qrBytes instanceof Uint8Array);
  assert.ok(qrBytes.length > 50);
  // Check center alignment prefix 1B 61 01
  assert.strictEqual(qrBytes[0], 0x1b);
  assert.strictEqual(qrBytes[1], 0x61);
  assert.strictEqual(qrBytes[2], 0x01);
});
