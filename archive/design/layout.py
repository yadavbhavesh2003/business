"""Builds out/project/canvas.json: pages, artboard positions and titles."""
import json, os, sys
OUT = sys.argv[1]
boards, notes = {}, {}
def put(f, x, y, w, h, title, page, inter=False):
    e = {"x": x, "y": y, "w": w, "h": h, "title": title, "page": page}
    if w >= 1000: e["expand"] = "fill"
    if inter: e["is_interactive"] = True
    boards[f + ".dc.html"] = e
def grid(items, page, y=0, cols=3, step=1520, w=1440, prefix="Web · "):
    for r in range(0, len(items), cols):
        row = items[r:r + cols]
        for i, it in enumerate(row):
            f, t = it[0], it[1]; h = it[2] if len(it) > 2 else (1000 if w > 400 else 844); inter = it[3] if len(it) > 3 else False
            put(f, i * step, y, w, h, prefix + t, page, inter)
        y += max((it[2] if len(it) > 2 else (1000 if w > 400 else 844)) for it in row) + 120
    return y
T = lambda page, text, maxW: notes.__setitem__("t_" + page, {"x": 0, "y": -260, "text": text, "kind": "title1", "maxW": maxW, "page": page})

grid([("Main", "Dashboard", 1320), ("Approvals", "Approvals & sync review", 1000, True), ("Invoices", "Sales & invoices", 1000, True),
      ("Challans", "Delivery challans", 1000, True), ("Parties", "Parties", 1000, True), ("Stock", "Stock & lots", 1000, True),
      ("Payments", "Payments", 1000, True), ("Reports", "Reports", 1000, True), ("Devices", "Devices & sync"),
      ("Users", "Users & roles", 1000, True), ("Settings", "Settings", 2000)], "web")
put("Sidebar", 3040, 3680, 232, 1700, "Component · Sidebar", "web")
T("web", "Web — owner & accountant (back office)", 4480)

grid([("Profile", "My profile", 1400), ("Purchases", "Purchases", 1000, True), ("Returns", "Returns & credit notes", 1000, True),
      ("Expenses", "Expenses", 1000, True), ("Accounts", "Accounts & ledgers", 1000, True), ("Gst", "GST & e-invoice", 1000, True),
      ("Branches", "Branches & godowns", 1000, True), ("PriceLists", "Price lists & schemes", 1000, True), ("Notifications", "Notifications", 1000, True),
      ("Audit", "Audit log", 1000, True), ("ImportExport", "Import & export"), ("Subscription", "Subscription"),
      ("Help", "Help & support"), ("Manufacturing", "Manufacturing (later)", 1000, True), ("Foundry", "Metal melting (later)", 1000, True)], "web2")
T("web2", "Web — every module (grey 'Later' = after MVP)", 4480)

grid([("Products", "Items catalogue", 1000, True), ("ProductEdit", "Add item (units, variants, HSN)", 1500), ("InvoiceNew", "New invoice", 1000, True),
      ("InvoiceView", "Invoice A4 preview", 1200), ("Quotations", "Quotations & orders", 1000, True), ("PartyView", "Party ledger", 1000, True),
      ("PartyEdit", "Add party + credit limit + broker", 1300), ("PurchaseNew", "Purchase entry (lots & rolls)"), ("StockCount", "Stock count", 1000, True),
      ("RoleEdit", "Roles & permissions matrix", 1100), ("UserInvite", "Invite user"), ("Dispatch", "Dispatch & salespeople", 1000, True),
      ("ProfitReport", "Profit report", 1000, True), ("States", "Messages & states"), ("LoadingState", "Loading state (skeleton)")], "web3")
T("web3", "Web — create, edit & detail screens", 4480)

