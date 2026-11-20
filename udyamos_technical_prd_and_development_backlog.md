# UdyamOS --- Technical Product Requirements Document (PRD) & Development Backlog

**Version:** 1.0\
**Date:** 19 November 2026\
**Status:** Draft for founder, engineering and pilot-customer review\
**Product:** UdyamOS (working name; trademark/domain clearance pending)\
**Initial market:** India, starting with Bhavnagar/Gujarat\
**Initial delivery:** Android app (React Native) for shop-counter
billing + React web app for owners/accountants; both offline-capable
(see §7.0 Platform decision)\
**Primary MVP segment:** Wholesale traders and textile traders in
Gujarat (Bhavnagar → Surat/Ahmedabad). Retail is supported but not
targeted (see §0)\
**Later verticals:** Textiles, general manufacturing, metal
melting/foundry, multi-branch enterprises

------------------------------------------------------------------------

# 0. Strategy Lock (v1.1, 19 Nov 2026)

This section overrides any conflicting statement later in this
document. Change it only through a recorded decision (§7.0.3).

## 0.1 Who we serve first

**Wedge segment:** wholesale traders and textile traders (cloth
wholesalers, saree/dress-material traders, job-work coordinators) with
2--15 staff, ₹1--25 crore turnover, Gujarat first.

Why this segment:

-   Generic billing apps (Vyapar, myBillBook, Khatabook) target the
    single-owner retail shop. Our hypothesis is that they are weak at
    multi-staff offline sync on phones and at enforcing credit limits
    at the counter. **Not a gap:** lots/rolls and challans. Public
    material (Nov 2026, untested) shows Vyapar has challan → invoice
    and roll ↔ metre units, myBillBook has challans and job-work
    entries, and BUSY tracks roll/bale/lot/shade stock and job work.
    Niche textile packages sell at about ₹7k--14k/year. Our claimed
    edge is therefore: (1) many staff billing offline on Android with
    zero duplicate bills, (2) credit limit enforced at billing with a
    manager-approval trail, (3) Gujarati-first counter UX. Confirm all
    three by the hands-on tests in §0.4 before positioning on them.
-   Tally is trusted by CAs but hard for counter and godown staff, and
    weak on mobile.
-   These businesses pay for software and lose real money on credit
    leakage and stock mismatch.
-   Gujarat is a textile and trading hub. The founders have local
    access.

Retail shops can use the product but we do not build retail-only
features, market to retail, or price for retail in the MVP.

## 0.2 MVP scope (12 weeks, one page)

  \#   Capability                                                   Platform
  ---- ------------------------------------------------------------ -------------
  1    Organisation, staff roles, device registration               Web + Android
  2    Parties with credit limit, credit days, opening balance      Web + Android
  3    Products with units (pcs/meter/kg/than), lot/roll tracking   Web + Android
  4    Sales invoice + delivery challan, offline                    Android + Web
  5    Bluetooth thermal print + A4 PDF + WhatsApp share            Android + Web
  6    Purchase entry with lots                                     Web + Android
  7    Payment receipts, outstanding and ageing report              Web + Android
  8    Stock by item/lot/godown                                     Web + Android
  9    Sync status, pending count, conflict review                  Android + Web
  10   Owner dashboard + Excel/Tally export for the CA              Web

Anything not in this table is out of the MVP.

## 0.3 Not building (until the trigger is met)

  Feature                                     Trigger to reconsider
  ------------------------------------------- ---------------------------------------------
  AI copilot / insights                       30+ paying shops and 60 days of clean data
  Voice entry (Gujarati/Hindi)                Core billing retention above 70% at day 30
  OCR of purchase bills                       10+ pilots ask for it
  E-Invoice / E-Way Bill                      First release after the pilot. Wholesalers above the threshold need it
  Textile job-work module (full)              5+ pilots use challans weekly
  Manufacturing / BOM                         Separate validated segment
  Foundry / metal melting                     Separate validated segment
  Multi-branch consolidation                  3+ paying multi-branch customers
  iOS app                                     10%+ of target users on iPhone
  Full double-entry accounting                CA panel confirms Tally export is insufficient
  Payroll, CRM, banking                       Not planned

## 0.4 Competitor comparison (fill in by hands-on testing)

Every cell must be verified by installing and using the product. Do not
copy marketing pages. Record the date tested.

  Capability                         UdyamOS target   Vyapar   myBillBook   Tally Prime   Marg/Busy   Zoho
  ---------------------------------- ---------------- -------- ------------ ------------- ----------- ------
  Offline billing on Android         Yes              ?        ?            ?             ?           ?
  Multi-staff offline sync, no dupes Yes              ?        ?            ?             ?           ?
  Lot/roll/meter stock               Yes              ? (units claimed) ?     ?             BUSY: claimed ?
  Delivery challan → invoice         Yes              claimed  claimed      ?             ?           ?
  Credit limit block at billing      Yes              ?        ?            ?             ?           ?
  Bluetooth thermal + Gujarati       Yes              ?        ?            ?             ?           ?
  Tally export for CA                Yes              ?        ?            n/a           ?           ?
  Price (₹/year, entry paid tier)    TBD              ?        ?            ?             ?           ?

"claimed" = vendor's public pages say so (Nov 2026); still needs a hands-on test.
Public list prices seen: Vyapar ≈ ₹3.4k--4.4k/yr; myBillBook from ₹399/yr;
TallyPrime Silver ≈ ₹22.5k one-time + yearly TSS.

## 0.5 Pricing and go-to-market (draft, validate in interviews)

Pricing hypothesis (annual, excl. GST):

  Plan       For                                   Price hypothesis   Includes
  ---------- ------------------------------------- ------------------ ---------------------------------
  Starter    1 owner + 2 devices                   ₹4,999             Billing, stock, receivables
  Business   Up to 8 devices, lots, challans       ₹11,999            + multi-staff sync, Tally export
  Pro        15+ devices, priority support         ₹24,999            + onboarding visit, data import

These are hypotheses to test, not a decision. Validate them with
Van Westendorp questions in interviews and with deposits from pilots.
Do not compete on price with free retail apps.

**Channels, in order:**

1.  Founder-led sales in Bhavnagar (first 10 customers).
2.  CA/accountant referrals: 15--20% first-year revenue share. CAs want
    clean Tally exports.
3.  Textile market associations and trader WhatsApp groups (demo days).
4.  Local computer and printer dealers as installers (bundle a printer).

**Unit economics targets:** customer acquisition cost below ₹4,000,
gross margin above 80%, payback under 6 months, annual churn below 20%.

## 0.5A Where we lose today, and our response

Source: product audit, 20 Nov 2026. We do not try to beat
competitors at their strengths. We remove the reason each weakness
stops a sale.

  -------------------------------------------------------------------------------------------
  Weakness            Response                                     Proof / metric
  ------------------- -------------------------------------------- --------------------------
  Brand trust         (1) **Data-freedom promise** on every plan:   Trust objections in
  (new, unknown       full Excel + Tally XML export at any time,    interviews; % of pilots
  company)            even after cancelling (read-only access for   citing "what if you shut
                      12 months). (2) Books stored only in India,   down"; target 0 lost
                      with daily backups and a restore test         deals for this reason
                      shown in Settings. (3) Paid pilot with a      after month 3
                      **30-day money-back guarantee**. (4) A named
                      local founder and a WhatsApp support number;
                      reply within 2 working hours. (5) Case
                      studies from the first 3 Bhavnagar pilots
                      ("₹X recovered in dues in 60 days"). (6)
                      Endorsement from the textile market
                      association and at least 2 local CAs.

  Price (Vyapar,      Do not match. Sell **recovered money, not     Price objection rate;
  myBillBook are      software**: the ROI calculator in the demo    Van Westendorp range;
  3--10× cheaper at   shows credit leakage (overdue dues ×          ≥ 60% of pilots convert
  entry)              interest) plus stock mismatch. A trader       at ₹11,999 (§0.6)
                      with ₹10 lakh overdue loses more in a month
                      than our yearly price. Price per business,
                      not per user (counter staff are free to
                      add, devices capped by plan). Annual
                      upfront with a monthly option (₹1,199/mo).
                      Starter (₹4,999) stays within about ₹1k of
                      Vyapar's desktop + mobile plan, so the
                      "3--10×" gap applies only to myBillBook's
                      entry tier, which does not serve 2--15
                      staff anyway.

  Accounting depth    Not a goal (ADR-009). Position as **"the      CA panel sign-off on the
  (Tally, BUSY)       front office that feeds Tally"**: billing,    Tally import; 0 manual
                      stock, credit on phones; books stay in        corrections per month
                      Tally. The Tally XML export is a release      on pilot data
                      gate: it imports into TallyPrime with no
                      manual fixes (ledgers, GST, round-off,
                      credit notes), tested monthly against the
                      current Tally release.

  CA ecosystem        Make CAs a channel, not a rival. (1) **CA     CAs enrolled; customers
  (Tally)             partner programme**: 15--20% first-year       referred per CA; target
                      revenue share (§0.5), free CA login across    5 active CAs by end of
                      all their clients. (2) Monthly "CA pack":     pilot, 30% of new
                      Tally XML, GST summary (GSTR-1 view),         customers via CAs by
                      ageing, and unsynced/conflict check (Reports  month 12
                      screen already designed). (3) A 1-hour
                      onboarding session per CA firm. (4) We never
                      file returns: the CA stays in control.
  -------------------------------------------------------------------------------------------

Backlog items created by this section:

Tickets: FR-TRUST-001 → UOS-131 · FR-TRUST-002 → UOS-133 · FR-CA-001 →
UOS-135 · FR-CA-002 → UOS-134 · GTM-001 → UOS-144 (§11, Epics E13--E14).
Release gates in §10.3 enforce the P0 items.

-   **FR-TRUST-001** Data-freedom export (Excel + Tally XML) available
    on every plan and for 12 months after cancelling. \[P0\]
-   **FR-TRUST-002** Backup status and last restore test shown in
    Settings. \[P1\]
-   **FR-CA-001** CA role: read-only, many organisations, CA pack
    download. \[P1\]
