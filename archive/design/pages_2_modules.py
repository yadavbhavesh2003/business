# All-modules web screens, AI screens, Android menu/profile/notifications/expense
LATER = lambda rel: ["Later release (" + rel + ")", "Designed now so the data model and navigation fit. Not in the 12-week MVP (PRD §0.3).", "info"]

web('Profile.dc.html', 'My profile', {
  "active": "", "title": "My profile", "sub": "Your details, language, sign-in security and notifications.",
  "forms": [
    {"title": "About you", "fields": [{"l": "Full name", "v": "Rameshbhai Patel"}, {"l": "Mobile", "v": "+91 98250 12345", "help": "Changing it needs your passkey."}, {"l": "Email (optional)", "v": "ramesh@example.com"}, {"k": "select", "l": "Role", "v": "Owner · all branches"}]},
    {"title": "Language & voice", "fields": [{"k": "select", "l": "App language", "v": "ગુજરાતી + English"}, {"k": "select", "l": "Voice language", "v": "Gujarati"}, {"k": "select", "l": "Number format", "v": "Indian (1,00,000)"}, {"k": "toggle", "l": "Larger text", "on": False}, {"k": "toggle", "l": "Read answers aloud", "on": True}]},
    {"title": "Sign-in & security", "desc": "Owners must keep 2FA on.", "fields": [{"k": "button", "l": "Passkey · Pixel 8a ✓  (add another)", "h": "StepUp.dc.html"}, {"k": "button", "l": "Authenticator app ✓  (reset)", "h": "StepUp.dc.html"}, {"k": "button", "l": "Show 10 recovery codes"}, {"k": "button", "l": "Keyboard shortcuts", "h": "CommandPalette.dc.html"}]},
    {"title": "Notify me about", "fields": [{"k": "toggle", "l": "Bill cancelled or big discount", "on": True}, {"k": "toggle", "l": "Phone not synced for 24 hours", "on": True}, {"k": "toggle", "l": "Daily summary on WhatsApp at 9 pm", "on": True}, {"k": "toggle", "l": "Promise-to-pay due today", "on": True}]}],
  "aside": {"title": "Where you're signed in", "sub": "Sign out any you don't recognise", "items": [["Pixel 8a · app", "This phone", "ok"], ["Chrome · Windows", "Today 11:02 am"], ["Chrome · MacBook", "3 Nov"], ["My data", "Download (Excel)"], ["Delete account", "Owner transfer first", "warn"]], "foot": "Sign out everywhere else →"},
  "formButtons": [["Cancel", "Main.dc.html"], ["*Save", "Main.dc.html"]]}, h=1400)

web('Copilot.dc.html', 'Copilot', {
  "active": "", "title": "Business Copilot", "sub": "Ask in Gujarati, Hindi or English, by voice or typing. It only drafts. You confirm before anything is saved.",
  "banner": ["Voice search, voice-to-draft bill and OCR come first.", "Answers use your ledger data and respect your role. Every action is logged. Audio is not stored.", "ok"],
  "chat": [
    ["me", "Aaje ketlu vechan thayu?", "Voice · Gujarati"],
    ["ai", "Today's sales: ₹2,86,450 from 41 bills.\nCash ₹38,000 · UPI/Bank ₹1,56,000 · Credit ₹92,450.\nThat's 12% more than last Thursday.", "From sales register · till 3:52 pm", ["Open sales register"]],
    ["me", "Patel Sarees nu ketlu payment baki chhe?", "Voice · Gujarati"],
    ["ai", "Patel Sarees owes ₹2,15,000. Oldest bill is 94 days old (D01-001512).\nThey promised ₹50,000 on 25 Nov. They are 8% over their ₹2,00,000 limit.", "From party ledger", ["*Send WhatsApp reminder", "Open party"]],
    ["me", "Mahavir mate 40 meter rayon print nu bill banavo", "Voice · Gujarati"],
    ["ai", "Draft bill for Mahavir Cloth Store:\n• Rayon print 44\" · Lot RL-2292 · 40 m × ₹145 = ₹5,800\n• CGST + SGST 5% = ₹290 · Total ₹6,090\nNot saved yet.", "Draft · needs your confirmation", ["*Confirm & save", "Edit draft"]]],
  "prompts": ["Kal mate low-stock list", "Who is overdue > 60 days?", "This month profit by item", "Ramanbhai ni commission ketli?"],
  "aside": {"title": "What Copilot can do", "items": [["Search items & parties", "Now", "ok"], ["Open any screen by voice", "Now", "ok"], ["Voice → draft bill", "Now", "ok"], ["Explain a report", "Now", "ok"], ["Read answers aloud", "Now", "ok"], ["Business Q&A on ledger", "Later"], ["Low-stock prediction", "Later"], ["Payment-risk score", "Later"]], "foot": "AI safety rules →"}}, h=1200)

