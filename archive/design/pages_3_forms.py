# Create / edit / detail web screens + more Android screens
web('Products.dc.html', 'Items and products', {
  "active": "Items", "title": "Items", "sub": "Your catalogue: units, conversions, variants, HSN and barcodes.",
  "actions": ["Print barcodes", "Import", "*+ Add item"],
  "kpis": [["Items", "146", "38 with variants"], ["Missing HSN", "4", "Needed on GST bills", "warn"], ["Low stock", "7 items", "Below reorder level", "warn"]],
  "chips": ["All", "Fabric (m)", "Pieces", "Low stock", "No HSN"], "search": "Name, design, barcode, HSN…",
  "table": {"cols": "1.6fr 0.8fr 1.2fr 0.6fr 0.8fr 0.9fr 0.9fr", "minW": 940, "heads": ["Item", "HSN", "Units", ">GST", ">Rate", ">Stock", "Barcode"], "rows": [
    [B("Rayon print 44\"", "12 designs · variants"), "5408", "Buy: roll · Sell: m", "5%", "₹145 / m", "272 m", "Per roll"],
    [B("Cotton cambric 58\"", "White, cream"), "5208", "Buy: roll · Sell: m", "5%", "₹118 / m", {"t": "143 m", "c": "warn"}, "Per roll"],
    [B("Georgette dress material", "Design × colour"), "5407", "Piece", "5%", "₹640 / pc", "58 pc", "Per piece"],
    [B("Chiffon saree", "Assorted"), {"t": "Missing", "c": "warn", "h": "ProductEdit.dc.html"}, "Piece", "5%", "₹900 / pc", "62 pc", "Per piece"],
    [B("Readymade kurti", "S, M, L, XL"), "6204", "Piece · set of 4", "5% / 12%", "₹420 / pc", "120 pc", "Per size"]]}})

web('ProductEdit.dc.html', 'Add item', {
  "active": "Items", "back": "Products.dc.html", "backT": "Items", "title": "Add item", "sub": "Set it up once. Billing then takes seconds.",
  "forms": [
    {"title": "Basics", "fields": [{"l": "Item name", "v": "Rayon print 44\""}, {"l": "Gujarati name (on receipts)", "v": "રેયોન પ્રિન્ટ 44\""}, {"l": "HSN code", "v": "5408", "help": "Suggested from name · check with CA"}, {"k": "select", "l": "GST rate", "v": "5%"}]},
    {"title": "Units & conversion", "desc": "Buy by roll, sell by metre. Stock is always kept in the selling unit.", "fields": [{"k": "select", "l": "Selling unit", "v": "Metre (m)"}, {"k": "select", "l": "Buying unit", "v": "Roll"}, {"l": "1 roll =", "v": "52 m (enter actual per roll at purchase)"}, {"k": "toggle", "l": "Track lot and roll numbers", "on": True}]},
    {"title": "Variants", "desc": "Only if you sell the same item in sizes, colours or designs.", "fields": [{"l": "Design", "v": "R-110, R-112, R-118 …"}, {"l": "Colour", "v": ""}, {"l": "Size", "v": ""}]},
    {"title": "Price & barcode", "fields": [{"l": "Wholesale rate", "v": "₹145"}, {"l": "Retail rate", "v": "₹180"}, {"l": "Lowest allowed rate", "v": "₹138"}, {"l": "Reorder level", "v": "150 m"}, {"k": "button", "l": "Design roll label", "h": "LabelDesigner.dc.html"}]}],
  "formButtons": [["Cancel", "Products.dc.html"], ["*Save item", "Products.dc.html"]]}, h=1500)