-   **FR-CA-002** Tally XML import test suite as a release gate. \[P0\]
-   **GTM-001** ROI calculator for demos (dues, ageing, interest
    rate). \[P1\]

## 0.6 Pilot success metrics (go/no-go)

  Metric                                       Target            Kill/rethink if
  -------------------------------------------- ----------------- -----------------
  Paid pilot commitments before coding         5                 Fewer than 3
  Shops using daily at day 30                  ≥ 70%             < 40%
  Invoices per shop per day                    ≥ 20              < 5
  Duplicate invoices after sync                0                 Any
  Lost transactions                            0                 Any
  Sync success rate (first attempt)            ≥ 99.5%           < 98%
  Converted to paid annual plan after pilot    ≥ 60%             < 30%
  Referrals from pilot shops                   ≥ 1 per 3 shops   0

------------------------------------------------------------------------

# 1. Product Summary

UdyamOS is an offline-first business management platform for small and
medium businesses. The MVP provides customer and supplier records,
product catalogue, sales and purchase documents, stock ledger, payment
tracking, basic GST calculations and reporting. It is designed for users
with different levels of computer literacy and supports a simple,
multilingual interface.

The platform will later add manufacturing workflows, E-Invoice/E-Way
Bill integrations, voice-assisted operations, OCR and AI-based business
insights.

## 1.1 Product vision

> One platform. Every business. Every language. Every device.

## 1.2 MVP product promise

A small business user can: 1. Set up a business and its tax profile. 2.
Add customers, suppliers and products. 3. Create and print/share a sales
invoice. 4. Record purchases and payments. 5. See stock and customer
outstanding balances. 6. Continue creating supported transactions during
an internet outage. 7. Synchronise locally saved transactions when
connectivity returns. 8. Understand the current sync state and identify
any transactions needing attention.

## 1.3 Non-goals for MVP

The MVP will **not** attempt to deliver: - Full
manufacturing/MRP/production planning. - Metal melting batch and yield
management. - Full double-entry accounting suite unless validated as a
launch requirement. - Automated GST return filing. - E-Invoice or E-Way
Bill generation before authorised integration access and compliance
validation. - Autonomous AI posting of financial transactions. - Full
offline cloud-AI conversation. - International tax/compliance packs. -
Payroll, HRMS, CRM automation or banking aggregation. - Unlimited users,
storage, messaging or AI usage.

These are explicitly deferred to avoid making the MVP too large and
unreliable.

------------------------------------------------------------------------

# 2. Goals, Success Metrics and Product Principles

## 2.1 Product goals

  ------------------------------------------------------------------------
  Goal                  Measurement                         Initial target
  --------------------- --------------------- ----------------------------
  Fast repeat billing   Median time to create    ≤ 30 seconds in usability
                        a repeat invoice                              test
                        after setup           

  Easy onboarding       Pilot user completes                         ≥ 90%
                        basic billing without 
                        help                  

  Offline reliability   Accepted offline                           ≥ 99.9%
                        transactions          
                        recovered in defined  
                        test suite            

  Financial correctness Critical               0 known critical defects at
                        tax/total/stock                            release
                        calculation defects   

  Sync transparency     User can distinguish    100% of transaction states
                        local save from cloud                      visible
                        sync                  

  Pilot adoption        Businesses actively           ≥ 15 of 20 recruited
                        using product weekly  

  Pilot conversion      Active pilot                          ≥ 50% target
                        businesses converting 
                        to paid               

  Retention             90-day pilot                          ≥ 90% target
                        retention             
  ------------------------------------------------------------------------

Targets are hypotheses and release gates, not guaranteed outcomes.
Define the measurement method before testing.

## 2.2 Product principles

1.  **Correctness before convenience:** a fast invoice that calculates
    incorrectly is a failure.
2.  **Offline-first, not offline-afterthought:** local persistence is
    part of the core architecture.
3.  **No silent data loss:** every transaction has an explicit local,
    pending, synced or failed state.
4.  **No hidden financial mutations:** posted records are corrected
    through controlled reversals/adjustments, not overwritten.
5.  **Simple default, advanced when needed:** hide complexity until a
    user needs it.
6.  **AI proposes; business rules validate:** AI must not bypass
    deterministic server-side validation.
7.  **Tenant isolation everywhere:** every request and data access is
    scoped to the correct organisation.
8.  **Exportability:** customers can obtain their business data in
    documented formats.
9.  **Regulatory caution:** tax rules and integrations are versioned and
    verified with qualified experts.
10. **Measure actual user behaviour:** feature decisions follow pilot
    evidence.

------------------------------------------------------------------------

# 3. Target Users and Personas

## 3.1 Personas

### Persona A --- Small shop owner

-   Uses a phone or basic computer.
-   Wants quick billing and stock visibility.
-   May prefer Gujarati or Hindi.
-   Needs large controls, guided steps and minimal typing.
-   Does not want accounting jargon.

### Persona B --- Cashier / billing operator

-   Creates invoices throughout the day.
-   Needs barcode/product search and keyboard/touch efficiency.
-   Must not access sensitive settings or reports unless permitted.

### Persona C --- Accountant

-   Reviews sales, purchases, tax summaries and customer/supplier
    ledgers.
-   Needs exports, audit trail and accurate transaction details.
-   May support multiple businesses with explicit access permission.

### Persona D --- Business owner / manager

-   Reviews sales, outstanding payments, stock and staff activity.
-   Needs multi-user access, reports and approval controls.

### Persona E --- System administrator

-   Manages organisation setup, users, tax profile, branches and
    devices.
-   Can manage permissions and resolve operational issues.

## 3.2 Roles and permissions

Initial roles: - Owner - Admin - Manager - Cashier - Inventory
operator - Accountant / read-only accountant

Permission examples: - View products. - Create/edit product drafts. -
Create invoice. - Discount above threshold. - Cancel/return invoice. -
Record payment. - View purchase cost. - Adjust stock. - Export
reports. - Manage users. - Change tax settings.

Permissions must be capability-based and enforced on the server. Hiding
a button in the UI is not authorisation.

**Full design:** see `udyamos_security_rbac_spec_v1.md`. It covers
permissions, branch/godown scopes, discount/price limits, manager
approvals, staff PIN on shared devices, 2FA for owner/admin/accountant,
device-bound tokens, SQLCipher, field encryption, audit, DPDP/CERT-In
and the security acceptance tests.

------------------------------------------------------------------------

# 4. Scope and Release Plan

## Release 0 --- Discovery and technical foundation

-   Customer interviews and workflow observation.
-   Confirm MVP segment and document formats.
-   Prototype billing flow.
-   Threat model and data model.
-   Offline/sync proof of concept.
-   GST domain review.

## Release 1 --- MVP

-   Organisation setup.
-   Authentication and user roles.
-   Customer/supplier management.
-   Product catalogue and units.
-   Sales invoice and PDF.
-   Purchase entry.
-   Stock ledger.
-   Payment receipts and outstanding balances.
-   Basic dashboard and reports.
-   Android app (React Native) with SQLite offline queue; web app with
    IndexedDB offline queue.
-   Bluetooth 58/80 mm thermal receipt printing and camera barcode
    scanning on Android.
-   Sync status, retries and reconciliation.
-   Audit trail and exports, including the data-freedom promise
    (UOS-131) and the Tally import release gate (UOS-134).
-   Backup status with last restore test in Settings (UOS-133).

-   Platform admin app: login, dashboard with pilot metrics, support
    console with owner grants (UOS-172, 173, 175).

## Release 1.1 --- Pilot hardening

-   CA login across many businesses + CA pack (UOS-135).
-   ROI calculator for sales demos (UOS-144). Paid pilots need it, so
    build it early even though it ships with 1.1.

-   CSV/Excel imports.
-   Better printer support.
-   Sales returns and purchase returns.
-   Backup/restore operational tooling.
-   Improved accessibility and language coverage.
-   Support diagnostics.

## Release 2 --- India compliance integrations

-   GST reports refined with practitioner review.
-   E-Invoice integration where applicable.
-   E-Way Bill integration where applicable.
-   Integration status and error recovery.
-   Regulatory rule versioning.

## Release 3 --- Industry packs and AI

-   Textile variants and roll/meter workflows.
-   Manufacturing BOM and production.
-   Metal batch/recovery.
-   Voice assistant, OCR and business Q&A.
-   Forecasting after sufficient clean data exists.

------------------------------------------------------------------------

# 5. Functional Requirements

Priority definitions: - **P0:** Required for MVP; blocks release. -
**P1:** Important for pilot or immediate post-MVP. - **P2:** Later
enhancement.

## 5.1 Organisation and onboarding

### FR-ORG-001 --- Create organisation \[P0\]

A user can create a business profile with: - Legal/business name. -
Business type. - Address and contact details. - Country and currency. -
Financial year configuration. - Preferred language. - GST registration
status and GSTIN, if applicable. - Invoice numbering configuration.

**Acceptance criteria** - Required fields are validated. - GSTIN format
is validated syntactically; external verification is not implied unless
an authorised service is connected. - Organisation is created with an
isolated tenant identifier. - Creator becomes Owner. - Setup can be
saved as draft if not complete. - No organisation data is visible to
another tenant.

### FR-ORG-002 --- Business profile and tax settings \[P0\]

Owner/Admin can update business details and tax configuration.

**Acceptance criteria** - Changes are permission-checked. - Tax profile
changes are audited. - Tax settings used on a posted invoice are
snapshotted on that invoice and are not silently recalculated later.

### FR-ORG-003 --- Branch and warehouse setup \[P1\]

Support multiple branches and warehouses in the data model. MVP may
expose one default branch and warehouse.

**Acceptance criteria** - Every stock movement is associated with a
location. - User access can be scoped by branch. - Cross-branch stock
transfer is not enabled until transfer workflow is implemented.

## 5.2 Authentication and access control

### FR-AUTH-001 --- Secure sign-in \[P0\]

Support secure sign-in and session management.

**Acceptance criteria** - Passwords are stored using a modern password
hashing algorithm. - Login attempts are rate-limited. - Session expiry
and logout work. - Password reset uses a verified channel. - Sensitive
actions can require re-authentication.

