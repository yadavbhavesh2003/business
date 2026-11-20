# UdyamOS --- India Legal & Regulatory Compliance Pack

**Version 1.0 | 19 November 2026 | Working draft for counsel and CA review**

> **This is not legal advice.** It is a structured draft prepared so that
> an Indian technology/privacy lawyer and a Chartered Accountant can
> review and sign off quickly. Laws, rules and notifications change.
> Every item marked **[VERIFY]** must be confirmed against the current
> official text before launch. Budget: one tech/privacy lawyer engagement
> (fixed fee) + one CA engagement before the paid pilot.

------------------------------------------------------------------------

## 0. Summary: what applies to us and why

  \#   Law / regulation                                  Applies because                                          Priority
  ---- ------------------------------------------------- -------------------------------------------------------- ----------
  1    Companies Act 2013 + Accounts Rules               We are a company; **and our customers' books live in     Critical
       (audit trail, India backups)                      our software**
  2    CGST/SGST Acts + Rules (records, invoices,        We generate GST invoices and keep books for customers    Critical
       E-Invoice/E-Way Bill)
  3    Digital Personal Data Protection Act 2023 +       We process personal data of our users and of our         Critical
       DPDP Rules 2025                                   customers' customers
  4    IT Act 2000 (s.43A, s.72A, s.79) + SPDI Rules     Applies until DPDP fully replaces it; intermediary        High
       2011 + Intermediary Rules 2021                    status for user data
  5    CERT-In Directions (28 April 2022)                We provide a digital service in India                    High
  6    TRAI TCCCPR 2018 (DLT)                            We send OTP / transactional SMS                          High (blocks launch)
  7    RBI rules on recurring payments / payment         We charge subscriptions; may show UPI links              Medium
       aggregators
  8    Consumer Protection Act 2019 + misleading         Our marketing claims ("GST compliant", "100% safe")       Medium
       advertisement guidelines
  9    Trade Marks Act 1999                              Product name                                             **High (naming risk)**
  10   Income-tax Act (books retention)                  Customers' books                                         Medium
  11   Startup/company basics (GST registration,         Running the company                                      Baseline
       Shops & Establishments, Professional Tax, ESOP)
  12   Open-source licences                              Our codebase                                             Medium

------------------------------------------------------------------------

## 1. Product-shaping legal requirements (build these in, not bolt on)

These change the **software**, so engineering must know them now.

### 1.1 Companies Act audit trail ("edit log") **[CRITICAL]**

Since 1 April 2023, companies using accounting software must use
software that **records an audit trail of every transaction, creates an
edit log of each change with date, and cannot be disabled** (Companies
(Accounts) Rules 2014, Rule 3(1) proviso). Auditors report on it.
**[VERIFY current text]**

Impact on UdyamOS:

-   Every create/edit/cancel of invoices, purchases, payments, stock,
    parties, tax settings → audit entry with user, device, timestamp,
    before/after values.
-   **No setting can turn it off**, including for owners and our staff.
-   Audit entries are append-only and retained for the books-retention
    period (minimum 8 years for company books, see §1.3).
-   Export of audit trail for statutory auditors.
-   This is already mostly in the Security spec §6. **Mark it a P0 legal
    requirement and say it in sales**: "Companies Act audit-trail ready",
    *only after CA confirmation*.

### 1.2 Backups of books in India **[CRITICAL]**

Companies keeping books electronically must keep **daily backups on
servers physically located in India**, and disclose the service
provider details to the Registrar of Companies (ROC) in annual filings.
**[VERIFY]**

Impact: primary database, PITR backups and object storage in an Indian
region. No foreign replicas of customer books. Provide customers a
**"Service provider details" page** (our legal name, address, server
location) they can give their auditor/ROC.

### 1.3 Record retention

  Record                              Minimum retention                                      Source
  ----------------------------------- ------------------------------------------------------ -----------------------------
  GST accounts and records            **72 months from the due date of the annual return**   CGST Act s.36 **[VERIFY]**
                                      for that year (longer if under proceedings)
  Company books of account            8 financial years                                      Companies Act s.128(5)
  Income-tax books (non-company)      As per Rule 6F; typically 6 years from end of AY        Income-tax Rules **[VERIFY]**
  CERT-In ICT logs                    180 rolling days, in India                             CERT-In Directions
  DPDP processing logs                At least 1 year (per DPDP Rules) **[VERIFY]**           DPDP Rules 2025

