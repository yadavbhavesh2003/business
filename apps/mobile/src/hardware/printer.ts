/**
 * UdyamOS Mobile Hardware Driver — ESC/POS Thermal Receipt Builder
 * Formats monospaced 32-col (58mm) and 48-col (80mm) receipts with dynamic UPI QR codes.
 */

import {
  formatCentered,
  formatTwoColumns,
  formatItemRow32,
  buildUpiQrBytes,
  ESC_BYTES
} from '@udyamos/core';
import type { LocalBillRecord } from '../db/sqlite-store.ts';

export interface ShopHeader {
  name: string;
  address: string;
  city: string;
  gstin: string;
  phone: string;
  upiVpa: string;
}

export function buildThermalReceiptBytes(
  bill: LocalBillRecord,
  shop: ShopHeader,
  paperCols: 32 | 48 = 32
): Uint8Array {
  const chunks: number[] = [];

  const append = (bytes: number[]) => chunks.push(...bytes);
  const appendText = (text: string) => {
    chunks.push(...Buffer.from(text + '\n', 'utf-8'));
  };

  // 1. Initialize Printer
  append(ESC_BYTES.INIT);

  // 2. Shop Header (Bold, Center, 2x Size)
  append(ESC_BYTES.ALIGN_CENTER);
  append(ESC_BYTES.BOLD_ON);
  append(ESC_BYTES.DOUBLE_SIZE);
  appendText(shop.name);
  append(ESC_BYTES.NORMAL_SIZE);
  append(ESC_BYTES.BOLD_OFF);

  appendText(shop.address);
  appendText(`${shop.city} · GSTIN: ${shop.gstin}`);
  appendText(`Phone: ${shop.phone}`);
  appendText('='.repeat(paperCols));

  // 3. Bill Metadata (Left aligned)
  append(ESC_BYTES.ALIGN_LEFT);
  appendText(formatTwoColumns(`Bill: ${bill.billNo}`, `Mode: ${bill.paymentMode.toUpperCase()}`, paperCols));
  appendText(formatTwoColumns(`Party: ${bill.customerName.slice(0, 16)}`, `Date: 20-Nov-2026`, paperCols));
  appendText('-'.repeat(paperCols));

  // 4. Line Items Table Header
  appendText(formatItemRow32('Item', 'Qty', 'Rate', 'Total'));
  appendText('-'.repeat(paperCols));

  // 5. Line Items Rows
  for (const line of bill.lines) {
    appendText(
      formatItemRow32(
        line.productName,
        `${line.qty}m`,
        Math.round(line.rate),
        line.lineTotal.toFixed(2)
      )
    );
  }
  appendText('-'.repeat(paperCols));

  // 6. Tax Totals & Section 170 Round-off
  appendText(formatTwoColumns('Subtotal:', bill.taxableTotal.toFixed(2), paperCols));
  if (bill.cgstTotal > 0) {
    appendText(formatTwoColumns('CGST (2.5%):', bill.cgstTotal.toFixed(2), paperCols));
    appendText(formatTwoColumns('SGST (2.5%):', bill.sgstTotal.toFixed(2), paperCols));
  }
  if (bill.igstTotal > 0) {
    appendText(formatTwoColumns('IGST (5%):', bill.igstTotal.toFixed(2), paperCols));
  }
  if (bill.roundOff !== 0) {
    appendText(formatTwoColumns('Round-off (Sec 170):', bill.roundOff.toFixed(2), paperCols));
  }

  appendText('='.repeat(paperCols));

  // 7. Net Total (Bold, 2x Width)
  append(ESC_BYTES.ALIGN_RIGHT);
  append(ESC_BYTES.BOLD_ON);
  appendText(`NET TOTAL:  ₹ ${bill.netPayable.toFixed(2)}`);
  append(ESC_BYTES.BOLD_OFF);
  append(ESC_BYTES.ALIGN_LEFT);
  appendText('='.repeat(paperCols));

  // 8. Dynamic UPI QR Code
  append(ESC_BYTES.ALIGN_CENTER);
  const qrBytes = buildUpiQrBytes({
    vpa: shop.upiVpa,
    merchantName: shop.name,
    amount: bill.netPayable,
    billNo: bill.billNo
  });
  append(Array.from(qrBytes));
  appendText(`Scan to Pay ₹${bill.netPayable} via UPI`);
  appendText('-'.repeat(paperCols));

  // 9. Footer & Gujarati Policy
  appendText(formatCentered('માલ પાછો લેવામાં આવશે નહીં', paperCols));
  appendText(formatCentered('Goods once sold will not be returned', paperCols));
  appendText(formatCentered('Powered by UdyamOS Offline POS', paperCols));

  // 10. Drawer Kick Pulse + Feed 3 Lines + Partial Cut
  append(ESC_BYTES.DRAWER_KICK_PIN2);
  append(ESC_BYTES.FEED_3_LINES);
  append(ESC_BYTES.PARTIAL_CUT);

  return new Uint8Array(chunks);
}