### FR-AUTH-002 --- User invitations \[P0\]

Owner/Admin can invite staff.

**Acceptance criteria** - Invitation is tied to the correct
organisation. - Role is assigned explicitly. - Expired/revoked
invitations cannot be used. - User cannot access another organisation
without membership.

### FR-AUTH-003 --- Server-enforced permissions \[P0\]

All protected API operations check membership, role and capability.

**Acceptance criteria** - Direct API calls cannot bypass UI
restrictions. - Permission denials are logged without leaking sensitive
data. - Tests cover cross-tenant and privilege-escalation attempts.

## 5.3 Customers and suppliers

### FR-PARTY-001 --- Customer CRUD \[P0\]

Create, view, search and edit customer records.

Fields: - Name. - Mobile/email (optional). - Billing/shipping address. -
GSTIN (optional). - State. - Opening balance (controlled migration/setup
workflow). - Notes.

**Acceptance criteria** - Search by name, phone and GSTIN. - Duplicate
warnings are shown. - Customer deletion is blocked when referenced by
posted transactions; archive instead. - Data is available offline once
synced to the device.

### FR-PARTY-002 --- Supplier CRUD \[P0\]

Equivalent supplier management.

### FR-PARTY-003 --- Customer outstanding \[P0\]

Show invoice totals, payments, credit notes/returns and outstanding
amount.

**Acceptance criteria** - Balance derives from posted transactions and
allocations. - No manual balance overwrite. - Drill-down to source
documents is available.

## 5.4 Product catalogue

### FR-PROD-001 --- Product CRUD \[P0\]

Fields: - Name. - SKU. - Barcode. - Category. - Unit. - HSN/SAC where
applicable. - Tax category/rate reference. - Selling price. - Purchase
cost (permission-restricted). - Reorder level. - Active/archive state.

**Acceptance criteria** - SKU uniqueness within organisation where
configured. - Product search works offline for locally available
catalogue. - Product cannot be physically deleted after use in posted
transactions. - Tax calculation uses versioned tax configuration and
invoice snapshot.

### FR-PROD-002 --- Units and conversions \[P0\]

Support piece, kg, gram, litre, meter, box, roll and configurable units.

**Acceptance criteria** - Conversion rules are explicit and validated. -
No implicit conversion between incompatible units. - Quantity precision
is configurable per unit. - Stock is stored in a defined base unit with
conversion history.

### FR-PROD-003 --- Variants \[P1\]

Support size, colour, design and other attributes.

**Acceptance criteria** - Each sellable variant has a stable
identity/SKU. - Stock is tracked at variant level. - Variant selection
is usable on mobile.

### FR-PROD-004 --- Barcode scan \[P1\]

Scan barcode using supported camera/device hardware.

**Acceptance criteria** - Camera permission is requested clearly. -
Manual code entry remains available. - Unknown barcode can open a
create-product draft, not silently create a posted product.

## 5.5 Sales invoices

### FR-SALES-001 --- Create invoice \[P0\]

User selects customer, adds items, quantities, prices, discount and
applicable taxes.

**Acceptance criteria** - Required customer and item fields are
validated. - Totals are calculated by deterministic server/domain logic
and mirrored locally for offline operation. - Rounding rules are
explicit and tested. - Invoice preview shows taxable value, discounts,
tax breakup and grand total. - Draft and posted states are distinct. -
Invoice is saved locally when offline. - Invoice receives a unique ID
that remains stable across sync. - Duplicate submission does not create
duplicate invoices.

### FR-SALES-002 --- Invoice numbering \[P0\]

Support configurable series by organisation/branch/financial year.

**Acceptance criteria** - Concurrent online invoice creation cannot
duplicate a number. - Offline invoice numbering uses a device/series
strategy that prevents collisions, e.g. reserved number ranges or a
device-specific provisional identifier followed by controlled
finalisation. - The business must not print an invoice with a number
that could later collide. - Numbering policy is approved by
accounting/compliance domain review before launch.

### FR-SALES-003 --- Invoice PDF and print \[P0\]

Generate a printable/shareable invoice.

**Acceptance criteria** - PDF contains configured business details,
customer, line items, tax breakup, totals and invoice identifiers. -
Layout works on A4 and supported thermal formats as defined. - PDF
generation is deterministic for the same invoice snapshot. -
Share/export works without exposing another tenant's documents.

### FR-SALES-004 --- Invoice cancellation/return \[P1\]

Support controlled cancellation or return workflows.

**Acceptance criteria** - Posted invoices are not hard-deleted. -
Reversal/credit-note workflow preserves original reference. - Stock and
ledger reversals are atomic and auditable. - Tax treatment is reviewed
by GST expert.

## 5.6 Purchases

### FR-PUR-001 --- Record purchase \[P0\]

Record supplier, supplier invoice reference/date, items, quantities,
cost, tax and payment terms.

**Acceptance criteria** - Purchase posting creates corresponding stock
movements. - Supplier outstanding updates from posted documents and
payments. - Duplicate supplier invoice reference warning is shown. -
Offline purchase is queued and sync-safe.

### FR-PUR-002 --- Purchase returns \[P1\]

Controlled supplier return and reversal workflow.

## 5.7 Inventory

### FR-STOCK-001 --- Immutable stock movement ledger \[P0\]

All stock changes are recorded as movements: - Opening balance. -
Purchase receipt. - Sales issue. - Sales return. - Purchase return. -
Adjustment. - Transfer (when supported). - Production
consumption/receipt (later).

**Acceptance criteria** - Posted movements cannot be silently edited or
deleted. - Corrections use reversal and replacement entries. - Every
movement has source document, actor, location, timestamp and
quantity/unit. - Stock balance is derived from ledger or a verifiable
projection. - Negative stock policy is configurable and visibly
enforced.

### FR-STOCK-002 --- Stock view \[P0\]

Show on-hand quantity, reserved quantity if applicable, available
quantity and low-stock status.

**Acceptance criteria** - User can drill down to movement history. -
Offline stock view is labelled with last sync time and local pending
movements. - Stale data is not presented as globally current.

### FR-STOCK-003 --- Physical stock adjustment \[P1\]

Authorised user can create a counted-stock adjustment.

**Acceptance criteria** - Reason is mandatory. - Permission is
checked. - Adjustment is audited. - Adjustment posts a ledger movement.

## 5.8 Payments and receivables

### FR-PAY-001 --- Record receipt \[P0\]

Record cash, bank, UPI or other configured payment method against a
customer.

**Acceptance criteria** - Payment can be allocated to one or more
invoices. - Unallocated advance is represented explicitly. - Duplicate
payment submission is idempotent. - Receipt voucher is generated. -
Outstanding is recalculated from ledger allocations.

### FR-PAY-002 --- Supplier payment \[P0\]

Record payments to suppliers with allocation and audit trail.

### FR-PAY-003 --- Outstanding ageing \[P1\]

Show due balances by ageing bucket.

## 5.9 Reports

### FR-REPORT-001 --- Daily dashboard \[P0\]

Show sales, collections, outstanding, low stock and pending sync count.

**Acceptance criteria** - Each figure has a defined formula and
source. - Pending offline transactions are distinguished from
server-confirmed figures. - Date/time zone and financial year are
explicit.

### FR-REPORT-002 --- Sales and purchase registers \[P0\]

Filter by date, customer/supplier and status; export CSV.

### FR-REPORT-003 --- Stock report \[P0\]

Show item, location, quantity and valuation method where supported.

### FR-REPORT-004 --- Profit reporting \[P1\]

Do not label gross sales less purchase cost as net profit. Define cost
of goods sold, expenses, stock valuation and accounting basis with
domain expert before release.

## 5.10 Offline and synchronisation

### FR-SYNC-001 --- Local persistence \[P0\]

Every supported offline transaction is committed to local storage before
UI reports local save success.

**Acceptance criteria** - Local database transaction writes both
document and outbox event atomically. - App restart does not lose
committed transactions. - UI distinguishes "Saved on this device" from
"Synced to cloud". - Storage failures are visible and do not falsely
report success.

### FR-SYNC-002 --- Outbox sync \[P0\]

Send pending events to server with idempotency keys.

**Acceptance criteria** - Retry does not duplicate financial documents
or stock movements. - Server acknowledgement is persisted. - Failed
events remain visible with retry/error details. - Backoff prevents
excessive retry loops.

### FR-SYNC-003 --- Pull remote changes \[P0\]

Download changes since a sync cursor.

**Acceptance criteria** - Cursor advances only after changes are
committed locally. - Repeated downloads are safe. - Deleted/archived
entities are represented by tombstones or equivalent events. -
Tenant/branch scope is enforced.

### FR-SYNC-004 --- Conflict handling \[P0\]

Define entity-specific conflict policies.

**Acceptance criteria** - Financial ledger events are append-only. -
Same source event processed twice is idempotent. - Conflicting
master-data edits are surfaced for resolution. - Stock oversell
conflicts are flagged; system does not silently invent stock. - User
sees a clear actionable message.

### FR-SYNC-005 --- Device management \[P1\]

Owner/Admin can view and revoke registered devices.

### FR-SYNC-006 --- Sync diagnostics \[P1\]

Provide support diagnostics without exposing secrets or sensitive
payloads.

## 5.11 Internationalisation and accessibility

### FR-I18N-001 --- Language framework \[P0\]

Use translation keys, not hard-coded UI strings.

**Acceptance criteria** - MVP UI supports English and a
translation-ready structure for Gujarati and Hindi. - User can switch
language. - Date, number and currency formatting use locale-aware
functions. - Mixed-language product search is supported where feasible.

### FR-A11Y-001 --- Usable accessible controls \[P0\]

-   Large touch targets.
-   Clear labels and icons.
-   Keyboard navigation.
-   Screen-reader labels for core controls.
-   Colour is not the only status indicator.
-   Error messages explain how to fix the problem.

## 5.12 Audit and export

### FR-AUDIT-001 --- Audit log \[P0\]

Record actor, organisation, branch, device, action, entity reference,
timestamp and correlation ID.