web('InvoiceNew.dc.html', 'New invoice', {
  "active": "Sales & invoices", "back": "Invoices.dc.html", "backT": "Sales & invoices", "title": "New invoice · D03/26-27/000419", "sub": "Party → items → review → save. Taxes are calculated for you. Press F2 to save, Esc to cancel.",
  "actions": ["Save as quotation", "Hold", "*Save & print"],
  "kpis": [["Party", "Navkar Textiles", "Ahmedabad · GSTIN 24CDEFG2345H1Z1"], ["Credit available", "₹3,00,000", "Within limit", "ok"], ["Broker", "Ramanbhai Dalal", "1.5% commission"], ["Place of supply", "Gujarat (24)", "CGST + SGST"]],
  "search": "Scan or type item, lot, roll…", "chips": ["Items", "Delivery & transport", "Notes"],
  "table": {"cols": "1.8fr 1.1fr 0.8fr 0.8fr 0.7fr 1fr", "minW": 860, "heads": ["Item", "Lot · roll", ">Qty", ">Rate", ">Disc.", ">Amount"], "rows": [
    [B("Rayon print 44\"", "HSN 5408 · 5%"), "RL-2292 · R7, R8", "104 m", "₹145", "2%", "₹14,778"],
    [B("Cotton cambric 58\"", "HSN 5208 · 5%"), "CC-1180 · R2", "52 m", "₹118", "—", "₹6,136"],
    [B("Georgette dress material", "HSN 5407 · 5%"), "GD-0431 · D22", "30 pc", "₹640", "—", "₹19,200"]]},
  "aside": {"title": "Total", "items": [["Taxable value", "₹40,114"], ["CGST 2.5%", "₹1,002.85"], ["SGST 2.5%", "₹1,002.85"], ["Round off", "+₹0.30"], ["Total", "₹42,120", "ok"], ["Payment", "Credit · 45 days · UPI QR on bill"]], "foot": "Take payment now →"}})

web('InvoiceView.dc.html', 'Invoice preview', {
  "active": "Sales & invoices", "back": "Invoices.dc.html", "backT": "Sales & invoices", "title": "Invoice D01/26-27/001861", "sub": "Posted · synced · paid. To change it, raise a credit note.",
  "actions": ["Credit note", "Download PDF", "*Share on WhatsApp"],
  "paper": ["SHREE KRISHNA TEXTILES", ["12, Kapad Bazar, Bhavnagar 364001 · GSTIN 24AAAPK1234L1Z9"], "-", ["Tax invoice D01/26-27/001861", "Date 16-11-2026", ""], ["Bill to: Navkar Textiles, Ahmedabad · GSTIN 24CDEFG2345H1Z1"], ["Place of supply: Gujarat (24) · Broker: Ramanbhai Dalal"], "-", ["Item / HSN", "Qty × rate", "Amount"], ["Rayon print 44\" · 5408 · RL-2290", "400 m × 145", "58,000.00"], ["Cotton cambric 58\" · 5208 · CC-1175", "300 m × 118", "35,400.00"], ["Georgette D19 · 5407", "20 pc × 640", "12,800.00"], "-", ["Taxable value", "", "1,06,200.00"], ["CGST 2.5% + SGST 2.5%", "", "5,310.00"], ["Round off", "", "0.00"], ["Total (₹ One lakh eleven thousand five hundred ten)", "", "₹1,11,510", True], "-", ["[ UPI QR · scan to pay · shreekrishna@hdfc ]"], ["IRN: 7c2e…a91f · E-invoice QR printed here when enabled"], ["Authorised signatory"]],
  "aside": {"title": "Status", "items": [["Posted by", "Kiran · D01"], ["Synced", "16 Nov 4:02 pm", "ok"], ["Paid", "RC-D03-0211 · UPI auto-matched", "ok"], ["Challan", "—"], ["History", "5 events"]], "foot": "Open timeline →"}}, h=1200)

