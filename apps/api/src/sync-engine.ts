/**
 * UdyamOS Cloud Sync Engine
 * Handles batch event push, idempotency deduplication, cursor-based delta pull,
 * device pairing, and zero-knowledge time-boxed support grants.
 */

import { generateUuidV7, type TenantEventEnvelope } from '@udyamos/core';

export interface DeviceRecord {
  id: string;
  tenantId: string;
  deviceCode: string;
  displayName: string;
  createdAt: string;
  lastSyncAt?: string;
  lastSyncCursor: number;
}

export interface ChangeLogEntry {
  cursorId: number;
  tenantId: string;
  entityType: string;
  entityId: string;
  action: 'upsert' | 'delete';
  payloadJson: Record<string, unknown>;
  createdAt: string;
}

export interface SupportGrantRecord {
  id: string;
  tenantId: string;
  staffUserId: string;
  reason: string;
  grantedBy: string;
  expiresAt: string; // ISO string
  revokedAt?: string;
  createdAt: string;
}

export class CloudSyncEngine {
  private devices = new Map<string, DeviceRecord>();
  private changeLog: ChangeLogEntry[] = [];
  private idempotencyStore = new Map<string, { status: number; response: any }>();
  private supportGrants = new Map<string, SupportGrantRecord>();
  private cursorCounter = 0;

  /**
   * Registers or pairs an edge counter device.
   */
  public registerDevice(
    tenantId: string,
    deviceCode: string,
    displayName: string
  ): DeviceRecord {
    const cleanCode = deviceCode.trim().toUpperCase();
    const existing = Array.from(this.devices.values()).find(
      (d) => d.tenantId === tenantId && d.deviceCode === cleanCode
    );

    if (existing) {
      return existing;
    }

    const deviceId = `dev-${cleanCode.toLowerCase()}-${generateUuidV7().slice(0, 8)}`;
    const record: DeviceRecord = {
      id: deviceId,
      tenantId,
      deviceCode: cleanCode,
      displayName,
      createdAt: new Date().toISOString(),
      lastSyncCursor: 0
    };

    this.devices.set(deviceId, record);
    return record;
  }

  /**
   * Processes a batch of events pushed from an edge device outbox.
   * Guarantees idempotency via `idempotencyKey`.
   */
  public pushEvents(
    tenantId: string,
    deviceId: string,
    idempotencyKey: string,
    events: TenantEventEnvelope[]
  ): { status: number; processedCount: number; newCursor: number; message: string } {
    const cacheKey = `${tenantId}:${idempotencyKey}`;
    if (this.idempotencyStore.has(cacheKey)) {
      const cached = this.idempotencyStore.get(cacheKey)!;
      return cached.response;
    }

    const device = this.devices.get(deviceId);
    if (!device || device.tenantId !== tenantId) {
      const err = {
        status: 403,
        processedCount: 0,
        newCursor: this.cursorCounter,
        message: 'Invalid device credentials for tenant'
      };
      return err;
    }

    let processedCount = 0;
    const now = new Date().toISOString();

    for (const evt of events) {
      this.cursorCounter++;
      const changeEntry: ChangeLogEntry = {
        cursorId: this.cursorCounter,
        tenantId,
        entityType: evt.eventType,
        entityId: evt.entityId,
        action: 'upsert',
        payloadJson: evt.payload,
        createdAt: now
      };

      this.changeLog.push(changeEntry);
      processedCount++;
    }

    device.lastSyncAt = now;
    device.lastSyncCursor = this.cursorCounter;

    const result = {
      status: 200,
      processedCount,
      newCursor: this.cursorCounter,
      message: 'Batch push successfully processed'
    };

    this.idempotencyStore.set(cacheKey, { status: 200, response: result });
    return result;
  }

  /**
   * Returns incremental changes (delta stream) for an edge device since a given cursor.
   */
  public pullDelta(
    tenantId: string,
    sinceCursor: number = 0,
    limit: number = 100
  ): { latestCursor: number; changes: ChangeLogEntry[]; hasMore: boolean } {
    const filtered = this.changeLog.filter(
      (c) => c.tenantId === tenantId && c.cursorId > sinceCursor
    );

    const changes = filtered.slice(0, limit);
    const hasMore = filtered.length > limit;
    const latestCursor = changes.length > 0
      ? changes[changes.length - 1].cursorId
      : sinceCursor;

    return {
      latestCursor,
      changes,
      hasMore
    };
  }

  /**
   * Grants time-boxed remote support access (Owner-approved only).
   */
  public grantSupportAccess(
    tenantId: string,
    staffUserId: string,
    durationHours: number,
    grantedBy: string,
    reason: string
  ): SupportGrantRecord {
    const clampedHours = Math.min(72, Math.max(1, durationHours));
    const now = new Date();
    const expiresAt = new Date(now.getTime() + clampedHours * 60 * 60 * 1000).toISOString();

    const grant: SupportGrantRecord = {
      id: `grant-${generateUuidV7().slice(0, 8)}`,
      tenantId,
      staffUserId,
      reason,
      grantedBy,
      expiresAt,
      createdAt: now.toISOString()
    };

    this.supportGrants.set(`${tenantId}:${staffUserId}`, grant);
    return grant;
  }

  /**
   * Enforces Zero-Knowledge Support Boundary:
   * Returns true only if a valid, unexpired, unrevoked support grant exists.
   */
  public isSupportGrantActive(tenantId: string, staffUserId: string): boolean {
    const key = `${tenantId}:${staffUserId}`;
    const grant = this.supportGrants.get(key);
    if (!grant || grant.revokedAt) return false;

    const now = new Date().toISOString();
    return grant.expiresAt > now;
  }
}