**Product rule:** default retention for financial records = **8 years
after the financial year end**, then customer-confirmed deletion.

**On exit:** a customer who cancels gets a full export (Excel, PDF
invoices, Tally XML, audit trail). We then either (a) keep a read-only
archive for the retention period under the contract, or (b) delete
after written confirmation that they have exported. Choose (a) as the
default; it protects customers in GST assessments.

### 1.4 GST invoice content and numbering

-   Tax invoice fields per CGST Rule 46 (supplier GSTIN, consecutive
    serial number unique per financial year (max 16 characters), date,
    recipient GSTIN, HSN/SAC, taxable value, rates, amounts, place of
    supply, signature/digital signature, etc.). **[VERIFY with CA]**
-   **Offline device series** (`D03/25-26/000123`) must fit the
    16-character limit and be approved by the CA (ADR-006).
-   Delivery challan contents per Rule 55.
-   Credit/debit notes per Rule 53; never edit a posted invoice.
-   **E-Invoice**: mandatory above the turnover threshold notified by
    CBIC (currently ₹5 crore aggregate turnover). **[VERIFY]** Many
    wholesale/textile targets cross it, so this is Release 2 priority.
    Integration path: connect through a licensed **GSP** as an **ASP**
    (contract with GSP), or use the customer's own IRP API credentials.
    Do not claim E-Invoice support until tested on the IRP sandbox.
-   **E-Way Bill** rules for goods movement above value thresholds
    (state-specific for intra-state). **[VERIFY]**
-   We do **not** file returns in MVP. Say "GST-ready invoices and
    reports for your CA", not "GST filing".

### 1.5 DPDP: what the software must do

  Requirement                                          Product feature
  ---------------------------------------------------- --------------------------------------------------------
  Notice + consent for our users                       Sign-up screen with notice in English/Gujarati/Hindi;
                                                       consent log (who, what version, when)
  Withdraw consent / delete account                    Settings → delete account (subject to legal retention)
  Access and correction rights                         "Download my data", edit profile
  Grievance redressal                                  In-app grievance form + published Grievance Officer
                                                       contact; response SLA **[VERIFY Rules timeline]**
  Breach notification                                  Ability to identify affected users and notify by
                                                       SMS/WhatsApp/email quickly
  Reasonable security safeguards                       Security spec v1 (encryption, access control, logging)
  Purpose limitation / minimisation                    Don't collect Aadhaar; don't use customer data for
                                                       marketing or AI training without separate consent
  Children's data                                      Users must be 18+; no processing of children's data
  Processor obligations (customers' customers' data)   DPA with every business; process only on their
                                                       instructions; delete/return at end

------------------------------------------------------------------------

## 2. DPDP Act 2023 + DPDP Rules 2025 (detail)

Status: Act passed August 2023. **DPDP Rules notified November 2025**
with phased commencement: Data Protection Board provisions immediate;
most data-fiduciary obligations after an ~18-month transition
(around **mid-2027**). **[VERIFY exact dates]** Build compliance now.
Retrofitting is more expensive, and enterprise customers will ask.

### 2.1 Our two roles

  Data                                                          Our role           Who is the Data Fiduciary
  ------------------------------------------------------------- ------------------ ---------------------------
  Our users (owners, staff, CAs): name, phone, email, device    **Data Fiduciary**  UdyamOS
  Customer's customers/suppliers: names, phones, GSTIN,         **Data Processor**  The business (our customer)
  addresses, outstanding balances

### 2.2 Obligations checklist

-   [ ] Privacy notice (plain language, itemised data + purpose, how to
    withdraw consent, how to complain to the Board) in English +
    Gujarati + Hindi.
-   [ ] Consent records with versioning.
-   [ ] Data Processing Agreement (DPA) template for customers (§6.3).
-   [ ] Sub-processor list published (cloud, SMS, WhatsApp, email,
    Sentry, payment gateway) with locations.