grid([("ChallanConvert", "Bill from challans"), ("CancelInvoice", "Cancel invoice"), ("WhatsAppShare", "WhatsApp reminder preview"),
      ("SupplierPay", "Pay supplier"), ("Cheques", "Cheques", 1000, True), ("Transfer", "Stock transfer"),
      ("ConflictDetail", "Resolve sync conflict"), ("SalesRegister", "Sales register", 1000, True), ("GstSummary", "GST summary", 1000, True),
      ("ImportWizard", "Import wizard", 1000, True), ("RevokeDevice", "Revoke device"), ("SubscriptionLimit", "Subscription alerts"),
      ("EmptyDashboard", "First-day dashboard"), ("ChallanView", "Challan document", 1100), ("ReceiptView", "Receipt document"),
      ("ExpenseView", "Expense detail"), ("PriceListEdit", "Edit price list & scheme"), ("TemplateEdit", "Message template"),
      ("PrivacyRequests", "Privacy & support access")], "flows")
put("TabletBilling", 1520, 6820, 1194, 834, "Tablet · Manager billing (two-pane)", "flows", True)
T("flows", "Web — flows, dialogs & documents", 4480)

y = grid([("UpiCollections", "UPI QR & auto-match", 1000, True), ("Collections", "Collections & promises", 1000, True), ("Brokers", "Broker (dalal) commission", 1000, True),
          ("LedgerLink", "Live ledger link (customer view)"), ("BankMatch", "Bank statement matching", 1000, True), ("CommandPalette", "Ctrl K command bar & shortcuts"),
          ("TrainingMode", "Training mode"), ("LabelDesigner", "Roll & barcode labels"), ("Timeline", "Activity timeline")], "wc")
grid([("MobileVoiceHub", "Voice assistant (centre mic)", 844, True), ("MobileReadAloud", "Read aloud"), ("MobileUpiQr", "UPI QR on screen"), ("MobileCollections", "Collections today"),
      ("MobileCustomerLedger", "Customer's ledger link view"), ("MobileSalesOrder", "Salesman order taking"), ("MobileBroker", "Broker commission"), ("MobileTraining", "Training mode"),
      ("MobileLabels", "Print roll labels", 844, True)], "wc", y=y, cols=5, step=470, w=390, prefix="Android · ")
T("wc", "World-class features — get paid faster, voice, broker, training", 4480)
notes["s_wc"] = {"x": 2400, "y": y, "w": 380, "page": "wc", "text": "Why these: UPI QR + auto-match and Collections get money in faster; broker (dalal) commission is core to Gujarat textile trade; voice + read-aloud serve staff who prefer speaking; training mode makes onboarding and sales demos safe.", "fill": "teal"}

A = [("MobileHome", "Counter home (4 tiles + new bill)"), ("MobileBilling", "New bill (offline)", 844, True), ("MobileManagerPin", "Manager PIN approval", 844, True), ("MobileReceipt", "Bill saved & receipt"), ("MobileOutstanding", "Party outstanding"),
     ("MobileDrawer", "Left menu drawer (☰)", 844, True), ("MobilePayment", "Receive payment", 844, True), ("MobileChallan", "Delivery challan", 844, True), ("MobileStock", "Stock check (scan)", 844, True), ("MobileSync", "Sync status"),
     ("MobileBills", "Bill history", 844, True), ("MobileBillView", "Bill detail"), ("MobileHeld", "Held bills"), ("MobileSearch", "Global search", 844, True), ("MobileItems", "Items list", 844, True),
     ("MobileLowStock", "Low stock"), ("MobileParty", "Select party"), ("MobilePartyView", "Party ledger", 844, True), ("MobilePartyAdd", "Add party", 844, True), ("MobileProductAdd", "Quick add item", 844, True),
     ("MobilePurchase", "Purchase entry"), ("MobileQuotation", "Quotation"), ("MobileReturn", "Sales return", 844, True), ("MobileExpense", "Add expense", 844, True), ("MobilePayments", "Payments list", 844, True),
     ("MobileOwner", "Owner home"), ("MobileApprovals", "Owner approvals"), ("MobileReports", "Owner reports", 844, True), ("MobileDevices", "Owner · devices"), ("MobileDispatch", "Dispatch", 844, True),
     ("MobileStockCount", "Stock count", 844, True), ("MobilePrinter", "Printer setup", 844, True), ("MobileCloseDay", "Close day (cash)"), ("MobileProfile", "My profile", 844, True), ("MobileSettings", "App settings", 844, True),
     ("MobileNotifications", "Notifications", 844, True), ("MobileMenu", "All features (grid)"), ("MobileHelp", "Help"), ("MobileSplash", "Splash / startup"), ("MobileLoading", "Loading state")]