### FR-EXPORT-001 --- Data export \[P0\]

Allow authorised export of customers, suppliers, products, invoices and
stock movement records.

**Acceptance criteria** - Export is permission-checked. - Export job is
logged. - Files are tenant-scoped and expire securely. - Export schema
is documented.

------------------------------------------------------------------------

# 6. Non-Functional Requirements

  -----------------------------------------------------------------------
  Category                            Requirement
  ----------------------------------- -----------------------------------
  Security                            Tenant isolation, secure
                                      authentication, least privilege,
                                      encryption

  Performance                         Common search and invoice
                                      interactions should feel responsive
                                      on supported devices

  Offline                             Supported core workflows remain
                                      usable without network

  Data integrity                      Atomic posting of invoice, stock
                                      and ledger effects

  Availability                        Establish measurable cloud SLO
                                      after pilot

  Scalability                         Stateless API where practical;
                                      queue-based background jobs

  Maintainability                     Modular monolith initially, clear
                                      domain boundaries

  Observability                       Structured logs, metrics, traces
                                      and error monitoring

  Accessibility                       WCAG-informed design and large
                                      touch targets

  Localisation                        Translation-ready UI and
                                      locale-aware formatting

  Recovery                            Tested backup restore and
                                      documented RPO/RTO

  Privacy                             Purpose limitation, retention rules
                                      and controlled access

  Portability                         Documented customer data export
  -----------------------------------------------------------------------

## 6.1 Performance targets to validate

Initial engineering targets: - API p95 for common reads: under 500 ms
under agreed pilot load. - Local invoice save: under 300 ms on supported
devices under normal conditions. - Product search: under 200 ms for a
typical locally cached catalogue. - Initial PWA load and bundle size
measured on low-end Android devices. - Define load profile before
committing to production SLOs.

These are targets for testing, not guarantees.

------------------------------------------------------------------------

# 7. Technical Architecture Decisions

## 7.1 Architecture style

Use a **modular monolith** for the initial platform: - Identity and
tenancy module. - Parties module. - Catalogue module. - Sales module. -
Purchasing module. - Inventory module. - Payments module. - Reporting
module. - Sync module. - Audit module. - Integration module.

Avoid microservices until measured scale, team ownership or deployment
constraints justify the added operational cost.

## 7.0 Platform decision (supersedes "PWA first")

PWA first was a cost/speed recommendation, not a technical one. UdyamOS
depends on offline billing, Bluetooth thermal printers, barcode
scanning, durable local financial data, background sync and
Gujarati/Hindi input. The browser handles all of these poorly, so the
primary billing surface is a native Android app.

**Primary user assumption (to be confirmed, §7.0.2):** most billing
happens on Android phones at the shop counter. Owners, accountants and
wholesalers use a desktop/laptop browser for back-office work.

  Surface              Decision                              Priority
  -------------------- ------------------------------------- ----------
  Android (counter)    React Native (Expo dev build)         MVP
  Web (back office)    React + Vite + TypeScript, PWA        MVP
  iOS                  Same React Native codebase            Post-pilot
  Desktop counter      Web app + browser print; native       Later
                       desktop/local service only if needed
  Fallback mobile      Capacitor, only if the PoC shows it   PoC gate
                       meets every hardware test

**Why React Native over Flutter:** the team works in TypeScript and
React, so types, validation, business rules, API client and the sync
protocol can be shared with the web app and the NestJS backend.
React Native does **not** reuse web UI components. Mobile screens are
built separately.

### 7.0.1 Two-week proof of concept (gate before feature work)

Build the same thin billing slice in React Native and in Capacitor and
run it on the same hardware: one low-end Android phone (≈3 GB RAM,
Android 10) and one mid-range phone, plus 2--3 printer models that
pilot shops actually use.

  \#   Test                                                   Pass criterion
  ---- ------------------------------------------------------ ---------------------------------
  1    Create an invoice fully offline                        Saved locally with outbox event
  2    Store 10,000 products locally and search them          Search result in under 200 ms on low-end device
  3    Print a receipt on a real Bluetooth thermal printer    58 mm and 80 mm, Gujarati text legible
  4    Scan barcodes with the camera                          EAN-13/Code-128, under 1 s
  5    Sync after network recovery                            Zero duplicate invoices
  6    Force-close the app during save and during sync        No data loss or corruption
  7    Cold start and billing on a low-end Android device     Cold start under 3 s, 60 fps lists
  8    Gujarati/Hindi text input and layouts                  Correct shaping in UI, PDF and print

React Native is the default. Switch to Capacitor only if it passes all
eight tests **and** saves meaningful UI effort.

### 7.0.2 Confirm before development starts

  Item                                       Owner                How
  ------------------------------------------ -------------------- --------------------------------------
  Device split of target customers           Founder              Visit 15--20 Bhavnagar shops; record phone/PC, Android version, RAM
  Printer and scanner models in use          Founder              Same visits; buy 2--3 most common models for the PoC
  Minimum supported Android version          Engineering          Proposed: Android 9 (API 28)+
  Does the web app also need offline billing Founder              Default: yes for desktop counters; back office can be online-first
  iOS needed in pilot?                       Founder              Default: no
  Team skills (React/TS vs Dart)             Founder/Engineering  Confirms React Native over Flutter
  Backend locked to NestJS                   Engineering          Laravel alternative removed to avoid split effort
  GST invoice numbering for offline devices  CA/GST practitioner  Device-prefixed series approval
  Distribution channel                       Founder              Play Store + direct APK for assisted installs

### 7.0.3 Architecture decision log (ADR)

Each decision gets a short ADR in `docs/adr/NNN-title.md` with context,
options, decision and consequences. Initial set:

  ADR   Decision                                                       Status
  ----- -------------------------------------------------------------- -----------
  001   Android-first React Native; web for back office                Accepted, PoC gate
  002   Single TypeScript stack (RN, React, NestJS)                    Accepted
  003   Modular monolith, one PostgreSQL, shared schema + RLS          Accepted
  004   UUIDv7 client IDs + idempotency key per command                Accepted
  005   Outbox push + cursor pull; server is authority for posting     Accepted
  006   Device-prefixed offline invoice series                         Pending CA approval
  007   Append-only stock ledger with lot dimension                    Accepted
  008   Negative stock allowed offline, flagged for review             Accepted
  009   Tally export (XML) instead of full accounting in MVP           Accepted
  010   SQLite library: op-sqlite vs expo-sqlite                       PoC decides

## 7.1A Repository structure

pnpm workspaces + Turborepo monorepo:

``` text
apps/
  mobile/        React Native (Expo dev build) — Android first
  web/           React + Vite — back office + desktop counter
  api/           NestJS modular monolith
packages/
  domain/        Money, tax, rounding, units, invoice rules (pure TS)
  schemas/       Zod schemas + shared types (API + sync payloads)
  api-client/    Generated from OpenAPI
  sync-core/     Outbox, cursor pull, retry, conflict rules;
                 storage adapter interface
  sync-sqlite/   Adapter for mobile (SQLite)
  sync-dexie/    Adapter for web (IndexedDB via Dexie)
  i18n/          en / gu / hi strings and number/date formats
```

## 7.2 Selected stack

  Layer                  MVP choice
  ---------------------- ------------------------------------------------
  Android app            React Native (New Architecture) + Expo dev build, EAS Build
  Mobile local DB        SQLite (op-sqlite or expo-sqlite, picked in PoC), WAL mode
  Mobile hardware        Vision Camera (barcode); ESC/POS Bluetooth via native module
  Mobile background      Android WorkManager via Expo background task; sync on launch/foreground/network change
  Web app                React + Vite + TypeScript, TanStack Query/Router
  UI (web)               Accessible component system + Tailwind
  Web offline            Service Worker (Workbox) + IndexedDB via Dexie
  Shared logic           TypeScript packages (domain, schemas, sync-core)
  Validation             Zod (shared client/server)
  Backend                NestJS / Node.js LTS
  API                    REST + OpenAPI
  Database               PostgreSQL
  Jobs/cache             Redis + BullMQ
  File storage           S3-compatible object storage
  Testing                Vitest/Jest, API integration, Playwright (web), Maestro (Android)
  Monitoring             Sentry (web, mobile, API) + metrics/logging stack
  Deployment             Docker + CI/CD; EAS for mobile builds and OTA updates

Backend is fixed to NestJS so the whole team works in one language
(TypeScript).

## 7.3 Core domain posting transaction

A posted sales invoice must atomically: 1. Validate organisation and
branch. 2. Validate user permissions. 3. Validate customer and products.
4. Recalculate all monetary values server-side when online. 5. Apply tax
rule version and persist calculation snapshot. 6. Allocate invoice
number according to approved policy. 7. Create invoice and invoice
lines. 8. Create stock movements. 9. Create receivable/accounting
entries if included in MVP. 10. Write audit event. 11. Commit all
changes together.

If any required step fails, the transaction must roll back.

For offline transactions, the device creates a locally valid pending
event. Server posting occurs after validation and may be rejected or
require reconciliation. The UI must not misrepresent a locally accepted
draft as a cloud-posted final transaction.

## 7.4 Invoice numbering decision --- release blocker

Offline invoice numbering is a legal/accounting design issue. Before
production: - Obtain advice from a qualified Indian GST practitioner. -
Decide whether devices reserve number ranges, use branch/device series,
or issue provisional local references before server finalisation. -
Ensure printed invoice numbers cannot collide. - Define what happens
when an offline invoice is rejected on sync. - Do not implement a naive
local counter shared across devices.

------------------------------------------------------------------------

# 8. API Surface --- Initial Draft

Use `/api/v1` and publish an OpenAPI specification.

Example endpoint groups:

