/**
 * UdyamOS Core — Wholesale Purchase Inward & Lot Batch Generator
 * Manages supplier inward bills, fabric roll batch provisioning, and cost calculations.
 */

import { calculateInvoice, type InvoiceSummary } from '../gst/index.ts';

export interface PurchaseItemInput {
  productId: string;
  productName: string;
  sku: string;
  hsnCode?: string;
  thanCount: number; // Rolls
  metres: number;
  purchaseRate: number;
  gstRate: 0 | 5 | 12 | 18 | 28;
}

export interface PurchaseInwardInput {
  purchaseNo: string;
  supplierInvoiceNo: string;
  supplierName: string;
  date: string;
  godownName: string;
  items: PurchaseItemInput[];
  isIntraState?: boolean;
}

export interface GeneratedLotBatch {
  lotId: string;
  productId: string;
  sku: string;
  itemName: string;
  godownName: string;
  thanCount: number;
  availableMetres: number;
  costRate: number;
  inwardDate: string;
}

export interface PurchaseInwardResult {
  purchaseNo: string;
  supplierInvoiceNo: string;
  supplierName: string;
  summary: InvoiceSummary;
  generatedLots: GeneratedLotBatch[];
  totalInwardMetres: number;
}

/**
 * Processes an inward purchase bill and generates tracked inventory lot batches.
 */
export function processPurchaseInward(
  input: PurchaseInwardInput
): PurchaseInwardResult {
  const invoiceLines = input.items.map((item) => ({
    itemId: item.productId,
    itemName: item.productName,
    hsnCode: item.hsnCode || '5208',
    qty: item.metres,
    rate: item.purchaseRate,
    gstRate: item.gstRate
  }));

  const summary = calculateInvoice(invoiceLines, input.isIntraState ?? true);

  const generatedLots: GeneratedLotBatch[] = [];
  let totalInwardMetres = 0;

  input.items.forEach((item, idx) => {
    totalInwardMetres += item.metres;
    const lotId = `LOT-${item.sku}-${input.purchaseNo.slice(-4)}-${idx + 1}`;
    generatedLots.push({
      lotId,
      productId: item.productId,
      sku: item.sku,
      itemName: item.productName,
      godownName: input.godownName,
      thanCount: item.thanCount,
      availableMetres: item.metres,
      costRate: item.purchaseRate,
      inwardDate: input.date
    });
  });

  return {
    purchaseNo: input.purchaseNo,
    supplierInvoiceNo: input.supplierInvoiceNo,
    supplierName: input.supplierName,
    summary,
    generatedLots,
    totalInwardMetres
  };
}

