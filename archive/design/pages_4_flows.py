# Onboarding, dialogs, documents, later releases, Android edge cases
web('WebConsent.dc.html', 'Privacy notice', {
  "sidebar": False, "centered": True, "maxW": 1100, "title": "Before you start: your data, in plain words", "sub": "Read in ગુજરાતી · हिंदी · English. You can withdraw consent any time in Profile.",
  "paper": ["Privacy notice (summary)", ["What we collect: your name, mobile, business details, and the bills, stock and party data you enter."], ["Why: only to run UdyamOS for your business: billing, stock, reports, sync and support."], ["Where: stored in India, encrypted, backed up daily."], ["Your customers' data: you control it. We process it only on your instructions (Data Processing Agreement)."], ["Voice: audio is turned into text and not stored. We never sell your data or use it for AI training without separate permission."], ["Your rights: see, correct, download or delete your data. Complaints: Grievance Officer."], "-", ["Version 1.0 · 19 Nov 2026"]],
  "forms": [{"title": "Your choices", "fields": [{"k": "select", "l": "Notice language", "v": "ગુજરાતી"}, {"k": "toggle", "l": "I have read the privacy notice and agree", "on": True}, {"k": "toggle", "l": "I accept the Terms of Service and DPA", "on": True}, {"k": "toggle", "l": "Product tips on WhatsApp (optional)", "on": False}]}],
  "formButtons": [["Download PDF", "WebConsent.dc.html"], ["*Agree & continue", "WebOnboarding.dc.html"]]})

web('WebOnbGodowns.dc.html', 'Setup godowns', {
  "sidebar": False, "centered": True, "maxW": 980, "steps": ONB, "stepAt": 2, "title": "Where do you keep stock?", "sub": "Add each godown and any processor (dyeing, printing) where your goods go for job work.",
  "table": {"cols": "1.4fr 1fr 1.6fr", "minW": 600, "heads": ["Name", "Type", "Address"], "rows": [[B("Godown 1"), "Godown", "Behind shop, Kapad Bazar"], [B("Godown 2"), "Godown", "Chitra GIDC"], [B("Om Dyeing Works"), "Processor", "Jetpur"]]},
  "forms": [{"title": "Add another", "fields": [{"l": "Name", "v": "", "ph": "e.g. Ambika Printers"}, {"k": "select", "l": "Type", "v": "Processor"}]}],
  "formButtons": [["Back", "WebOnboarding.dc.html"], ["*Continue", "WebOnbStaff.dc.html"]]}, h=1100)

web('WebOnbStaff.dc.html', 'Setup staff', {
  "sidebar": False, "centered": True, "maxW": 980, "steps": ONB, "stepAt": 3, "title": "Who works with you?", "sub": "Counter and godown staff only need a 4-digit PIN. Managers and your CA get their own sign-in.",
  "table": {"cols": "1.4fr 1fr 1fr 1fr", "minW": 600, "heads": ["Name", "Role", "Sign-in", "Status"], "rows": [[B("Divya Joshi", "99090 xxxxx"), "Manager", "OTP + PIN", C("Invited", "info")], [B("Kiran Solanki"), "Cashier", "PIN", C("PIN set", "ok")], [B("Anil Makwana"), "Godown", "PIN", C("PIN set", "ok")]]},
  "forms": [{"title": "Add person", "fields": [{"l": "Name", "v": ""}, {"k": "select", "l": "Role", "v": "Cashier"}]}],
  "formButtons": [["Skip for now", "WebOnbPhones.dc.html"], ["*Continue", "WebOnbPhones.dc.html"]]}, h=1100)

web('WebOnbPhones.dc.html', 'Setup phones', {
  "sidebar": False, "centered": True, "maxW": 980, "steps": ONB, "stepAt": 4, "title": "Connect your billing phones", "sub": "Install the app, open it, and scan this code. Each phone gets its own bill series.",
  "paper": ["Scan with the UdyamOS app", ["[ QR code · valid 10 minutes ]"], ["Code: 4821-7730"], "-", ["Phone will be named: Counter 1 · series D01"]],
  "aside": {"title": "Connected", "items": [["Counter 1 · Redmi 12", "D01", "ok"], ["Owner phone · Pixel 8a", "D03", "ok"], ["Waiting for…", "Counter 2"]]},
  "forms": [{"title": "Printer", "fields": [{"k": "select", "l": "Receipt paper", "v": "80 mm"}, {"k": "button", "l": "Print test from Counter 1", "h": "MobilePrinter.dc.html"}]}],
  "formButtons": [["Back", "WebOnbStaff.dc.html"], ["*Continue", "WebOnbImport.dc.html"]]}, h=1100)

web('WebOnbImport.dc.html', 'Setup import', {
  "sidebar": False, "centered": True, "maxW": 980, "steps": ONB, "stepAt": 5, "title": "Bring your existing data", "sub": "Optional. Start fresh, or import parties, items and opening stock. Takes about 15 minutes.",
  "forms": [{"title": "Choose", "fields": [{"k": "button", "l": "Parties from Excel"}, {"k": "button", "l": "Items & opening stock from Excel"}, {"k": "button", "l": "Opening balances from Tally"}, {"k": "button", "l": "Start fresh, add as I go", "h": "EmptyDashboard.dc.html"}]}],
  "formButtons": [["Back", "WebOnbPhones.dc.html"], ["*Finish setup", "EmptyDashboard.dc.html"]]})

web('Recovery.dc.html', 'Account recovery', {
  "sidebar": False, "centered": True, "maxW": 620, "steps": ["Identify", "Verify business", "Video call", "48-hour wait"], "stepAt": 1, "title": "Recover owner account", "sub": "Lost both your phone and passkey? We verify you carefully so nobody else can take your business.",
  "forms": [{"title": "Verify your business", "fields": [{"l": "GSTIN", "v": "24AAAPK1234L1Z9"}, {"l": "Owner PAN", "v": "AAAPK1234L"}, {"l": "New mobile number", "v": ""}, {"k": "select", "l": "Video call slot", "v": "Tomorrow 11:00 am"}]}],
  "formButtons": [["Cancel", "WebLogin.dc.html"], ["*Submit request", "WebLogin.dc.html"]],
  "note": "All admins are told about this request. Access returns 48 hours after the video call, unless someone stops it."})