grid(A, "android", cols=5, step=470, w=390, prefix="Android · ")
T("android", "Android — counter, godown & owner", 2270)
notes["s_android"] = {"x": 2400, "y": 0, "w": 380, "page": "android", "text": "Sample data only. Main flow: Home → New bill → Manager PIN (if over limit) → Bill saved → UPI QR / WhatsApp. ☰ opens the drawer; the centre + starts a new bill. Every money state says 'Saved on device' or 'Synced'.", "fill": "orange"}

grid([("MobileConsent", "Privacy consent"), ("MobileForgotPin", "Forgot PIN", 844, True), ("MobileLocked", "User locked"), ("MobileWiped", "Phone wiped"), ("MobileGrantExpired", "Offline limit reached"),
      ("MobileUpdate", "Update required"), ("MobileStorageFull", "Storage full"), ("MobileSyncRejected", "Bill rejected by server"), ("MobileCancelBill", "Cancel bill request", 844, True), ("MobileWhatsApp", "Share on WhatsApp", 844, True),
      ("MobileReceiptPrint", "Payment receipt print"), ("MobileChallanToBill", "Bill from challans"), ("MobileTransfer", "Stock transfer", 844, True), ("MobileStepUp", "Fingerprint / PIN confirm", 844, True), ("MobileCopilotLimits", "Copilot: no permission / unsure"),
      ("MobileEmptyHome", "First-day home"), ("MobileHomeGu", "Counter home · ગુજરાતી"), ("MobileBillingGu", "New bill · ગુજરાતી", 844, True)], "android2", cols=5, step=470, w=390, prefix="Android · ")
T("android2", "Android — edge cases & dialogs", 2270)

put("Copilot", 0, 0, 1440, 1200, "Web · Business Copilot (voice + AI)", "ai")
for i, (f, t) in enumerate([("MobileVoice", "Voice bill"), ("MobileCopilot", "Copilot chat"), ("MobileScanBill", "Scan supplier bill (OCR)")]):
    put(f, 1520 + i * 470, 0, 390, 844, "Android · " + t, "ai")
T("ai", "AI, voice & OCR — drafts only, you confirm", 2850)

y = grid([("WebLogin", "Sign in with 2FA"), ("WebConsent", "Privacy notice & consent"), ("WebOnboarding", "Setup · tax & bills", 1100),
          ("WebOnbGodowns", "Setup · godowns", 1100), ("WebOnbStaff", "Setup · staff", 1100), ("WebOnbPhones", "Setup · phones", 1100),
          ("WebOnbImport", "Setup · import"), ("Recovery", "Owner account recovery"), ("StepUp", "Step-up confirm (2FA)")], "auth")
for i, (f, t, it) in enumerate([("MobileSplash2", "", False)][:0] + [("MobileLanguage", "First-run language", True), ("MobileRegister", "Register phone", False), ("MobileLogin", "Staff PIN sign in", True)]):
    put(f, i * 470, y, 390, 844, "Android · " + t, "auth", it)
T("auth", "Login & setup", 4480)

grid([("BomEdit", "BOM editor"), ("ProductionOrder", "Production order"), ("QualityCheck", "Quality checks"),
      ("MeltBatchNew", "New melting batch"), ("EInvoiceFlow", "E-invoice queue & errors"), ("MultiBranch", "All branches (consolidated)")], "later")
T("later", "Later releases — not in the 12-week MVP", 4480)

