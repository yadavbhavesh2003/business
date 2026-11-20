/**
 * UdyamOS Core — Stock Movement Ledger & Audit Trail
 * Append-only stock movement ledger tracking fabric movements across purchases, sales, and transfers.
 */

export type StockMovementType =
  | 'opening'
  | 'purchase_receipt'
  | 'sale_issue'
  | 'sales_return'
  | 'purchase_return'
  | 'adjustment_in'
  | 'adjustment_out'
  | 'transfer_in'
  | 'transfer_out';

export interface StockMovementRecord {
  id: string;
  movementType: StockMovementType;
  productId: string;
  lotId?: string;
  godownLocation: string;
  quantityDelta: number; // Positive for inward, negative for outward
  sourceType: 'purchase' | 'invoice' | 'challan' | 'manual_adjustment';
  sourceId: string; // e.g. bill_no or purchase_no
  occurredAt: string; // ISO
  deviceId?: string;
}

export interface StockProjection {
  productId: string;
  lotId?: string;
  startingBalance: number;
  totalInward: number;
  totalOutward: number;
  currentBalance: number;
  isNegative: boolean;
  historyCount: number;
}

/**
 * Calculates current stock projection and verifies inventory health from immutable movement records.
 */
export function calculateStockProjection(
  movements: StockMovementRecord[],
  startingBalance: number = 0
): StockProjection {
  let totalInward = 0;
  let totalOutward = 0;
  const productId = movements[0]?.productId || 'UNKNOWN';
  const lotId = movements[0]?.lotId;

  for (const m of movements) {
    if (m.quantityDelta > 0) {
      totalInward += m.quantityDelta;
    } else {
      totalOutward += Math.abs(m.quantityDelta);
    }
  }

  totalInward = Math.round((totalInward + Number.EPSILON) * 100) / 100;
  totalOutward = Math.round((totalOutward + Number.EPSILON) * 100) / 100;
  const currentBalance = Math.round((startingBalance + totalInward - totalOutward + Number.EPSILON) * 100) / 100;
  const isNegative = currentBalance < 0;

  return {
    productId,
    lotId,
    startingBalance,
    totalInward,
    totalOutward,
    currentBalance,
    isNegative,
    historyCount: movements.length
  };
}