web('ImportWizard.dc.html', 'Import wizard', {
  "active": "Import & export", "steps": ["Upload", "Match columns", "Check rows", "Import"], "stepAt": 2, "title": "Import parties · check rows", "sub": "parties_tally.xlsx · 212 rows. Fix the orange rows or skip them. Nothing is saved until you press Import.",
  "actions": ["Download errors", "*Import 204 rows"],
  "kpis": [["Ready", "204", "", "ok"], ["Need fixing", "6", "", "warn"], ["Duplicates", "2", "Will be merged", "warn"]],
  "chips": ["Need fixing", "Ready", "Duplicates"],
  "table": {"cols": "0.4fr 1.5fr 1.3fr 1fr 1.6fr", "minW": 860, "heads": ["Row", "Name", "GSTIN", ">Opening bal.", "Problem"], "rows": [
    ["14", B("Shree Ram Textiles"), "24ABCDE12F1Z", "₹45,000", C("GSTIN is too short", "warn")],
    ["37", B("Om Sarees"), "—", "₹ abc", C("Balance is not a number", "warn")],
    ["52", B("Patel Sarees"), "24ABCDE1234F1Z5", "₹1,20,000", C("Already exists · merge", "info")],
    ["88", B("(blank)"), "24QRSTU3456V1Z4", "₹0", C("Name missing", "warn")]]},
  "aside": {"title": "Column match", "items": [["Party Name →", "Name", "ok"], ["GST No →", "GSTIN", "ok"], ["Closing Bal →", "Opening balance", "ok"], ["Mobile No →", "Mobile", "ok"], ["Area →", "(skip)"]]}})

web('StepUp.dc.html', 'Confirm it is you', {
  "sidebar": False, "centered": True, "maxW": 520, "title": "Confirm it's you", "sub": "You're about to do something sensitive. This needs your passkey or authenticator code.",
  "banner": ["Export all data (Excel)", "Requested from Chrome · Windows · 3:58 pm", "warn"],
  "forms": [{"title": "Choose one", "fields": [{"k": "button", "l": "Use passkey (fingerprint / face)", "h": "ImportExport.dc.html"}, {"l": "Authenticator code", "v": "", "ph": "6 digits"}]}],
  "formButtons": [["Cancel", "Main.dc.html"], ["*Confirm", "ImportExport.dc.html"]]})

web('ChallanConvert.dc.html', 'Bill from challans', {
  "active": "Delivery challans", "back": "Challans.dc.html", "backT": "Delivery challans", "title": "Make bill from challans · Patel Sarees", "sub": "Pick the challans to bill. Stock already moved at challan, so it won't move again.",
  "actions": ["Cancel", "*Create invoice"],
  "table": {"cols": "0.4fr 1fr 1.4fr 0.8fr 0.8fr 1fr", "minW": 820, "heads": ["", "Challan", "Lots", ">Qty", "Out on", ">Value"], "rows": [
    [C("✓", "ok"), B("DC-D04-0091"), "RL-2292 · R8, R9", "96 m", "18 Nov", "₹13,920"],
    [C("✓", "ok"), B("DC-D04-0089"), "GD-0431 · D22", "20 pc", "12 Nov", "₹12,800"],
    [C("—", "mute"), B("DC-D04-0085"), "CS-0077", "10 pc", "6 Nov", "₹9,000"]]},
  "aside": {"title": "Invoice preview", "items": [["Challans", "2"], ["Taxable", "₹26,720"], ["CGST + SGST 5%", "₹1,336"], ["Total", "₹28,056", "ok"], ["Credit after bill", "Over limit", "bad"]], "foot": "Manager approval needed →"}})

web('CancelInvoice.dc.html', 'Cancel invoice', {
  "active": "Sales & invoices", "back": "Invoices.dc.html", "backT": "Sales & invoices", "title": "Cancel D02-001842?", "sub": "The bill stays in records. A credit note is created and stock comes back if you choose.",
  "forms": [{"title": "Reason", "fields": [{"k": "select", "l": "Why", "v": "Wrong party selected"}, {"l": "Note (required)", "v": "Should be Jay Ambe Fashion, not Garments"}, {"k": "toggle", "l": "Return goods to stock", "on": True}, {"k": "toggle", "l": "Make a new bill to the right party", "on": True}]}],
  "aside": {"title": "Credit note CN-0031", "items": [["Amount", "₹18,750"], ["GST period", "Nov 2026 · same month", "ok"], ["Payment linked", "None", "ok"], ["Needs", "Owner/Manager + PIN", "warn"]]},
  "formButtons": [["Keep bill", "Invoices.dc.html"], ["*Cancel bill", "StepUp.dc.html"]]})

web('WhatsAppShare.dc.html', 'WhatsApp message', {
  "active": "Collections", "back": "Collections.dc.html", "backT": "Collections", "title": "Payment reminder · preview", "sub": "Sent from your WhatsApp Business number using an approved template. Customers can reply STOP.",
  "paper": ["WhatsApp · to Patel Sarees", ["નમસ્તે Patel Sarees,"], ["Shree Krishna Textiles તરફથી યાદી: ₹2,15,000 બાકી છે."], ["સૌથી જૂનું બિલ D01-001512 (17 Aug) · 94 દિવસ."], ["તમારું ખાતું જુઓ: udyam.in/l/7Kx2 (live ledger link)"], ["UPI થી ચૂકવો: shreekrishna@hdfc"], ["આભાર, Rameshbhai · 98250 xxxxx"], "-", ["Template: overdue_gu_v2 · approved"]],
  "aside": {"title": "Send to", "items": [["Patel Sarees", "98250 xxxxx"], ["Language", "ગુજરાતી"], ["Attach", "Ledger link + UPI"], ["Last reminder", "12 Nov"], ["Opted in", "Yes", "ok"]], "foot": "Send now →"}})

