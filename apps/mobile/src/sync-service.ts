/**
 * UdyamOS Mobile Sync Client
 * Binds local offline SQLite store to the Cloud Gateway / API Server over Wi-Fi / LAN.
 */

import { LocalEdgeStore } from './db/sqlite-store.ts';

export interface SyncConfig {
  apiUrl: string; // e.g. http://192.168.1.2:3000
  tenantId: string;
  deviceId: string;
}

export interface SyncPushResult {
  success: boolean;
  pushedCount: number;
  newCursor?: number;
  error?: string;
}

export interface SyncPullResult {
  success: boolean;
  changesCount: number;
  latestCursor: number;
  error?: string;
}

export class MobileSyncService {
  private readonly store: LocalEdgeStore;
  private readonly config: SyncConfig;
  private currentCursor: number = 0;

  constructor(store: LocalEdgeStore, config: SyncConfig) {
    this.store = store;
    this.config = config;
  }

  /**
   * Pushes pending outbox events to the Cloud API server.
   */
  public async pushOutbox(): Promise<SyncPushResult> {
    const pending = this.store.getOutboxPending();
    if (pending.length === 0) {
      return { success: true, pushedCount: 0 };
    }

    const idempotencyKey = `mob-sync-${Date.now()}-${this.store.deviceCode}`;
    const payload = {
      tenantId: this.config.tenantId,
      deviceId: this.config.deviceId,
      idempotencyKey,
      events: pending.map((e) => ({
        eventId: e.eventId,
        tenantId: this.config.tenantId,
        deviceId: this.config.deviceId,
        eventType: e.eventType,
        entityId: e.entityId,
        payload: e.payload,
        clientCreatedAt: e.createdAt,
        idempotencyKey: e.eventId
      }))
    };

    try {
      const res = await fetch(`${this.config.apiUrl}/api/v1/sync/push`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Idempotency-Key': idempotencyKey
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const text = await res.text();
        return { success: false, pushedCount: 0, error: `HTTP ${res.status}: ${text}` };
      }

      const body = await res.json();
      const syncedIds = pending.map((e) => e.eventId);
      this.store.markOutboxSynced(syncedIds);

      return {
        success: true,
        pushedCount: body.processedCount || pending.length,
        newCursor: body.newCursor
      };
    } catch (err: any) {
      return {
        success: false,
        pushedCount: 0,
        error: err.message || 'Network unreachable'
      };
    }
  }

  /**
   * Pulls incremental master data updates from the Cloud API.
   */
  public async pullDelta(): Promise<SyncPullResult> {
    const url = `${this.config.apiUrl}/api/v1/sync/pull?tenantId=${this.config.tenantId}&sinceCursor=${this.currentCursor}&limit=100`;

    try {
      const res = await fetch(url);
      if (!res.ok) {
        return { success: false, changesCount: 0, latestCursor: this.currentCursor, error: `HTTP ${res.status}` };
      }

      const data = await res.json();
      if (Array.isArray(data.changes)) {
        for (const change of data.changes) {
          if (change.entityType === 'PRODUCT_UPDATED' && change.payloadJson) {
            this.store.setProduct(change.payloadJson as any);
          } else if (change.entityType === 'CUSTOMER_UPDATED' && change.payloadJson) {
            this.store.setCustomer(change.payloadJson as any);
          } else if (change.entityType === 'LOT_UPDATED' && change.payloadJson) {
            this.store.setLot(change.payloadJson as any);
          }
        }
      }

      this.currentCursor = data.latestCursor ?? this.currentCursor;
      return {
        success: true,
        changesCount: data.changes ? data.changes.length : 0,
        latestCursor: this.currentCursor
      };
    } catch (err: any) {
      return {
        success: false,
        changesCount: 0,
        latestCursor: this.currentCursor,
        error: err.message || 'Network unreachable'
      };
    }
  }

  public getCursor(): number {
    return this.currentCursor;
  }
}
