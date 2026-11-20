/**
 * UdyamOS Core — Delivery Challans (ચલણ) Engine
 * Manages wholesale fabric dispatch challans, unbilled ageing audits,
 * and seamless 1-click conversion from Delivery Challan to GST Tax Invoice.
 */

import { calculateInvoice, type InvoiceSummary } from '../gst/index.ts';

export interface ChallanLine {
  productId: string;
  productName: string;
  lotId?: string;
  thanCount: number; // Fabric Rolls
  metres: number;
  tentativeRate: number;
  hsnCode?: string;
}

export interface DeliveryChallan {
  challanNo: string; // e.g. 'CHL-D01-000101'
  date: string; // YYYY-MM-DD
  partyId: string;
  partyName: string;
  vehicleNo?: string;
  godownLocation: string;
  status: 'open' | 'converted' | 'cancelled';
  convertedInvoiceNo?: string;
  lines: ChallanLine[];
  notes?: string;
}

/**
 * Creates a Delivery Challan for wholesale textile dispatch.
 */
export function createDeliveryChallan(
  params: Omit<DeliveryChallan, 'status' | 'convertedInvoiceNo'>
): DeliveryChallan {
  return {
    ...params,
    status: 'open'
  };
}

export interface ConvertChallanResult {
  updatedChallan: DeliveryChallan;
  invoiceSummary: InvoiceSummary;
}

/**
 * Converts an open Delivery Challan into a finalized GST Tax Invoice without data re-entry.
 */
export function convertChallanToInvoice(
  challan: DeliveryChallan,
  invoiceNo: string,
  isIntraState: boolean = true,
  overrides?: Array<{ lotId?: string; finalRate?: number; finalMetres?: number }>
): ConvertChallanResult {
  if (challan.status === 'converted') {
    throw new Error(`Challan ${challan.challanNo} is already converted to invoice ${challan.convertedInvoiceNo}`);
  }

  const invoiceLines = challan.lines.map((cl, idx) => {
    const override = overrides?.[idx];
    const qty = override?.finalMetres ?? cl.metres;
    const rate = override?.finalRate ?? cl.tentativeRate;

    return {
      itemId: cl.productId,
      itemName: cl.productName,
      hsnCode: cl.hsnCode || '5208',
      qty,
      rate,
      gstRate: 5 as const // Default textile rate
    };
  });

  const invoiceSummary = calculateInvoice(invoiceLines, isIntraState);

  const updatedChallan: DeliveryChallan = {
    ...challan,
    status: 'converted',
    convertedInvoiceNo: invoiceNo
  };

  return {
    updatedChallan,
    invoiceSummary
  };
}

/**
 * Checks whether an open delivery challan is overdue for invoicing (> 15 days).
 * Prevents credit and inventory leakage in wholesale markets.
 */
export function checkChallanAgeing(
  challan: DeliveryChallan,
  asOfDate: Date = new Date(),
  maxAllowedDays: number = 15
): { isOverdue: boolean; daysOpen: number; alert?: string } {
  if (challan.status !== 'open') {
    return { isOverdue: false, daysOpen: 0 };
  }

  const createdTime = new Date(challan.date).getTime();
  const diffDays = Math.floor((asOfDate.getTime() - createdTime) / (1000 * 60 * 60 * 24));
  const isOverdue = diffDays > maxAllowedDays;

  return {
    isOverdue,
    daysOpen: diffDays,
    alert: isOverdue
      ? `⚠️ Challan ${challan.challanNo} to ${challan.partyName} is unbilled for ${diffDays} days (Limit: ${maxAllowedDays}d). Convert to Tax Invoice now!`
      : undefined
  };
}

