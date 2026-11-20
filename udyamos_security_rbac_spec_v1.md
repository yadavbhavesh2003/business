# UdyamOS --- Security, Access Control & Data Protection Spec

**Version 1.0 | 19 November 2026 | Engineering design draft**\
**Applies to:** Android app (React Native), web app, NestJS API,
PostgreSQL\
**Related:** Technical PRD §0 / §3.2 / §7, Database & Offline Sync v1

> Not legal advice. DPDP Act 2023/Rules, GST record-keeping and TRAI DLT
> obligations must be confirmed by a qualified advisor before launch.

------------------------------------------------------------------------

## 1. Threat model (what we actually defend against)

  \#   Threat                                                     Likelihood   Impact
  ---- ---------------------------------------------------------- ------------ ----------
  T1   Staff fraud: deleted/edited invoices, hidden discounts,     **High**     High
       cash not recorded, stock theft
  T2   Lost/stolen/shared phone with business data                 **High**     High
  T3   Ex-employee still has access                                High         High
  T4   Cross-tenant data leak (bug in queries/RLS/pooling)         Medium       Critical
  T5   Account takeover of owner (SIM swap, phished OTP)           Medium       Critical
  T6   Replayed or forged sync events from a tampered app          Medium       High
  T7   Cloud breach / leaked backup / leaked secret                Low          Critical
  T8   Insider (our own staff/support) accessing customer data     Low          High

For this segment **T1--T3 are the daily reality**. RBAC, audit and
device control are a selling point ("your staff can't cheat you"), not
just compliance.

------------------------------------------------------------------------

## 2. Identity and authentication

### 2.1 Identity model

-   **User** = a person (phone number, optional email). One user can
    belong to several organisations (e.g. a CA serving many clients).
-   **Membership** = user × organisation → roles + scopes.
-   **Device** = a registered app install, bound to one organisation,
    with its own key pair and numbering series.

### 2.2 Login methods

  Who                         Primary                                Second factor
  --------------------------- -------------------------------------- -------------------------------------------
  Owner / Admin               Phone OTP                              **Mandatory**: passkey or TOTP app
  Accountant / CA             Phone OTP or email                     Mandatory: passkey or TOTP
  Manager                     Phone OTP                              Recommended; mandatory if owner enables
  Cashier / godown staff      Invited by owner; device login         **4--6 digit PIN on a registered device**

Rules:

-   **SMS OTP alone is not 2FA** (SIM swap). It is the identifier
    proof. Privileged roles need a real second factor.
-   Supported second factors, in order: **passkeys (WebAuthn / Android
    Credential Manager)** → TOTP authenticator app → WhatsApp OTP as
    fallback only. Issue 10 one-time **recovery codes**.
-   OTP: 6 digits, 5-minute expiry, max 3 attempts, max 5 sends/hour
    per number and per IP, stored hashed. Use an Indian provider with
    **TRAI DLT** registered templates (sender ID + template approval
    needed before launch). Budget for WhatsApp OTP as cheaper/more
    reliable fallback.
-   **Owner account recovery** (lost phone + lost 2FA) is manual: KYC
    with GSTIN + PAN match + video call, 48-hour delay, notification to
    all admins. This is the most attacked path; never automate it.

### 2.3 Shared counter devices (fast staff switching)

Shops share one phone/tablet at the counter. Requirement:

-   Device is registered once by owner/admin.
-   Staff switch user with **PIN** (offline-capable, verified against a
    locally stored Argon2id hash synced from server).
-   Auto-lock after N minutes idle (owner-configurable, default 5).
-   5 wrong PINs → that user is locked on that device until a manager
    unlocks.
-   Every transaction records `user_id` **and** `device_id`.

### 2.4 Sessions and tokens

-   Access token (JWT, ~10 min) + refresh token (opaque, rotating,
    reuse detection → revoke whole family).
-   Refresh token **bound to device key**: device signs a challenge with
    its private key held in **Android Keystore** (hardware-backed where
    available). A stolen token alone is useless.
-   Web: refresh token in `HttpOnly; Secure; SameSite=Strict` cookie;
    CSRF token for state-changing requests; no tokens in localStorage.
-   Offline: the device keeps a signed **offline grant** (permissions
    snapshot + expiry, default 7 days). After expiry the app can still
    view but cannot create new transactions until it reconnects.
-   **Step-up auth** (re-enter PIN/passkey) for: cancel invoice, price
    below cost, discount over limit, stock adjustment, export data,
    change tax settings, add user, change bank details.

------------------------------------------------------------------------

## 3. Authorisation (RBAC + scopes + limits)

Plain RBAC is not enough for this business. The model is
**RBAC + scope + limits + approvals** (a pragmatic subset of ABAC).