web('Quotations.dc.html', 'Quotations', {
  "active": "Quotations & orders", "title": "Quotations & orders", "sub": "Send a price quote, turn it into an order, then a bill in one tap. Salespeople can take orders on their phone.",
  "actions": ["*+ New quotation"],
  "chips": ["Quotations", "Sales orders", "Converted", "Expired"],
  "table": {"cols": "1fr 1.5fr 0.8fr 1fr 0.9fr 1fr", "minW": 820, "heads": ["No.", "Party", "Date", ">Amount", "Valid till / by", "Status"], "rows": [
    [B("QT-0058"), B("Navkar Textiles"), "18 Nov", "₹2,40,000", "25 Nov", C("Sent · WhatsApp", "info")],
    [B("QT-0057"), B("Patel Sarees"), "15 Nov", "₹96,000", "22 Nov", C("Order received", "ok")],
    [B("SO-0019"), B("Raghuvir Traders"), "14 Nov", "₹62,000", "Divya (phone)", C("Part dispatched", "warn")],
    [B("QT-0055"), B("Shiv Fabrics"), "2 Nov", "₹40,500", "9 Nov", C("Expired", "mute")]]}})

web('PartyView.dc.html', 'Party ledger', {
  "active": "Parties", "back": "Parties.dc.html", "backT": "Parties", "title": "Patel Sarees · ledger", "sub": "Surat · GSTIN 24ABCDE1234F1Z5 · 98250 xxxxx · Broker: Ramanbhai Dalal · Customer since 2019",
  "actions": ["Edit party", "Statement PDF", "*Send reminder"],
  "kpis": [["Due", "₹2,15,000", "108% of ₹2,00,000 limit", "bad"], ["Oldest bill", "94 days", "Credit days: 45", "warn"], ["Promise to pay", "₹50,000", "25 Nov · by phone", "warn"], ["Avg. days to pay", "61"]],
  "chips": ["Ledger", "Bills", "Receipts", "Follow-ups", "Price list"],
  "table": {"cols": "0.8fr 1.6fr 1fr 1fr 1fr", "minW": 780, "heads": ["Date", "Entry", ">Debit", ">Credit", ">Balance"], "rows": [
    ["1 Apr", B("Opening balance"), "", "", "₹1,20,000"],
    ["17 Aug", B("Bill D01-001512"), "₹62,400", "", "₹1,82,400"],
    ["3 Sep", B("Bill D02-001601"), "₹55,200", "", "₹2,37,600"],
    ["10 Sep", B("Receipt RC-D03-0170", "NEFT"), "", "₹1,06,000", "₹1,31,600"],
    ["28 Sep", B("Bill D01-001688"), "₹48,900", "", "₹1,80,500"],
    ["14 Nov", B("Bill D03-000418"), "₹34,500", "", "₹2,15,000"],
    ["16 Nov", {"t": "Receipt RC-D03-0209", "s": "Cheque · not deposited", "b": True, "h": "Cheques.dc.html"}, "", "(₹50,000)", "₹2,15,000"],
    ["19 Nov", B("Bill D01-001880", "Over limit · manager approved"), "₹17,252", "", "₹2,32,252"]]},
  "note": "Balance shown excludes the undeposited cheque until it clears. Share a live ledger link so the party sees the same numbers."})

web('PartyEdit.dc.html', 'Add party', {
  "active": "Parties", "back": "Parties.dc.html", "backT": "Parties", "title": "Add party", "sub": "Customer or supplier. Type the GSTIN and we fill the rest.",
  "forms": [
    {"title": "Who", "fields": [{"k": "select", "l": "Type", "v": "Customer"}, {"l": "GSTIN", "v": "24ABCDE1234F1Z5", "help": "Verified · Patel Sarees"}, {"l": "Name", "v": "Patel Sarees"}, {"l": "Mobile (WhatsApp)", "v": "98250 xxxxx"}, {"l": "City", "v": "Surat"}, {"k": "select", "l": "Language for messages", "v": "ગુજરાતી"}]},
    {"title": "Credit control", "desc": "Staff need a manager's PIN to bill above these.", "fields": [{"l": "Credit limit", "v": "₹2,00,000"}, {"l": "Credit days", "v": "45"}, {"k": "toggle", "l": "Block billing when overdue", "on": True}, {"l": "Opening balance", "v": "₹1,20,000 (to receive)"}]},
    {"title": "Pricing, broker & sales", "fields": [{"k": "select", "l": "Price list", "v": "Wholesale"}, {"k": "select", "l": "Broker (dalal)", "v": "Ramanbhai Dalal · 1.5%"}, {"k": "select", "l": "Salesperson", "v": "Rameshbhai"}, {"k": "toggle", "l": "Send bills on WhatsApp automatically", "on": True}]}],
  "formButtons": [["Cancel", "Parties.dc.html"], ["*Save party", "PartyView.dc.html"]]}, h=1300)