web('Purchases.dc.html', 'Purchases', {
  "active": "Purchases", "title": "Purchases", "sub": "Supplier bills with lots and rolls. Scan a paper bill and Copilot fills the draft for you to check.",
  "actions": ["Scan supplier bill", "*+ Purchase entry"],
  "kpis": [["This month", "₹22,40,000", "18 bills"], ["Payable", "₹7,20,000", "21 suppliers"], ["Drafts from scans", "2", "Check and post", "warn"], ["GST input (ITC)", "₹1,12,000", "Match with GSTR-2B later"]],
  "chips": ["All", "Drafts", "Unpaid", "Paid"], "search": "Bill no., supplier, lot…",
  "table": {"cols": "1fr 1.5fr 0.8fr 1.2fr 1fr 1fr", "minW": 880, "heads": ["Bill", "Supplier", "Date", "Lots received", ">Amount", "Status"], "rows": [
    [B("PB-0341", "Scanned · OCR draft"), B("Arvind Mills Agency", "Ahmedabad"), "19 Nov", "RL-2295 · 6 rolls", "₹1,48,000", C("Check draft", "warn")],
    [B("PB-0340"), B("Surat Rayon House", "Surat"), "17 Nov", "RL-2292 · 6 rolls", "₹46,800", C("Unpaid", "info")],
    [B("PB-0338"), B("Om Dyeing Works", "Job work return"), "15 Nov", "GR-0910 → DY-0910", "₹18,200", C("Paid", "ok")],
    [B("PB-0335"), B("Cambric Traders", "Ahmedabad"), "12 Nov", "CC-1180 · 4 rolls", "₹26,600", C("Paid", "ok")]]},
  "aside": {"title": "OCR draft · PB-0341", "sub": "Read from photo. Check the orange fields.", "items": [["Supplier GSTIN", "24AAACA1234M1Z2", "ok"], ["Bill date", "18-11-2026", "ok"], ["Rolls found", "6", "ok"], ["Rate per metre", "₹92 (low confidence)", "warn"], ["Total matches lines", "Yes", "ok"]], "foot": "Open draft →"}})

web('Returns.dc.html', 'Returns and credit notes', {
  "active": "Returns & credit notes", "title": "Returns & credit notes", "sub": "Sales returns, purchase returns and corrections. Posted bills are never edited.",
  "actions": ["*Sales return"],
  "kpis": [["Sales returns this month", "₹61,200", "6 credit notes"], ["Purchase returns", "₹14,000", "1 debit note"], ["Waiting for approval", "1", "", "warn"]],
  "chips": ["Credit notes", "Debit notes", "Cancelled bills"],
  "table": {"cols": "1fr 1.4fr 1fr 1.4fr 1fr 1fr", "minW": 860, "heads": ["Note", "Party", "Against bill", "Reason", ">Amount", "Status"], "rows": [
    [B("CN-0031"), B("Jay Ambe Garments"), "D02-001842", "Wrong party · bill cancelled", "₹18,750", C("Posted", "ok")],
    [B("CN-0030"), B("Shiv Fabrics"), "D02-001790", "Shade mismatch · 12 m back to stock", "₹1,740", C("Posted", "ok")],
    [B("CN-0029"), B("Mahavir Cloth Store"), "D01-001701", "Rate difference", "₹2,400", C("Needs approval", "warn")],
    [B("DN-0004"), B("Arvind Mills Agency"), "PB-0322", "Damaged roll returned", "₹14,000", C("Posted", "ok")]]}})