### 3.1 Permissions (capabilities)

Permissions are fine-grained strings, grouped by module. Code checks
**permissions**, never role names.

``` text
sales.invoice.create        sales.invoice.cancel        sales.invoice.edit_draft
sales.discount.apply        sales.price.override        sales.challan.create
purchase.create             purchase.view_cost
stock.view                  stock.adjust                stock.transfer
party.create                party.edit_credit_limit     party.view_outstanding
payment.receive             payment.make                payment.cash_close
report.view_sales           report.view_profit          report.export
settings.tax                settings.numbering          settings.org
user.invite                 user.manage_roles           device.manage
audit.view
```

### 3.2 Default roles (editable templates per organisation)

  Permission group              Owner   Admin   Manager   Cashier   Godown   Accountant
  ----------------------------- ------- ------- --------- --------- -------- ------------
  Create invoice / challan      ✓       ✓       ✓         ✓         challan  ---
  Cancel invoice                ✓       ✓       approve   ---       ---      ---
  Discount                      ✓       ✓       ≤ limit   ≤ limit   ---      ---
  Price override / below cost   ✓       ✓       approve   ---       ---      ---
  View purchase cost / profit   ✓       ✓       optional  ---       ---      ✓
  Stock adjust                  ✓       ✓       approve   ---       request  ---
  Receive payment               ✓       ✓       ✓         ✓         ---      ---
  Edit credit limit             ✓       ✓       ---       ---       ---      ---
  Reports export                ✓       ✓       ---       ---       ---      ✓
  Tax / numbering settings      ✓       ✓       ---       ---       ---      read
  Users, roles, devices         ✓       ✓       ---       ---       ---      ---
  Audit log                     ✓       ✓       ---       ---       ---      ✓ (read)

Owner role cannot be removed from the last owner. Only an owner can
create another owner.

### 3.3 Scopes

Each role assignment has a scope: `organisation` | `branch:[ids]` |
`godown:[ids]`. A cashier at branch A cannot see branch B invoices. A
CA gets read-only, organisation-wide, **time-boxed** access (e.g. until
end of filing month).

### 3.4 Limits and approvals

Configurable per role:

-   Max discount % / ₹ per invoice.
-   Min selling price (e.g. ≥ cost or ≥ list − x%).
-   Max credit sale when customer is over limit/overdue.
-   Max cash receipt without manager.

Over the limit → **approval request**: manager approves online (push
notification) or **offline with on-device PIN of a manager present**.
Both recorded in audit with who requested and who approved.

### 3.5 Enforcement

-   **Server is the authority.** Every API command and every synced
    event is re-authorised on the server against the permissions *at
    the time the event was created* (from the offline grant version)
    **and** the current membership status.
-   Device enforces locally only for UX and offline use.
-   Event created by a user who was **revoked before** `created_at`
    (per server time and device sequence) → rejected and flagged.
    Events created **before** revocation → accepted but highlighted for
    owner review.
-   Postgres RLS on `organisation_id` is defence in depth for tenant
    isolation (T4), not the RBAC mechanism.
-   Implementation: NestJS guard + `@RequirePermission('sales.invoice.cancel')`
    decorator; a single `can(user, permission, resource)` function in
    `packages/domain` shared by API, mobile and web. Consider CASL for
    the expression layer; keep the policy data in Postgres.

### 3.6 Data tables

``` text
roles(id, organisation_id, name, is_system_template)
role_permissions(role_id, permission)
memberships(id, user_id, organisation_id, status, valid_until)
membership_roles(membership_id, role_id, scope_type, scope_ids[])
role_limits(role_id, limit_key, value)
approval_requests(id, organisation_id, type, payload_ref, requested_by,
                  approved_by, status, device_id, created_at, decided_at)
```

------------------------------------------------------------------------

## 4. Device security (Android)

-   **Device registration** by owner/admin (QR code from web). Device
    gets an ID, a Keystore key pair, and a device numbering series.
-   **Local DB encrypted** with SQLCipher; key generated on device,
    wrapped by Android Keystore. Never hard-coded, never synced.
-   **Remote revoke/wipe**: owner revokes device in web → on next
    contact the app uploads pending outbox first (if signed and
    allowed), then wipes local DB and keys. Revoked device keys are
    rejected by the API immediately.
-   **App integrity**: Google **Play Integrity API** on registration
    and periodically; root/emulator → warn owner, optionally block.
    Treat as a signal, not a guarantee.
-   Disable screenshots on sensitive screens (`FLAG_SECURE`) for cost
    and profit views (owner-configurable).
-   No data in logs or crash reports (Sentry scrubbing of PII, amounts
    optional).
