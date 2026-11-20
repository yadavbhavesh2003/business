/**
 * UdyamOS Core — Offline-to-Cloud Sync & Anti-Collision Engine
 * Manages device-prefixed bill numbering, UUIDv7 timestamped event envelopes,
 * and CRDT conflict reconciliation.
 */

/**
 * Generates a standard UUIDv7 string (Unix timestamp millisecond encoded).
 * Monotonically increasing across distributed nodes for clean database B-Tree index insertions.
 * Compatible with Node.js, Web Browsers, and React Native.
 */
export function generateUuidV7(): string {
  const bytes = new Uint8Array(16);
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < 16; i++) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
  }

  const now = Date.now();
  // 48-bit timestamp
  const timeHi = Math.floor(now / 0x10000);
  const timeLo = now & 0xffff;

  bytes[0] = (timeHi >>> 24) & 0xff;
  bytes[1] = (timeHi >>> 16) & 0xff;
  bytes[2] = (timeHi >>> 8) & 0xff;
  bytes[3] = timeHi & 0xff;
  bytes[4] = (timeLo >>> 8) & 0xff;
  bytes[5] = timeLo & 0xff;

  // version 7
  bytes[6] = (bytes[6] & 0x0f) | 0x70;
  // variant 10
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
}

/**
 * Generates an anti-collision device-prefixed bill number.
 * Example: generateDeviceBillNo('D01', 1880) -> "INV-D01-001880"
 */
export function generateDeviceBillNo(
  deviceId: string,
  sequenceNumber: number,
  prefix: string = 'INV'
): string {
  const cleanDevice = deviceId.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
  const paddedSeq = String(sequenceNumber).padStart(6, '0');
  return `${prefix}-${cleanDevice}-${paddedSeq}`;
}

export const generateDeviceBillNumber = generateDeviceBillNo;

/**
 * Parses a device-prefixed bill number into its components.
 */
export function parseDeviceBillNo(billNo: string): {
  isValid: boolean;
  prefix: string;
  deviceId: string;
  sequenceNumber: number;
} {
  const parts = billNo.trim().split('-');
  if (parts.length !== 3) {
    return { isValid: false, prefix: '', deviceId: '', sequenceNumber: 0 };
  }
  const [prefix, deviceId, seqStr] = parts;
  const sequenceNumber = parseInt(seqStr, 10);
  const isValid = !isNaN(sequenceNumber) && sequenceNumber > 0 && deviceId.length > 0;
  return { isValid, prefix, deviceId, sequenceNumber };
}

export type EventType =
  | 'BILL_CREATED'
  | 'BILL_CANCELLED'
  | 'PAYMENT_RECEIVED'
  | 'STOCK_ADJUSTED'
  | 'PARTY_CREATED'
  | 'PARTY_UPDATED';

export interface TenantEventEnvelope<T = Record<string, unknown>> {
  eventId: string; // UUIDv7
  tenantId: string;
  deviceId: string;
  eventType: EventType;
  entityId: string; // e.g. bill_no
  payload: T;
  clientCreatedAt: string; // ISO-8601
  serverReceivedAt?: string; // ISO-8601 set by cloud gateway
  idempotencyKey: string;
}

export interface StockSaleEvent {
  deviceId: string;
  billNo: string;
  lotId: string;
  quantitySold: number;
  timestamp: string;
}

export interface StockReconciliationResult {
  lotId: string;
  startingStock: number;
  totalSold: number;
  finalStock: number;
  isNegative: boolean;
  conflictAlert: {
    needed: boolean;
    reason?: string;
  };
}

/**
 * CRDT Multi-Node Stock Reconciliation:
 * In retail POS, customer sales receipts are legally binding and cannot be deleted.
 * When two offline devices sell the same lot, both sales stand, stock can become negative,
 * and a high-priority operational conflict alert is raised for the owner.
 */
export function reconcileStockBalance(
  lotId: string,
  startingStock: number,
  sales: StockSaleEvent[]
): StockReconciliationResult {
  let totalSold = 0;
  for (const s of sales) {
    totalSold += s.quantitySold;
  }
  totalSold = Math.round((totalSold + Number.EPSILON) * 100) / 100;
  const finalStock = Math.round((startingStock - totalSold + Number.EPSILON) * 100) / 100;
  const isNegative = finalStock < 0;

  return {
    lotId,
    startingStock,
    totalSold,
    finalStock,
    isNegative,
    conflictAlert: {
      needed: isNegative,
      reason: isNegative
        ? `Lot ${lotId} oversold across offline counters. Initial: ${startingStock}, Sold: ${totalSold}, Deficit: ${finalStock}`
        : undefined
    }
  };
}