``` text
POST   /api/v1/auth/login
POST   /api/v1/auth/refresh
POST   /api/v1/organisations
GET    /api/v1/organisations/current
GET    /api/v1/users
POST   /api/v1/users/invitations

GET    /api/v1/customers
POST   /api/v1/customers
GET    /api/v1/customers/{id}
PATCH  /api/v1/customers/{id}

GET    /api/v1/suppliers
POST   /api/v1/suppliers

GET    /api/v1/products
POST   /api/v1/products
PATCH  /api/v1/products/{id}

POST   /api/v1/sales/invoices
GET    /api/v1/sales/invoices
GET    /api/v1/sales/invoices/{id}
POST   /api/v1/sales/invoices/{id}/cancel

POST   /api/v1/purchases
GET    /api/v1/purchases

GET    /api/v1/inventory/balances
GET    /api/v1/inventory/movements
POST   /api/v1/inventory/adjustments

POST   /api/v1/payments/receipts
POST   /api/v1/payments/supplier-payments

GET    /api/v1/reports/dashboard
GET    /api/v1/reports/sales-register
GET    /api/v1/reports/stock

POST   /api/v1/sync/push
GET    /api/v1/sync/pull?cursor={cursor}
GET    /api/v1/sync/status

GET    /api/v1/audit-logs
POST   /api/v1/exports
GET    /api/v1/exports/{id}
```

API requirements: - Tenant scope derived from authenticated membership,
not trusted from arbitrary client input. - Idempotency key for mutation
endpoints that can be retried. - Request validation and explicit
response schemas. - Correlation IDs. - Consistent error codes. -
Pagination and filtering. - Rate limits. - Audit events for sensitive
actions.

------------------------------------------------------------------------

# 9. UX Screen Inventory

## 9.1 Onboarding

-   Welcome / language selection.
-   Create business.
-   Business type selection.
-   GST registration details.
-   Financial year and invoice settings.
-   Add first product.
-   Add first customer.
-   Guided demo invoice.

## 9.2 Main application

-   Dashboard.
-   New invoice.
-   Invoice list/detail.
-   Customer list/detail.
-   Supplier list/detail.
-   Product list/detail.
-   Purchase entry.
-   Stock overview.
-   Stock movement history.
-   Payment receipt.
-   Outstanding list.
-   Reports.
-   User and role settings.
-   Business settings.
-   Sync centre.
-   Help/tutorial centre.

## 9.3 Global UI requirements

-   Persistent sync status.
-   Clear online/offline indicator.
-   Pending transaction count.
-   Search accessible from main navigation.
-   Voice input entry point when supported.
-   Consistent save/cancel behaviour.
-   Confirmation for destructive or financial actions.
-   No critical action indicated by colour alone.

------------------------------------------------------------------------

# 10. QA and Release Strategy

## 10.1 Test layers

1.  Unit tests for tax, totals, discounts, units and accounting rules.
2.  Domain tests for invoice posting and stock ledger.
3.  API integration tests.
4.  Tenant-isolation and authorisation tests.
5.  Offline tests: Android (SQLite, force-close, low-end device) and
    web (IndexedDB eviction, service worker).
6.  Sync retry/idempotency tests.
7.  Browser/device compatibility tests.
8.  PDF and Bluetooth thermal print tests on the supported printer
    list (58/80 mm, Gujarati/Hindi).
9.  Load and performance tests.
10. Security scanning and penetration testing.
11. User acceptance tests with real shop staff.
12. Backup restoration and disaster recovery drills.

## 10.2 Critical test scenarios

-   Same invoice request submitted twice.
-   Network lost after server commit but before acknowledgement.
-   App closes after local commit.
-   Device storage is full.
-   Two devices sell same last stock offline.
-   Product is archived while another device is offline.
-   User role is revoked while device is offline.
-   Tax rate changes between draft and posting.
-   Invoice is returned/cancelled.
-   Customer has advance payment.
-   Decimal quantities and unit conversions.
-   Invoice number collision attempt.
-   Cross-tenant ID guessing.
-   Malicious file upload.
-   Export URL accessed by another tenant.

## 10.3 Release gates

Do not launch publicly until: - No known critical/high severity security
defect. - Tenant-isolation tests pass. - Core financial calculations are
independently reviewed. - Offline transaction persistence and retry
tests pass. - Invoice numbering is approved. - Backup restore is
demonstrated **and the last restore-test date shows in Settings
(UOS-133)**. - Customer export works **on every plan and for a
cancelled tenant (UOS-131)**. - **Tally XML import test suite passes
with zero manual fixes (UOS-134).** - Support and incident escalation
are operational. - Pilot users can complete core tasks without developer
intervention.

------------------------------------------------------------------------

# 11. Development Backlog and Tickets

The backlog is structured as epics and implementable tickets. Estimates
are relative story points, not calendar commitments. A team should
re-estimate after technical spikes.

Priority: - P0 = MVP blocker. - P1 = pilot hardening / near-term. - P2 =
later release.

## Epic E0 --- Discovery, Product and Domain Validation

### UOS-001 --- Conduct shop-owner discovery interviews

**Priority:** P0 \| **Estimate:** 5 points\
**Description:** Interview at least 20 retail/wholesale businesses in
the first research sprint and document workflows, current tools, costs
and switching barriers.\
**Acceptance criteria:** - Interview notes anonymised and stored. -
Current billing and stock workflow mapped. - At least five recurring
pain points supported by observed examples. - Willingness-to-pay
evidence recorded separately from compliments.

### UOS-002 --- Conduct accountant and GST practitioner review

**Priority:** P0 \| **Estimate:** 3 points\
**Acceptance criteria:** - Tax invoice fields reviewed. - Tax rounding
and invoice numbering questions documented. - Compliance assumptions and
open decisions recorded. - Named reviewer and review date captured.

### UOS-003 --- Define MVP workflow and prototype test

**Priority:** P0 \| **Estimate:** 5 points\
**Acceptance criteria:** - Clickable onboarding and billing prototype. -
At least five target users test it. - Usability issues prioritised. -
MVP scope approved.

### UOS-004 --- Offline sync technical spike

**Priority:** P0 \| **Estimate:** 8 points\
**Acceptance criteria:** - Local write survives app restart. - Outbox
retry is idempotent. - Duplicate request does not duplicate server
record. - Network interruption test documented. - Conflict limitations
documented.

## Epic E1 --- Engineering Foundation and CI/CD

### UOS-010 --- Create repository and project structure

**Priority:** P0 \| **Estimate:** 2 points\
**Acceptance criteria:** - Frontend and backend structure established. -
Linting, formatting and type checking run in CI. - Environment variables
documented. - No secrets committed.

### UOS-011 --- Configure CI pipeline

**Priority:** P0 \| **Estimate:** 3 points\
**Acceptance criteria:** - Pull request runs lint, typecheck and unit
tests. - Build artifacts generated. - Failed checks block merge. -
Dependency scanning enabled.

### UOS-012 --- Establish development/staging environments

**Priority:** P0 \| **Estimate:** 3 points\
**Acceptance criteria:** - Separate dev and staging configuration. -
Database migrations run automatically in controlled deployment. -
Secrets stored outside source control. - Health endpoint and basic
monitoring enabled.

### UOS-013 --- Add structured logging and correlation IDs

**Priority:** P0 \| **Estimate:** 3 points\
**Acceptance criteria:** - Every API request has correlation ID. - Logs
include tenant/user references where safe. - Passwords, tokens and
sensitive invoice payloads are not logged. - Errors can be traced across
request and background job.

## Epic E2 --- Identity, Tenancy and Permissions

### UOS-020 --- Implement user authentication

**Priority:** P0 \| **Estimate:** 5 points\
**Acceptance criteria:** - Secure login/logout. - Password hashing. -
Rate limiting. - Session expiry. - Password reset flow. - Authentication
tests.

### UOS-021 --- Implement organisation tenancy

**Priority:** P0 \| **Estimate:** 8 points\
**Acceptance criteria:** - Organisation membership model. - Every
tenant-owned query is scoped. - Cross-tenant access tests pass. - Tenant
context is derived from authenticated membership.

### UOS-022 --- Implement roles and permissions

**Priority:** P0 \| **Estimate:** 8 points\
**Acceptance criteria:** - Owner, Admin, Manager, Cashier and Accountant
roles. - Permission checks in backend. - Denied actions are tested. - UI
reflects permissions without being the security boundary.

### UOS-023 --- Invite and deactivate users

**Priority:** P1 \| **Estimate:** 5 points\
**Acceptance criteria:** - Invitation expires. - Role assigned at
invitation. - Admin can deactivate membership. - Deactivated user cannot
sync new transactions after server receives revocation.

## Epic E3 --- Organisation and Setup

### UOS-030 --- Create organisation profile

**Priority:** P0 \| **Estimate:** 5 points\
**Acceptance criteria:** - Business name, address, contact and business
type. - Country, currency and language. - Creator becomes owner. -
Tenant isolation verified.

### UOS-031 --- Configure GST profile and financial year

**Priority:** P0 \| **Estimate:** 5 points\
**Acceptance criteria:** - GST registration status captured. - GSTIN
format validation. - Financial year setting. - Tax profile change
audited. - No claim of external GSTIN verification unless integration
exists.

### UOS-032 --- Guided first-time setup

**Priority:** P1 \| **Estimate:** 5 points\
**Acceptance criteria:** - Language choice. - Add first
product/customer. - Guided demo invoice. - User can skip and resume
setup. - Help text uses simple language.

## Epic E4 --- Customers and Suppliers

### UOS-040 --- Customer CRUD and search

**Priority:** P0 \| **Estimate:** 5 points\
**Acceptance criteria:** - Create/edit/archive/view. - Search name,
phone and GSTIN. - Duplicate warning. - Referenced customer cannot be
hard-deleted. - Offline cache supported.

### UOS-041 --- Supplier CRUD and search

**Priority:** P0 \| **Estimate:** 3 points\
**Acceptance criteria:** - Create/edit/archive/view. - Search and
duplicate warning. - Referenced supplier cannot be hard-deleted.

### UOS-042 --- Customer and supplier opening balances

**Priority:** P1 \| **Estimate:** 5 points\
**Acceptance criteria:** - Controlled migration/setup entry. - Effective
date and source recorded. - Approval permission required. - Audit log
created. - Opening balance is not an arbitrary editable field after
posting.

## Epic E5 --- Product Catalogue and Units

### UOS-050 --- Product CRUD

