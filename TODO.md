# UdyamOS Production Implementation Backlog (TODO)

This file tracks the live progress of UdyamOS development across monorepo packages and apps. Updated continuously after completing each step.

---

## 🚀 Phase 1: Workspace Setup & Foundational Packages (Component-First)

### 1.1 Monorepo Infrastructure
- [x] Initialize `package.json` with pnpm/npm workspaces (`apps/*`, `packages/*`)
- [x] Configure `turbo.json` build and test pipelines
- [x] Configure `tsconfig.base.json` shared TypeScript settings

### 1.2 `@udyamos/core` — Shared Zero-Divergence Business Logic
- [x] Create `packages/core/package.json` and build scripts
- [x] Implement `packages/core/src/gst/`: CGST/SGST 50-50 intra-state, IGST, Section 170 rupee rounding
- [x] Implement `packages/core/src/i18n/`: Indian Lakhs/Crores currency formatter (`₹ 12,34,567.00`)
- [x] Implement `packages/core/src/i18n/words.ts`: Legal Number-to-Words in English & Gujarati (`રૂપિયા... ફક્ત`)
- [x] Implement `packages/core/src/sync/`: UUIDv7 event envelopes, monotonic device prefixes (`INV-D01-XXXXXX`)
- [x] Implement `packages/core/src/escpos/`: Monospaced 32-col (58mm) and 48-col (80mm) receipt layouts
- [x] Implement `packages/core/src/escpos/upi.ts`: Dynamic UPI QR code byte generator
- [x] Add unit test suite in `packages/core/tests/` verifying GST rounding and sync invariants (12 tests passing)

### 1.3 `@udyamos/ui` — Shared Design System Components
- [x] Create `packages/ui/package.json` with workspace linking
- [x] Extract palette tokens from 194-screen prototype (`#15181C`, `#0F766E`, `#6366F1`, `#F6F7F5`)
- [x] Implement `Button` component (Primary, Platform, Danger, Ghost, Secondary)
- [x] Implement `TabularNum` & `CurrencyCell` with `font-variant-numeric: tabular-nums`
- [x] Implement `ERPTable` component with compact density and sortable columns
- [x] Implement `StatusBadge` tags (Approved, Pending, Overdue, Conflict, Void)
- [x] Implement `KpiCard` dashboard metric cards with trend notes
- [x] Enforce Gujarati typography rules (`line-height: 1.5 - 1.6`)

---

## ☁️ Phase 2: Cloud Database & Sync Gateway (`apps/api`)
- [x] Define MariaDB cloud database schema in `packages/database/schema.sql`
- [x] Define Edge SQLite DDL in `packages/database/sqlite-schema.sql`
- [x] Implement `POST /api/v1/sync/push` with idempotency deduplication
- [x] Implement `GET /api/v1/sync/pull` delta stream by logical cursor
- [x] Implement multi-tenant isolation & time-boxed support grant RBAC
- [x] Implement device cryptographic pairing and registration handshake
- [x] Add End-to-End API integration test suite (`apps/api/tests/api.test.ts`)

---

## 💻 Phase 3: Web App — Back Office & Platform Admin (`apps/web`)
- [x] Set up React app in `apps/web/` consuming `@udyamos/ui` and `@udyamos/core`
- [x] Implement Store Owner & CA Back Office:
  - [x] Daily sales dashboard with 14-day throughput bar charts (`apps/web/src/client/Dashboard.tsx`)
  - [x] Customer ledger with credit limits and overdue ageing (`apps/web/src/client/Parties.tsx`)
  - [x] Godown lot inventory (Than, metres, pieces, CRDT deficit tracking in `Stock.tsx`)
  - [x] GSTR-1 tax breakout & Section 170 compliance check (`apps/web/src/client/GstSummary.tsx`)
- [x] Implement SaaS Platform Admin:
  - [x] Platform command center (`apps/web/src/platform/PlatformDashboard.tsx`)
  - [x] Live tenant sync telemetry, active support grants, and zero-knowledge privacy enforcement
- [x] Add Web App test suite (`apps/web/tests/web.test.ts`) with 4 passing tests

---

## 📱 Phase 4: Android Counter POS (`apps/mobile`)
- [x] Initialize React Native Expo app in `apps/mobile/` (`app.json`, `package.json`, `tsconfig.json`)
- [x] Set up local SQLite store with cached master data (`apps/mobile/src/db/sqlite-store.ts`)
- [x] Build offline append-only event outbox queue with UUIDv7
- [x] Build high-speed counter billing service with Section 170 GST rounding and credit limit checks (`apps/mobile/src/billing/counter-pos.ts`)
- [x] Implement Bluetooth ESC/POS thermal printer driver (58mm/80mm) with dynamic UPI QR code (`apps/mobile/src/hardware/printer.ts`)
- [x] Implement USB/Bluetooth HID barcode scanner keystroke listener (`apps/mobile/src/hardware/scanner.ts`)
- [x] Add Mobile POS test suite (`apps/mobile/tests/mobile.test.ts`) with 6 passing tests

