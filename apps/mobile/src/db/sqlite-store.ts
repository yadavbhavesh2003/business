/**
 * UdyamOS Edge Database Store (SQLite Client)
 * In-memory / native SQLite engine managing cached master data, local bills, and outbox queue.
 */

export interface CachedCustomer {
  id: string;
  name: string;
  phone?: string;
  creditLimit: number;
  creditDays: number;
  currentBalance: number;
}

export interface CachedProduct {
  id: string;
  sku: string;
  name: string;
  gujaratiName?: string;
  hsnCode: string;
  primaryUnit: string;
  salePrice: number;
  gstRate: 0 | 5 | 12 | 18 | 28;
}

export interface CachedLot {
  lotId: string;
  productId: string;
  availableMetres: number;
  godownName: string;
}

export interface LocalBillRecord {
  billNo: string;
  customerId?: string;
  customerName: string;
  taxableTotal: number;
  cgstTotal: number;
  sgstTotal: number;
  igstTotal: number;
  roundOff: number;
  netPayable: number;
  paymentMode: 'cash' | 'upi' | 'credit';
  issuedAt: string;
  lines: Array<{
    productId: string;
    productName: string;
    lotId?: string;
    qty: number;
    rate: number;
    taxableAmount: number;
    gstRate: number;
    lineTotal: number;
  }>;
}

export interface OutboxEntry {
  eventId: string; // UUIDv7
  eventType: string;
  entityId: string;
  payload: any;
  status: 'pending' | 'syncing' | 'synced';
  createdAt: string;
}

export class LocalEdgeStore {
  private customers = new Map<string, CachedCustomer>();
  private products = new Map<string, CachedProduct>();
  private lots = new Map<string, CachedLot>();
  private bills = new Map<string, LocalBillRecord>();
  private outbox: OutboxEntry[] = [];
  private sequenceCounter = 0;

  public readonly deviceCode: string;

  constructor(deviceCode: string = 'D01') {
    this.deviceCode = deviceCode;
  }

  public getNextSequence(): number {
    this.sequenceCounter++;
    return this.sequenceCounter;
  }

  // Master Data Operations
  public setCustomer(c: CachedCustomer): void {
    this.customers.set(c.id, c);
  }

  public getCustomer(id: string): CachedCustomer | undefined {
    return this.customers.get(id);
  }

  public setProduct(p: CachedProduct): void {
    this.products.set(p.id, p);
  }

  public getProduct(id: string): CachedProduct | undefined {
    return this.products.get(id);
  }

  public searchProducts(query: string): CachedProduct[] {
    const q = query.trim().toLowerCase();
    if (!q) return Array.from(this.products.values()).slice(0, 50);
    return Array.from(this.products.values()).filter(
      (p) =>
        p.sku.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q) ||
        (p.gujaratiName && p.gujaratiName.toLowerCase().includes(q))
    );
  }

  public setLot(l: CachedLot): void {
    this.lots.set(l.lotId, l);
  }

  public getLot(lotId: string): CachedLot | undefined {
    return this.lots.get(lotId);
  }

  // Bill & Outbox Operations (Committed in < 10ms)
  public saveBill(bill: LocalBillRecord, eventId: string): void {
    this.bills.set(bill.billNo, bill);

    // Deduct stock locally
    for (const line of bill.lines) {
      if (line.lotId && this.lots.has(line.lotId)) {
        const lot = this.lots.get(line.lotId)!;
        lot.availableMetres -= line.qty;
      }
    }

    // Append to local outbox
    this.outbox.push({
      eventId,
      eventType: 'BILL_CREATED',
      entityId: bill.billNo,
      payload: bill,
      status: 'pending',
      createdAt: new Date().toISOString()
    });
  }

  public getBill(billNo: string): LocalBillRecord | undefined {
    return this.bills.get(billNo);
  }

  public getOutboxPending(): OutboxEntry[] {
    return this.outbox.filter((e) => e.status === 'pending');
  }

  public markOutboxSynced(eventIds: string[]): void {
    const set = new Set(eventIds);
    for (const entry of this.outbox) {
      if (set.has(entry.eventId)) {
        entry.status = 'synced';
      }
    }
  }
}