**Priority:** P0 \| **Estimate:** 5 points\
**Acceptance criteria:** - Name, SKU, barcode, category, unit, tax
reference and price. - Archive rather than delete after use. - Duplicate
SKU handling. - Offline catalogue cache.

### UOS-051 --- Unit and conversion engine

**Priority:** P0 \| **Estimate:** 8 points\
**Acceptance criteria:** - Configurable units. - Base unit defined. -
Explicit conversion rules. - Precision/rounding rules tested. -
Incompatible conversion rejected.

### UOS-052 --- HSN/SAC and tax category reference

**Priority:** P0 \| **Estimate:** 5 points\
**Acceptance criteria:** - Tax category linked to product. -
Effective-dated tax configuration supported. - Domain expert reviews
sample cases. - Product tax data is snapshotted on invoice.

### UOS-053 --- Product variants

**Priority:** P1 \| **Estimate:** 8 points\
**Acceptance criteria:** - Size/colour/design attributes. -
Variant-specific SKU and barcode. - Stock tracked by variant. - Variant
search works on mobile.

### UOS-054 --- Barcode scanner

**Priority:** P1 \| **Estimate:** 5 points\
**Acceptance criteria:** - Supported camera scan. - Manual entry
fallback. - Unknown barcode creates draft flow. - Permission denial
handled.

## Epic E6 --- Sales and Invoice Engine

### UOS-060 --- Invoice calculation domain service

**Priority:** P0 \| **Estimate:** 8 points\
**Acceptance criteria:** - Quantity, price, discount, taxable value, tax
and grand total. - Decimal-safe arithmetic. - Defined rounding rules. -
Unit and tax edge-case tests. - Frontend cannot override server
calculation.

### UOS-061 --- Create and save invoice draft

**Priority:** P0 \| **Estimate:** 5 points\
**Acceptance criteria:** - Customer and line items. - Draft save/edit. -
Validation errors shown. - Draft survives app restart when offline.

### UOS-062 --- Post sales invoice atomically

**Priority:** P0 \| **Estimate:** 13 points\
**Acceptance criteria:** - Permission and tenant checks. - Invoice,
stock movement and financial effects commit atomically. - Idempotency
key. - Posted invoice immutable. - Audit event. - Rollback test for each
failure stage.

### UOS-063 --- Invoice numbering strategy

**Priority:** P0 \| **Estimate:** 8 points\
**Acceptance criteria:** - Approved numbering policy documented. -
Concurrent collision test. - Offline multi-device strategy tested. - GST
practitioner sign-off. - No provisional invoice is misrepresented as
final.

### UOS-064 --- Invoice PDF and print layouts

**Priority:** P0 \| **Estimate:** 5 points\
**Acceptance criteria:** - A4 layout. - Agreed thermal layout support or
documented limitation. - Tax breakup and totals. - Gujarati/Hindi font
rendering test. - PDF matches stored invoice snapshot.

### UOS-065 --- Invoice list, filters and detail view

**Priority:** P0 \| **Estimate:** 5 points\
**Acceptance criteria:** - Search by number/customer/date. -
Draft/pending/synced/posted states. - Detail view and print/share. -
Tenant and permission checks.

### UOS-066 --- Sales return and cancellation

**Priority:** P1 \| **Estimate:** 8 points\
**Acceptance criteria:** - Original invoice reference. -
Reversal/credit-note record. - Stock and ledger effects atomic. - No
hard delete. - GST expert-reviewed workflow.

## Epic E7 --- Purchase

### UOS-070 --- Record purchase draft

**Priority:** P0 \| **Estimate:** 5 points\
**Acceptance criteria:** - Supplier, supplier invoice reference/date and
items. - Quantity, cost and tax. - Duplicate reference warning. -
Offline draft supported.

### UOS-071 --- Post purchase and stock receipt

**Priority:** P0 \| **Estimate:** 8 points\
**Acceptance criteria:** - Purchase posting creates stock movements. -
Supplier balance updated. - Idempotency supported. - Atomic posting and
audit.

### UOS-072 --- Purchase return

**Priority:** P1 \| **Estimate:** 8 points\
**Acceptance criteria:** - Original purchase reference. - Stock and
supplier ledger reversal. - Reason and audit trail. - Tax treatment
reviewed.

## Epic E8 --- Inventory Ledger

### UOS-080 --- Implement stock movement ledger

**Priority:** P0 \| **Estimate:** 13 points\
**Acceptance criteria:** - Opening, purchase, sale and adjustment
movement types. - Source document reference. - Location and unit. -
Append-only correction approach. - Ledger balance tests.

### UOS-081 --- Stock balance projection

**Priority:** P0 \| **Estimate:** 8 points\
**Acceptance criteria:** - Balance derives from ledger. -
Rebuild/reconciliation job available. - Projection mismatch alert. - No
balance-only mutation endpoint.

### UOS-082 --- Stock list and movement history

**Priority:** P0 \| **Estimate:** 5 points\
**Acceptance criteria:** - Search and filter. - On-hand quantity. - Last
sync and pending local movement shown. - Drill-down to source
transactions.

### UOS-083 --- Stock adjustment

**Priority:** P1 \| **Estimate:** 5 points\
**Acceptance criteria:** - Reason mandatory. - Permission required. -
Audit event. - Movement posted atomically.

## Epic E9 --- Payments and Outstanding

### UOS-090 --- Record customer receipt

**Priority:** P0 \| **Estimate:** 8 points\
**Acceptance criteria:** - Payment method and amount. - Allocate to
invoice(s) or advance. - Receipt voucher. - Idempotent posting. -
Outstanding derived from allocations.

### UOS-091 --- Record supplier payment

**Priority:** P0 \| **Estimate:** 5 points\
**Acceptance criteria:** - Supplier and payment details. - Invoice
allocation. - Supplier balance updates. - Audit event.

### UOS-092 --- Outstanding list and ageing

**Priority:** P1 \| **Estimate:** 5 points\
**Acceptance criteria:** - Due amount by customer/supplier. - Ageing
buckets configurable. - Drill-down to source documents. - Date basis
documented.

## Epic E10 --- Offline Storage and Sync

### UOS-100 --- Implement local database abstraction

**Priority:** P0 \| **Estimate:** 8 points\
**Acceptance criteria:** - IndexedDB schema/versioning. - Migration
tests. - Local transaction API. - Storage error handling. - No direct ad
hoc storage access throughout UI.

### UOS-101 --- Transactional local outbox

**Priority:** P0 \| **Estimate:** 8 points\
**Acceptance criteria:** - Document and outbox event saved atomically. -
Unique event ID. - App restart preserves pending events. - Pending count
shown.

### UOS-102 --- Sync push endpoint

**Priority:** P0 \| **Estimate:** 8 points\
**Acceptance criteria:** - Authenticated push. - Idempotency. - Payload
validation. - Per-event acknowledgement/rejection. - Correlation IDs.

### UOS-103 --- Sync pull endpoint and cursor

**Priority:** P0 \| **Estimate:** 8 points\
**Acceptance criteria:** - Pull changes since cursor. - Cursor advances
after local commit. - Repeated pulls safe. - Tenant/branch filters
enforced.

### UOS-104 --- Retry and backoff engine

**Priority:** P0 \| **Estimate:** 5 points\
**Acceptance criteria:** - Retry transient failures. - Exponential
backoff with jitter. - Permanent failures surfaced. - No unbounded retry
storm.

### UOS-105 --- Conflict resolution framework

**Priority:** P0 \| **Estimate:** 13 points\
**Acceptance criteria:** - Entity-specific policies documented. - Ledger
events append-only. - Duplicate event is idempotent. - Master-data
conflicts surfaced. - Stock conflict is not silently overwritten.

### UOS-106 --- Sync centre UI

**Priority:** P0 \| **Estimate:** 5 points\
**Acceptance criteria:** - Online/offline state. - Pending count. - Last
successful sync. - Failed item and safe retry action. - Clear
distinction between local save and cloud acknowledgement.

### UOS-107 --- Device registration and revocation

**Priority:** P1 \| **Estimate:** 5 points\
**Acceptance criteria:** - Device list. - Last seen. - Revoke device. -
Revoked device cannot perform new server sync. - Offline revocation
limitation explained.

## Epic E11 --- Dashboard and Reports

### UOS-110 --- Daily dashboard

**Priority:** P0 \| **Estimate:** 5 points\
**Acceptance criteria:** - Sales, collections, outstanding, low stock. -
Pending sync count. - Metric definitions accessible. - Cloud-confirmed
vs local pending data distinguished.

### UOS-111 --- Sales and purchase registers

**Priority:** P0 \| **Estimate:** 5 points\
**Acceptance criteria:** - Date filters. - Customer/supplier filters. -
Export. - Totals reconcile to source documents.

### UOS-112 --- Stock report

**Priority:** P0 \| **Estimate:** 5 points\
**Acceptance criteria:** - Product and location quantities. - Movement
drill-down. - Valuation only when method is implemented and reviewed.

### UOS-113 --- Profit report

**Priority:** P2 \| **Estimate:** 8 points\
**Acceptance criteria:** - Accounting basis defined. - COGS and expense
rules reviewed. - Reconciliation tests. - Labelled gross/net figures
accurately.

## Epic E12 --- Language, Accessibility and Onboarding

### UOS-120 --- Translation framework

**Priority:** P0 \| **Estimate:** 5 points\
**Acceptance criteria:** - UI strings externalised. - English
baseline. - Gujarati and Hindi translation files. - Missing translation
fallback. - Locale-aware date/number/currency formatting.

### UOS-121 --- Simplified dashboard and billing UX

**Priority:** P0 \| **Estimate:** 8 points\
**Acceptance criteria:** - Large touch targets. - Clear labels and
icons. - Core tasks reachable in minimal steps. - Tested with users
unfamiliar with accounting software.

### UOS-122 --- Gujarati and Hindi UX review

**Priority:** P1 \| **Estimate:** 5 points\
**Acceptance criteria:** - Native-language reviewer validates terms. -
Mixed-language search tested. - Font rendering and PDF output tested. -
User testing includes local speech/terminology where relevant.

### UOS-123 --- Guided demo and help centre