---

## 🧪 Phase 5: Verification & Hardening
- [x] Run `sync-testing-playbook` multi-node offline simulation harness (`tests/e2e-sync-simulation.test.ts`)
- [x] Test network cut during 50-bill burst (D01 & D02 concurrent offline sales merge with zero collisions)
- [x] Verify physical 58mm/80mm thermal receipt printing, dynamic UPI QR and paper cuts
- [x] Verify `design/verify_pipeline.py` maintains 100% integrity across 194 screens and 18 skills

---

## 📄 Phase 6: A4 PDF Invoicing, WhatsApp Delivery, Payment Allocation & Tally CA Export
- [x] Build A4 GST Tax Invoice HTML/CSS template in `@udyamos/core/invoice` (`packages/core/src/invoice/a4-invoice.ts`)
- [x] Build WhatsApp Direct Share link & message generator (`wa.me`) in Gujarati & English (`packages/core/src/whatsapp/share.ts`)
- [x] Implement FIFO Payment Allocation & Ageing Buckets engine (0-30, 31-60, 61-90, 90+ days) in `@udyamos/core/payments` (`packages/core/src/payments/allocation.ts`)
- [x] Implement Tally Prime XML Sales Voucher export in `@udyamos/core/tally` (`packages/core/src/tally/export.ts`)
- [x] Add comprehensive test suite in `packages/core/tests/phase6.test.ts` (7 passing tests)
- [x] Verify monorepo test suite and pipeline integrity

---

## 📦 Phase 7: Delivery Challans, Purchase Inwards & Stock Movement Ledger
- [x] Build Delivery Challan creation & Challan-to-Invoice conversion in `@udyamos/core/challan` (`packages/core/src/challan/index.ts`)
- [x] Implement Challan Ageing Audit (flags unbilled challans > 15 days)
- [x] Build Wholesale Purchase Inward & Lot Batch Generator in `@udyamos/core/inventory/purchase.ts`
- [x] Build Append-Only Stock Movement Ledger (`stock_movements`) & projection calculator in `@udyamos/core/inventory/ledger.ts`
- [x] Add comprehensive test suite in `packages/core/tests/phase7.test.ts` (5 passing tests)
- [x] Verify monorepo test suite and pipeline integrity

---

## 💻 Phase 8: Full React 19 & React Native Screen Suite Implementation (25 Screens & Modals)
- [x] Port Sales & Billing Screens (`apps/web/src/client/sales/`):
  - [x] `InvoiceNew.tsx` — Fast POS counter billing with lot barcodes, cut meters, Section 170 GST rounding, Gujarati words, cash change calculator, and dynamic UPI QR.
  - [x] `Invoices.tsx` — Sales invoices register with filters, A4 view, and direct WhatsApp links.
  - [x] `Challans.tsx` — Delivery Challans with unbilled ageing tracker (> 7 days).
  - [x] `ChallanConvert.tsx` — Challan-to-Tax-Invoice conversion with party credit check.
  - [x] `CreditNotes.tsx` — Sales return & credit note register with stock reversals.
  - [x] `Quotations.tsx` — Proforma price estimates with 1-click invoice conversion.
- [x] Port Inventory & Godown Screens (`apps/web/src/client/inventory/`):
  - [x] `Purchases.tsx` — Wholesale purchase inwards from mills and weavers.
  - [x] `PurchaseNew.tsx` — Inward purchase entry form with lot batch provisioning.
  - [x] `LotCutModal.tsx` — Visual fabric roll cut modal with remaining meters progress.
  - [x] `BarcodeLabels.tsx` — Thermal barcode sticker generator (38x25mm & 50x25mm).
  - [x] `StockCount.tsx` — Physical stock audit with discrepancy reconciler.
  - [x] `Transfer.tsx` — Inter-godown lot transfer challan.