web('SupplierPay.dc.html', 'Pay supplier', {
  "active": "Payments", "back": "Payments.dc.html", "backT": "Payments", "title": "Pay supplier · Surat Rayon House", "sub": "Choose bills to settle. TDS is deducted if it applies.",
  "kpis": [["Payable", "₹1,12,400", "3 bills"], ["Paying now", "₹93,600"], ["TDS (194Q)", "₹0", "Below threshold"]],
  "table": {"cols": "0.4fr 1fr 0.8fr 1fr 1fr", "minW": 700, "heads": ["", "Bill", "Date", ">Due", ">Paying"], "rows": [[C("✓", "ok"), B("PB-0340"), "17 Nov", "₹46,800", "₹46,800"], [C("✓", "ok"), B("PB-0329"), "2 Nov", "₹46,800", "₹46,800"], [C("—", "mute"), B("PB-0318"), "20 Oct", "₹18,800", "₹0"]]},
  "aside": {"title": "Pay by", "items": [["Mode", "Bank transfer (NEFT)"], ["From", "HDFC current"], ["UTR", "Auto-filled from bank statement"], ["Approval", "Owner", "warn"]], "foot": "Save payment →"}})

web('Cheques.dc.html', 'Cheques', {
  "active": "Payments", "back": "Payments.dc.html", "backT": "Payments", "title": "Cheques", "sub": "Track cheques from receipt to clearing. A bounced cheque re-opens the bills it paid.",
  "chips": ["To deposit", "Deposited", "Cleared", "Bounced"],
  "table": {"cols": "1fr 1.4fr 1fr 1fr 1fr 1fr", "minW": 860, "heads": ["Cheque", "Party", "Bank", ">Amount", "Date", "Status"], "rows": [
    [B("004512"), B("Patel Sarees"), "SBI Surat", "₹50,000", "16 Nov", C("To deposit", "warn")],
    [B("118220"), B("Shiv Fabrics"), "BoB Palitana", "₹40,000", "12 Nov", C("Deposited", "info")],
    [B("771003"), B("Mahavir Cloth Store"), "HDFC Mahuva", "₹55,000", "1 Nov", C("Bounced", "bad")],
    [B("220981"), B("Navkar Textiles"), "ICICI Ahd", "₹80,000", "28 Oct", C("Cleared · bank matched", "ok")]]},
  "aside": {"title": "Bounced · 771003", "items": [["Bills re-opened", "D01-001640"], ["Bank charges", "₹590"], ["Party told", "WhatsApp · 3 Nov", "ok"], ["Block party", "Until cleared", "warn"]]}})

web('Transfer.dc.html', 'Stock transfer', {
  "active": "Branches & godowns", "back": "Branches.dc.html", "backT": "Branches & godowns", "title": "Stock transfer · TR-0012", "sub": "Move rolls between godowns. Stock is 'in transit' until the other godown confirms.",
  "forms": [{"title": "From → to", "fields": [{"k": "select", "l": "From", "v": "Godown 1"}, {"k": "select", "l": "To", "v": "Godown 2"}, {"l": "Vehicle / person", "v": "Anil · tempo"}]}],
  "table": {"cols": "1.6fr 1.2fr 0.8fr", "minW": 560, "heads": ["Item", "Lot · roll", ">Qty"], "rows": [[B("Rayon print 44\""), "RL-2292 · R12", "60 m"], [B("Chiffon saree"), "CS-0077", "20 pc"]]},
  "formButtons": [["Cancel", "Branches.dc.html"], ["*Send", "Branches.dc.html"]]})

web('ConflictDetail.dc.html', 'Resolve conflict', {
  "active": "Approvals", "back": "Approvals.dc.html", "backT": "Approvals", "title": "Lot RL-2291 sold twice offline", "sub": "Both bills are valid and already given to customers. Choose how to fix the stock, not the bills.",
  "table": {"cols": "1.2fr 1fr 1fr 1fr", "minW": 700, "heads": ["", "Bill D01-001869", "Bill D04-000212", "Lot RL-2291"], "rows": [
    [B("Device"), "Counter 1 · Kiran", "Godown phone · Anil", "—"], [B("Made at"), "19 Nov 1:12 pm (offline)", "19 Nov 1:40 pm (offline)", "—"],
    [B("Qty"), "40 m", "30 m", "52 m in stock"], [B("Synced"), "2:28 pm", "2:30 pm", {"t": "−18 m now", "c": "bad"}]]},
  "aside": {"title": "Choose a fix", "items": [["Transfer 18 m from RL-2292", "Suggested", "ok"], ["Mark stock count needed", "Godown 1"], ["Change lot on D04-000212", "Same design"], ["Leave negative", "Not advised", "warn"]], "foot": "Apply fix (PIN) →"}})

web('SalesRegister.dc.html', 'Sales register', {
  "active": "Reports", "back": "Reports.dc.html", "backT": "Reports", "title": "Sales register · 1–19 Nov 2026", "sub": "Every bill with tax split. Filter, then export for your CA.",
  "actions": ["Excel", "*PDF"],
  "kpis": [["Bills", "612"], ["Taxable", "₹46,30,762"], ["GST", "₹2,31,538"], ["Total", "₹48,62,300"]],
  "chips": ["All", "B2B", "B2C", "Inter-state"],
  "table": {"cols": "0.7fr 1fr 1.4fr 1fr 0.8fr 0.8fr 1fr", "minW": 960, "heads": ["Date", "Bill", "Party · GSTIN", ">Taxable", ">CGST+SGST", ">IGST", ">Total"], "rows": [
    ["19 Nov", "D01-001880", B("Patel Sarees", "24ABCDE1234F1Z5"), "₹16,430", "₹821.50", "—", "₹17,252"],
    ["19 Nov", "D01-001879", B("Mahavir Cloth Store", "24FGHIJ5678K1Z2"), "₹17,371", "₹868.56", "—", "₹18,240"],
    ["19 Nov", "D01-001878", B("Walk-in", "B2C"), "₹2,048", "₹102.38", "—", "₹2,150"],
    ["16 Nov", "D01-001861", B("Navkar Textiles", "24CDEFG2345H1Z1"), "₹1,06,200", "₹5,310", "—", "₹1,11,510"]]}})

