import test from 'node:test';
import assert from 'node:assert';
import {
  LocalEdgeStore,
  CounterPOSService,
  buildThermalReceiptBytes,
  BarcodeScannerParser
} from '../src/index.ts';

test('Mobile POS - Offline Billing & Hardware Suite', async (t) => {
  const store = new LocalEdgeStore('D01');

  // Seed master data
  store.setCustomer({
    id: 'cust-shreeji-01',
    name: 'Shreeji Saree Depot',
    creditLimit: 100000,
    creditDays: 30,
    currentBalance: 98500
  });

  store.setProduct({
    id: 'prod-cotton-60',
    sku: 'SKU-CTN-60',
    name: 'Cotton Than 60s',
    gujaratiName: 'કોટન થાણ ૬૦',
    hsnCode: '5208',
    primaryUnit: 'meter',
    salePrice: 65,
    gstRate: 5
  });

  store.setLot({
    lotId: 'LOT-CTN-01',
    productId: 'prod-cotton-60',
    availableMetres: 200,
    godownName: 'Main Godown'
  });

  const pos = new CounterPOSService(store);

  // 1. Search products
  await t.test('LocalEdgeStore searches SKUs and Gujarati names', () => {
    const results = store.searchProducts('કોટન');
    assert.strictEqual(results.length, 1);
    assert.strictEqual(results[0].sku, 'SKU-CTN-60');
  });

  // 2. Offline Checkout & Monotonic Bill Numbering
  let generatedBill: any;
  await t.test('CounterPOSService creates bill offline with device prefix INV-D01-000001', () => {
    const res = pos.checkout({
      customerId: 'cust-shreeji-01',
      lines: [
        {
          productId: 'prod-cotton-60',
          lotId: 'LOT-CTN-01',
          qty: 40,
          rate: 65
        }
      ],
      paymentMode: 'upi'
    });

    assert.strictEqual(res.success, true);
    assert.strictEqual(res.bill.billNo, 'INV-D01-000001');
    assert.strictEqual(res.bill.taxableTotal, 2600);
    assert.strictEqual(res.bill.cgstTotal, 65);
    assert.strictEqual(res.bill.sgstTotal, 65);
    assert.strictEqual(res.bill.netPayable, 2730);
    assert.strictEqual(res.bill.roundOff, 0);

    // Verify stock deducted locally
    const lot = store.getLot('LOT-CTN-01');
    assert.strictEqual(lot?.availableMetres, 160);

    // Verify outbox queued
    const pending = store.getOutboxPending();
    assert.strictEqual(pending.length, 1);
    assert.strictEqual(pending[0].entityId, 'INV-D01-000001');

    generatedBill = res.bill;
  });

  // 3. Credit Limit Threshold Warning
  await t.test('CounterPOSService flags credit limit warning when exceeded', () => {
    const res = pos.checkout({
      customerId: 'cust-shreeji-01',
      lines: [
        {
          productId: 'prod-cotton-60',
          qty: 100,
          rate: 65
        }
      ],
      paymentMode: 'credit'
    });

    assert.strictEqual(res.success, true);
    assert.ok(res.creditWarning);
    assert.ok(res.creditWarning.includes('Credit limit exceeded'));
  });

  // 4. Thermal ESC/POS Receipt Bytes with Dynamic UPI QR
  await t.test('buildThermalReceiptBytes generates valid ESC/POS byte sequence', () => {
    const shop = {
      name: 'Radhe Radhe Textiles',
      address: 'New Cloth Market, Ring Road',
      city: 'Surat - 395002',
      gstin: '24AAACR1234A1Z5',
      phone: '+91 98250 12345',
      upiVpa: 'radhetextiles@icici'
    };

    const bytes = buildThermalReceiptBytes(generatedBill, shop, 32);
    assert.ok(bytes instanceof Uint8Array);
    assert.ok(bytes.length > 200);

    // Check Init command 1B 40
    assert.strictEqual(bytes[0], 0x1b);
    assert.strictEqual(bytes[1], 0x40);

    // Check cut command at end
    const lastByte = bytes[bytes.length - 1];
    assert.strictEqual(lastByte, 0x03);
  });

  // 5. HID Barcode Scanner Keystroke Burst Detector
  await t.test('BarcodeScannerParser consumes fast keystroke burst', () => {
    let scannedResult = '';
    const parser = new BarcodeScannerParser((code) => {
      scannedResult = code;
    }, 50);

    const now = Date.now();
    // Simulate barcode reader typing "890123456789" in rapid 10ms intervals
    const barcode = '890123456789';
    for (let i = 0; i < barcode.length; i++) {
      parser.handleKeyPress(barcode[i], now + i * 10);
    }
    // Enter key triggers scan completion
    parser.handleKeyPress('Enter', now + barcode.length * 10);

    assert.strictEqual(scannedResult, '890123456789');
  });
});