P_SCREENS = [
    ("PlatformHome", "Platform dashboard", 1400, True),
    ("PlatformAnalytics", "Analytics & metrics", 1000, True),
    ("PlatformFunnel", "Funnel, leads & pilots", 1000, True),
    ("PlatformTenants", "Businesses (tenants)", 1000, True),
    ("PlatformTenant", "Business detail", 1000, True),
    ("PlatformSubscriptions", "Subscriptions", 1000, True),
    ("PlatformRenewals", "Renewals at risk", 1000, True),
    ("PlatformPartners", "Partners & CAs", 1000, True),
    ("PlatformBilling", "Billing & invoices", 1000, True),
    ("PlatformPlans", "Plans & pricing", 1000, True),
    ("PlatformPayouts", "Payouts & commissions", 1000, True),
    ("PlatformSupport", "Support console", 1000, True),
    ("PlatformGrants", "Active grants", 1000, True),
    ("PlatformIncidents", "Incidents", 1000, True),
    ("PlatformDevices", "Devices & sync", 1000, True),
    ("PlatformReleases", "App releases", 1000, True),
    ("PlatformFlags", "Feature flags", 1000, True),
    ("PlatformBackups", "Backups & DR", 1000, True),
    ("PlatformMessaging", "Messaging & push", 1000, True),
    ("PlatformGst", "GST rates & HSN", 1000, True),
    ("PlatformUnits", "Units & conversions", 1000, True),
    ("PlatformTemplates", "Print templates", 1000, True),
    ("PlatformLanguages", "Languages & localisation", 1000, True),
    ("PlatformPlanDefs", "Plan definitions", 1000, True),
    ("PlatformAudit", "Platform audit log", 1000, True),
    ("PlatformLogs", "System logs", 1000, True),
    ("PlatformPrivacy", "Privacy requests", 1000, True),
    ("PlatformIntegrations", "Integrations", 1000, True),
    ("PlatformStaff", "Team & roles", 1000, True),
    ("PlatformSettings", "Platform settings", 1000, True)
]
grid(P_SCREENS, "platform", cols=3, step=1520, w=1440, prefix="Web · ")
put("PlatformSidebar", 4560, 0, 248, 1900, "Component · Platform sidebar", "platform")
T("platform", "UdyamOS platform — complete SaaS admin & operations (30 modules)", 4480)
grid([("AccountantHome", "Accountant (CA) home")], "roles")
grid([("MobileManagerHome", "Manager home"), ("MobileGodownHome", "Godown home")], "roles", y=1120, cols=2, step=470, w=390, prefix="Android · ")
T("roles", "Client role dashboards — each role sees its own home", 1600)

pages = [{"id": "web", "name": "Web app · core"}, {"id": "web2", "name": "Web app · all modules"}, {"id": "web3", "name": "Web app · forms & details"},
         {"id": "flows", "name": "Web · flows & dialogs"}, {"id": "wc", "name": "★ World-class features"}, {"id": "android", "name": "Android app"},
         {"id": "android2", "name": "Android · edge cases & dialogs"}, {"id": "ai", "name": "AI, voice & OCR"}, {"id": "auth", "name": "Login & setup"}, {"id": "later", "name": "Later releases"}, {"id": "platform", "name": "Platform admin (our team)"}, {"id": "roles", "name": "Client role dashboards"}]
idx = {"v": 3, "createdOnFiles": {"v": 1, "at": "2026-11-19T15:24:45Z"}, "title": "UdyamOS Dashboard UI", "launch": {"view": "canvas", "page": "web"},
       "pages": pages, "boards": boards, "order": list(boards.keys()), "notes": notes, "designSystems": []}
missing = [f for f in boards if not os.path.exists(os.path.join(OUT, f))]
json.dump(idx, open(os.path.join(OUT, 'canvas.json'), 'w'), ensure_ascii=False)
print(len(boards), 'boards; files missing locally (already on server):', missing)