web('GstSummary.dc.html', 'GST summary', {
  "active": "GST & e-invoice", "back": "Gst.dc.html", "backT": "GST & e-invoice", "title": "GST summary · November 2026", "sub": "GSTR-1 style view for your CA. UdyamOS does not file returns.",
  "actions": ["Excel", "*JSON for CA"],
  "chips": ["B2B", "B2C", "HSN summary", "Credit notes"],
  "table": {"cols": "1.4fr 0.6fr 1fr 1fr 1fr", "minW": 760, "heads": ["HSN · description", ">Rate", ">Taxable", ">Tax", ">Qty"], "rows": [[B("5408 · Rayon fabric"), "5%", "₹14,20,000", "₹71,000", "9,790 m"], [B("5208 · Cotton fabric"), "5%", "₹8,40,000", "₹42,000", "7,118 m"], [B("5407 · Synthetic fabric"), "5%", "₹9,80,000", "₹49,000", "1,531 pc"], [B("6204 · Readymade"), "5%/12%", "₹2,10,000", "₹16,800", "500 pc"]]},
  "aside": {"title": "Checks before filing", "items": [["Bills without HSN", "0", "ok"], ["Bills not synced", "1", "warn"], ["B2B without GSTIN", "0", "ok"], ["Credit notes", "4 · ₹61,200"]], "foot": "Share with CA →"}})

web('SubscriptionLimit.dc.html', 'Device limit', {
  "active": "Subscription", "back": "Subscription.dc.html", "backT": "Subscription", "title": "Subscription alerts", "sub": "Billing never stops suddenly. Phones keep working; you get time to fix.",
  "banner": ["Device limit reached (8 of 8).", "Counter 3 can't be registered. Remove an old device or upgrade to Pro.", "warn"],
  "table": {"cols": "1.2fr 2.4fr 1.2fr", "minW": 760, "heads": ["Alert", "What happens", "Action"], "rows": [
    [C("Renews in 15 days", "info"), "Reminder on web and WhatsApp. Nothing changes.", {"t": "Pay now", "h": "Subscription.dc.html"}],
    [C("Payment failed", "warn"), "7 days of grace. Everything works.", {"t": "Update payment", "h": "Subscription.dc.html"}],
    [C("Expired", "bad"), "View, print and export only. No new bills. Data is never deleted.", {"t": "Renew", "h": "Subscription.dc.html"}],
    [C("Device limit", "warn"), "New phones can't register. Existing ones work.", {"t": "Remove a device", "h": "Devices.dc.html"}]]},
  "aside": {"title": "Upgrade to Pro", "items": [["Devices", "15+"], ["Price", "₹24,999 / year"], ["Pay difference", "₹4,700 (pro-rata)"]], "foot": "Upgrade →"}})

web('EmptyDashboard.dc.html', 'First day', {
  "active": "Dashboard", "title": "Welcome, Rameshbhai", "sub": "Your dashboard fills up as you bill. Here's what to do first.",
  "kpis": [["Today's sales", "₹0", "No bills yet"], ["Items", "0", "Add or import"], ["Parties", "0", "Add or import"], ["Phones", "1 of 8", "Owner phone"]],
  "forms": [{"title": "Get started · 3 of 6 done", "fields": [{"k": "toggle", "l": "Business & tax set up", "on": True}, {"k": "toggle", "l": "Godowns added", "on": True}, {"k": "toggle", "l": "Owner phone connected", "on": True}, {"k": "button", "l": "Add your first 10 items"}, {"k": "button", "l": "Add or import parties"}, {"k": "button", "l": "Make a test bill and print"}]}],
  "aside": {"title": "Need help?", "items": [["Video: first bill", "2 min"], ["WhatsApp support", "9 am – 8 pm"], ["Free setup visit", "Pilot customers"]]}})

web('ChallanView.dc.html', 'Challan', {
  "active": "Delivery challans", "back": "Challans.dc.html", "backT": "Delivery challans", "title": "Challan DC-D04-0091", "sub": "Open · goods with party · not billed yet",
  "actions": ["Print", "*Make bill"],
  "paper": ["DELIVERY CHALLAN", ["Shree Krishna Textiles · GSTIN 24AAAPK1234L1Z9"], "-", ["DC-D04-0091", "18-11-2026", ""], ["To: Patel Sarees, Surat · GSTIN 24ABCDE1234F1Z5"], ["Transport: Shree Logistics · GJ04 AB 1234 · LR 5521"], "-", ["Item · lot · roll", "Qty", "Value"], ["Rayon print 44\" · RL-2292 · R8", "48 m", "6,960"], ["Rayon print 44\" · RL-2292 · R9", "48 m", "6,960"], "-", ["Total (for transport only, not a tax invoice)", "96 m", "₹13,920", True], ["E-way bill: 1810 2233 4455"], ["Receiver signature"]]}, h=1100)

web('ReceiptView.dc.html', 'Receipt', {
  "active": "Payments", "back": "Payments.dc.html", "backT": "Payments", "title": "Receipt RC-D03-0211", "sub": "Navkar Textiles · Bank NEFT · auto-matched from bank statement",
  "actions": ["Share", "*PDF"],
  "paper": ["PAYMENT RECEIPT", ["Shree Krishna Textiles · Bhavnagar"], "-", ["RC-D03-0211", "19-11-2026", ""], ["Received from: Navkar Textiles, Ahmedabad"], ["Mode: NEFT · UTR HDFCN52611190045"], "-", ["Against bill", "", "Amount"], ["D01-001861 (16 Nov)", "", "1,11,510.00"], "-", ["Total received", "", "₹1,11,510", True], ["Balance due after this: ₹0"], ["Signed: Rameshbhai"]]})