- [x] Port Customer Khata & CA Compliance Screens (`apps/web/src/client/`):
  - [x] `CustomerLedger.tsx` — Running khata statement with 4-bucket debt ageing (0–30, 31–60, 61–90, 90+) and direct WhatsApp payment reminder links.
  - [x] `PaymentReceipt.tsx` — Payment collection with automated FIFO allocation against oldest bills.
  - [x] `Brokers.tsx` — Commission broker ledger (Dalali).
  - [x] `Gstr1Portal.tsx` — GSTR-1 government portal tables: Table 4 (B2B), Table 8 (B2C), Table 12 (HSN).
  - [x] `EInvoicePortal.tsx` — NIC e-Invoice IRN 64-char hash generator & signed QR.
  - [x] `CaPortal.tsx` — CA portal with Trial Balance & 1-Click Tally Prime XML export.
  - [x] `AuditLogViewer.tsx` — Section 36 CGST Act 72-month immutable audit log trail with SHA-256 signatures.
- [x] Port Hardware & Settings Screens (`apps/web/src/client/settings/`):
  - [x] `Devices.tsx` — Counter device manager with unique device prefixes (`INV-D01`).
  - [x] `ThermalPrinterSetup.tsx` — ESC/POS 58mm/80mm thermal printer setup & test print.
  - [x] `UpiQrSetup.tsx` — Store UPI VPA configuration for dynamic QR billing.
  - [x] `Users.tsx` — Staff RBAC roles & 4-digit POS PIN management.
- [x] Port SaaS Platform Operations Screens (`apps/web/src/platform/`):
  - [x] `PlatformTenants.tsx` — Tenant management, 30-day pilot validation tracker, MRR telemetry.
  - [x] `PlatformGrants.tsx` — Zero-Knowledge Support Grants: Time-boxed access with store owner SMS/OTP authorization.
  - [x] `PlatformIncidents.tsx` — Service health war room & multi-tenant sync latency.
  - [x] `PlatformPayouts.tsx` — CA Partner referral commissions and monthly bank NEFT batch.
  - [x] `PlatformFlags.tsx` — Dynamic feature flag controls.
- [x] Build React Native Mobile POS Screens (`apps/mobile/src/screens/`):
  - [x] `MobileHome.tsx` — Touch counter dashboard with offline sync status pill.
  - [x] `MobileBilling.tsx` — Fast counter touch bill screen with quantity stepper & cash change calculator.
  - [x] `MobileBillingGu.tsx` — Authentic Gujarati localized touch billing interface.
  - [x] `MobileKhata.tsx` — Customer payment collection & debt lookup on mobile.
  - [x] `MobileCloseDay.tsx` — End-of-day register closure (Cash in drawer vs POS expected cash).
- [x] Wire all screens into master navigation router in `apps/web/src/App.tsx`
- [x] Add comprehensive screen verification test suite (`apps/web/tests/screens.test.ts`)
- [x] Create Apache root entry point (`index.html`) pointing directly to React 19 app
- [x] Safely removed prototype files and legacy archive; monorepo is fully standalone on pure React 19 + Vite & Node SQLite backend


---

## 📄 Phase 6: A4 PDF Invoicing, WhatsApp Delivery, Payment Allocation & Tally CA Export
- [x] Build A4 GST Tax Invoice HTML/CSS template in `@udyamos/core/invoice` (`packages/core/src/invoice/a4-invoice.ts`)
- [x] Build WhatsApp Direct Share link & message generator (`wa.me`) in Gujarati & English (`packages/core/src/whatsapp/share.ts`)
- [x] Implement FIFO Payment Allocation & Ageing Buckets engine (0-30, 31-60, 61-90, 90+ days) in `@udyamos/core/payments` (`packages/core/src/payments/allocation.ts`)
- [x] Implement Tally Prime XML Sales Voucher export in `@udyamos/core/tally` (`packages/core/src/tally/export.ts`)
- [x] Add comprehensive test suite in `packages/core/tests/phase6.test.ts` (7 passing tests)
- [x] Verify monorepo test suite and pipeline integrity

---

## 📦 Phase 7: Delivery Challans, Purchase Inwards & Stock Movement Ledger
- [x] Build Delivery Challan creation & Challan-to-Invoice conversion in `@udyamos/core/challan` (`packages/core/src/challan/index.ts`)
- [x] Implement Challan Ageing Audit (flags unbilled challans > 15 days)
- [x] Build Wholesale Purchase Inward & Lot Batch Generator in `@udyamos/core/inventory/purchase.ts`
- [x] Build Append-Only Stock Movement Ledger (`stock_movements`) & projection calculator in `@udyamos/core/inventory/ledger.ts`
- [x] Add comprehensive test suite in `packages/core/tests/phase7.test.ts` (5 passing tests)
- [x] Verify monorepo test suite and pipeline integrity

---

