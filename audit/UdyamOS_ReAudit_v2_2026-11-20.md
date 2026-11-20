# UdyamOS — Re-Audit (v2)

**Date:** 20 Nov 2026 (same day as v1, after fixes) · **Scope:** the 5 spec documents, the 160-screen prototype in `design/`, and `audit/action-plan/` · **Compared with:** `UdyamOS_Audit_2026-11-20.md` (v1)

**Method:**
- Every screen was checked again by script: links, orphan screens, tax lines, bill and party amounts across screens, "provisional" wording, and voice/AI entry points in the visible markup.
- 7 screens were rendered in headless Chrome and inspected as screenshots.
- The specs were re-read where they changed.

**Tags:**
- **[V]** verified in files or screenshots
- **[S]** judgement on the spec
- **[A]** assumption or market evidence
- **[U]** cannot be verified until code exists

**Still true:** there is no application code. Performance, security testing, stability and real usability cannot be measured.

---

## 1. Executive summary

The prototype and specs are in **much better shape than in v1**:
- No tax errors remain.
- Bill and party amounts agree across screens (one more mismatch was found and fixed during this re-audit).
- Every screen is reachable.
- The MVP navigation no longer sells AI, voice or OCR.
- Android text is readable.
- Two counter screens prove the Gujarati interface.
- Every gap found in v1 is now either fixed or a PRD ticket with acceptance criteria.

**The re-audit found that v1's scope fix was incomplete.** Two shared templates still put a voice/Copilot button on **every** web screen (header mic) and **every** templated Android screen (centre button in the bottom bar). The web dashboard also had its own "Ask by voice" button. All three are now fixed (§3).

**What has not changed:** nothing has been proven with customers. The competitor table is untested, no trader has paid a deposit, and the GST numbering decision is unsigned. The product is now **ready to be validated**, not ready to be built.

| | v1 | v2 |
|---|---|---|
| Design + spec score | 6.1 / 10 | **7.7 / 10** (after N9/N10) |
| Working product | 0 / 10 | 0 / 10 |
| Market readiness | 3 / 10 | **4 / 10** (validation materials ready; nothing validated yet) |

---

## 2. What v1 found, and where it stands now [V]

| v1 finding | v2 status |
|---|---|
| IGST charged on Gujarat → Gujarat sales (6 screens) | ✅ Fixed. **0 screens** use IGST as a tax line. The sales register keeps an empty IGST column, which is correct. |
| Bill D01-001880 inconsistent | ✅ The ledger now runs to ₹2,15,000 → ₹2,32,252. (v1 overstated this: the "bill detail" screen was a different bill.) |
| Final invoice number printed offline | ✅ Design shows "Provisional · not a tax invoice" on the offline bill, the receipt and the Gujarati bill. 🟡 Needs GST practitioner sign-off (ADR-007 draft). |
| Prototype scope drift | ✅ Now fixed completely (see §3). AI, voice, OCR and other later features sit only in "Later (not in MVP)" menus. |
| Competitor claims untested | 🟡 PRD §0.4 marks them "claimed"; a test protocol is ready. **Not executed.** |
| Ledger balance mismatch | ✅ Fixed |
| Cash discount on a credit bill | ✅ Now a volume scheme |
| Unreachable screens | ✅ 0 of 160. 0 broken links. |
| Small Android text | ✅ Body text is now 16–17 px; screens scroll |
| Gujarati UI unproven | ✅ `MobileHomeGu` and `MobileBillingGu` exist and are reachable from the language screen |
| Template aria attributes | ✅ v1 was wrong: not a bug |
| Challan ageing alert missing | ✅ v1 was wrong: already designed |
| Export 404 links | ✅ Fixed |

---

## 3. New findings in this re-audit