web('ExpenseView.dc.html', 'Expense', {
  "active": "Expenses", "back": "Expenses.dc.html", "backT": "Expenses", "title": "Expense EX-0412 · Transport", "sub": "19 Nov · paid by Kiran from Counter 1 cash",
  "paper": ["Shree Logistics · receipt photo", ["[ photo of transport receipt ]"], "-", ["Paid to", "", "Shree Logistics"], ["Amount", "", "₹3,800"], ["Linked to", "", "DC-D04-0091"]],
  "aside": {"title": "Details", "items": [["Category", "Transport"], ["Mode", "Cash"], ["Added on", "Counter 1 · D01"], ["Approved", "Not needed (< ₹5,000)", "ok"]], "foot": "Edit →"}})

web('PriceListEdit.dc.html', 'Edit price list', {
  "active": "Price lists & schemes", "back": "PriceLists.dc.html", "backT": "Price lists & schemes", "title": "Edit price list · Wholesale", "sub": "Changes reach all phones at their next sync. Old offline bills keep their old price.",
  "forms": [{"title": "Rule", "fields": [{"l": "Name", "v": "Wholesale"}, {"k": "select", "l": "Based on", "v": "Retail − 20%"}, {"l": "Valid from", "v": "20 Nov 2026"}, {"k": "toggle", "l": "Round to nearest ₹1", "on": True}]},
    {"title": "Scheme", "fields": [{"l": "Name", "v": "Diwali 2% above ₹1 lakh"}, {"l": "Min. bill", "v": "₹1,00,000"}, {"l": "Discount", "v": "2%"}, {"l": "Ends", "v": "30 Nov 2026"}]}],
  "formButtons": [["Cancel", "PriceLists.dc.html"], ["*Save", "PriceLists.dc.html"]]})

web('TemplateEdit.dc.html', 'Message template', {
  "active": "Notifications", "back": "Notifications.dc.html", "backT": "Notifications", "title": "Message template · Payment reminder", "sub": "WhatsApp templates need Meta approval (1–2 days). SMS templates need DLT approval.",
  "forms": [{"title": "Template", "fields": [{"k": "select", "l": "Channel", "v": "WhatsApp"}, {"k": "select", "l": "Language", "v": "ગુજરાતી"}, {"l": "Text", "v": "નમસ્તે {{party}}, ₹{{due}} બાકી છે…"}, {"k": "toggle", "l": "Add live ledger link + UPI", "on": True}]}],
  "paper": ["Preview", ["નમસ્તે Patel Sarees, ₹2,15,000 બાકી છે. સૌથી જૂનું બિલ 94 દિવસ. ખાતું: udyam.in/l/7Kx2 · UPI: shreekrishna@hdfc"], "-", ["Status: Approved by Meta · 10 Nov"]],
  "formButtons": [["Cancel", "Notifications.dc.html"], ["*Submit for approval", "Notifications.dc.html"]]})

web('PrivacyRequests.dc.html', 'Privacy requests', {
  "active": "Help & support", "back": "Help.dc.html", "backT": "Help & support", "title": "Privacy & support requests", "sub": "Data rights requests and every time our support team looked at your account.",
  "banner": ["Support access is ON until 20 Nov 4:00 pm.", "Granted by Rameshbhai for 'printer problem'. Turn off any time.", "warn"],
  "table": {"cols": "0.9fr 1.6fr 1fr 1fr", "minW": 760, "heads": ["When", "Request", "By", "Status"], "rows": [
    ["19 Nov", B("Support viewed Devices page", "Ticket #3312"), "UdyamOS · Neha", C("Logged", "info")],
    ["19 Nov", B("Support access granted · 24 h"), "Rameshbhai", C("Active", "warn")],
    ["2 Oct", B("Download all my data"), "Rameshbhai", C("Done", "ok")],
    ["14 Sep", B("Delete ex-staff personal data", "Suresh (left)"), "Rameshbhai", C("Done · bills kept for GST", "ok")]]},
  "aside": {"title": "Your rights", "items": [["See your data", "Download"], ["Correct", "Profile / parties"], ["Delete", "After legal retention"], ["Complain", "Grievance Officer"]]}})

web('RevokeDevice.dc.html', 'Revoke device', {
  "active": "Devices & sync", "back": "Devices.dc.html", "backT": "Devices & sync", "title": "Revoke Godown phone (D04)?", "sub": "Use this if the phone is lost, stolen or the person left.",
  "forms": [{"title": "What happens", "fields": [{"k": "toggle", "l": "Upload its 14 waiting events first, if it connects", "on": True}, {"k": "toggle", "l": "Then wipe all UdyamOS data on it", "on": True}, {"k": "select", "l": "Reason", "v": "Phone lost"}]}],
  "aside": {"title": "Effect", "items": [["Sign-ins on it", "Stop now", "ok"], ["Series D04", "Retired, never reused"], ["Events after now", "Rejected", "warn"], ["Needs", "Your passkey"]]},
  "formButtons": [["Cancel", "Devices.dc.html"], ["*Revoke & wipe", "StepUp.dc.html"]]})