web('Expenses.dc.html', 'Expenses', {
  "active": "Expenses", "title": "Expenses", "sub": "Rent, transport, wages, electricity. Add from phone with a photo of the receipt.",
  "actions": ["*+ Add expense"],
  "kpis": [["This month", "₹1,84,500", "32 entries"], ["Transport", "₹42,000", "23% of expenses"], ["Without receipt photo", "5", "", "warn"]],
  "chips": ["All", "Transport", "Rent", "Wages", "Utilities", "Other"],
  "table": {"cols": "0.8fr 1.4fr 1.2fr 1fr 1fr 0.8fr", "minW": 820, "heads": ["Date", "Expense", "Paid to", "Mode", ">Amount", "Receipt"], "rows": [
    ["19 Nov", B("Transport · Surat"), "Shree Logistics", "Cash", "₹3,800", C("Photo", "ok")],
    ["18 Nov", B("Loading labour"), "Daily labour", "Cash", "₹1,200", C("Missing", "warn")],
    ["15 Nov", B("Shop rent · November"), "Landlord", "Bank", "₹45,000", C("Photo", "ok")],
    ["12 Nov", B("Electricity"), "PGVCL", "UPI", "₹6,420", C("Photo", "ok")]]}})

web('Accounts.dc.html', 'Accounts and ledgers', {
  "active": "Accounts & ledgers", "title": "Accounts & ledgers", "sub": "Party ledgers, cash and bank book, and simple profit & loss. Export to Tally for full accounting.",
  "actions": ["Export to Tally", "Bank reconcile", "*Profit & loss"],
  "kpis": [["Cash in hand", "₹43,000", "2 counters"], ["Bank balance (book)", "₹8,64,200", "HDFC current"], ["Gross profit · this month", "₹7,10,000", "14.6% margin", "ok"]],
  "chips": ["Cash book", "Bank book", "Party ledger", "Day book"],
  "table": {"cols": "0.8fr 1.6fr 1fr 1fr 1fr", "minW": 760, "heads": ["Date", "Entry", ">In", ">Out", ">Balance"], "rows": [
    ["19 Nov", B("Opening balance"), "", "", "₹5,000"],
    ["19 Nov", B("Cash sales · Counter 1", "18 bills"), "₹21,500", "", "₹26,500"],
    ["19 Nov", B("Cash sales · Counter 2", "14 bills"), "₹16,500", "", "₹43,000"],
    ["19 Nov", B("Transport · Shree Logistics"), "", "₹3,800", "₹39,200"],
    ["19 Nov", B("Loading labour"), "", "₹1,200", "₹38,000"]]},
  "note": "Full double-entry accounting is not in the MVP. Your CA keeps final books in Tally using our export (PRD §0.3)."})

web('Gst.dc.html', 'GST and e-invoice', {
  "active": "GST & e-invoice", "title": "GST & e-invoice", "sub": "Monthly GST summary for your CA, and e-invoice / e-way bill status.",
  "banner": ["E-Invoice and E-Way Bill: Release 2.", "Shown for planning. Needs GSP/IRP access and CA sign-off first (Compliance pack §1.4).", "info"],
  "actions": ["Download for CA", "*GST summary"],
  "kpis": [["Output GST · Nov", "₹2,43,100", "From 612 bills"], ["Input GST · Nov", "₹1,12,000", "From 18 purchase bills"], ["E-invoices needed", "41", "B2B bills · turnover above limit", "warn"], ["E-way bills needed", "6", "Goods over ₹50,000 moved", "warn"]],
  "chips": ["E-invoice", "E-way bill", "GST summary"],
  "table": {"cols": "1fr 1.4fr 1fr 1.6fr 1fr", "minW": 860, "heads": ["Bill", "Party", ">Amount", "IRN / EWB no.", "Status"], "rows": [
    [B("D01-001861"), B("Navkar Textiles"), "₹1,11,510", "IRN 7c2e…a91f", C("Generated", "ok")],
    [B("D02-001850"), B("Shiv Fabrics"), "₹41,300", {"t": "GSTIN inactive", "h": "EInvoiceFlow.dc.html"}, C("Failed", "bad")],
    [B("D03-000418"), B("Patel Sarees"), "₹34,500", "—", C("Pending", "warn")],
    [B("DC-D04-0091"), B("Patel Sarees", "Challan · Surat"), "₹13,920", "EWB 1810 2233 4455", C("Valid till 21 Nov", "ok")]]}})

