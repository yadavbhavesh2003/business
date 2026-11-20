import test from 'node:test';
import assert from 'node:assert';
import {
  createDeliveryChallan,
  convertChallanToInvoice,
  checkChallanAgeing,
  processPurchaseInward,
  calculateStockProjection,
  type StockMovementRecord
} from '../src/index.ts';

test('Phase 7 — Delivery Challans, Purchases & Stock Movement Ledger Suite', async (t) => {
  // 1. Delivery Challan Creation & Conversion
  await t.test('createDeliveryChallan & convertChallanToInvoice flow', () => {
    const challan = createDeliveryChallan({
      challanNo: 'CHL-D01-000101',
      date: '2026-11-15',
      partyId: 'cust-shreeji-01',
      partyName: 'Shreeji Saree Depot',
      godownLocation: 'Godown 1 (Ring Road)',
      vehicleNo: 'GJ-05-BT-1234',
      lines: [
        {
          productId: 'prod-ctn-60',
          productName: 'Cotton Than 60s',
          lotId: 'LOT-CTN-01',
          thanCount: 5,
          metres: 200,
          tentativeRate: 65
        }
      ]
    });

    assert.strictEqual(challan.status, 'open');
    assert.strictEqual(challan.lines[0].metres, 200);

    // Convert Challan to Final GST Tax Invoice
    const { updatedChallan, invoiceSummary } = convertChallanToInvoice(
      challan,
      'INV-D01-001900',
      true
    );

    assert.strictEqual(updatedChallan.status, 'converted');
    assert.strictEqual(updatedChallan.convertedInvoiceNo, 'INV-D01-001900');
    assert.strictEqual(invoiceSummary.taxableTotal, 13000); // 200m * 65
    assert.strictEqual(invoiceSummary.cgstTotal, 325);     // 2.5%
    assert.strictEqual(invoiceSummary.sgstTotal, 325);     // 2.5%
    assert.strictEqual(invoiceSummary.netPayable, 13650);
  });

  // 2. Challan Ageing Audit (> 15 days)
  await t.test('checkChallanAgeing detects unbilled delivery challans', () => {
    const oldChallan = createDeliveryChallan({
      challanNo: 'CHL-D01-000085',
      date: '2026-10-30', // 21 days ago relative to 20-Nov-2026
      partyId: 'cust-shiv-02',
      partyName: 'Shiv Fabrics',
      godownLocation: 'Godown 1',
      lines: []
    });

    const asOfDate = new Date('2026-11-20');
    const result = checkChallanAgeing(oldChallan, asOfDate, 15);

    assert.strictEqual(result.isOverdue, true);
    assert.strictEqual(result.daysOpen, 21);
    assert.ok(result.alert?.includes('unbilled for 21 days'));
  });

  // 3. Purchase Inward & Lot Provisioning
  await t.test('processPurchaseInward provisions lot batches and calculates purchase taxes', () => {
    const inward = processPurchaseInward({
      purchaseNo: 'PUR-2026-0042',
      supplierInvoiceNo: 'MILL/26/8891',
      supplierName: 'Arvind Mills Ltd',
      date: '2026-11-18',
      godownName: 'Godown 1 (Ring Road)',
      items: [
        {
          productId: 'prod-ctn-60',
          productName: 'Cotton Than 60s Grey',
          sku: 'CTN-60',
          hsnCode: '5208',
          thanCount: 20,
          metres: 1000,
          purchaseRate: 52.5,
          gstRate: 5
        }
      ],
      isIntraState: true
    });

    assert.strictEqual(inward.totalInwardMetres, 1000);
    assert.strictEqual(inward.summary.taxableTotal, 52500); // 1000 * 52.5
    assert.strictEqual(inward.summary.cgstTotal, 1312.5);
    assert.strictEqual(inward.summary.sgstTotal, 1312.5);
    assert.strictEqual(inward.summary.netPayable, 55125);

    assert.strictEqual(inward.generatedLots.length, 1);
    assert.strictEqual(inward.generatedLots[0].lotId, 'LOT-CTN-60-0042-1');
    assert.strictEqual(inward.generatedLots[0].availableMetres, 1000);
    assert.strictEqual(inward.generatedLots[0].thanCount, 20);
  });

  // 4. Stock Movement Ledger & Audit Trail
  await t.test('calculateStockProjection computes inventory balance from movements', () => {
    const movements: StockMovementRecord[] = [
      {
        id: 'mov-1',
        movementType: 'purchase_receipt',
        productId: 'prod-ctn-60',
        lotId: 'LOT-CTN-01',
        godownLocation: 'Godown 1',
        quantityDelta: 500, // +500m inward
        sourceType: 'purchase',
        sourceId: 'PUR-0042',
        occurredAt: '2026-11-10T10:00:00Z'
      },
      {
        id: 'mov-2',
        movementType: 'sale_issue',
        productId: 'prod-ctn-60',
        lotId: 'LOT-CTN-01',
        godownLocation: 'Godown 1',
        quantityDelta: -200, // -200m sold
        sourceType: 'invoice',
        sourceId: 'INV-D01-001880',
        occurredAt: '2026-11-12T14:00:00Z'
      },
      {
        id: 'mov-3',
        movementType: 'sales_return',
        productId: 'prod-ctn-60',
        lotId: 'LOT-CTN-01',
        godownLocation: 'Godown 1',
        quantityDelta: 25, // +25m customer return
        sourceType: 'invoice',
        sourceId: 'CN-D01-000010',
        occurredAt: '2026-11-14T11:00:00Z'
      }
    ];

    const proj = calculateStockProjection(movements, 0);
    assert.strictEqual(proj.totalInward, 525);
    assert.strictEqual(proj.totalOutward, 200);
    assert.strictEqual(proj.currentBalance, 325);
    assert.strictEqual(proj.isNegative, false);
    assert.strictEqual(proj.historyCount, 3);
  });
});

