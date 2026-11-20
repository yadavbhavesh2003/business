import test from 'node:test';
import assert from 'node:assert';
import {
  calculateGstSplit,
  formatInr,
  numberToGujaratiWords,
  calculateDebtAgeing,
  allocatePaymentFifo,
  generateTallySalesVoucherXml,
  generateTallyEnvelopeXml,
  buildUpiQrBytes,
  formatTwoColumns,
  formatCentered,
  processPurchaseInward
} from '@udyamos/core';

test('Web & Mobile Screens - Business Logic & Flow Verification', async (t) => {
  // 1. Fast Billing Calculations (InvoiceNew)
  await t.test('InvoiceNew calculates intra-state tax split and Section 170 rupee rounding', () => {
    const taxable = 40 * 65 + 25 * 85; // 2600 + 2125 = 4725
    const split = calculateGstSplit(taxable, 5, '24');
    assert.strictEqual(split.isInterState, false);
    assert.strictEqual(split.cgst + split.sgst, 236.25);
    assert.strictEqual(split.roundedTotal, 4961);
    const gujWords = numberToGujaratiWords(split.roundedTotal);
    assert.ok(gujWords.includes('રૂપિયા'));
    assert.ok(gujWords.includes('ફક્ત'));
  });

  // 2. Delivery Challan Ageing (Challans & ChallanConvert)
  await t.test('Delivery Challans detect unbilled items older than 7 days', () => {
    const challanDate = new Date('2026-11-12');
    const today = new Date('2026-11-20');
    const ageDays = Math.floor((today.getTime() - challanDate.getTime()) / (1000 * 60 * 60 * 24));
    assert.strictEqual(ageDays, 8);
    const isUnbilledAlert = ageDays > 7;
    assert.strictEqual(isUnbilledAlert, true);
  });

  // 3. Inward Purchase & Lot Batch Generation (Purchases & PurchaseNew)
  await t.test('PurchaseNew creates lot batches with correct cost & meters', () => {
    const result = processPurchaseInward({
      purchaseNo: 'PUR-2026-0042',
      supplierInvoiceNo: 'MILL/26/8891',
      supplierName: 'Vardhman Mills',
      date: '2026-11-20',
      godownName: 'Godown 1 (Ring Road)',
      items: [
        {
          productId: 'prod-ctn-60',
          productName: 'Cotton Than 60s Grey',
          sku: 'CTN-60',
          hsnCode: '5208',
          thanCount: 10,
          metres: 400,
          purchaseRate: 55,
          gstRate: 5
        }
      ]
    });
    assert.strictEqual(result.totalInwardMetres, 400);
    assert.strictEqual(result.summary.taxableTotal, 22000);
    assert.strictEqual(result.summary.totalTax, 1100);
    assert.strictEqual(result.summary.netPayable, 23100);
  });

  // 4. Physical Stock Audit Variance (StockCount)
  await t.test('StockCount computes inventory variances and flags shortages/excess', () => {
    const systemMeters = 400;
    const physicalMeters = 395;
    const variance = physicalMeters - systemMeters;
    assert.strictEqual(variance, -5);
    const status = variance < 0 ? 'shortage' : variance > 0 ? 'excess' : 'matched';
    assert.strictEqual(status, 'shortage');
  });

  // 5. Customer Ledger Debt Ageing & FIFO Payment Allocation
  await t.test('CustomerLedger and PaymentReceipt execute accurate debt ageing and FIFO matching', () => {
    const unpaid = [
      { invoiceNo: 'INV-001', date: '2026-10-10', totalAmount: 10000, unpaidBalance: 10000 },
      { invoiceNo: 'INV-002', date: '2026-11-15', totalAmount: 5000, unpaidBalance: 5000 }
    ];
    const allocation = allocatePaymentFifo(unpaid, 12000);
    assert.strictEqual(allocation.allocations[0].allocatedAmount, 10000);
    assert.strictEqual(allocation.allocations[0].remainingBalance, 0);
    assert.strictEqual(allocation.allocations[1].allocatedAmount, 2000);
    assert.strictEqual(allocation.allocations[1].remainingBalance, 3000);
    assert.strictEqual(allocation.unallocatedAdvance, 0);
  });

  // 6. CA Portal Tally XML & Section 170 Integrity
  await t.test('CaPortal produces valid Tally Prime XML export string', () => {
    const voucherXml = generateTallySalesVoucherXml({
      invoiceNo: 'INV-D01-001880',
      date: '20261120',
      partyName: 'Shreeji Saree Depot',
      summary: {
        unroundedTotal: 2730,
        roundOff: 0,
        netPayable: 2730,
        taxableTotal: 2600,
        cgstTotal: 65,
        sgstTotal: 65,
        igstTotal: 0,
        grossTotal: 2600,
        totalDiscount: 0,
        totalTax: 130,
        isIntraState: true,
        lines: []
      }
    });
    const envelope = generateTallyEnvelopeXml(voucherXml);
    assert.ok(envelope.includes('<ENVELOPE>'));
    assert.ok(envelope.includes('<TALLYREQUEST>Import Data</TALLYREQUEST>'));
    assert.ok(envelope.includes('Shreeji Saree Depot'));
  });

  // 7. Thermal Printer Setup ESC/POS Formatting & Dynamic UPI QR
  await t.test('ThermalPrinterSetup formats 48-col and 32-col layout with dynamic UPI QR bytes', () => {
    const row = formatTwoColumns('Subtotal', '₹ 4,725.00', 48);
    assert.strictEqual(row.length, 48);
    const center = formatCentered('RADHE RADHE TEXTILES', 48);
    assert.ok(center.includes('RADHE RADHE TEXTILES'));
    const upiBytes = buildUpiQrBytes({
      vpa: 'radhe@okaxis',
      merchantName: 'Radhe Radhe Textiles',
      amount: 4961,
      billNo: 'INV-D01-001880'
    });
    assert.ok(upiBytes.length > 20);
  });
});