web('TabletBilling.dc.html', 'Tablet billing', {
  "active": "Sales & invoices", "title": "Manager tablet · New bill", "sub": "Same app as the phone, two-pane on tablets: items left, bill right.",
  "search": "Scan or search item…", "chips": ["Rayon", "Cotton", "Georgette", "Sarees", "Recent"],
  "table": {"cols": "1.6fr 1fr 0.8fr", "minW": 520, "heads": ["Item", "Lot", ">Rate"], "rows": [[B("Rayon print 44\""), "RL-2292 · 272 m", "₹145"], [B("Cotton cambric 58\""), "CC-1180 · 143 m", "₹118"], [B("Georgette D22"), "GD-0431 · 58 pc", "₹640"], [B("Chiffon saree"), "CS-0077 · 62 pc", "₹900"]]},
  "aside": {"title": "Bill · Shiv Fabrics", "items": [["Rayon 40 m × 145", "₹5,800"], ["Cambric 25 m × 118", "₹2,950"], ["CGST + SGST 5%", "₹437.50"], ["Round off", "+₹0.50"], ["Total", "₹9,188", "ok"]], "foot": "Save & print →"}}, w=1194, h=834)

# ---- later releases
LT = lambda r: ["Later release (" + r + ")", "Designed for planning. Not in the 12-week MVP.", "info"]
web('BomEdit.dc.html', 'Bill of materials', {
  "active": "Manufacturing", "back": "Manufacturing.dc.html", "backT": "Manufacturing", "banner": LT("manufacturing pack"), "title": "BOM · Printed dupatta (v3)", "sub": "What goes into 100 pieces, with expected wastage.",
  "table": {"cols": "1.6fr 1fr 0.8fr 0.8fr", "minW": 640, "heads": ["Material / process", "Type", ">Per 100 pc", ">Wastage"], "rows": [[B("Grey cloth 44\""), "Material", "250 m", "3%"], [B("Dyeing"), "Job work", "250 m", "1%"], [B("Printing"), "Job work", "250 m", "1%"], [B("Tassels"), "Material", "400 pc", "2%"], [B("Labour · stitching"), "Labour", "₹1,200", "—"]]},
  "aside": {"title": "Cost per piece", "items": [["Material", "₹62.40"], ["Job work", "₹18.00"], ["Labour", "₹12.00"], ["Total", "₹92.40", "ok"]]}})
web('ProductionOrder.dc.html', 'Production order', {
  "active": "Manufacturing", "back": "Manufacturing.dc.html", "backT": "Manufacturing", "banner": LT("manufacturing pack"), "title": "PO-0021 · Printed dupatta × 1,200", "sub": "Started 10 Nov · due 25 Nov",
  "kpis": [["Done", "760 pc", "63%"], ["WIP value", "₹1,10,000"], ["Wastage", "2.9%", "Target 3%", "ok"]],
  "table": {"cols": "1.4fr 1fr 1fr 1fr", "minW": 680, "heads": ["Stage", ">Issued", ">Received", "Status"], "rows": [[B("Grey cloth issue"), "3,000 m", "—", C("Done", "ok")], [B("Dyeing · Om Dyeing"), "3,000 m", "2,950 m", C("Done", "ok")], [B("Printing · Ambika"), "2,950 m", "1,900 m", C("In progress", "info")], [B("Stitching"), "1,900 m", "760 pc", C("In progress", "info")]]},
  "aside": {"title": "Next", "items": [["Quality check", "Batch 3"], ["Material short", "Tassels 400 pc", "warn"]]}})
web('QualityCheck.dc.html', 'Quality check', {
  "active": "Manufacturing", "back": "Manufacturing.dc.html", "backT": "Manufacturing", "banner": LT("manufacturing pack"), "title": "Quality checks", "sub": "Pass, rework or reject, by batch.",
  "table": {"cols": "1fr 1.4fr 0.8fr 0.8fr 0.8fr 1fr", "minW": 820, "heads": ["Batch", "Product", ">Checked", ">Rework", ">Reject", "Result"], "rows": [[B("QC-118"), "Printed dupatta · b3", "300", "6", "2", C("Pass", "ok")], [B("QC-117"), "Printed dupatta · b2", "260", "18", "4", C("Rework", "warn")]]}})
web('MeltBatchNew.dc.html', 'New melting batch', {
  "active": "Metal melting", "back": "Foundry.dc.html", "backT": "Metal melting", "banner": LT("foundry pack"), "title": "New melting batch · MB-1141", "sub": "Enter weights from the weighbridge. Recovery is calculated.",
  "forms": [{"title": "Batch", "fields": [{"k": "select", "l": "Furnace", "v": "F2"}, {"k": "select", "l": "Shift", "v": "Day"}, {"l": "Operator", "v": "Raju"}, {"k": "select", "l": "Material grade", "v": "HMS 1 scrap"}]}, {"title": "Weights", "fields": [{"l": "Input weight", "v": "5,000 kg"}, {"l": "Output (usable)", "v": "4,640 kg"}, {"l": "Slag", "v": "310 kg"}, {"l": "Other loss", "v": "50 kg"}]}],
  "aside": {"title": "Result", "items": [["Recovery", "92.8%", "ok"], ["Target", "93%"], ["Balance check", "5,000 = 4,640 + 310 + 50", "ok"]]},
  "formButtons": [["Cancel", "Foundry.dc.html"], ["*Save batch", "Foundry.dc.html"]]})
web('EInvoiceFlow.dc.html', 'E-invoice', {
  "active": "GST & e-invoice", "back": "Gst.dc.html", "backT": "GST & e-invoice", "banner": ["Release 2 · IRN failed for 1 bill.", "D02-001850: buyer GSTIN inactive on GST portal. Fix the party or issue as B2C after CA check.", "bad"],
  "title": "E-invoice queue", "sub": "Bills are sent to the IRP through a licensed GSP. IRN and QR are added to the PDF.",
  "table": {"cols": "1fr 1.4fr 1fr 1.6fr 1fr", "minW": 860, "heads": ["Bill", "Party", ">Amount", "IRP response", "Status"], "rows": [[B("D01-001861"), "Navkar Textiles", "₹1,11,510", "IRN 7c2e…a91f · ack 1123", C("Done", "ok")], [B("D02-001850"), "Shiv Fabrics", "₹41,300", "GSTIN inactive (2172)", C("Failed", "bad")], [B("D03-000418"), "Patel Sarees", "₹34,500", "Queued", C("Waiting", "info")]]},
  "aside": {"title": "Rules", "items": [["Send within", "30 days of bill"], ["Cancel IRN", "Within 24 h"], ["Offline bills", "Sent after sync"]]}})