web('Manufacturing.dc.html', 'Manufacturing', {
  "active": "Manufacturing", "title": "Manufacturing", "sub": "Bill of materials, production orders, work in progress and costing.",
  "banner": LATER("industry pack"), "actions": ["BOMs", "*+ Production order"],
  "kpis": [["Open orders", "4", "2 in progress"], ["WIP value", "₹3,20,000"], ["Wastage this month", "3.8%", "Target 3%", "warn"], ["Quality rejects", "1.2%", "", "ok"]],
  "chips": ["Orders", "Bill of materials", "Material issue", "Quality checks"],
  "table": {"cols": "1fr 1.6fr 1fr 1fr 1fr 1fr", "minW": 880, "heads": ["Order", "Product", ">Planned", ">Done", ">Wastage", "Status"], "rows": [
    [B("PO-0021"), B("Printed dupatta", "BOM v3 · grey + dye + print"), "1,200 pc", "760 pc", "2.9%", C("In progress", "info")],
    [B("PO-0020"), B("Kurti fabric · cut", "BOM v1"), "800 m", "800 m", "4.6%", C("Done", "ok")],
    [B("PO-0019"), B("Saree with border", "BOM v2"), "300 pc", "0 pc", "—", {"t": "Material short", "tone": "warn", "h": "QualityCheck.dc.html"}]]}})

web('Foundry.dc.html', 'Metal melting', {
  "active": "Metal melting", "title": "Metal melting & foundry", "sub": "Melting batches by furnace and shift, with input, output, slag and recovery %.",
  "banner": LATER("separate validated segment"), "actions": ["*+ Melting batch"],
  "kpis": [["Batches this week", "18", "3 furnaces"], ["Avg. recovery", "92.4%", "Target 93%", "warn"], ["Slag & loss", "7.6%"], ["Finished stock", "48.2 t"]],
  "chips": ["Batches", "Scrap stock", "Grades", "Costing"],
  "table": {"cols": "1fr 1fr 1fr 1fr 1fr 1fr 1fr", "minW": 900, "heads": ["Batch", "Furnace · shift", ">Input", ">Output", ">Slag", ">Recovery", "Operator"], "rows": [
    [B("MB-1140"), "F2 · night", "5,200 kg", "4,830 kg", "370 kg", {"t": "92.9%", "b": True}, "Raju"],
    [B("MB-1139"), "F1 · day", "4,800 kg", "4,390 kg", "410 kg", {"t": "91.5%", "c": "warn"}, "Sanjay"],
    [B("MB-1138"), "F3 · day", "6,000 kg", "5,610 kg", "390 kg", {"t": "93.5%", "c": "ok"}, "Mahesh"]]},
  "note": "Recovery % = finished usable output ÷ input weight × 100. Accounting for scrap and slag must be set up with the customer's accountant."})

