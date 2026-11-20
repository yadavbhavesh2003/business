# UdyamOS (BusinessMitra)

> **Offline-first, zero-knowledge retail and wholesale operating system tailored for Bharat MSMEs (Gujarat textile and garment merchants).**

---

## 1. Project Specifications & Architecture Documents

All architectural specifications, database schemas, compliance guidelines, and audit reports are maintained in the project root:

| Document | Description |
|---|---|
| [udyamos_complete_startup_blueprint.md](file:///opt/lampp/htdocs/businessMitra/udyamos_complete_startup_blueprint.md) | Full business plan, pricing hypotheses, unit economics, and 30-day pilot cohort model. |
| [udyamos_technical_prd_and_development_backlog.md](file:///opt/lampp/htdocs/businessMitra/udyamos_technical_prd_and_development_backlog.md) | Technical PRD, acceptance criteria, prioritized backlog tickets (UOS-101 to UOS-140), and MVP scope. |
| [udyamos_database_architecture_offline_sync_v1.md](file:///opt/lampp/htdocs/businessMitra/udyamos_database_architecture_offline_sync_v1.md) | SQLite schema, event-sourced WAL replication, CRDT conflict resolution, and duplicate bill prevention. |
| [udyamos_security_rbac_spec_v1.md](file:///opt/lampp/htdocs/businessMitra/udyamos_security_rbac_spec_v1.md) | Zero-knowledge tenant isolation, time-boxed support grants (1–72h), FIDO2 2FA, and cashier offline limits. |
| [udyamos_india_legal_compliance_v1.md](file:///opt/lampp/htdocs/businessMitra/udyamos_india_legal_compliance_v1.md) | Indian GST rules, CGST/SGST vs IGST splits, HSN codes, Sec 170 rounding, e-Way bills, and MCA audit trail rules. |
| [audit/UdyamOS_ReAudit_v2_2026-11-20.md](file:///opt/lampp/htdocs/businessMitra/audit/UdyamOS_ReAudit_v2_2026-11-20.md) | Latest comprehensive audit score (7.7/10 design & spec), verification checks, and validation action plan. |

---

## 2. Interactive Prototype (194 Screens)

The repository includes a complete, high-fidelity clickable prototype of all web and Android workflows:

- **Local Preview URL**: `http://localhost/businessMitra/design/export/` (requires local web server / XAMPP)
- **Export Index**: [design/export/index.html](file:///opt/lampp/htdocs/businessMitra/design/export/index.html)
- **Client Web Dashboard**: [Main.html](file:///opt/lampp/htdocs/businessMitra/design/export/01-web-app-core/Main.html)
- **Android Counter Home**: [MobileHome.html](file:///opt/lampp/htdocs/businessMitra/design/export/06-android-app/MobileHome.html)
- **SaaS Platform Admin**: [PlatformHome.html](file:///opt/lampp/htdocs/businessMitra/design/export/11-platform-admin-our-team/PlatformHome.html)

### Screen Folders
| Folder | Module Area | Screen Count |
|---|---|---|
| `01-web-app-core` | Daily counter billing, invoices, challans, parties, stock, and back office | 12 |
| `02-web-app-all-modules` | Purchases, credit notes, expenses, accounts, GST, branches, and price lists | 15 |
| `03-web-app-forms-details` | Item catalogue, party ledgers, new invoice entry, roles & permissions | 15 |
| `04-web-flows-dialogs` | Challan-to-bill conversion, cancel invoice, cheques, WhatsApp preview | 20 |
| `05-world-class-features` | UPI QR auto-match, collections, dalal/broker commission, training mode | 18 |
| `06-android-app` | Mobile billing, offline manager PIN approval, stock scan, and receipt print | 40 |
| `07-android-edge-cases-dialogs` | Privacy consent, locked accounts, sync rejections, Gujarati UI screens | 18 |
| `08-ai-voice-ocr` | Business Copilot, voice billing, and supplier invoice OCR scan | 4 |
| `09-login-setup` | 2FA sign in, setup wizards (godowns, staff, phones), and recovery | 12 |
| `10-later-releases` | Post-MVP: BOM editor, production orders, quality checks, melting batch | 6 |
| `11-platform-admin-our-team` | Complete SaaS platform admin: 30 management modules + platform sidebar | 31 |
| `12-client-role-dashboards` | Dedicated home screens for CA accountants, store managers, godown workers | 3 |
| `_shared` | Reusable `Sidebar.html` and `PlatformSidebar.html` components | 2 |

---

## 3. Rebuilding & Testing the Prototype

To rebuild the prototype after making changes to `pages_*.py` or `bespoke/`:

```bash
cd /opt/lampp/htdocs/businessMitra/design
python3 gen.py out/project && cp bespoke/*.dc.html out/project/ && python3 layout.py out/project && python3 export.py
```

To run automated sanity and link-integrity checks:

```bash
python3 /opt/lampp/htdocs/businessMitra/design/verify_pipeline.py
```

---

## 4. AI Agent & Development Framework

This project follows strict engineering and design rules defined in [AGENTS.md](file:///opt/lampp/htdocs/businessMitra/AGENTS.md). 

Eighteen specialized skills are installed in [.agents/skills/](file:///opt/lampp/htdocs/businessMitra/.agents/skills/):
- **Discipline & Craft**: `ponytail` (minimalism), `hallmark` (anti-slop design), `impeccable` (frontend precision), `humanizer` (direct copy), `taste` (MSME art direction).
- **Execution & Research**: `rea` (reason-execute-audit loop), `graphify` (dependency mapping), `last30days` (fresh recency research), `scrapling` (resilient scraping), `diagram-design` (clean visuals).
- **Domain Runbooks**: `design-pipeline` (canvas build), `offline-sync-engine` (SQLite & CRDT), `gst-compliance` (tax logic), `security-zero-knowledge` (access grants), `platform-saas-ops` (SaaS management), `thermal-printing-escpos` (ESC/POS thermal receipts), `bharat-accounting-i18n` (Indian Lakhs/Crores & Gujarati typography), `sync-testing-playbook` (E2E sync simulation).

---

## 5. Production Monorepo & Development Stack

The application code is structured as an end-to-end TypeScript monorepo (`packages/*` and `apps/*`):

| Package / App | Path | Description |
|---|---|---|
| **`@udyamos/core`** | `packages/core/` | Zero-divergence shared logic: Section 170 GST math, Indian Lakhs/Crores formatting, authentic 0–99 Gujarati words, UUIDv7, device bill numbering, thermal ESC/POS, UPI QR, A4 HTML invoices, WhatsApp links, FIFO allocation, and Tally XML export. |
| **`@udyamos/ui`** | `packages/ui/` | Shared component design system: tokens (`#0F766E`, `#15181C`, `#0F172A`, `#6366F1`), `Button`, `TabularNum`, `CurrencyCell`, `StatusBadge`, `ERPTable`, `KpiCard`. |
| **`@udyamos/database`** | `packages/database/` | Cloud MariaDB schema (`schema.sql`), Edge SQLite DDL (`sqlite-schema.sql`), and pilot merchant seeds. |
| **`@udyamos/api`** | `apps/api/` | Cloud Sync Gateway: `POST /api/v1/sync/push` (idempotency deduplication), `GET /api/v1/sync/pull` (delta stream), device pairing, and zero-knowledge support grants. |
| **`@udyamos/web`** | `apps/web/` | Dual-app web interface: Store Owner Back-Office (throughput charts, customer ledgers, stock, GSTR-1) and SaaS Platform Admin Command Center. |
| **`@udyamos/mobile`** | `apps/mobile/` | Android Counter POS (React Native Expo): Local SQLite edge store, offline outbox queue, Section 170 GST billing, Bluetooth ESC/POS printing, and HID barcode scanner listener. |

### Running Monorepo Tests & Applications

#### 1. Run Automated Unit & E2E Simulation Tests
```bash
npm test
```
*Executes all 49 automated tests across `@udyamos/core`, `apps/api`, `apps/web`, and `apps/mobile` in ~1.5s.*

#### 2. Launch React 19 Web Application (Vite Dev Server)
```bash
npm run dev:web
```
- Open on desktop: `http://localhost:5173`
- Open on Android phone over Wi-Fi: `http://<YOUR_LAN_IP>:5173`
- Or open directly in Apache/XAMPP: `http://localhost/businessMitra/`

#### 3. Run Android Counter POS Mobile App
```bash
cd apps/mobile
npx expo start
```
- Scan with Expo Go on any Android phone to test offline SQLite billing, barcode listener, and thermal printing.

#### 4. Run Prototype Sanity & Link Verification
```bash
python3 design/verify_pipeline.py
```
*Confirmed: 194 artboards, 195 exported screens, 0 broken links, 18 skills verified.*