web('PurchaseNew.dc.html', 'Purchase entry', {
  "active": "Purchases", "back": "Purchases.dc.html", "backT": "Purchases", "title": "Purchase entry", "sub": "Each roll gets a lot and roll number so you can trace it to the sale.",
  "actions": ["Scan bill (OCR)", "*Post purchase"],
  "kpis": [["Supplier", "Surat Rayon House", "GSTIN 24SRHRA4321Q1Z3"], ["Supplier bill", "SRH/2611", "17 Nov 2026"], ["Godown", "Godown 1"], ["Broker", "None"]],
  "table": {"cols": "1.6fr 1fr 0.7fr 0.8fr 0.8fr 1fr", "minW": 820, "heads": ["Item", "New lot", ">Rolls", ">Metres", ">Rate", ">Amount"], "rows": [
    [B("Rayon print 44\" · R-118"), "RL-2292", "6", "312 m", "₹150", "₹46,800"]]},
  "aside": {"title": "Rolls in lot RL-2292", "sub": "Metres per roll, as measured", "items": [["Roll 7", "52 m"], ["Roll 8", "48 m"], ["Roll 9", "48 m"], ["Roll 10", "52 m"], ["Roll 11", "52 m"], ["Roll 12", "60 m"]], "foot": "Print roll barcodes →"}})

web('StockCount.dc.html', 'Stock count', {
  "active": "Stock count", "title": "Stock count · Godown 1", "sub": "Count what's really there. Differences need manager approval before stock changes.",
  "actions": ["Transfer", "*Submit for approval"],
  "kpis": [["Counted", "164 / 212 lots", "77%"], ["Differences", "6 lots", "₹8,240 short", "warn"], ["Counted by", "Anil, Divya", "Godown phone + tablet"]],
  "chips": ["All", "Differences", "Not counted"],
  "table": {"cols": "1.6fr 1.1fr 0.9fr 0.9fr 0.9fr 1fr", "minW": 860, "heads": ["Item", "Lot · roll", ">System", ">Counted", ">Difference", "Reason"], "rows": [
    [B("Rayon print 44\""), "RL-2210 · R3", "48 m", "26 m", {"t": "−22 m", "c": "bad"}, C("Damaged", "warn")],
    [B("Chiffon saree"), "CS-0077", "62 pc", "60 pc", {"t": "−2 pc", "c": "bad"}, C("Not given", "mute")],
    [B("Cotton cambric 58\""), "CC-1180 · R4", "36 m", "37 m", {"t": "+1 m", "c": "ok"}, C("Measuring", "mute")],
    [B("Georgette dress material"), "GD-0431", "58 pc", "58 pc", "0", C("Matches", "ok")]]}})