web('Branches.dc.html', 'Branches and godowns', {
  "active": "Branches & godowns", "title": "Branches & godowns", "sub": "Where you sell and store stock, and transfers between them.",
  "actions": ["Add godown", "*+ Stock transfer"],
  "kpis": [["Branches", "1", "Multi-branch: later"], ["Godowns", "2", "+ 2 processors"], ["Transfers in transit", "1", "", "warn"]],
  "chips": ["Locations", "Transfers"],
  "table": {"cols": "1.4fr 1fr 1.4fr 1fr 1fr", "minW": 800, "heads": ["Location", "Type", "Address", ">Lots", ">Stock value"], "rows": [
    [{"t": "Bhavnagar shop", "b": True, "h": "MultiBranch.dc.html"}, "Branch", "Kapad Bazar, Bhavnagar", "—", "—"],
    [B("Godown 1"), "Godown", "Behind shop", "212", "₹44,10,000"],
    [B("Godown 2"), "Godown", "Chitra GIDC", "96", "₹15,20,000"],
    [B("Om Dyeing Works"), "Processor", "Jetpur", "4", "₹32,800"],
    [B("Ambika Printers"), "Processor", "Jetpur", "6", "₹49,600"]]},
  "note": "Branch-wise reports and consolidation for multi-branch businesses come later (trigger: 3+ paying multi-branch customers)."})

web('PriceLists.dc.html', 'Price lists and schemes', {
  "active": "Price lists & schemes", "title": "Price lists & schemes", "sub": "Different rates for wholesale, retail and special parties. Staff can't go below the lowest allowed price.",
  "actions": ["*+ Price list"],
  "chips": ["Price lists", "Schemes", "Party-specific"],
  "table": {"cols": "1.4fr 1.4fr 1fr 1fr 1fr", "minW": 780, "heads": ["Item", "Lot", ">Wholesale", ">Retail", ">Lowest allowed"], "rows": [
    [B("Rayon print 44\""), "RL-2292", "₹145 / m", "₹180 / m", "₹138 / m"],
    [B("Cotton cambric 58\""), "CC-1180", "₹118 / m", "₹150 / m", "₹112 / m"],
    [B("Georgette dress material"), "GD-0431", "₹640 / pc", "₹850 / pc", "₹610 / pc"],
    [B("Chiffon saree"), "CS-0077", "₹900 / pc", "₹1,250 / pc", "₹860 / pc"]]},
  "aside": {"title": "Active schemes", "items": [["Diwali: 2% off above ₹1 lakh", "Till 30 Nov"], ["Patel Sarees special rate", "Rayon ₹140"], ["Cash discount 1%", "Paid in 7 days"]], "foot": "Add scheme →"}})

web('Notifications.dc.html', 'Notifications', {
  "active": "Notifications", "title": "Notifications", "sub": "Alerts for you, and messages sent to your customers.",
  "actions": ["Message templates", "*Mark all read"],
  "chips": ["For me", "Sent to customers", "Failed"],
  "table": {"cols": "0.8fr 2.4fr 1fr 1fr", "minW": 760, "heads": ["When", "What happened", "Channel", "Status"], "rows": [
    ["3:12 pm", {"t": "Discount 14% needs your approval", "s": "Kiran · INV D01-001877", "b": True, "h": "Approvals.dc.html"}, "App + WhatsApp", C("Unread", "warn")],
    ["2:30 pm", {"t": "Lot RL-2291 went negative after sync", "b": True, "h": "ConflictDetail.dc.html"}, "App", C("Unread", "warn")],
    ["11:40 am", {"t": "Godown phone not synced for 2 days", "b": True, "h": "Devices.dc.html"}, "App + SMS", C("Unread", "warn")],
    ["10:05 am", {"t": "Payment reminder sent to 9 parties", "s": "Template: overdue_v2", "b": True, "h": "Collections.dc.html"}, "WhatsApp", C("Delivered 8 / 9", "info")],
    ["10:01 am", {"t": "₹30,000 UPI from Shiv Fabrics auto-matched", "b": True, "h": "UpiCollections.dc.html"}, "App", C("Done", "ok")],
    ["9:00 pm (yest.)", B("Daily summary: ₹3,12,800 sales"), "WhatsApp", C("Read", "ok")]]}})