web('MultiBranch.dc.html', 'All branches', {
  "active": "Branches & godowns", "back": "Branches.dc.html", "backT": "Branches & godowns", "banner": LT("multi-branch"), "title": "All branches · November", "sub": "Consolidated view for owners with more than one shop.",
  "kpis": [["Total sales", "₹1,12,40,000"], ["Receivable", "₹38,20,000"], ["Stock value", "₹1,40,00,000"]],
  "table": {"cols": "1.4fr 1fr 1fr 1fr 1fr", "minW": 760, "heads": ["Branch", ">Sales", ">Margin", ">Receivable", ">Overdue"], "rows": [[B("Bhavnagar"), "₹48,62,300", "14.6%", "₹18,42,300", {"t": "₹6,10,800", "c": "warn"}], [B("Surat"), "₹41,10,000", "12.1%", "₹14,10,000", "₹2,20,000"], [B("Ahmedabad"), "₹22,67,700", "15.8%", "₹5,67,700", "₹40,000"]]}})

# ---- Android edge cases & dialogs
mob('MobileConsent.dc.html', 'Privacy', {"title": "Your data", "sub": "Read before you start", "dark": True,
  "items": [["What we keep", "Bills, stock and parties you enter"], ["Where", "In India, encrypted"], ["On this phone", "Locked; owner can wipe if lost"], ["Voice", "Turned into text, audio not stored"], ["Full notice", "ગુજરાતી · हिंदी · English", "›"]],
  "note": ["By continuing you agree to the Privacy Notice and Terms.", "mute"], "buttons": [["*Agree & continue", "MobileLogin.dc.html"]]})
mob('MobileForgotPin.dc.html', 'Forgot PIN', {"title": "Forgot PIN?", "sub": "Kiran Solanki", "back": "MobileLogin.dc.html",
  "hero": {"l": "A manager can reset it here", "v": "Ask Divya or Rameshbhai", "s": "Or reset from the web Users page"},
  "items": [["Divya Joshi", "Manager", "", "Present", "ok", True], ["Rameshbhai Patel", "Owner", "", "", "", False]],
  "keypad": "Divya, enter your PIN to reset Kiran's"})
mob('MobileLocked.dc.html', 'User locked', {"title": "Kiran is locked", "sub": "5 wrong PINs on this phone", "dark": True,
  "hero": {"l": "For safety", "v": "Locked 4:05 pm", "s": "Owner has been told", "tone": "warn", "dark": True},
  "items": [["Other staff can still sign in", "Mehul, Divya"], ["Bills saved on phone are safe", "2 waiting to sync"]],
  "buttons": [["Other user", "MobileLogin.dc.html"], ["*Manager unlock", "MobileForgotPin.dc.html"]]})
mob('MobileWiped.dc.html', 'Phone removed', {"title": "This phone was removed", "sub": "By the owner · 19 Nov 4:10 pm", "dark": True,
  "hero": {"l": "What happened", "v": "Data wiped", "s": "Waiting bills were uploaded first", "dark": True},
  "items": [["14 events uploaded", "Before wipe", "", "Done", "ok"], ["Local data", "Deleted", "", "Done", "ok"], ["Series D04", "Retired"]],
  "buttons": [["*Register again", "MobileRegister.dc.html"]]})
mob('MobileGrantExpired.dc.html', 'Connect to continue', {"title": "Connect to keep billing", "sub": "Offline for 7 days", "dark": True,
  "hero": {"l": "This phone has been offline since", "v": "12 Nov", "s": "Bills can't be made until it connects once. Nothing is lost.", "tone": "warn", "dark": True},
  "items": [["Saved on phone", "38 bills · 6 receipts", "", "Safe", "ok"], ["You can still", "View, search, print old bills", "", "", "", None, "MobileBills.dc.html"]],
  "note": ["Why? So removed staff or lost phones can't keep billing forever.", "mute"], "buttons": [["Wi-Fi settings", "MobileSettings.dc.html"], ["*Try now", "MobileSync.dc.html"]]})
mob('MobileUpdate.dc.html', 'Update needed', {"title": "Update needed", "sub": "Version 1.0.2 → 1.0.4", "dark": True,
  "hero": {"l": "To keep syncing", "v": "Update the app", "s": "Your 2 waiting bills stay safe during the update", "dark": True},
  "items": [["What's new", "Faster search, Gujarati print fix"], ["Size", "18 MB"], ["Billing offline", "Still works today", "", "OK", "ok"]],
  "buttons": [["Later today", "MobileHome.dc.html"], ["*Update now", "MobileHome.dc.html"]]})
mob('MobileStorageFull.dc.html', 'Storage almost full', {"title": "Phone storage almost full", "sub": "92% used", "back": "MobileHome.dc.html",
  "hero": {"l": "Free up space to keep billing safely", "v": "Need 300 MB", "s": "UdyamOS uses 120 MB", "tone": "warn"},
  "items": [["Old bill PDFs on phone", "Can download again", "210 MB", "Clear", "info"], ["WhatsApp media", "Outside UdyamOS", "1.4 GB"], ["Photos", "Outside UdyamOS", "3.2 GB"]],
  "note": ["Never clear UdyamOS app data: waiting bills would be lost.", "warn"], "buttons": [["*Clear old PDFs", "MobileHome.dc.html"]]})