| # | Finding | Severity | Status |
|---|---|---|---|
| N1 | Every web screen with a sidebar had a mic button in the header linking to Copilot (in the shared template `gen.py`). v1's fix removed only the sidebar button. | High (scope) | ✅ **Fixed** in this re-audit |
| N2 | Every templated Android screen with a bottom bar had a centre "Speak · voice assistant" button. v1 fixed only the bespoke Home screen. | High (scope) | ✅ **Fixed**: it is now a New bill (+) button, matching Home |
| N3 | The web dashboard header had its own "Ask by voice" button | Medium | ✅ **Fixed** |
| N4 | Bill **D01-001861** (Navkar Textiles) is ₹1,11,510 on the invoice, register, receipt and bank match, but was ₹1,12,800 on the invoice list, payments list and e-invoice page | High (data) | ✅ **Fixed**: all now show ₹1,11,510 |
| N5 | Gujarati text renders visibly smaller than English at the same font size (found by rendering the Gujarati screens) | Medium | ✅ Gujarati screens set 2 px larger; rule added to UOS-167 |
| N6 | On Android, larger text now cuts off long party names in lists ("Mahavir Clo…") | Low | Open. Allow two lines for party names, or show the city on a second line |
| N7 | Bill D01-001879 shows "Synced" on web but "Saved on device" on Android. The web's "Not synced yet" count is 1 (the Godown phone) and leaves out Counter 1's 2 bills. | Low (demo story) | Open. Fine if the screens show different times; otherwise align them. In the real app the web cannot know about bills it hasn't received, so the count should say "Known unsynced devices". |
| N8 | The receipt offers "WhatsApp" while the bill is still provisional and offline | Low | Open. Rule needed: share the provisional copy now, or auto-share the final invoice after sync (UOS-161 already says the latter) |

| N9 | **No SaaS platform admin.** The specs had one line ("admin tool for our staff behind SSO"); there were no platform roles, screens, tables or tickets. Without it the team cannot run pilots, track go/no-go metrics or give support safely. (Missed by v1.) | **High** | ✅ **Added**: security spec §8A (5 platform roles, permission matrix, owner-granted support access, separate login and audit), DB spec §8A (`platform` schema), PRD Epic E17 (UOS-172–177), and 6 screens on the new canvas page "Platform admin (our team)" |
| N10 | Client roles existed (6 roles + matrix), but Manager, Godown and Accountant had **no home screen of their own** | Medium | ✅ **Added**: Accountant home (web, client switcher, CA pack), Manager home and Godown home (Android; the godown screen has no bills or prices); spec §8A.2; UOS-177 |

**Verified clean:**
- Every bill's tax + taxable − total is within ₹1 (it is round-off).
- The New invoice (₹40,114 → ₹42,120) is exact.
- Credit-limit percentages (Patel 108%, Mahavir 110%) match their limits.

---

## 4. Web application [V]

- **Navigation:** the sidebar has 4 groups: Daily work, Business, Admin, and "Later (not in MVP)" with 7 items, each badged *Later*. There are no AI or voice buttons in the header, sidebar or dashboard.
- **Strengths kept:**
  - CA panel on Reports
  - setup sequence
  - challan rules
  - honest GST summary
  - the device-prefix note on Sales ("Format to be approved by your CA")
- **Added since v1:**
  - Subscription: "Your data is always yours" banner
  - Backup: storage region and last restore test
  - Help: a screen reference for the team
- **Remaining:** the Accounts & ledgers, Brokers, UPI/bank-matching and Copilot screens still exist. They are now only behind "Later", which is correct for a vision page.

## 5. Android application [V]

- **Main path:** Home → New bill (Provisional) → Manager PIN (₹25,000 offline cap explained) → Bill saved (Provisional receipt). The centre button starts a new bill on every screen.
- **Drawer:** a "Later (not in MVP)" group holds Voice bill, Copilot, Scan supplier bill, Roll labels, Broker commission and Training mode.
- **Gujarati:** the language screen links to the Gujarati Home; Gujarati Home links to the Gujarati New bill. Body text is 18–19 px in Gujarati and 16–17 px in English.
- **Help:** links to every state screen (locked, wiped, storage full, offline 7 days, loading, first day…).
- **Remaining:** N6 and N7; Hindi has no proof screens (correctly not promised).

## 6. Specs and plan [S]

PRD changes since v1:
- §0.1 positioning is corrected.
- §0.4 marks competitor features as claimed.
- §0.5A gives a response to each weakness.
- 16 new tickets: UOS-134, 135, 144 and 160–171, with acceptance criteria, plus extensions to UOS-131 and UOS-133.
- The release gates (§10.3) now include the Tally import, export for cancelled customers, and the restore-test date.

**Quality of the new tickets:** good. Each is testable and has a business reason. Two points to watch:
- **UOS-164 (job-work)** depends on interview results. Don't schedule it before the interviews.
- **The P0 count has grown** to 7 tickets (UOS-131, 134, 160–163, plus the existing P0s). Re-check that the 12-week MVP still fits; it may need 14–16 weeks.

