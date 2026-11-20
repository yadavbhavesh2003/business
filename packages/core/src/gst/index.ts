/**
 * UdyamOS Core — Indian GST & Legal Calculation Engine
 * Complies with Section 170 of the CGST Act (Legal Rupee Rounding)
 * and Gujarat State Tax Splitting (Intra-State: 50% CGST + 50% SGST; Inter-State: IGST).
 */

export const GUJARAT_STATE_CODE = '24';

export type GstRate = 0 | 5 | 12 | 18 | 28;

export interface InvoiceLineInput {
  itemId: string;
  itemName: string;
  hsnCode?: string;
  qty: number;
  rate: number;
  discountAmount?: number;
  gstRate: GstRate;
  isTaxInclusive?: boolean;
}

export interface CalculatedLine {
  itemId: string;
  itemName: string;
  hsnCode: string;
  qty: number;
  rate: number;
  grossAmount: number;
  discountAmount: number;
  taxableAmount: number;
  gstRate: GstRate;
  cgstRate: number;
  cgstAmount: number;
  sgstRate: number;
  sgstAmount: number;
  igstRate: number;
  igstAmount: number;
  lineTotal: number;
}

export interface InvoiceSummary {
  grossTotal: number;
  totalDiscount: number;
  taxableTotal: number;
  cgstTotal: number;
  sgstTotal: number;
  igstTotal: number;
  totalTax: number;
  unroundedTotal: number;
  roundOff: number;
  netPayable: number;
  isIntraState: boolean;
  lines: CalculatedLine[];
}

/**
 * Rounds a financial amount to nearest 2 decimal places.
 */
export function round2(num: number): number {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

/**
 * Section 170 of the CGST Act:
 * The amount of tax, interest, penalty, fine or any other sum payable, and the amount of refund
 * or any other sum due, under the provisions of this Act shall be rounded off to the nearest rupee
 * and, for this purpose, where such amount is fifty paise or more, it shall be increased to one rupee
 * and where such amount is less than fifty paise, it shall be ignored.
 */
export function calculateSection170Rounding(unroundedAmount: number): {
  roundOff: number;
  netPayable: number;
} {
  const netPayable = Math.round(unroundedAmount);
  const roundOff = round2(netPayable - unroundedAmount);
  return { roundOff, netPayable };
}

/**
 * Validates whether supplier and customer states form an Intra-state sale (Gujarat -> Gujarat = 24).
 */
export function isIntraStateSale(
  supplierGstinOrCode: string = GUJARAT_STATE_CODE,
  customerGstinOrCode: string = GUJARAT_STATE_CODE
): boolean {
  const supplierCode = supplierGstinOrCode.substring(0, 2);
  const customerCode = customerGstinOrCode.substring(0, 2);
  return supplierCode === customerCode;
}

/**
 * Calculates line-level taxable amounts and taxes.
 */
export function calculateLine(
  line: InvoiceLineInput,
  isIntraState: boolean
): CalculatedLine {
  const grossAmount = round2(line.qty * line.rate);
  const discountAmount = round2(line.discountAmount ?? 0);
  const afterDiscount = Math.max(0, grossAmount - discountAmount);

  let taxableAmount: number;
  let totalTax: number;

  if (line.isTaxInclusive && line.gstRate > 0) {
    // Reverse calculation: Taxable = Gross / (1 + Rate / 100)
    taxableAmount = round2(afterDiscount / (1 + line.gstRate / 100));
    totalTax = round2(afterDiscount - taxableAmount);
  } else {
    taxableAmount = afterDiscount;
    totalTax = round2((taxableAmount * line.gstRate) / 100);
  }

  let cgstRate = 0;
  let cgstAmount = 0;
  let sgstRate = 0;
  let sgstAmount = 0;
  let igstRate = 0;
  let igstAmount = 0;

  if (line.gstRate > 0) {
    if (isIntraState) {
      cgstRate = line.gstRate / 2;
      sgstRate = line.gstRate / 2;
      cgstAmount = round2(totalTax / 2);
      sgstAmount = round2(totalTax - cgstAmount); // Exact sum to prevent penny drift
    } else {
      igstRate = line.gstRate;
      igstAmount = totalTax;
    }
  }

  const lineTotal = round2(taxableAmount + cgstAmount + sgstAmount + igstAmount);

  return {
    itemId: line.itemId,
    itemName: line.itemName,
    hsnCode: line.hsnCode ?? '',
    qty: line.qty,
    rate: line.rate,
    grossAmount,
    discountAmount,
    taxableAmount,
    gstRate: line.gstRate,
    cgstRate,
    cgstAmount,
    sgstRate,
    sgstAmount,
    igstRate,
    igstAmount,
    lineTotal
  };
}

/**
 * Convenience helper to compute GST splits and Section 170 rounding for a given taxable amount.
 */
export function calculateGstSplit(
  taxableAmount: number,
  gstRate: number = 5,
  customerStateCode: string = GUJARAT_STATE_CODE
) {
  const isInterState = customerStateCode.substring(0, 2) !== GUJARAT_STATE_CODE;
  const totalTax = round2((taxableAmount * gstRate) / 100);
  let cgst = 0;
  let sgst = 0;
  let igst = 0;

  if (isInterState) {
    igst = totalTax;
  } else {
    cgst = round2(totalTax / 2);
    sgst = round2(totalTax - cgst);
  }

  const unroundedTotal = taxableAmount + totalTax;
  const rounding = calculateSection170Rounding(unroundedTotal);

  return {
    isInterState,
    taxableAmount,
    totalTax,
    cgst,
    sgst,
    igst,
    unroundedTotal,
    roundingAdjustment: rounding.roundOff,
    roundedTotal: rounding.netPayable
  };
}

export function calculateInvoice(
  lines: InvoiceLineInput[],
  isIntraState: boolean = true
): InvoiceSummary {
  const calculatedLines = lines.map((l) => calculateLine(l, isIntraState));

  let grossTotal = 0;
  let totalDiscount = 0;
  let taxableTotal = 0;
  let cgstTotal = 0;
  let sgstTotal = 0;
  let igstTotal = 0;

  for (const line of calculatedLines) {
    grossTotal += line.grossAmount;
    totalDiscount += line.discountAmount;
    taxableTotal += line.taxableAmount;
    cgstTotal += line.cgstAmount;
    sgstTotal += line.sgstAmount;
    igstTotal += line.igstAmount;
  }

  grossTotal = round2(grossTotal);
  totalDiscount = round2(totalDiscount);
  taxableTotal = round2(taxableTotal);
  cgstTotal = round2(cgstTotal);
  sgstTotal = round2(sgstTotal);
  igstTotal = round2(igstTotal);
  const totalTax = round2(cgstTotal + sgstTotal + igstTotal);
  const unroundedTotal = round2(taxableTotal + totalTax);

  const { roundOff, netPayable } = calculateSection170Rounding(unroundedTotal);

  return {
    grossTotal,
    totalDiscount,
    taxableTotal,
    cgstTotal,
    sgstTotal,
    igstTotal,
    totalTax,
    unroundedTotal,
    roundOff,
    netPayable,
    isIntraState,
    lines: calculatedLines
  };
}