**Priority:** P1 \| **Estimate:** 5 points\
**Acceptance criteria:** - Sample business/demo mode. - Step-by-step
billing tutorial. - No real customer data in demo. - User can restart
tutorial.

## Epic E13 --- Audit, Export and Security

### UOS-130 --- Audit event service

**Priority:** P0 \| **Estimate:** 5 points\
**Acceptance criteria:** - Actor, tenant, branch, device, entity and
timestamp. - Sensitive actions recorded. - Logs protected from ordinary
modification. - No secrets or full sensitive payloads logged.

### UOS-131 --- Customer data export

**Priority:** P0 \| **Estimate:** 5 points\
**Acceptance criteria:** - CSV export for customers, suppliers and
products. - Invoice and stock movement export. - Permission check. -
Export audit and expiry. - **Data-freedom promise (FR-TRUST-001, §0.5A):**
full Excel (all entities) + Tally XML export works on every plan,
including Starter, with no paywall. - After a subscription ends or is
cancelled, the owner keeps read-only login + full export for 12 months.
- The promise is shown on the Subscription screen, in the cancel flow
and in the pricing page copy. - Automated test: a cancelled tenant can
still export everything.

### UOS-132 --- Security baseline and threat model

**Priority:** P0 \| **Estimate:** 8 points\
**Acceptance criteria:** - Threat model reviewed. - OWASP-relevant
controls documented. - Tenant isolation tests. - Dependency scanning. -
Secure file upload plan. - Incident response owner identified.

### UOS-133 --- Backup and restore test

**Priority:** P0 \| **Estimate:** 5 points\
**Acceptance criteria:** - Automated backup configured. - Restore into
isolated environment demonstrated. - RPO/RTO measured. - Runbook
documented. - **Backup status in Settings (FR-TRUST-002, §0.5A):**
owner sees last backup time, storage region "India", retention (8
years) and **date of the last successful restore test**. - Restore test
runs automatically at least monthly; a failed or missing test alerts us
at once and, after 45 days, shows a warning in the owner's Settings.

### UOS-134 --- Tally XML import test suite (release gate)

**Priority:** P0 \| **Estimate:** 8 points\
**Source:** FR-CA-002, §0.5A\
**Acceptance criteria:** - Golden test data: at least one month of
sales, purchases, receipts, payments, credit notes, round-off, CGST/SGST
and IGST bills, B2B and B2C. - Export imports into the current TallyPrime
release with **zero errors and zero manual fixes**. - Ledger totals,
GST totals and party balances in Tally match UdyamOS exactly. - Runs in
CI on every release candidate; **a failure blocks the release** (see
§10.3). - Re-verified monthly and whenever Tally ships a new release. -
Reviewed and signed by at least one CA from the pilot panel before
Release 1.

### UOS-135 --- CA (accountant) login across many businesses

**Priority:** P1 \| **Estimate:** 8 points\
**Source:** FR-CA-001, §0.5A\
**Acceptance criteria:** - One CA identity can be invited by many
organisations; the CA sees a client switcher. - Access is read-only
(no bills, no edits, no approvals), time-boxed or until revoked by
the owner. - Email + TOTP or passkey; never SMS-only. - Each client's
data stays isolated (tenant-isolation tests include the CA role). -
"CA pack" download per client per month: Tally XML, GST summary
(GSTR-1 view), receivables ageing, list of unsynced bills and open
conflicts. - Every CA view and download is audit-logged and visible
to the owner. - Free for the CA; does not use a paid seat.

## Epic E14 --- Pilot, Support and Commercial Operations

### UOS-140 --- Pilot onboarding workflow

**Priority:** P0 \| **Estimate:** 5 points\
**Acceptance criteria:** - Business checklist. - Data import template. -
Staff training checklist. - Support contact. - Baseline metrics
captured.

### UOS-141 --- Support ticket and diagnostics process

**Priority:** P1 \| **Estimate:** 5 points\
**Acceptance criteria:** - Ticket captures app version, device and sync
status. - No passwords/tokens included. - Escalation severity defined. -
Customer can consent to diagnostics upload.

### UOS-142 --- Subscription and plan enforcement

**Priority:** P1 \| **Estimate:** 8 points\
**Acceptance criteria:** - Plan entitlements server-enforced. - Grace
period policy. - Transparent usage limits. - Existing data remains
exportable if subscription lapses.

### UOS-143 --- Partner referral tracking

**Priority:** P2 \| **Estimate:** 5 points\
**Acceptance criteria:** - Partner identity. - Referred account
attribution. - Commission rules configurable. - Fraud and duplicate
referral controls. - Supports the CA partner programme (§0.5A):
15--20% first-year revenue share per referred business.

### UOS-144 --- ROI calculator for sales demos

**Priority:** P1 \| **Estimate:** 3 points\
**Source:** GTM-001, §0.5A\
**Acceptance criteria:** - Inputs: overdue dues by age bucket, interest
rate, monthly stock mismatch estimate, staff count. - Output: estimated
yearly loss vs UdyamOS plan price, in ₹, in Gujarati and English. -
Works on a phone, offline, in under 2 minutes during a demo. - Can be
filled from a pilot's imported data after onboarding (real numbers,
not guesses). - Assumptions shown on screen; no promised returns
(consumer-protection rules, see legal pack §7).

## Epic E16 --- Audit follow-ups (product audit, 20 Nov 2026)

Gaps and recommendations from `audit/UdyamOS_Audit_2026-11-20.md`
§15 and §18. Each has a business reason; none is copied from a
competitor.

### UOS-160 --- Place-of-supply tax rule and test \[P0\]

**Estimate:** 3 points\
**Acceptance criteria:** - Seller state code (GSTIN digits 1--2) equal
to place of supply → CGST + SGST; else IGST. - Place of supply comes
from the buyer GSTIN, or the shipping state for B2C/unregistered;
staff cannot override it without a manager PIN. - Unit tests cover
intra-state, inter-state, B2C, SEZ and unregistered buyers. - Invoice,
receipt, register, GST summary and Tally export all use the same
computed value.

### UOS-161 --- Provisional vs final bill states \[P0\]

**Estimate:** 5 points · **Depends on:** §7.4 numbering decision\
**Acceptance criteria:** - Bills made offline print "Provisional bill
· not a tax invoice" until the server accepts them, unless the GST
practitioner approves device-series numbering. - The final tax invoice
is shared on WhatsApp automatically after sync. - Bill lists show the
state (Provisional / Final / Rejected).

### UOS-162 --- Offline approval caps \[P0\]

**Estimate:** 3 points\
**Acceptance criteria:** - The owner sets the maximum over-limit amount
a manager can approve offline per bill (default ₹25,000) and per day. -
Above the cap, approval needs the owner's own device (online) or a
TOTP code. - The PIN is never shared between people; 5 wrong PINs lock
the user on that phone. - Every approval is in the audit log with
requester, approver and device.

### UOS-163 --- Textile unit rules (than / metre / piece) \[P0\]

**Estimate:** 5 points\
**Acceptance criteria:** - Each roll/than has a recorded length; a sale
reduces it, and the remainder stays as a cut piece on the same lot. -
Rounding rule set per business (e.g. 0.1 m). - Cut pieces below a set
length are flagged as remnants and can be sold at a remnant rate. -
Conversion pcs ↔ metre per item is stored, never guessed. - The stock
ledger balances to 0.01 m in tests.

### UOS-164 --- Minimal job-work challan \[P1\]

**Estimate:** 5 points · **Decision needed:** confirm in pilot
interviews (PRD §0.1 names job-work coordinators)\
**Acceptance criteria:** - Issue a lot to a processor with a challan
(qty, rate, expected return date). - Receive processed goods back
against the challan; losses recorded. - Pending job-work list with
age. - Full job-work costing stays in Release 2.

### UOS-165 --- Unbilled challan alert \[P1\]