**Decision drafts:** 10 recommendations, ADR-007, 008 and 010–017 (`action-plan/1_decision_drafts_ADR.md`). They are sensible defaults, but **none is signed**. ADR-007 relies on my reading of GST Rule 46, which a practitioner must confirm.

## 7. Competitor & market [A]

Unchanged since v1. No hands-on tests yet. Public prices:
- Vyapar ≈ ₹3.4k–4.4k/yr
- myBillBook from ₹399/yr
- TallyPrime Silver ≈ ₹22.5k + TSS
- BUSY and niche textile tools claim lots, rolls and job work

The claimed edge in PRD §0.1 is still **unproven**: multi-staff offline with no duplicates, credit enforcement at the counter, and a Gujarati-first UI.

## 8. Scores (design + spec, evidence-based)

| Category | v1 | v2 | Evidence / why not 10 |
|---|---|---|---|
| UI/UX | 7 | 8 | Consistent, focused MVP path; N6 truncation; no test with real staff |
| Functionality (as designed) | 6 | 8 | All money flows consistent; job-work and textile unit rules are specified, not designed |
| Ease of use | 7 | 8 | One primary action everywhere (New bill); unproven with users |
| Security (spec) | 7 | 8 | Offline caps, ledger-link and recovery rules added; no security testing possible |
| Mobile experience | 7 | 8 | Larger text, scrolling, Gujarati proof |
| Automation | 5 | 7 | Digest, reminders and challan alerts ticketed, not designed |
| Accessibility | 5 | 7 | 16 px+ body, Gujarati +2 px; contrast not measured |
| Scalability (spec) | 7 | 7 | Unchanged; no load model yet |
| Customer value | 7 | 8 | Credit control + data-freedom promise; unproven |
| Market competitiveness | 3 | 4 | Plan and materials ready; no customers or tests |
| Performance | n/a | n/a | Needs code |
| **Overall (design)** | **6.1** | **7.7** | Includes platform admin + role homes (N9, N10) |

## 9. SWOT (now)

| Strengths | Weaknesses |
|---|---|
| Consistent, error-checked prototype focused on the wedge; strong offline/compliance specs; testable tickets; Gujarati proof; validation kit ready | No code, customers or tests; 10 unsigned decisions; MVP P0 list grew (timeline risk) |
| **Opportunities** | **Threats** |
| Multi-staff offline gap; CA channel with partner programme; data-freedom promise as a trust lever | Vyapar/myBillBook price floor; BUSY/niche tools in lots and rolls; Tally CA lock-in; a competitor may already pass tests 3, 4 and 11 of the protocol |

## 10. Prioritised next actions

| P | Action | Owner | Ready? |
|---|---|---|---|
| P0 | GST practitioner meeting: ADR-007 numbering, ADR-008 rounding | Founder + GST practitioner | ✅ Questions written |
| P0 | Run the competitor protocol (13 tests × 5 products) | Product person, ~10 days | ✅ Protocol written |
| P0 | 10 trader interviews → 5 paid deposits | Founders | ✅ Guide written; show the MVP + Gujarati screens only |
| P1 | Decision week for the other 8 ADRs | Eng lead, CA, security | ✅ Drafts written |
| P1 | Re-estimate the MVP with the new P0 tickets | Eng lead | Needs the framework decision (ADR-013) |
| P2 | Fix N6 (name truncation) and N7/N8 (sync story, provisional sharing) | Design | Small |
| P3 | Measure colour contrast on all screens | Design | Small |

## 11. CEO-level verdict

v1 said: "a strong plan wrapped in a prototype that oversells." **That is fixed.** The prototype now shows what the strategy promises: fast, offline, multi-staff billing with credit control, in Gujarati, and nothing more. It contains no known tax or data errors (two scope leftovers and one amount mismatch found today are fixed).

**The remaining risk is entirely proof:**
- Will a GST practitioner accept per-device numbering?
- Does a competitor already do multi-staff offline billing well?
- Will five textile traders pay ₹2,000 today for this core?

The three documents in `audit/action-plan/` turn these into about 3 weeks of work for the founders.

**Recommendation: keep code on hold until those three answers are in.** If they come back positive, start the MVP with the P0 tickets and the signed ADRs. The design and specs are ready for that.