web('RoleEdit.dc.html', 'Role permissions', {
  "active": "Users & roles", "back": "Users.dc.html", "backT": "Users & roles", "title": "Roles & permissions", "sub": "What each role can do. The server enforces this on every bill, online or offline.",
  "actions": ["*+ Custom role"],
  "table": {"cols": "1.8fr 0.7fr 0.7fr 0.8fr 0.7fr 0.7fr 0.9fr", "minW": 940, "heads": ["Permission", "Owner", "Admin", "Manager", "Cashier", "Godown", "Accountant"], "rows": [
    [B("Create bill / challan"), C("✓", "ok"), C("✓", "ok"), C("✓", "ok"), C("✓", "ok"), C("Challan", "info"), C("—", "mute")],
    [B("Cancel bill"), C("✓", "ok"), C("✓", "ok"), C("Approve", "info"), C("Ask", "warn"), C("—", "mute"), C("—", "mute")],
    [B("Discount", "Cashier ≤ 8%, Manager ≤ 15%"), C("✓", "ok"), C("✓", "ok"), C("≤ 15%", "info"), C("≤ 8%", "info"), C("—", "mute"), C("—", "mute")],
    [B("Sell below lowest price"), C("✓", "ok"), C("✓", "ok"), C("Approve", "info"), C("—", "mute"), C("—", "mute"), C("—", "mute")],
    [B("See purchase cost & profit"), C("✓", "ok"), C("✓", "ok"), C("Option", "info"), C("—", "mute"), C("—", "mute"), C("✓", "ok")],
    [B("Adjust stock"), C("✓", "ok"), C("✓", "ok"), C("Approve", "info"), C("—", "mute"), C("Ask", "warn"), C("—", "mute")],
    [B("Edit credit limit / broker %"), C("✓", "ok"), C("✓", "ok"), C("—", "mute"), C("—", "mute"), C("—", "mute"), C("—", "mute")],
    [B("Use voice / Copilot"), C("✓", "ok"), C("✓", "ok"), C("✓", "ok"), C("Own data", "info"), C("Stock only", "info"), C("✓", "ok")],
    [B("Export data"), C("2FA", "info"), C("2FA", "info"), C("—", "mute"), C("—", "mute"), C("—", "mute"), C("2FA", "info")],
    [B("Users, roles, devices"), C("✓", "ok"), C("✓", "ok"), C("—", "mute"), C("—", "mute"), C("—", "mute"), C("—", "mute")]]},
  "note": "Scope per person: whole business, or chosen branches and godowns. A CA's access can end on a date."}, h=1100)

web('UserInvite.dc.html', 'Invite user', {
  "active": "Users & roles", "back": "Users.dc.html", "backT": "Users & roles", "title": "Invite a person", "sub": "They get an SMS/WhatsApp link. Staff on a shared phone only need a PIN.",
  "forms": [
    {"title": "Person", "fields": [{"l": "Name", "v": "Pooja Vaghela"}, {"l": "Mobile", "v": "97250 xxxxx"}, {"k": "select", "l": "Role", "v": "Cashier"}, {"k": "select", "l": "Where", "v": "Counter 1, Counter 2"}, {"k": "select", "l": "Language", "v": "ગુજરાતી"}]},
    {"title": "Sign-in", "fields": [{"k": "select", "l": "How they sign in", "v": "PIN on a shared counter phone"}, {"k": "toggle", "l": "Can use their own phone", "on": False}, {"l": "Access ends on (optional)", "v": "", "ph": "For CAs or temporary staff"}, {"k": "toggle", "l": "Start in training mode for 3 days", "on": True}]}],
  "formButtons": [["Cancel", "Users.dc.html"], ["*Send invite", "Users.dc.html"]]})

web('Dispatch.dc.html', 'Dispatch and salespeople', {
  "active": "Dispatch", "title": "Dispatch & salespeople", "sub": "What is packed, on the road and delivered, and who is selling what.",
  "chips": ["Dispatch", "Salespeople"],
  "kpis": [["To pack today", "4 orders"], ["On the road", "3 parcels", "2 with e-way bill"], ["Delivered this week", "11", "", "ok"]],
  "table": {"cols": "1fr 1.4fr 1.4fr 1fr 1fr", "minW": 820, "heads": ["Challan / bill", "Party", "Transporter · LR", "Sent", "Status"], "rows": [
    [B("DC-D04-0091"), B("Patel Sarees", "Surat"), "Shree Logistics · LR 5521", "18 Nov", C("On the road", "info")],
    [B("D01-001861"), B("Navkar Textiles", "Ahmedabad"), "VRL · LR 88123", "16 Nov", C("Delivered · photo", "ok")],
    [B("SO-0019"), B("Raghuvir Traders", "Amreli"), "Own tempo", "—", C("Packing", "warn")]]},
  "aside": {"title": "Salespeople · this month", "items": [["Rameshbhai", "₹22,40,000"], ["Divya Joshi", "₹14,10,000"], ["Counter (walk-in)", "₹12,12,300"], ["Orders from phone", "38"]]}})

