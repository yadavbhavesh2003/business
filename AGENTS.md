# UdyamOS — Workspace Rules & AI Agent Guidelines

Welcome to **UdyamOS** (BusinessMitra). This workspace contains the complete specifications, database architecture, legal compliance frameworks, audit reports, and the 194-screen design prototype for an offline-first multi-tenant ERP & POS built for retail and wholesale MSMEs in Bharat (specifically Gujarat textile and garment merchants).

All AI agents operating in this workspace must adhere strictly to the rules, invariants, and procedures outlined below.

---

## 1. Core Architecture Invariants

### A. Dual-App Partitioning (Client vs. Platform)
- **Client App** (`Main.dc.html`, `Sidebar.dc.html`, counters, cashiers, godown workers, and CAs):
  - Focuses on fast daily counter billing, barcode scanning, lots/challans, stock counts, customer ledger links, and GST summaries.
  - Theme: Light canvas (`#F6F7F5`), dark sidebar (`#15181C`), emerald/teal primary accents (`#0F766E`).
- **Platform Admin** (`PlatformHome.dc.html`, `PlatformSidebar.dc.html`, and 30 platform modules):
  - Used exclusively by UdyamOS SaaS staff (Bhavesh, Nirav, Hetal, Prachi) to run the business.
  - Theme: Midnight slate navigation (`#0F172A`), indigo accents (`#6366F1`), high-density operational telemetry.
- **Strict Boundary**: Platform screens **never** display customer invoices, customer names, ledger entries, or stock quantities unless an explicit, time-boxed support grant has been approved by the store owner.

### B. Offline-First Sovereignty
- Counter devices (Android phones, tablets, desktop Chrome) are the authoritative source of truth for their local sales.
- Invoices are prefixed with device ID and sequential counter (e.g. `INV-D01-001880`). Overlapping bill numbers are prohibited.
- Posted bills are immutable. Corrections must be handled via credit notes or sales returns.
- Network disconnection must never prevent bill printing, barcode scanning, or cash register closing.

### C. Zero-Knowledge Privacy & RBAC
- No platform staff member can access tenant transaction data without an owner-approved grant (1 to 72 hours max).
- Every support view or query during an active grant is immutably logged and visible to the store owner.
- SaaS admin accounts require SSO and FIDO2/WebAuthn hardware security keys.

### D. Indian GST & Legal Compliance
- Intra-state sales (Gujarat `24`): Split equally into CGST + SGST.
- Inter-state sales: Billed as IGST.
- Invoice totals must be rounded off to the nearest rupee per Section 170 of the CGST Act.
- Books of accounts and audit logs must be retained for at least 72 months (CGST Act Sec 36 / MCA).
- Cancelled accounts retain 12 months of read-only export access (PRD ticket UOS-131).

---

## 2. Engineering & Code Standards

### A. Minimalist Engineering (Ponytail)
- Write only the minimum necessary code to solve today's concrete problem.
- No speculative abstractions, premature generalizations, or unused helper wrappers.
- Do not add third-party dependencies when standard library or existing project utilities suffice.

### B. Reason-Execute-Audit (REA)
- **Reason**: Read source files before editing. Identify constraints and acceptance criteria upfront.
- **Execute**: Make surgical, batched edits. Avoid collateral changes or cosmetic diff churn.
- **Audit**: Immediately run verification commands (`verify_pipeline.py`). Verify diffs before finishing.

### C. Language & Bilingual Integrity
- Gujarati strings must remain genuine Unicode (e.g. `ગુજરાતી`, `રૂ`, `ખાતાવહી`, `થાણ`). Never replace Gujarati text with transliterated roman script or placeholders.
- Maintain adequate line height (`1.5`–`1.6`) in UI layouts to prevent Gujarati vowel marks (*matras*) from clipping.

---

## 3. UI Design Standards (Hallmark + Impeccable + Taste)

### A. The Anti-AI-Slop Gate
- Banish generic AI tropes: no unprompted neon glows, no rainbow borders, no washed-out grey body text.
- Maintain WCAG AA contrast (minimum 4.5:1 for body copy).
- Back-office ERP tables must be compact, dense, and left-aligned, not centered landing page cards.

### B. Typographic & Table Precision
- Text columns (Party, Item, City): Left-aligned.
- Numbers & Amounts (Metres, Rate, Tax, Total, Dues): Right-aligned with `font-variant-numeric: tabular-nums`.
- Use standard spacing steps (`4px`, `8px`, `12px`, `16px`, `20px`, `24px`, `32px`).
- Mobile touch targets must measure at least `44px` in height.

---

## 4. Design Prototype Build & Export Protocol

When modifying or adding screens in `design/`:

1. **Screen Definitions**:
   - Standard templated screens reside in `design/pages_*.py`.
   - Custom, hand-crafted screens reside in `design/bespoke/`.
   - Navigation links reside in `design/links.py`.
   - Canvas layout positions reside in `design/layout.py`.

2. **Rebuild Command**:
   ```bash
   cd /opt/lampp/htdocs/businessMitra/design
   python3 gen.py out/project && cp bespoke/*.dc.html out/project/ && python3 layout.py out/project && python3 export.py
   ```

3. **Acceptance Gate**:
   - The build output must confirm: `194 boards; files missing locally (already on server): []`.
   - Zero broken links (`_missing`) permitted.

---

## 5. Workspace Skills Directory (`.agents/skills/`)

| Skill | Purpose |
|---|---|
| `ponytail` | Minimalist code discipline; prevents over-engineering and dependency bloat. |
| `hallmark` | Anti-AI-slop design system gate; enforces clean palette and strong contrast. |
| `last30days` | Real-time research restricted to the past 30 days for fresh regulatory/market data. |
| `humanizer` | Copy cleanup; removes robotic AI cadence and corporate fluff. |
| `impeccable` | Frontend craft, spacing rhythm, tabular alignment, and state styling. |
| `rea` | Reason-Execute-Audit engineering methodology. |
| `graphify` | Codebase relationship and screen navigation graph mapping. |
| `taste` | Authentic MSME art direction and visual restraint. |
| `scrapling` | Resilient web scraping and DOM parsing with auto-healing selectors. |
| `diagram-design` | Clean Mermaid architecture, sequence, and flowchart visuals. |
| `design-pipeline` | Step-by-step runbook for rebuilding and exporting the 194-screen canvas. |
| `offline-sync-engine` | SQLite schemas, event logs, CRDT rules, and conflict resolution. |
| `gst-compliance` | Indian GST calculations, tax splits, HSN codes, and Section 170 rounding. |
| `security-zero-knowledge` | Support access grants, tenant isolation, and FIDO2 authentication. |
| `platform-saas-ops` | Multi-tenant SaaS lifecycle, 30-day pilots, and CA partner payouts. |
| `thermal-printing-escpos` | ESC/POS byte commands, 58mm/80mm thermal receipts, dynamic UPI QR codes, and HID barcode scanners. |
| `bharat-accounting-i18n` | Indian Lakhs/Crores currency format, Gujarati number-to-words, and typography rules. |
| `sync-testing-playbook` | Offline-to-cloud sync test matrix: bill anti-collision, clock skew, and CRDT stock reconciliation. |

