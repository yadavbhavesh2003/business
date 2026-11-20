---
name: security-zero-knowledge
description: Support access grants, tenant isolation, and FIDO2 authentication.
---
# Zero-Knowledge Security & RBAC Spec

## Rules
1. SaaS platform admin staff cannot view tenant customer invoices, names, or ledgers without an owner-approved time-boxed support grant (1-72h).
2. Every action taken during an active grant is immutably logged with SHA-256 signatures.
3. Staff accounts require SSO and FIDO2/WebAuthn hardware keys.