-   Certificate pinning: **not** in MVP (breaks on cert rotation, low
    value vs. cost); revisit later.

------------------------------------------------------------------------

## 5. Encryption

  Data                                   Protection
  -------------------------------------- -------------------------------------------------------------------
  In transit                             TLS 1.2+ (prefer 1.3), HSTS on web, no plain HTTP anywhere
  Postgres at rest                       Managed provider storage encryption (KMS keys)
  Sensitive fields (PAN, Aadhaar if      **Application-level envelope encryption** (KMS data key per
  ever stored, bank account, API keys    tenant); store last 4 digits separately for display.
  for GST/E-Invoice portals)             Prefer **not storing Aadhaar at all**
  Backups and object storage             Encrypted; separate KMS key; restore tested monthly
  Device local DB                        SQLCipher + Android Keystore
  Web offline cache (if enabled later)   Minimal data, cleared on logout; no sensitive fields
  Passwords/PINs/OTPs                    Argon2id (PINs/passwords), OTPs hashed with short TTL
  Secrets                                Cloud secret manager; never in repo/env files in git;
                                         rotated on staff exit
  Audit log integrity                    **Hash chain** per organisation (each entry hashes the
                                         previous); daily anchor stored separately

Key rotation: KMS keys yearly; tenant data keys re-wrapped, not
re-encrypted data.

------------------------------------------------------------------------

## 6. Audit and fraud controls (sells the product)

-   Append-only `audit_events`: who, which device, what, before/after
    diff, IP/app version, approval reference. No update/delete
    privileges for the runtime DB role.
-   Posted invoices are **immutable**; corrections via credit note /
    cancellation with reason (GST-compliant).
-   **Owner fraud dashboard** (MVP-lite): cancellations, discounts over
    limit, price overrides, stock adjustments, deleted drafts, cash
    shortfall per staff per day.
-   Daily **cash closing** per counter with expected vs counted.
-   WhatsApp/push alert to owner for configurable events (e.g. invoice
    cancelled, discount > 10%).

------------------------------------------------------------------------

## 7. Privacy and Indian compliance

  Requirement                         What we do
  ----------------------------------- ------------------------------------------------------------
  **DPDP Act 2023 + Rules**           We are a *data processor* for business customers' customer
                                      data and a *data fiduciary* for our own users. Privacy
                                      notice, consent for our users, purpose limitation,
                                      breach notification process, grievance officer,
                                      data processing agreement (DPA) with each business
  Data localisation                   Host primary DB, backups and object storage in India
                                      (e.g. AWS Mumbai/Hyderabad)
  GST record retention                Retain invoices/books as required by GST law (typically
                                      ~6+ years from the relevant return due date; confirm with
                                      CA) even after subscription ends, then export + delete
  Account deletion / exit             Full data export (Excel + Tally XML + PDF invoices);
                                      deletion after retention period
  TRAI DLT                            Register entity, sender IDs and OTP/transactional templates
  CERT-In                             Report specified incidents within 6 hours; keep logs
                                      180 days in India
  Support access (T8)                 Support staff have **no default access**; customer grants
                                      time-boxed access from settings; every access audited and
                                      visible to the owner

------------------------------------------------------------------------

## 8. API and platform security

-   Validation with shared Zod schemas; reject unknown fields.
-   Rate limits: per IP, per user, per device, per org (Redis).
-   Sync endpoint: signed requests (device key), idempotency key, max
    batch size, payload size limits, server-side recalculation of all
    totals and taxes (never trust client amounts).
-   IDOR protection: every query filtered by `organisation_id` from the
    token, never from the request body.
-   Security headers + strict CSP on web.
-   Dependency scanning (Dependabot/Renovate + `pnpm audit`), SAST
    (CodeQL/Semgrep), secret scanning in CI, container image scanning.
-   Least-privilege DB roles: `migrator` (DDL), `api_runtime` (DML, no
    BYPASSRLS), `readonly_reporting`.
-   Admin/back-office tool for our staff behind SSO + hardware-key MFA,
    separate from customer app.

------------------------------------------------------------------------

## 8A. Platform admin (UdyamOS staff) — two separate role systems

UdyamOS has **two role systems that never mix**:

| | Customer roles (§3) | Platform roles (this section) |
|---|---|---|
| Who | People in a customer business | UdyamOS employees |
| Login | Customer app (OTP + passkey/TOTP; staff PIN on phones) | Separate admin app on a separate domain; company SSO + hardware security key (FIDO2) only |
| Data scope | One organisation (RLS by `organisation_id`) | Account, plan, device health and metrics for all organisations; **no business data** (bills, parties, stock, amounts) without a grant |
| Database role | `api_runtime` (RLS enforced) | `platform_runtime`: reads platform tables and aggregated metrics only; business tables only through the support-grant view below |

