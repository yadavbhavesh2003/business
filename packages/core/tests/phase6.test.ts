import test from 'node:test';
import assert from 'node:assert';
import {
  calculateInvoice,
  generateA4InvoiceHtml,
  generateInvoiceWhatsAppShare,
  generatePaymentReminderWhatsApp,
  allocatePaymentFifo,
  calculateDebtAgeing,
  generateTallySalesVoucherXml,
  generateTallyEnvelopeXml
} from '../src/index.ts';

test('Phase 6 — A4 Invoicing, WhatsApp, FIFO Allocation & Tally Export Suite', async (t) => {
  const summary = calculateInvoice(
    [
      {
        itemId: 'SKU-CTN-60',
        itemName: 'Cotton Than 60s (Surat)',
        hsnCode: '5208',
        qty: 40,
        rate: 65,
        gstRate: 5
      }
    ],
    true
  );

  // 1. A4 HTML Tax Invoice Test
  await t.test('generateA4InvoiceHtml produces complete GST compliant A4 document', () => {
    const html = generateA4InvoiceHtml({
      invoiceNo: 'INV-D01-001880',
      date: '20-Nov-2026',
      dueDate: '05-Dec-2026',
      company: {
        name: 'Radhe Radhe Textiles',
        gujaratiName: 'રાધે રાધે ટેક્સટાઇલ્સ',
        address: 'Ring Road',
        city: 'Surat',
        state: 'Gujarat',
        stateCode: '24',
        gstin: '24AAACR1234A1Z5',
        pan: 'AAACR1234A',
        phone: '+91 98250 12345',
        bankDetails: {
          bankName: 'HDFC Bank',
          accountNumber: '50200012345678',
          ifsc: 'HDFC0000123',
          branch: 'Ring Road Surat',
          upiVpa: 'radhetextiles@hdfcbank'
        }
      },
      buyer: {
        name: 'Shreeji Saree Depot',
        address: 'Station Road',
        city: 'Surat',
        state: 'Gujarat',
        stateCode: '24',
        gstin: '24AAACS1122S1Z9',
        phone: '+91 98251 11222'
      },
      summary
    });

    assert.ok(html.includes('TAX INVOICE'));
    assert.ok(html.includes('INV-D01-001880'));
    assert.ok(html.includes('Radhe Radhe Textiles'));
    assert.ok(html.includes('રાધે રાધે ટેક્સટાઇલ્સ'));
    assert.ok(html.includes('Shreeji Saree Depot'));
    assert.ok(html.includes('HSN: 5208'));
    assert.ok(html.includes('Rupees Two Thousand Seven Hundred Thirty Only'));
    assert.ok(html.includes('રૂપિયા બે હજાર સાતસો ત્રીસ ફક્ત'));
  });

  // 2. WhatsApp Direct Share Links
  await t.test('generateInvoiceWhatsAppShare builds direct wa.me link with Gujarati text', () => {
    const share = generateInvoiceWhatsAppShare({
      phone: '9825111222',
      merchantName: 'Radhe Radhe Textiles',
      partyName: 'શ્રીજી સાડી ડેપો',
      billNo: 'INV-D01-001880',
      amount: 2730,
      date: '20-Nov-2026',
      upiVpa: 'radhe@icici',
      language: 'gu'
    });

    assert.ok(share.url.startsWith('https://wa.me/919825111222?text='));
    assert.ok(share.messageText.includes('શ્રીજી સાડી ડેપો'));
    assert.ok(share.messageText.includes('INV-D01-001880'));
    assert.ok(share.messageText.includes('₹ 2,730.00'));
  });

  await t.test('generatePaymentReminderWhatsApp builds overdue reminder message', () => {
    const reminder = generatePaymentReminderWhatsApp({
      phone: '+91 98252 33444',
      merchantName: 'Radhe Radhe Textiles',
      partyName: 'Shiv Fabrics',
      balanceDue: 240000,
      overdueDays: 45,
      language: 'en'
    });

    assert.ok(reminder.url.startsWith('https://wa.me/919825233444?text='));
    assert.ok(reminder.messageText.includes('Shiv Fabrics'));
    assert.ok(reminder.messageText.includes('45 days'));
    assert.ok(reminder.messageText.includes('₹ 2,40,000.00'));
  });

  // 3. FIFO Payment Allocation
  await t.test('allocatePaymentFifo allocates lump sum payment against oldest invoices', () => {
    const unpaidInvoices = [
      { invoiceNo: 'INV-001', date: '2026-10-01', totalAmount: 20000, unpaidBalance: 20000 },
      { invoiceNo: 'INV-002', date: '2026-10-15', totalAmount: 30000, unpaidBalance: 30000 },
      { invoiceNo: 'INV-003', date: '2026-11-01', totalAmount: 15000, unpaidBalance: 15000 }
    ];

    // Customer pays ₹35,000 lump sum
    const result = allocatePaymentFifo(unpaidInvoices, 35000);

    assert.strictEqual(result.totalAllocated, 35000);
    assert.strictEqual(result.unallocatedAdvance, 0);

    // Bill 1 (20,000) fully paid
    assert.strictEqual(result.allocations[0].invoiceNo, 'INV-001');
    assert.strictEqual(result.allocations[0].allocatedAmount, 20000);
    assert.strictEqual(result.allocations[0].remainingBalance, 0);
    assert.strictEqual(result.allocations[0].isFullyPaid, true);

    // Bill 2 (30,000) gets remaining 15,000, balance 15,000
    assert.strictEqual(result.allocations[1].invoiceNo, 'INV-002');
    assert.strictEqual(result.allocations[1].allocatedAmount, 15000);
    assert.strictEqual(result.allocations[1].remainingBalance, 15000);
    assert.strictEqual(result.allocations[1].isFullyPaid, false);
  });

  // 4. Debt Ageing Buckets Calculation
  await t.test('calculateDebtAgeing categorizes invoices into 0-30, 31-60, 61-90, 90+ days', () => {
    const asOfDate = new Date('2026-11-20');
    const invoices = [
      { invoiceNo: 'INV-A', date: '2026-11-10', totalAmount: 10000, unpaidBalance: 10000 }, // 10 days old -> 0-30
      { invoiceNo: 'INV-B', date: '2026-10-10', totalAmount: 25000, unpaidBalance: 25000 }, // 41 days old -> 31-60
      { invoiceNo: 'INV-C', date: '2026-09-01', totalAmount: 15000, unpaidBalance: 15000 }, // 80 days old -> 61-90
      { invoiceNo: 'INV-D', date: '2026-06-01', totalAmount: 40000, unpaidBalance: 40000 }  // 172 days old -> 90+
    ];

    const ageing = calculateDebtAgeing(invoices, asOfDate);
    assert.strictEqual(ageing.current0to30, 10000);
    assert.strictEqual(ageing.days31to60, 25000);
    assert.strictEqual(ageing.days61to90, 15000);
    assert.strictEqual(ageing.days90Plus, 40000);
    assert.strictEqual(ageing.totalReceivable, 90000);
    assert.strictEqual(ageing.totalOverdue, 80000);
  });

  // 5. Tally Prime XML Sales Voucher Export
  await t.test('generateTallySalesVoucherXml outputs valid Tally XML structure', () => {
    const voucherXml = generateTallySalesVoucherXml({
      invoiceNo: 'INV-D01-001880',
      date: '20261120',
      partyName: 'Shreeji Saree Depot',
      summary
    });

    const envelope = generateTallyEnvelopeXml(voucherXml);
    assert.ok(envelope.includes('<TALLYREQUEST>Import Data</TALLYREQUEST>'));
    assert.ok(envelope.includes('<VOUCHER VCHTYPE="Sales" ACTION="Create">'));
    assert.ok(envelope.includes('<VOUCHERNUMBER>INV-D01-001880</VOUCHERNUMBER>'));
    assert.ok(envelope.includes('<PARTYLEDGERNAME>Shreeji Saree Depot</PARTYLEDGERNAME>'));
    assert.ok(envelope.includes('<LEDGERNAME>Output CGST 2.5%</LEDGERNAME>'));
    assert.ok(envelope.includes('<LEDGERNAME>Output SGST 2.5%</LEDGERNAME>'));
    assert.ok(envelope.includes('-2730.00'));
  });
});

