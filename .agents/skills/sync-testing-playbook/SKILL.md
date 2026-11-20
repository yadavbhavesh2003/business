---
name: sync-testing-playbook
description: Offline-to-cloud sync test matrix: bill anti-collision, clock skew, and CRDT stock reconciliation.
---
# Sync Testing Playbook — Multi-Node Test Matrix

## Test Matrix
1. Multi-node concurrent offline sales (Counter D01 + D02 concurrent 50-bill burst).
2. Anti-collision verification: zero overlapping bill numbers.
3. Network partition recovery: idempotency deduplication and CRDT stock balance convergence.
4. Clock skew tolerance: monotonic sequence verification.
