/**
 * UdyamOS Core — Payment Allocation & Debt Ageing Engine
 * Implements FIFO invoice clearance and standard 30-day accounting ageing buckets.
 */

export interface UnpaidInvoice {
  invoiceNo: string;
  date: string; // ISO or YYYY-MM-DD
  dueDate?: string;
  totalAmount: number;
  unpaidBalance: number;
}

export interface AllocationResult {
  invoiceNo: string;
  allocatedAmount: number;
  remainingBalance: number;
  isFullyPaid: boolean;
}

export interface FifoPaymentResult {
  totalPaid: number;
  totalAllocated: number;
  unallocatedAdvance: number;
  allocations: AllocationResult[];
}

/**
 * Allocates an incoming lump-sum customer payment to oldest outstanding invoices (FIFO).
 */
export function allocatePaymentFifo(
  unpaidInvoices: UnpaidInvoice[],
  paymentAmount: number
): FifoPaymentResult {
  let remainingPayment = Math.max(0, paymentAmount);
  let totalAllocated = 0;
  const allocations: AllocationResult[] = [];

  // Sort invoices chronologically (oldest first)
  const sorted = [...unpaidInvoices].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  for (const inv of sorted) {
    if (remainingPayment <= 0) break;
    if (inv.unpaidBalance <= 0) continue;

    const allocatedAmount = Math.min(remainingPayment, inv.unpaidBalance);
    const remainingBalance = Math.round((inv.unpaidBalance - allocatedAmount + Number.EPSILON) * 100) / 100;
    const isFullyPaid = remainingBalance === 0;

    allocations.push({
      invoiceNo: inv.invoiceNo,
      allocatedAmount: Math.round((allocatedAmount + Number.EPSILON) * 100) / 100,
      remainingBalance,
      isFullyPaid
    });

    totalAllocated += allocatedAmount;
    remainingPayment = Math.round((remainingPayment - allocatedAmount + Number.EPSILON) * 100) / 100;
  }

  return {
    totalPaid: paymentAmount,
    totalAllocated: Math.round((totalAllocated + Number.EPSILON) * 100) / 100,
    unallocatedAdvance: Math.round((remainingPayment + Number.EPSILON) * 100) / 100,
    allocations
  };
}

export interface AgeingBuckets {
  current0to30: number; // 0–30 days
  days31to60: number;   // 31–60 days
  days61to90: number;   // 61–90 days
  days90Plus: number;   // 90+ days
  totalOverdue: number;
  totalReceivable: number;
}

/**
 * Calculates Debt Ageing Buckets for a customer's unpaid invoices.
 */
export function calculateDebtAgeing(
  invoices: UnpaidInvoice[],
  asOfDate: Date = new Date()
): AgeingBuckets {
  let current0to30 = 0;
  let days31to60 = 0;
  let days61to90 = 0;
  let days90Plus = 0;

  const msPerDay = 1000 * 60 * 60 * 24;
  const asOfTime = asOfDate.getTime();

  for (const inv of invoices) {
    if (inv.unpaidBalance <= 0) continue;

    const invTime = new Date(inv.date).getTime();
    const daysOld = Math.floor((asOfTime - invTime) / msPerDay);

    if (daysOld <= 30) {
      current0to30 += inv.unpaidBalance;
    } else if (daysOld <= 60) {
      days31to60 += inv.unpaidBalance;
    } else if (daysOld <= 90) {
      days61to90 += inv.unpaidBalance;
    } else {
      days90Plus += inv.unpaidBalance;
    }
  }

  current0to30 = Math.round(current0to30 * 100) / 100;
  days31to60 = Math.round(days31to60 * 100) / 100;
  days61to90 = Math.round(days61to90 * 100) / 100;
  days90Plus = Math.round(days90Plus * 100) / 100;

  const totalReceivable = Math.round((current0to30 + days31to60 + days61to90 + days90Plus) * 100) / 100;
  const totalOverdue = Math.round((days31to60 + days61to90 + days90Plus) * 100) / 100;

  return {
    current0to30,
    days31to60,
    days61to90,
    days90Plus,
    totalOverdue,
    totalReceivable
  };
}