web('Audit.dc.html', 'Audit log', {
  "active": "Audit log", "title": "Audit log", "sub": "Every change, who made it, on which device, before and after. It cannot be switched off or edited.",
  "actions": ["*Export for auditor"],
  "chips": ["All", "Bills", "Stock", "Money", "Settings", "Sign-ins"], "search": "User, bill no., device…",
  "table": {"cols": "0.9fr 1fr 1.8fr 1fr 1.4fr", "minW": 900, "heads": ["When", "Who · device", "Action", "Record", "Change"], "rows": [
    ["15:52", B("Divya", "D01"), "Approved bill over credit limit", "D01-001880", "Manager PIN"],
    ["15:12", B("Kiran", "D01"), "Discount above limit requested", "D01-001877", "0% → 14%"],
    ["14:30", B("System", "Sync"), "Negative stock flagged", {"t": "RL-2291", "h": "ConflictDetail.dc.html"}, "52 → −18 m"],
    ["11:02", B("Rameshbhai", "Web"), "Changed setting", "Auto-lock", "10 → 5 min"],
    ["09:15", B("Divya", "D05"), "Price changed", "Cotton cambric 58\"", "₹114 → ₹118"]]},
  "note": "Required for companies under the Companies Act audit-trail rule. Entries are hash-chained, so tampering shows."})

web('ImportExport.dc.html', 'Import and export', {
  "active": "Import & export", "title": "Import & export", "sub": "Bring data from Excel or Tally, and take all your data out any time.",
  "forms": [
    {"title": "Import", "desc": "We check every row before anything is saved.", "fields": [{"k": "button", "l": "Parties from Excel"}, {"k": "button", "l": "Items & opening stock from Excel"}, {"k": "button", "l": "Opening balances from Tally"}, {"k": "button", "l": "Bank statement (PDF/Excel)", "h": "BankMatch.dc.html"}]},
    {"title": "Export", "desc": "Needs owner 2FA.", "fields": [{"k": "button", "l": "Tally XML (sales, purchases, receipts)", "h": "StepUp.dc.html"}, {"k": "button", "l": "All data as Excel", "h": "StepUp.dc.html"}, {"k": "button", "l": "All bills as PDF (zip)", "h": "StepUp.dc.html"}, {"k": "button", "l": "Audit trail (CSV)", "h": "StepUp.dc.html"}]},
    {"title": "Backup", "desc": "Cloud backups in India, every day, kept 8 years for your books.", "fields": [{"k": "toggle", "l": "Daily cloud backup", "on": True, "help": "Always on. Last: today 2:00 am · stored in Mumbai, India."}, {"l": "Last restore test", "v": "1 Nov 2026 · passed", "help": "We restore a copy of your books every month to prove backups work."}, {"k": "button", "l": "Download a backup now", "h": "StepUp.dc.html"}]}]})

web('Subscription.dc.html', 'Subscription', {
  "active": "Subscription", "title": "Subscription", "sub": "Your plan, devices and invoices from UdyamOS.",
  "banner": ["Your data is always yours.", "Full Excel + Tally export on every plan. If you stop paying or cancel, you keep read-only login and export for 12 months.", "ok"],
  "kpis": [["Plan", "Business", "Up to 8 devices"], ["Devices used", "6 / 8"], ["Renews", "31 Mar 2027", "₹11,999 + GST / year"]],
  "table": {"cols": "1fr 1.2fr 1fr 1fr", "minW": 700, "heads": ["Invoice", "Period", ">Amount", "Status"], "rows": [
    [B("UOS-2026-0142"), "Apr 2026 – Mar 2027", "₹14,159", C("Paid", "ok")],
    [B("UOS-2026-0031"), "Pilot · Jan – Mar 2026", "₹2,000", C("Paid", "ok")]]},
  "aside": {"title": "Compare plans", "items": [["Starter · 2 devices", "₹4,999"], ["Business · 8 devices", "₹11,999", "ok"], ["Pro · 15+ devices", "₹24,999"], ["Prices", "Hypothesis · to validate"]], "foot": "Change plan →"}})

