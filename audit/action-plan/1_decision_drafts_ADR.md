# Decision drafts — ready for sign-off

These are drafts of the 10 open decisions in the DB spec §20. Each has a **recommendation**, written so the decision-owner can approve, change or reject it in one meeting.

**Nothing here is decided until the named reviewer signs it.** Record the outcome as an ADR (owner, date, reason, consequences) in DB spec §21.

Suggested meeting: one "decision week" before coding (audit §21, P1).

---

## ADR-007 · Offline invoice numbering (BLOCKER)

**Reviewer:** GST practitioner + founder · **Needed before:** any printed bill

**Options**
| | How | Pros | Cons |
|---|---|---|---|
| A | Device series: `D01/26-27/000001`, one series per registered phone | Works fully offline; numbers are final at once; no gaps if the phone is not lost | Needs the GST practitioner to confirm that many parallel series are acceptable; a lost phone leaves a gap to explain |
| B | Server-reserved blocks (e.g. 200 numbers per phone, topped up when online) | One business-wide series; still works offline | Unused numbers in a lost or wiped phone create gaps; more code |
| C | Provisional offline, final number on sync | Simplest legally | The customer gets two documents; tax invoice is delayed; worse experience at the counter |

**Recommendation: A, with C as the fallback.**
- Rule 46 of the CGST Rules asks for consecutive serial numbers, unique for a financial year. It allows more than one series. This needs the practitioner to confirm.
- The prototype now shows "Provisional" (option C) until the decision is signed.
- If A is approved:
  - remove the "Provisional" label from the screens
  - log lost-device gaps in the audit trail, with the reason

**Questions for the GST practitioner**
1. Are per-device series acceptable for one GSTIN?
2. How should a gap from a lost phone be documented?
3. Is the offline printed copy a valid tax invoice when the buyer is B2B?
4. Is a credit note required when the server rejects an offline bill that was already printed?

---

## ADR-008 · GST rounding

**Reviewer:** GST practitioner + engineering · **Needed before:** tax invoice release

**Recommendation:**
- Calculate tax per line to 2 decimals (half-up).
- Sum the lines.
- Round the invoice total to the nearest rupee, and show the difference as a "Round off" line. The prototype already does this.
- Store unrounded values as well, for audit.
- Discounts reduce taxable value before tax.

**Test:** the Tally import (UOS-134) must match to the paisa.

---

## ADR-010 · Negative stock

**Reviewer:** pilot owners + product · **Needed before:** stock posting

**Recommendation:**
- **Allow negative stock offline. Warn, never block a sale.** Blocking a sale at the counter loses the customer, and stock counts are often behind.
- When the phone syncs:
  - show negative lots on the owner's dashboard and in Approvals ("Lot RL-2292 is −18 m", already designed)
  - ask the owner to fix it with a transfer or a stock count
- The owner can switch on "block below zero" per godown.

**Confirm with:** 5 pilot owners, by asking them "Should staff be able to sell a roll the system says is finished?"

---

## ADR-011 · Receivables model

**Reviewer:** product + accountant · **Needed before:** payments

**Recommendation: a full party ledger, not a simple "outstanding" number.**
- Credit control is the product's main selling point. Ageing, promises to pay and the customer ledger link need bill-wise allocation.
- Payments are allocated to bills automatically, oldest first. Staff can change the allocation.
- Advances and on-account amounts are kept.
- The same structure is exported to Tally as bill-wise details.

---

## ADR-012 · Single vs multi-branch at launch

**Reviewer:** product · **Needed before:** pilot onboarding

**Recommendation:** **one business, many godowns** in the MVP.
- Multi-branch consolidation stays "Later" (trigger: 3 paying multi-branch customers).
- The data model already carries `branch_id`, so turning it on later needs no migration.

---

## ADR-013 · Backend framework: NestJS vs Laravel

**Reviewer:** engineering lead · **Needed before:** first repository

**Recommendation:** choose what the team that will build it knows best. Decide by a one-day spike, not a debate.
- **NestJS (TypeScript)** if the Android app is React Native: one language end to end, and the outbox and sync types are shared between client and server.
- **Laravel** if the hired developers are PHP-first. This server already runs PHP 8.2 under XAMPP, which hints at the team's skills.

**Either works** with PostgreSQL, RLS and the outbox design. What matters most is the team's speed during a 12-week MVP.

---

## ADR-014 · Local data storage and protection

**Reviewer:** engineering + security · **Needed before:** local persistence

**Recommendation:**
- **Android:** SQLite (via op-sqlite or WatermelonDB), encrypted with SQLCipher. The key is held in the Android Keystore.
- **Web:** online-first, with a short offline grace period. Use IndexedDB (Dexie) for drafts only, not as the record of truth (see audit §9).

---

## ADR-015 · Change-log retention

**Reviewer:** engineering + operations · **Needed before:** production sync

**Recommendation:**
- Keep the change log for **90 days**.
- A device whose cursor is older than that does a full resnapshot (already in the spec).
- The 8-year books retention is a separate matter: books are kept in tables and backups, not in the change log.

---

## ADR-016 · Device revocation and offline grace

**Reviewer:** security + product · **Needed before:** multi-user pilot

**Recommendation:**
- A phone can bill offline for **7 days**, then must connect. This is already designed: "Connect to keep billing".
- When a device is revoked, local data is wiped at the next app start that has internet.
- Before the wipe, unsynced bills are uploaded if the server can still accept them.
- The owner can change the grace period, from 1 to 14 days.

---

## ADR-017 · Data retention and deletion

**Reviewer:** legal / privacy reviewer · **Needed before:** public launch

**Recommendation:**
- **Books** (bills, ledgers, stock) are kept 8 years, as accounting law requires.
- **Personal data** not needed for books (staff phone numbers, consent logs, support sessions) is deleted on request or 12 months after the account ends.
- **The "export for 12 months after cancelling" promise** (UOS-131) must fit inside these rules. Check this with the lawyer: legal pack §13.
