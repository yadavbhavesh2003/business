---
name: offline-sync-engine
description: SQLite schemas, event logs, CRDT rules, and conflict resolution.
---
# Offline Sync Engine — Distributed Edge Architecture

## Invariants
1. Counter devices are authoritative for local sales.
2. Bills are prefixed with device ID and monotonic sequential counter (e.g. INV-D01-001880).
3. CRDT delta replication merges changes via logical cursor without database locks.
4. Posted bills are immutable. Corrections require credit notes or sales returns.