mob('MobileSyncRejected.dc.html', 'Bill rejected', {"title": "1 bill needs attention", "sub": "Server could not post it", "back": "MobileSync.dc.html", "badge": ["Rejected", "bad"],
  "hero": {"l": "D01-001881 · ₹6,200 · Mahavir Cloth Store", "v": "Not posted", "s": "Price below lowest allowed (₹130 < ₹138)", "tone": "warn", "dark": True},
  "items": [["Bill given to customer?", "Printed 4:20 pm"], ["Owner told", "In Approvals", "", "Waiting", "info"]],
  "note": ["Don't make the bill again. The owner will approve or correct it with a credit note.", "info"], "buttons": [["*OK", "MobileSync.dc.html"]]})
mob('MobileCancelBill.dc.html', 'Cancel bill', {"title": "Cancel bill?", "sub": "D01-001879 · ₹18,240", "back": "MobileBillView.dc.html",
  "chips": ["Wrong party", "Wrong item", "Customer refused", "Other"], "chipsLabel": "Reason",
  "fields": [["Note", "Party wanted next week"]],
  "note": ["Cashiers can't cancel. This goes to the manager. A credit note is made if approved.", "info"],
  "buttons": [["Keep", "MobileBillView.dc.html"], ["*Ask manager", "MobileManagerPin.dc.html"]]})
mob('MobileWhatsApp.dc.html', 'Share bill', {"title": "Share on WhatsApp", "sub": "D01-001880 · Patel Sarees", "back": "MobileReceipt.dc.html",
  "chat": [["me", "નમસ્તે Patel Sarees,\nબિલ D01-001880 ₹17,252 · PDF જોડેલ છે.\nUPI: shreekrishna@hdfc\nખાતું: udyam.in/l/7Kx2\n— Shree Krishna Textiles", "PDF · 84 KB"]],
  "chips": ["ગુજરાતી", "हिंदी", "English"], "chipsLabel": "Message language",
  "note": ["Offline? It will send when the internet is back.", "mute"], "buttons": [["Cancel", "MobileReceipt.dc.html"], ["*Send", "MobileReceipt.dc.html"]]})
mob('MobileReceiptPrint.dc.html', 'Payment receipt', {"title": "Receipt saved", "sub": "RC-D01-0541", "back": "MobileOutstanding.dc.html", "badge": ["Saved on device", "warn"],
  "receipt": ["SHREE KRISHNA TEXTILES", "PAYMENT RECEIPT", "-", ["No.", "RC-D01-0541"], ["Date", "19-11-2026 16:30"], ["From", "Patel Sarees"], ["Mode", "Cheque 004520"], "-", ["D01-001512", "40,000.00"], ["D02-001601", "10,000.00"], "-", ["RECEIVED", "₹50,000", True], ["Balance due", "₹1,65,000"], "-", "આભાર"],
  "buttons": [["Print", "MobilePrinter.dc.html"], ["*WhatsApp", "MobileWhatsApp.dc.html"]]})
mob('MobileChallanToBill.dc.html', 'Bill from challan', {"title": "Bill from challans", "sub": "Patel Sarees · 3 open", "back": "MobileChallan.dc.html",
  "items": [["DC-D04-0091 · 96 m", "18 Nov", "₹13,920", "", "", True], ["DC-D04-0089 · 20 pc", "12 Nov", "₹12,800", "", "", True], ["DC-D04-0085 · 10 pc", "6 Nov", "₹9,000", "", "", False]],
  "hero": {"l": "New bill total (with GST)", "v": "₹28,056", "s": "Stock already moved at challan", "dark": True},
  "buttons": [["Cancel", "MobileChallan.dc.html"], ["*Make bill", "MobileManagerPin.dc.html"]]})
mob('MobileTransfer.dc.html', 'Stock transfer', {"title": "Stock transfer", "sub": "Godown 1 → Godown 2", "back": "MobileDrawer.dc.html",
  "chips": ["Send", "Receive"], "chipsLabel": "Direction",
  "items": [["Rayon print 44\" · RL-2292 · R12", "Scanned", "60 m", "", "", True], ["Chiffon saree · CS-0077", "Scanned", "20 pc", "", "", True]],
  "note": ["Godown 2 must scan to receive. Until then it shows 'in transit'.", "info"], "buttons": [["Scan roll", "MobileStock.dc.html"], ["*Send", "MobileHome.dc.html"]]})
mob('MobileStepUp.dc.html', 'Confirm', {"title": "Confirm it's you", "sub": "Approve discount 14% · ₹42,600", "back": "MobileApprovals.dc.html",
  "hero": {"l": "Use fingerprint", "v": "Touch the sensor", "s": "Or enter your PIN below"},
  "keypad": "Rameshbhai, enter PIN", "buttons": [["Cancel", "MobileApprovals.dc.html"], ["*Confirm", "MobileOwner.dc.html"]]})
mob('MobileCopilotLimits.dc.html', 'Copilot limits', {"title": "Copilot", "sub": "Kiran · Cashier", "back": "MobileCopilot.dc.html", "badge": ["AI", "ok"],
  "chat": [["me", "Aa mahine profit ketlo thayo?"], ["ai", "Profit reports are only for the owner and accountant. I can show your own sales today instead.", "Permission check"], ["me", "Mahavir mate rate shu chhe?"], ["ai", "I'm not sure which item you mean. Did you mean:\n• Rayon print 44\" · ₹145\n• Cotton cambric 58\" · ₹118", "Asking instead of guessing"]],
  "ask": True})
mob('MobileEmptyHome.dc.html', 'First day', {"title": "Welcome, Kiran", "sub": "Counter 1 · first day", "dark": True, "menuBtn": True,
  "hero": {"l": "No bills yet", "v": "Let's make the first one", "s": "Takes about 30 seconds once items are added", "dark": True},
  "items": [["Printer connected", "Counter 1 printer", "", "Done", "ok"], ["Items on this phone", "146 synced", "", "Done", "ok"], ["Try a test bill", "Won't count in sales", "›"]],
  "buttons": [["Watch 1-min video", "MobileHelp.dc.html"], ["*New bill", "MobileBilling.dc.html"]], "nav": "Home"})