**Estimate:** 2 points\
**Acceptance criteria:** - Challans not billed after N days (default 7)
appear on the owner dashboard and the daily digest. - One tap converts
them to an invoice. (Already shown in the design: Challans → "Not
billed > 7 days".)

### UOS-166 --- Certified printer list and test \[P1\]

**Estimate:** 3 points\
**Acceptance criteria:** - At least 3 Bluetooth printers (58 and 80 mm)
tested with Gujarati receipts. The list is shown in the app's printer
screen and on the website. - "Print test receipt" checks paper width,
Gujarati text and the QR code. - Partner dealers sell only certified
models.

### UOS-167 --- Gujarati interface, not only receipts \[P1\]

**Estimate:** 8 points\
**Acceptance criteria:** - All counter screens (home, new bill, party
picker, receipt, sync, PIN) are fully in Gujarati when chosen. -
Layouts are tested with the longest Gujarati strings at 200% font size.
- Amounts are read aloud in Gujarati script, not Latin letters. -
Hindi is offered only once its screens pass the same test. - Minimum
body text 16 px on Android. - Gujarati text is set 2 px larger than English at
the same level (Gujarati glyphs render visibly smaller; measured in the
design proof `MobileHomeGu`, `MobileBillingGu`, 20 Nov 2026).

### UOS-168 --- Daily owner WhatsApp digest \[P1\]

**Estimate:** 5 points · **Depends on:** WhatsApp Business API, TRAI/DLT
rules (legal pack §4)\
**Acceptance criteria:** - Sent at a time the owner chooses: sales,
cash, dues collected, overdue parties, unsynced bills, pending
approvals, unbilled challans. - Gujarati or English. - The owner can
turn it off. - No customer personal data beyond names and amounts.

### UOS-169 --- Automatic dues reminders \[P1\]

**Estimate:** 5 points\
**Acceptance criteria:** - Rules: days overdue, minimum amount,
language, maximum frequency. - Owner approves the template once. -
Reminders include the ledger link and UPI. - Stop automatically when
paid or a promise-to-pay is logged. - The party can opt out.

### UOS-170 --- Switch-from presets for import \[P2\]

**Estimate:** 5 points\
**Acceptance criteria:** - Column mappings for Tally, Vyapar and BUSY
exports (parties, items, opening balances). - Preview with errors
before import. - Tested on real exports from 3 pilots.

### UOS-171 --- Security follow-ups \[P1\]

**Estimate:** 3 points\
**Acceptance criteria:** - Customer ledger links use 128-bit random
tokens, expire (default 30 days), can be revoked, and are
rate-limited. - Owner account recovery notifies every owner and admin
at once and can be cancelled during the 48 hours. - Local data on
Android is encrypted with keys in the Android Keystore.

## Epic E17 --- Platform admin (our team) and role dashboards

Source: product review 20 Nov 2026. Spec: security spec §8A; tables:
DB spec §8A; designs: canvas pages "Platform admin (our team)" and
"Client role dashboards". **Needed before the pilot:** the team must
run 20 pilots, track the §0.6 go/no-go metrics and give support
safely.

### UOS-172 --- Separate platform admin app and login \[P0\]

**Estimate:** 5 points\
**Acceptance criteria:** - Separate domain and deployment from the
customer app. - Login only by company SSO + hardware security key. -
Platform roles: super admin, support, billing, onboarding, analyst
(security spec §8A.1). - Super-admin actions need a second approver.
- Every action written to `platform_audit`. - Pen-test item: a
platform session cannot call customer APIs.

### UOS-173 --- Platform dashboard and pilot metrics \[P0\]

**Estimate:** 5 points\
**Acceptance criteria:** - Businesses count by state; daily active;
bills/shop/day; duplicate bills after sync; first-try sync success;
paid conversion; referrals. These are exactly the §0.6 metrics. -
"Needs attention" list: devices not syncing > 24 h, low use, renewals.
- Built only from `tenant_daily_metric` (aggregated, no customer
data).

### UOS-174 --- Business (tenant) management \[P1\]

**Estimate:** 5 points\
**Acceptance criteria:** - List, search, detail (plan, devices, app
versions, pending sync, last restore test). - Create pilot, change
plan, suspend, cancel. - Suspending never deletes data; cancelled
businesses keep export for 12 months (UOS-131). - Plan and device
limits enforced on the server (UOS-142).

### UOS-175 --- Support console with owner grants \[P0\]

**Estimate:** 8 points\
**Acceptance criteria:** - The owner grants view-only access from
Settings for a chosen time (max 72 h) and can revoke it. - Without an
active grant, support sees no bills, parties, stock or amounts (tested).
- Each screen support opens appears in the customer's audit log. -
Tickets record app version, device and sync state (UOS-141).

### UOS-176 --- Platform billing and partner payouts \[P1\]

**Estimate:** 5 points\
**Acceptance criteria:** - Our GST invoices to customers. - Renewals,
grace period, failed payments. - CA partner commission statement
(UOS-143). - No card data stored by us (payment gateway only).

### UOS-177 --- Role-based home screens \[P1\]

**Estimate:** 8 points\
**Acceptance criteria:** - The server decides the home screen from the
role: owner, manager, cashier, godown, accountant (security spec
§8A.2). - Godown home has no bill creation, prices or profit. -
Manager home shows the remaining offline approval cap (UOS-162). -
Accountant home has the client switcher and CA pack (UOS-135). - A test
per role checks that hidden data is absent from API responses, not
only hidden in the UI.

## Epic E15 --- AI and Industry Packs (Later Releases)

### UOS-150 --- Voice command discovery prototype

**Priority:** P2 \| **Estimate:** 8 points\
**Acceptance criteria:** - Gujarati/Hindi/English sample recordings
tested with consent. - Product names, amounts and units evaluated. -
Confidence threshold and fallback. - No transaction posted directly from
unconfirmed speech.

### UOS-151 --- Voice-to-draft invoice

**Priority:** P2 \| **Estimate:** 13 points\
**Acceptance criteria:** - Speech transcribed. -
Customer/product/quantity entities resolved. - Ambiguity prompts user. -
Draft invoice preview. - User confirms before posting.

### UOS-152 --- Purchase invoice OCR

**Priority:** P2 \| **Estimate:** 13 points\
**Acceptance criteria:** - Upload image/PDF. - Extract supplier, date,
reference, lines, quantities, amounts and tax. - Confidence per field. -
Human review before posting. - Original document retained with access
controls.

### UOS-153 --- Business Q&A assistant

**Priority:** P2 \| **Estimate:** 13 points\
**Acceptance criteria:** - Answers grounded in authorised business
records. - Shows date range and calculation basis. - Refuses unsupported
questions. - No cross-tenant retrieval. - Read-only initially.

### UOS-154 --- Textile industry pack

**Priority:** P2 \| **Estimate:** 13 points\
**Acceptance criteria:** - Variant and unit requirements validated with
textile pilots. - Roll/meter/piece conversion. - Stock by
design/colour/size. - Returns and cut-length edge cases tested.

### UOS-155 --- Manufacturing BOM and production

**Priority:** P2 \| **Estimate:** 21 points\
**Acceptance criteria:** - BOM versioning. - Production order. -
Material issue/consumption. - Finished goods receipt. - Scrap/wastage. -
Costing and traceability.

### UOS-156 --- Metal melting batch management

**Priority:** P2 \| **Estimate:** 21 points\
**Acceptance criteria:** - Input material lots and weights. - Batch and
furnace/shift details. - Output, slag and loss. - Recovery
calculation. - Cost and traceability. - Domain expert validates process
model.

------------------------------------------------------------------------

# 12. Suggested Sprint Plan

Assume a small team of two full-stack engineers, one QA engineer and
fractional design/domain support. Actual velocity must be measured.

## Sprint 0 --- 1 week

-   UOS-001 to UOS-004 discovery and spikes.
-   Repository, CI and environments.
-   Architecture decisions and initial schema.

## Sprint 1 --- 2 weeks

-   Authentication.
-   Organisation and tenancy.
-   Basic roles.
-   UI shell and onboarding.

## Sprint 2 --- 2 weeks

-   Customer/supplier.
-   Product catalogue.
-   Units and tax references.

## Sprint 3 --- 2 weeks

-   Invoice calculation engine.
-   Draft invoice.
-   Invoice preview and PDF.

## Sprint 4 --- 2 weeks

-   Invoice posting.
-   Stock movement ledger.
-   Purchase entry and posting.

## Sprint 5 --- 2 weeks

-   Payments.
-   Outstanding.
-   Dashboard and registers.

## Sprint 6 --- 2 weeks

-   Local database.
-   Outbox.
-   Sync push/pull.
-   Sync centre.

## Sprint 7 --- 2 weeks

-   Conflict tests.
-   Language/accessibility.
-   Security and backup hardening.
-   Pilot acceptance tests.

This is a planning sequence, not a guaranteed delivery schedule. Offline
synchronisation and invoice numbering may require additional spikes and
iterations.

------------------------------------------------------------------------

# 13. Product Decisions and Open Questions

These decisions must be resolved before production release:

  -----------------------------------------------------------------------
  Decision                Owner                   Required by
  ----------------------- ----------------------- -----------------------
  First pilot segment:    Founder/Product         Discovery
  retail or wholesale                             

  Legal invoice numbering GST practitioner + Tech Before invoice
  with offline devices    Lead                    production

  Whether full            Founder + Accountant    Scope lock
  double-entry accounting                         
  is MVP                                          

  Negative stock policy   Product + Pilot         Inventory release
                          customers               

  Unit conversion         Domain expert           Catalogue release
  precision                                       

  Supported printer       Product + QA            Pilot
  models/formats                                  

  Offline device          Security + Product      Sync release
  revocation behaviour                            

  Tax rounding and        GST practitioner        Invoice engine
  inclusive/exclusive                             
  pricing                                         

  Data retention and      Legal/Product           Public launch
  deletion policy                                 

  Hosting region and data Tech Lead               Production
  residency                                       

  GSP/ASP integration     Compliance lead         Compliance release
  route and cost                                  

  Pricing and AI fair-use Founder/Finance         Commercial launch
  limits                                          
  -----------------------------------------------------------------------

------------------------------------------------------------------------

# 14. Definition of Ready and Definition of Done

## Definition of Ready

A ticket is ready when: - User problem is clear. - Scope and non-goals
are written. - Acceptance criteria are testable. - API/data changes are
identified. - Permission and offline implications are considered. -
Dependencies are known. - Design is available where needed.

## Definition of Done

A ticket is done when: - Code is reviewed. - Tests pass. - Authorisation
and tenant scope are tested. - Error states are handled. - Logging
avoids secrets and sensitive data. - Accessibility and localisation are
considered. - Documentation is updated. - Staging acceptance is
completed. - No unresolved critical defect remains.

------------------------------------------------------------------------

# 15. Immediate Next Actions

The first implementation sequence should be:

1.  Confirm the beachhead segment through customer interviews.
2.  Obtain accountant review of invoice fields, tax calculations and
    numbering.
3.  Approve the MVP scope and decide whether accounting is a ledger
    foundation or full double-entry in release 1.
4.  Complete the offline sync technical spike before building all
    screens.
5.  Create the initial domain model and OpenAPI contract.
6.  Build organisation, tenancy and permission foundation.
7.  Build customer/product catalogue.
8.  Build invoice calculation and posting.
9.  Build stock ledger and purchase.
10. Add local persistence and synchronisation.
11. Pilot with real businesses before broad marketing.

**Do not begin with voice AI, advanced analytics or manufacturing.**
First prove that billing, stock and sync are correct under real
operating conditions.

------------------------------------------------------------------------

# 16. Source and Assumption Notes

This PRD converts the founder strategy into a buildable first
specification. It is not a legal opinion, tax opinion, security
certification or final database design.

Before implementation and release: - Verify current GST, E-Invoice and
E-Way Bill rules from official government sources. - Confirm authorised
integration access and commercial terms. - Have invoice numbering and
tax calculations reviewed by a qualified Indian GST practitioner. - Test
competitor capabilities and current prices directly. - Validate
Gujarati/Hindi speech accuracy with representative local users. -
Validate all offline/sync behaviour on target browsers and devices. -
Re-estimate tickets with the actual engineering team.

The backlog is intentionally detailed enough to start refinement, but
tickets should be split further into frontend, backend, QA and migration
subtasks in the project tracker.