web('Help.dc.html', 'Help and support', {
  "active": "Help & support", "title": "Help & support", "sub": "Videos in Gujarati, chat with us, or let support look at your account for a limited time.",
  "forms": [
    {"title": "Get help", "fields": [{"k": "button", "l": "WhatsApp support (9 am – 8 pm)"}, {"k": "button", "l": "Call back in Gujarati"}, {"k": "button", "l": "How-to videos"}, {"k": "button", "l": "Practise safely: training mode", "h": "TrainingMode.dc.html"}]},
    {"title": "Support access", "desc": "Our staff cannot see your data unless you allow it here. Every view is logged and shown to you.", "fields": [{"k": "toggle", "l": "Allow support to view my account", "on": False}, {"k": "select", "l": "For how long", "v": "24 hours"}, {"k": "button", "l": "See access log", "h": "PrivacyRequests.dc.html"}]},
    {"title": "Screen reference (for the team)", "desc": "Screens that are not on the normal path.", "fields": [{"k": "button", "l": "Messages, errors & empty states", "h": "States.dc.html"}, {"k": "button", "l": "Manager tablet billing (two-pane)", "h": "TabletBilling.dc.html"}]},
    {"title": "Privacy & grievance", "desc": "As required under India's DPDP Act.", "fields": [{"k": "button", "l": "Privacy notice"}, {"k": "button", "l": "Contact Grievance Officer"}]}]})

# ---- AI on Android
mob('MobileVoice.dc.html', 'Voice bill', {
  "title": "Voice bill", "sub": "Speak in Gujarati, Hindi or English", "back": "MobileHome.dc.html", "badge": ["Works offline*", "mute"],
  "voice": ["Mahavir mate chalis meter rayon print, baar meter cambric", "Mahavir ke liye… / For Mahavir: 40 m rayon print, 12 m cambric"],
  "listTitle": "Draft (not saved) · tap a line to fix",
  "items": [["Party: Mahavir Cloth Store", "Matched from your parties", "", "Sure", "ok", None, "MobileParty.dc.html"], ["Rayon print 44\" · RL-2292", "40 m × ₹145", "₹5,800", "Sure", "ok", None, "MobileBilling.dc.html"], ["Cotton cambric 58\" · CC-1180", "12 m × ₹118", "₹1,416", "Check lot", "warn", None, "MobileStock.dc.html"]],
  "note": ["*Basic commands work offline; full understanding needs internet. Nothing is saved until you tap Confirm. Audio is not stored.", "mute"],
  "buttons": [["Edit", "MobileBilling.dc.html"], ["*Confirm draft", "MobileBilling.dc.html"]]})

mob('MobileCopilot.dc.html', 'Copilot', {
  "title": "Copilot", "sub": "Ask about sales, stock, parties", "back": "MobileDrawer.dc.html", "badge": ["AI", "ok"],
  "chat": [["me", "Mara pase rayon print ketlo stock chhe?", "Voice · 3:55 pm"], ["ai", "Rayon print 44\": 272 m in 6 rolls (Godown 1: 212 m, Godown 2: 60 m).\nLot RL-2291 is −18 m. Ask the manager to fix it.", "From stock ledger · 🔊 read aloud"], ["me", "Kal mate low-stock list aapo"], ["ai", "3 items are low for tomorrow:\n• Cotton cambric 58\" · 143 m (sells ~60 m/day)\n• Georgette D22 · 58 pc\n• Chiffon saree assorted · 62 pc", "From last 30 days of sales"]],
  "ask": True})

mob('MobileScanBill.dc.html', 'Scan supplier bill', {
  "title": "Scan supplier bill", "sub": "Photo → purchase draft", "back": "MobileDrawer.dc.html", "badge": ["OCR", "info"],
  "qr": "Fit the whole paper bill inside the frame. Hold steady.",
  "listTitle": "Read from photo · please check",
  "items": [["Arvind Mills Agency", "GSTIN 24AAACA1234M1Z2", "", "Sure", "ok"], ["Bill AMA/2611 · 18 Nov", "6 rolls rayon print", "₹1,48,000", "Sure", "ok"], ["Rate ₹92 / m", "Hard to read", "", "Check", "warn"]],
  "buttons": [["Retake", "MobileScanBill.dc.html"], ["*Make draft", "MobilePurchase.dc.html"]]})