web('ProfitReport.dc.html', 'Profit report', {
  "active": "Reports", "back": "Reports.dc.html", "backT": "Reports", "title": "Profit by item · November 2026", "sub": "Sales minus purchase cost of the exact lots sold, after broker commission. Only owners and accountants see this.",
  "actions": ["Excel", "*PDF"],
  "kpis": [["Sales", "₹48,62,300"], ["Cost of goods sold", "₹41,52,300"], ["Broker commission", "₹38,400"], ["Gross profit", "₹6,71,600", "13.8%", "ok"]],
  "chips": ["By item", "By party", "By broker", "By salesperson"],
  "table": {"cols": "1.6fr 1fr 1fr 1fr 0.8fr", "minW": 780, "heads": ["Item", ">Sales", ">Cost", ">Profit", ">Margin"], "rows": [
    [B("Rayon print 44\""), "₹14,20,000", "₹11,90,000", "₹2,30,000", {"t": "16.2%", "c": "ok"}],
    [B("Georgette dress material"), "₹9,80,000", "₹8,10,000", "₹1,70,000", {"t": "17.3%", "c": "ok"}],
    [B("Cotton cambric 58\""), "₹8,40,000", "₹7,60,000", "₹80,000", "9.5%"],
    [B("Chiffon saree"), "₹6,10,000", "₹5,90,000", "₹20,000", {"t": "3.3%", "c": "warn"}]]}})

web('States.dc.html', 'System states', {
  "active": "", "title": "Messages & states", "sub": "How every screen behaves when there is no data, no internet, an error or a wait. Plain words, never codes.",
  "banner": ["You're offline.", "You can keep billing on phones. This web page shows data from 4:02 pm and will refresh when the internet is back.", "warn"],
  "table": {"cols": "1fr 2.2fr 1.2fr", "minW": 820, "heads": ["State", "What the person sees", "Action offered"], "rows": [
    [C("Empty", "mute"), "No bills yet today. Your first bill will show here.", {"t": "+ New bill", "h": "EmptyDashboard.dc.html"}],
    [C("Offline", "warn"), "No internet. 2 bills are saved on this phone and will sync by themselves.", {"t": "Try sync now", "h": "MobileSync.dc.html"}],
    [C("Loading", "info"), "Grey placeholder rows, never a blank page or spinner only.", {"t": "See example", "h": "LoadingState.dc.html"}],
    [C("Saved", "ok"), "Bill saved on this phone. Not yet sent to the cloud.", "Print · Share"],
    [C("Synced", "ok"), "Bill sent to the cloud at 4:02 pm.", "—"],
    [C("Rejected by server", "bad"), "This bill could not be posted: Kiran's access was removed at 2:10 pm. Owner must review.", {"t": "Open in Approvals", "h": "Approvals.dc.html"}],
    [C("Not allowed", "warn"), "You can give up to 8% discount. Ask a manager for more.", "Ask manager"],
    [C("Voice not understood", "info"), "Sorry, I didn't catch that. Try again, or type it.", "Try again · Type"],
    [C("Error", "bad"), "Something went wrong on our side. Your data is safe. Try again in a minute.", {"t": "Try again · Help", "h": "Help.dc.html"}]]}})

web('LoadingState.dc.html', 'Loading state', {
  "active": "Sales & invoices", "title": "Sales & invoices", "sub": "Loading… (shown for under a second on normal internet)",
  "kpis": [["This month", "", ""], ["Unpaid", "", ""], ["Not synced yet", "", ""], ["Cancelled", "", ""]],
  "skeleton": True, "note": "Skeleton rows keep the layout still while data loads, so nothing jumps under the user's finger."})