-   [ ] Breach response: notify the **Data Protection Board** and
    affected persons; Rules require prompt intimation and a detailed
    report within **72 hours**. **[VERIFY]** As processor, notify our
    customer immediately (contract: within 24 hours).
-   [ ] Grievance Officer named, contact published.
-   [ ] Retention + erasure schedule (§1.3).
-   [ ] Security safeguards documented (Security spec).
-   [ ] Processing logs retained ≥ 1 year **[VERIFY]**.
-   [ ] Cross-border transfer: allowed except to countries the
    government restricts. We keep data in India anyway (Companies Act
    + CERT-In), so check only sub-processors (e.g. Sentry region, email
    provider) **[VERIFY]**.
-   [ ] Significant Data Fiduciary: unlikely at our scale; re-check
    annually.

**Penalties:** up to ₹250 crore per instance for failure to take
reasonable security safeguards; up to ₹200 crore for breach
notification failures. **[VERIFY schedule]**

------------------------------------------------------------------------

## 3. CERT-In Directions (April 2022)

-   [ ] **Report cyber incidents to CERT-In within 6 hours** of noticing
    them (list includes data breaches, unauthorised access, attacks on
    servers/apps, malicious code, etc.).
-   [ ] Designate a **Point of Contact** and register with CERT-In.
-   [ ] Keep **ICT system logs for 180 days, within India**.
-   [ ] **Synchronise clocks** with NTP of NIC/NPL (or traceable to
    them). Configure servers to use `time.nplindia.org` / `samay1.nic.in`
    or a cloud NTP traceable to them. **[VERIFY]**
-   [ ] Incident runbook includes: CERT-In (6 h), customers (24 h per
    DPA), Data Protection Board + affected users (DPDP timelines).

------------------------------------------------------------------------

## 4. TRAI DLT (SMS) **[blocks launch]**

Commercial SMS in India must go through DLT registration
(TCCCPR 2018).

-   [ ] Register the **Principal Entity** (company) on an operator's
    DLT portal (Jio/Airtel/Vi/BSNL).
-   [ ] Register **sender headers** (e.g. `UDYMOS`). **[name subject to
    §9]**
-   [ ] Register **templates**: OTP (service-implicit), invoice-shared,
    payment reminder (service-explicit needs consent).
-   [ ] **Whitelist URLs, APKs and call-back numbers** used inside SMS
    (enforced since late 2024). **[VERIFY]**
-   [ ] Payment reminders sent **on behalf of our customers** to their
    customers: decide whether the shop or UdyamOS is the principal
    entity, and get the provider's guidance. Prefer **WhatsApp Business
    API** (Meta templates + opt-in) for reminders.
-   Lead time: 1--3 weeks. Start in Week 1.

------------------------------------------------------------------------

## 5. Payments and subscriptions

-   [ ] Use an RBI-authorised **Payment Aggregator** (Razorpay, Cashfree,
    PayU, etc.). We never hold customer money → no PA licence needed.
-   [ ] **Recurring card/UPI mandates** follow RBI e-mandate rules:
    additional factor of authentication at registration, **pre-debit
    notification at least 24 hours before** each charge, easy opt-out.
    Annual invoice + manual payment avoids most of this for MVP.
    **[VERIFY]**
-   [ ] Invoice our own subscriptions with GST at **18%** (SaaS; confirm
    SAC with CA). Issue our own E-Invoices once we cross the threshold.
-   [ ] **TDS:** business customers may deduct TDS (e.g. s.194J /
    s.194Q contexts). Support TDS certificates in billing. **[VERIFY]**
-   [ ] UPI collection links for our customers' invoices: generate via
    the shop's own UPI ID/QR (no money passes through us).

------------------------------------------------------------------------

## 6. Contracts and policies (to draft, then lawyer review)

