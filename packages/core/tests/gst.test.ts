import test from 'node:test';
import assert from 'node:assert';
import {
  calculateInvoice,
  calculateSection170Rounding,
  isIntraStateSale
} from '../src/gst/index.ts';

test('GST Engine - Intra-state Gujarat 50/50 tax split', () => {
  const isIntra = isIntraStateSale('24AAACR1234A1Z5', '24BBBCR5678B1Z2');
  assert.strictEqual(isIntra, true);

  const invoice = calculateInvoice(
    [
      {
        itemId: 'ITEM-1',
        itemName: 'Cotton Than 60s',
        qty: 40,
        rate: 65, // Gross 2600
        gstRate: 5
      }
    ],
    true
  );

  assert.strictEqual(invoice.taxableTotal, 2600);
  assert.strictEqual(invoice.totalTax, 130);
  assert.strictEqual(invoice.cgstTotal, 65);
  assert.strictEqual(invoice.sgstTotal, 65);
  assert.strictEqual(invoice.igstTotal, 0);
  assert.strictEqual(invoice.netPayable, 2730);
  assert.strictEqual(invoice.roundOff, 0);
});

test('GST Engine - Section 170 Legal Rupee Rounding', () => {
  // Test 1: .50 and above rounds up
  const r1 = calculateSection170Rounding(6431.26);
  assert.strictEqual(r1.netPayable, 6431);
  assert.strictEqual(r1.roundOff, -0.26);

  // Test 2: .50 rounds up
  const r2 = calculateSection170Rounding(100.50);
  assert.strictEqual(r2.netPayable, 101);
  assert.strictEqual(r2.roundOff, 0.50);

  // Test 3: .49 rounds down
  const r3 = calculateSection170Rounding(100.49);
  assert.strictEqual(r3.netPayable, 100);
  assert.strictEqual(r3.roundOff, -0.49);
});

test('GST Engine - Inter-state IGST calculation', () => {
  const isIntra = isIntraStateSale('24AAACR1234A1Z5', '27CCCCR9999C1Z1'); // Gujarat to Maharashtra
  assert.strictEqual(isIntra, false);

  const invoice = calculateInvoice(
    [
      {
        itemId: 'ITEM-2',
        itemName: 'Rayon Print',
        qty: 10,
        rate: 100,
        gstRate: 12
      }
    ],
    false
  );

  assert.strictEqual(invoice.taxableTotal, 1000);
  assert.strictEqual(invoice.cgstTotal, 0);
  assert.strictEqual(invoice.sgstTotal, 0);
  assert.strictEqual(invoice.igstTotal, 120);
  assert.strictEqual(invoice.netPayable, 1120);
});