## 💻 Phase 8: Full React 19 & React Native Screen Suite Implementation (25 Screens & Modals)
- [x] Port Sales & Billing Screens (`apps/web/src/client/sales/`):
  - [x] `InvoiceNew.tsx` — Fast POS counter billing with lot barcodes, cut meters, Section 170 GST rounding, Gujarati words, cash change calculator, and dynamic UPI QR.
  - [x] `Invoices.tsx` — Sales invoices register with filters, A4 view, and direct WhatsApp links.
  - [x] `Challans.tsx` — Delivery Challans with unbilled ageing tracker (> 7 days).
  - [x] `ChallanConvert.tsx` — Challan-to-Tax-Invoice conversion with party credit check.
  - [x] `CreditNotes.tsx` — Sales return & credit note register with stock reversals.
  - [x] `Quotations.tsx` — Proforma price estimates with 1-click invoice conversion.
- [x] Port Inventory & Godown Screens (`apps/web/src/client/inventory/`):
  - [x] `Purchases.tsx` — Wholesale purchase inwards from mills and weavers.
  - [x] `PurchaseNew.tsx` — Inward purchase entry form with lot batch provisioning.
  - [x] `LotCutModal.tsx` — Visual fabric roll cut modal with remaining meters progress.
  - [x] `BarcodeLabels.tsx` — Thermal barcode sticker generator (38x25mm & 50x25mm).
  - [x] `StockCount.tsx` — Physical stock audit with discrepancy reconciler.
  - [x] `Transfer.tsx` — Inter-godown lot transfer challan.
- [x] Port Customer Khata & CA Compliance Screens (`apps/web/src/client/`):
  - [x] `CustomerLedger.tsx` — Running khata statement with 4-bucket debt ageing (0–30, 31–60, 61–90, 90+) and direct WhatsApp payment reminder links.
  - [x] `PaymentReceipt.tsx` — Payment collection with automated FIFO allocation against oldest bills.
  - [x] `Brokers.tsx` — Commission broker ledger (Dalali).
  - [x] `Gstr1Portal.tsx` — GSTR-1 government portal tables: Table 4 (B2B), Table 8 (B2C), Table 12 (HSN).
  - [x] `EInvoicePortal.tsx` — NIC e-Invoice IRN 64-char hash generator & signed QR.
  - [x] `CaPortal.tsx` — CA portal with Trial Balance & 1-Click Tally Prime XML export.
  - [x] `AuditLogViewer.tsx` — Section 36 CGST Act 72-month immutable audit log trail with SHA-256 signatures.
- [x] Port Hardware & Settings Screens (`apps/web/src/client/settings/`):
  - [x] `Devices.tsx` — Counter device manager with unique device prefixes (`INV-D01`).
  - [x] `ThermalPrinterSetup.tsx` — ESC/POS 58mm/80mm thermal printer setup & test print.
  - [x] `UpiQrSetup.tsx` — Store UPI VPA configuration for dynamic QR billing.
  - [x] `Users.tsx` — Staff RBAC roles & 4-digit POS PIN management.
- [x] Port SaaS Platform Operations Screens (`apps/web/src/platform/`):
  - [x] `PlatformTenants.tsx` — Tenant management, 30-day pilot validation tracker, MRR telemetry.
  - [x] `PlatformGrants.tsx` — Zero-Knowledge Support Grants: Time-boxed access with store owner SMS/OTP authorization.
  - [x] `PlatformIncidents.tsx` — Service health war room & multi-tenant sync latency.
  - [x] `PlatformPayouts.tsx` — CA Partner referral commissions and monthly bank NEFT batch.
  - [x] `PlatformFlags.tsx` — Dynamic feature flag controls.
- [x] Build React Native Mobile POS Screens (`apps/mobile/src/screens/`):
  - [x] `MobileHome.tsx` — Touch counter dashboard with offline sync status pill.
  - [x] `MobileBilling.tsx` — Fast counter touch bill screen with quantity stepper & cash change calculator.
  - [x] `MobileBillingGu.tsx` — Authentic Gujarati localized touch billing interface.
  - [x] `MobileKhata.tsx` — Customer payment collection & debt lookup on mobile.
  - [x] `MobileCloseDay.tsx` — End-of-day register closure (Cash in drawer vs POS expected cash).
- [x] Wire all screens into master navigation router in `apps/web/src/App.tsx`
- [x] Add comprehensive screen verification test suite (`apps/web/tests/screens.test.ts`)
- [x] Create Apache root entry point (`index.html`) pointing directly to React 19 app
- [x] Safely removed prototype files and legacy archive; monorepo is fully standalone on pure React 19 + Vite & Node SQLite backend