# ---- Android menu/profile/notifications/expense
mob('MobileMenu.dc.html', 'All features', {
  "title": "All features", "sub": "Grid view of the menu", "back": "MobileDrawer.dc.html",
  "profile": ["Kiran Solanki", "Cashier · Counter 1 · switch user", "KS"],
  "menu": [
    ["Daily work", [["New bill", "MobileBilling.dc.html"], ["Voice bill", "MobileVoice.dc.html", "New", "ok"], ["Delivery challan", "MobileChallan.dc.html"], ["Receive payment", "MobilePayment.dc.html"], ["Sales order", "MobileSalesOrder.dc.html"], ["Sales return", "MobileReturn.dc.html"], ["Expense", "MobileExpense.dc.html"], ["Collections", "MobileCollections.dc.html", "New", "ok"]]],
    ["Stock & parties", [["Stock check", "MobileStock.dc.html"], ["Parties", "MobileOutstanding.dc.html"], ["Scan supplier bill", "MobileScanBill.dc.html", "OCR", "info"], ["Stock count", "MobileStockCount.dc.html"]]],
    ["Ask & alerts", [["Copilot", "MobileCopilot.dc.html", "AI", "ok"], ["Notifications", "MobileNotifications.dc.html", "5", "warn"]]],
    ["This phone", [["Sync status", "MobileSync.dc.html", "2", "warn"], ["Printer", "MobilePrinter.dc.html"], ["Training mode", "MobileTraining.dc.html"], ["Close day", "MobileCloseDay.dc.html"]]]],
  "nav": "Menu"})

mob('MobileProfile.dc.html', 'My profile', {
  "title": "My profile", "sub": "Kiran Solanki · Cashier", "back": "MobileDrawer.dc.html",
  "hero": {"l": "My work today", "v": "18 bills · ₹1,24,300", "s": "Cash in drawer ₹21,500 · 1 approval waiting", "dark": True},
  "chips": ["ગુજરાતી", "हिंदी", "English"], "chipsLabel": "Language",
  "listTitle": "Settings",
  "items": [["Close my day", "Count cash and sign out", "›"], ["Change my PIN", "Last changed 2 months ago", "›"], ["Voice language", "Gujarati", "›", "", "", None, "MobileSettings.dc.html"], ["Read answers aloud", "On", "›", "", "", None, "MobileReadAloud.dc.html"], ["My limits", "Discount up to 8% · no cancel", "›"]],
  "buttons": [["Sign out", "MobileLogin.dc.html"], ["*Close day", "MobileCloseDay.dc.html"]]})

mob('MobileNotifications.dc.html', 'Notifications', {
  "title": "Notifications", "sub": "5 unread", "back": "MobileDrawer.dc.html",
  "chips": ["All", "Approvals", "Sync", "Payments"], "chipsLabel": "Filter",
  "items": [["Discount 14% sent for approval", "D01-001877 · 3:12 pm", "", "Waiting", "info"], ["2 bills saved on this phone", "Will sync when online", "", "Offline", "warn"], ["₹30,000 UPI received · Shiv Fabrics", "Matched to D02-001850", "", "Paid", "ok", None, "MobilePayments.dc.html"], ["New price list from office", "Cotton cambric now ₹118", "", "9:15 am", "mute", None, "MobileItems.dc.html"], ["Your cash closing was −₹500", "Yesterday · manager notified", "", "Check", "warn", None, "MobileCloseDay.dc.html"]],
  "nav": "x"})

mob('MobileExpense.dc.html', 'Add expense', {
  "title": "Add expense", "sub": "Counter 1", "back": "MobileDrawer.dc.html",
  "fields": [["Amount", "₹3,800", True], ["Paid to", "Shree Logistics"]],
  "chips": ["Transport", "Labour", "Tea & snacks", "Other"], "chipsLabel": "Type",
  "items": [["Receipt photo", "Tap to take a photo", "", "Required above ₹1,000", "warn"]],
  "buttons": [["Cancel", "MobileDrawer.dc.html"], ["*Save expense", "MobileHome.dc.html"]]})