### 6.1 Documents needed before paid pilot

  Document                           Audience           Key points
  ---------------------------------- ------------------ ---------------------------------------------------------
  Terms of Service (SaaS agreement)  Businesses         Licence, fees, renewal, suspension, **limitation of
                                                        liability** (capped at 12 months' fees), customer
                                                        responsible for tax correctness and filings, data
                                                        ownership = customer, export on exit, governing law
                                                        India, **jurisdiction Bhavnagar/Ahmedabad**, arbitration
                                                        (Arbitration & Conciliation Act 1996) for disputes
  Privacy Policy / Notice            Users              DPDP-compliant notice (§2.2), 3 languages
  Data Processing Agreement (DPA)    Businesses         §6.3
  Acceptable Use Policy              Businesses/users   No illegal invoices, fake GST bills, circular trading
  Service Level & Support Policy     Businesses         Uptime target (not guarantee) in pilot; support hours;
                                                        credits only if contractually offered
  Refund & Cancellation Policy       Businesses         Required by payment gateways
  Pilot Agreement / LOI              Pilot shops        Fee/deposit, duration, feedback, data handling, no
                                                        warranty during pilot, conversion terms
  Sub-processor list                 Businesses         Name, purpose, location
  Employee/contractor agreements     Our team           **IP assignment**, confidentiality, data access rules
  CA/dealer referral agreement       Partners           Revenue share, no misrepresentation, data access limits

### 6.2 Critical clauses (don't skip)

-   **"Not a tax adviser"**: UdyamOS calculates based on settings the
    customer chooses; the customer and their CA remain responsible for
    tax correctness and filings.
-   **Fake invoicing / GST fraud**: right to suspend and to cooperate
    with lawful requests. (Fake ITC fraud is a major enforcement area;
    don't become the tool for it.)
-   **Lawful requests**: process for government/police data requests
    (IT Act s.69/91 CrPC→BNSS) **[VERIFY]**: verify, log, notify the
    customer where legally allowed.
-   **Offline data**: data on a device is the customer's responsibility
    until synced; we provide encryption and remote wipe.
-   **Retention after exit** (§1.3) written into the contract.
-   **Price changes**: 30 days' notice.

### 6.3 DPA essentials

-   Process only on the customer's documented instructions.
-   Confidentiality of our personnel.
-   Security measures (annex: Security spec summary).
-   Sub-processors: published list, 30-day notice of changes.
-   Breach notice to customer **within 24 hours** of confirmation.
-   Help with data-subject requests and Board inquiries.
-   Return/delete at end, subject to statutory retention.
-   Data stored in India.
-   Audit: summary reports / questionnaire; on-site only for
    enterprise.

------------------------------------------------------------------------

## 7. Consumer protection and marketing claims

Do **not** say, without CA/legal sign-off:

-   "100% GST compliant" → say "GST-ready invoices, reviewed by a CA"
-   "Bank-grade security" / "unhackable" / "100% safe"
-   "Government approved" (the **Udyam** name makes this risk worse, see §9)
-   "Works fully without internet forever"

Testimonials must be real and with permission. Free-trial terms must
be clear.

------------------------------------------------------------------------

## 8. Company setup and our own tax basics

-   [ ] Private Limited Company (best for funding/ESOPs) or LLP.
-   [ ] **GST registration** (mandatory for inter-state supply of
    services above thresholds; practically needed for B2B).
-   [ ] PAN, TAN, bank account, **Gujarat Professional Tax**, **Shops &
    Establishments** registration (Gujarat).
-   [ ] **DPIIT Startup India recognition** (tax benefits, faster
    trademark/patent processing, self-certification under labour laws).
-   [ ] Founders' agreement + vesting; ESOP pool when hiring.
-   [ ] Cyber-insurance quote before GA.
-   [ ] Board resolution designating Grievance Officer and CERT-In point
    of contact.

------------------------------------------------------------------------

## 9. Brand / trademark **[HIGH RISK, decide early]**

-   **"Udyam"** is strongly associated with the Government of India's
    **Udyam Registration** (MSME) portal. Using **"UdyamOS"** risks:
    (a) trademark objection or opposition, (b) **consumer confusion /
    implied government endorsement**, (c) rejection of DLT headers,
    Play Store listing complaints or app-store impersonation flags.
    The docs also mention **"BizSaathi"**. **Get a lawyer's opinion on
    both before** buying domains, printing material or registering SMS
    headers.
-   [ ] Trademark search (IP India public search) in Classes **9**
    (software), **42** (SaaS) and **35** (business management).
-   [ ] File trademark application (TM-A) once cleared; use ™ until
    registered, ® only after registration.
-   [ ] Never use government emblems, tricolour-styled logos or
    "Digital India / MSME" branding without permission.

------------------------------------------------------------------------

## 10. Open source and IP

-   [ ] Licence scanning in CI (e.g. `license-checker`, FOSSA/ORT).
    Allow: MIT, Apache-2.0, BSD, ISC. **Review:** LGPL, MPL. **Avoid in
    the app and API:** GPL/AGPL unless counsel approves.
-   [ ] SQLCipher community edition is BSD-style. Confirm attribution.
-   [ ] Third-party notices screen in the app.
-   [ ] Fonts (Gujarati/Devanagari): use OFL-licensed fonts (e.g. Noto,
    Mukta, Hind Vadodara). Keep licence files.
-   [ ] All code written by employees/contractors assigned to the
    company in writing.

------------------------------------------------------------------------

## 11. Later-stage items (trigger-based)

  Item                                               Trigger
  -------------------------------------------------- ---------------------------------------------
  GSP/ASP arrangement for E-Invoice / E-Way Bill     Release 2
  AI features: disclosure, no training on customer   Before AI launch; check MeitY advisories
  data without consent, human review of postings
  ISO 27001 / SOC 2                                  First enterprise customer asks
  External penetration test                          Before general availability
  Significant Data Fiduciary assessment              Annually
  Account Aggregator / bank feeds (RBI framework)    If we add banking
  Payroll features (labour codes, PF/ESI)            Not planned

------------------------------------------------------------------------

## 12. Action plan (who does what, when)

  Week   Action                                                           Owner            Cost (approx.)
  ------ ---------------------------------------------------------------- ---------------- -----------------------
  1      Trademark/name opinion on "UdyamOS" vs alternatives               Lawyer           ₹10--25k
  1      Company incorporated, GST, PT, Shops & Est.                      CA               ₹15--30k
  1      Start DLT entity + header + template registration                Founder          Provider fees
  1--2   CA review: invoice format, offline numbering, retention,         CA               ₹15--40k
         E-Invoice threshold, audit-trail rule
  2--3   Lawyer drafts ToS, Privacy Notice, DPA, Pilot Agreement,         Lawyer           ₹40--1.5L (fixed fee)
         Refund policy, AUP, employee IP agreements
  2--3   Translate Privacy Notice + key terms to Gujarati/Hindi           Founder + lawyer
  3      Grievance Officer + CERT-In POC designated; NTP configured       Founder/Eng
  3      Sub-processor list (cloud India region, SMS, WhatsApp, email,    Eng
         Sentry region, payment gateway)
  4      Incident response runbook + tabletop drill                       Eng + founder
  Pilot  Audit trail, retention, export, consent log, delete-account     Eng              Built into MVP
         features verified against this document
  Pre-GA Penetration test, cyber insurance, final legal review            External         ₹1--3L

Costs are rough market ranges for small firms in Gujarat; get quotes.

------------------------------------------------------------------------

## 13. Questions to ask the lawyer (bring this list)

1.  Is "UdyamOS" registrable and safe, given the Government's Udyam
    portal? What about "BizSaathi"?
2.  Confirm our processor vs fiduciary analysis and DPDP commencement
    dates for each obligation.
3.  Limitation of liability cap and its enforceability for small
    business customers.
4.  Arbitration vs courts; seat and jurisdiction.
5.  Who is the DLT principal entity for reminders sent on behalf of
    shops?
6.  Process for police/GST department data requests.
7.  Retention archive after customer exit: contractual basis and fee.
8.  Click-wrap acceptance + e-sign for pilot agreements; stamp duty in
    Gujarat on e-agreements.

## 14. Questions to ask the CA

1.  Approve the device-prefixed invoice series format (≤ 16 chars,
    consecutive per FY per series).
2.  Confirm the Companies Act audit-trail requirements our edit log
    must meet for auditor reporting.
3.  Confirm retention periods (GST s.36, Companies Act, Income-tax).
4.  Current E-Invoice threshold and E-Way Bill thresholds (Gujarat
    intra-state).
5.  Delivery challan and job-work challan formats (Rule 55, ITC-04).
6.  Our own GST: SAC code and rate for SaaS; TDS treatment by
    customers.
7.  Is Tally XML export sufficient for their workflow, or do they need
    specific reports (GSTR-1 JSON, etc.)?
