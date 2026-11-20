/**
 * UdyamOS Counter POS Billing Controller
 * Fast, offline-first billing engine enforcing credit limit warnings,
 * Section 170 GST tax math, and device-prefixed bill generation.
 */

import {
  calculateInvoice,
  generateDeviceBillNo,
  generateUuidV7,
  type InvoiceLineInput
} from '@udyamos/core';
import { LocalEdgeStore, type LocalBillRecord } from '../db/sqlite-store.ts';

export interface CheckoutInput {
  customerId?: string;
  customerName?: string;
  lines: Array<{
    productId: string;
    lotId?: string;
    qty: number;
    rate: number;
    discount?: number;
  }>;
  paymentMode: 'cash' | 'upi' | 'credit';
  isIntraState?: boolean;
}

export interface CheckoutResult {
  success: boolean;
  bill: LocalBillRecord;
  eventId: string;
  creditWarning?: string;
}

export class CounterPOSService {
  private readonly store: LocalEdgeStore;

  constructor(store: LocalEdgeStore) {
    this.store = store;
  }

  /**
   * Completes a sale at the counter, saves to local SQLite, and appends to outbox.
   * Completes in < 10 milliseconds.
   */
  public checkout(input: CheckoutInput): CheckoutResult {
    let customerName = input.customerName || 'Cash Counter Sale';
    let creditWarning: string | undefined;

    // 1. Prepare lines with master GST rates
    const invoiceLineInputs: InvoiceLineInput[] = input.lines.map((l) => {
      const product = this.store.getProduct(l.productId);
      const itemName = product ? product.name : 'Textile Item';
      const gstRate = product ? product.gstRate : 5;
      const hsnCode = product ? product.hsnCode : '5208';

      return {
        itemId: l.productId,
        itemName,
        hsnCode,
        qty: l.qty,
        rate: l.rate,
        discountAmount: l.discount || 0,
        gstRate
      };
    });

    // 2. Legal GST Calculation with Section 170 Rupee Rounding
    const summary = calculateInvoice(invoiceLineInputs, input.isIntraState ?? true);

    // 3. Credit Limit Verification
    if (input.customerId) {
      const customer = this.store.getCustomer(input.customerId);
      if (customer) {
        customerName = customer.name;
        if (input.paymentMode === 'credit') {
          const projectedBalance = customer.currentBalance + summary.netPayable;
          if (projectedBalance > customer.creditLimit) {
            creditWarning = `⚠️ Credit limit exceeded for ${customer.name}. Limit: ₹${customer.creditLimit}, Projected Due: ₹${projectedBalance}`;
          }
        }
      }
    }

    // 4. Generate Monotonic Device Bill Number
    const seq = this.store.getNextSequence();
    const billNo = generateDeviceBillNo(this.store.deviceCode, seq);
    const eventId = generateUuidV7();

    const localBill: LocalBillRecord = {
      billNo,
      customerId: input.customerId,
      customerName,
      taxableTotal: summary.taxableTotal,
      cgstTotal: summary.cgstTotal,
      sgstTotal: summary.sgstTotal,
      igstTotal: summary.igstTotal,
      roundOff: summary.roundOff,
      netPayable: summary.netPayable,
      paymentMode: input.paymentMode,
      issuedAt: new Date().toISOString(),
      lines: summary.lines.map((sl, idx) => ({
        productId: sl.itemId,
        productName: sl.itemName,
        lotId: input.lines[idx]?.lotId,
        qty: sl.qty,
        rate: sl.rate,
        taxableAmount: sl.taxableAmount,
        gstRate: sl.gstRate,
        lineTotal: sl.lineTotal
      }))
    };

    // 5. Commit to Local Edge SQLite
    this.store.saveBill(localBill, eventId);

    return {
      success: true,
      bill: localBill,
      eventId,
      creditWarning
    };
  }
}