### 8A.1 Platform roles

| Permission | Super admin | Support | Billing | Onboarding | Analyst |
|---|---|---|---|---|---|
| List businesses, plans, device/sync health | ✓ | ✓ | ✓ | ✓ | ✓ |
| View a business's data (bills, parties, stock) | — | view, **only with an active owner grant** | — | view, only with grant | — |
| Change plan, refund, suspend | ✓ + second person approves | — | ✓ | — | — |
| Create pilot, import customer data | — | — | — | ✓ (with grant) | — |
| Platform metrics (aggregated, no customer data) | ✓ | — | ✓ | — | ✓ |
| Manage platform staff and roles | ✓ | — | — | — | — |
| Edit a customer's records | **never** | never | never | never | never |
| Delete a business's data | never in the UI; legal process + 2 people | — | — | — | — |

**Rules:**
- Super admin is a break-glass role: at least 2 people, every action needs a second approver, and each use alerts the founders.
- Support grants are created by the customer's owner, time-boxed (owner chooses, max 72 h), view-only, and every screen opened is logged in the customer's own audit log.
- Platform staff never use customer-app accounts to look at customer data.
- All platform actions go to a separate append-only `platform_audit` log, kept 180 days in India (CERT-In) and 8 years for billing actions.
- Platform staff leaving: SSO is disabled the same day; this is checked by a monthly access review.

### 8A.2 Customer-side dashboards per role

| Role | Home screen | Must not see |
|---|---|---|
| Owner | Owner dashboard (web) / Owner home (Android) | — |
| Admin | Same as owner | — |
| Manager | Manager home: approvals, held bills, cash, low stock, remaining offline approval cap | Purchase cost/profit (unless enabled) |
| Cashier | Counter home | Profit, purchase cost, other counters' cash |
| Godown | Godown home: dispatch, receive, counts, transfers | Prices, amounts, profit; cannot make bills |
| Accountant (CA) | Accountant home: client switcher, CA pack, read-only | Cannot create or edit anything |

Each home is decided by the server from the role, not chosen by the user.

## 9. Operations

-   Centralised logs (no PII), 180-day retention in India.
-   Alerts: auth failure spikes, OTP send spikes (SMS pumping fraud),
    sync rejects, RLS errors, cross-tenant query attempts.
-   Backups: PITR enabled; monthly restore drill; RPO ≤ 5 min, RTO ≤
    4 h for MVP.
-   Incident response runbook + contact tree; tabletop exercise before
    pilot.
-   Staff offboarding checklist (ours): revoke cloud, GitHub, secrets.
-   Pen test by an external firm before paid general availability (not
    needed for 5-shop pilot, but do an internal OWASP ASVS L2 review).

------------------------------------------------------------------------

## 10. What is in MVP vs later

  Item                                                  MVP     Later
  ----------------------------------------------------- ------- -------
  Phone OTP + device registration + staff PIN           ✓
  2FA for owner/admin/accountant (passkey or TOTP)      ✓
  Permission-based RBAC + branch/godown scope           ✓
  Discount/price limits + manager approval              ✓
  Device-bound refresh tokens + remote revoke/wipe      ✓
  SQLCipher local DB                                    ✓
  RLS + least-privilege DB roles                        ✓
  Audit log (append-only) + owner alerts                ✓
  Hash-chained audit                                            ✓
  Field-level envelope encryption (PAN, bank, API keys) ✓
  Fraud dashboard (basic)                               ✓
  Full fraud analytics                                          ✓
  Play Integrity                                        ✓ (warn)  block
  Custom roles editor UI                                        ✓
  SSO (Google/Microsoft) for larger customers                   ✓
  External pen test                                             before GA
  SOC 2 / ISO 27001                                             when enterprise asks

------------------------------------------------------------------------

## 11. Security acceptance tests (must pass before pilot)

1.  Cashier cannot cancel an invoice via API even with a crafted request.
2.  Cashier discount over limit is blocked offline and online; manager
    PIN approval is recorded.
3.  Revoked user's events created after revocation are rejected on sync.
4.  Revoked device is wiped on next contact and its tokens fail.
5.  Stolen refresh token without device key fails.
6.  User of org A cannot read/write any org B row (API + direct SQL as
    runtime role + under PgBouncer transaction pooling).
7.  Tampered event amount is recalculated/rejected by server.
8.  Replayed sync batch creates no duplicates.
9.  Local DB file copied off device is unreadable.
10. OTP brute force and SMS pumping are rate-limited and alerted.
11. Owner 2FA is required for exports, user management and tax
    settings.
12. Support staff access without customer grant is impossible and
    audited when granted.
