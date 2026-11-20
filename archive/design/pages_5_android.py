# Android: owner, billing helpers, stock, lists, settings
D = "MobileDrawer.dc.html"
mob('MobileOwner.dc.html', 'Owner home', {
  "title": "Good evening, Rameshbhai", "sub": "Owner phone · all counters", "dark": True, "menuBtn": True,
  "hero": {"l": "Today's sales", "v": "₹2,86,450", "s": "41 bills · ▲ 12% vs last Thursday", "dark": True},
  "listTitle": "Needs you",
  "items": [["Discount 14% · Kiran", "D01-001877 · ₹42,600", "", "Approve?", "warn"], ["Lot RL-2291 is −18 m", "Sold twice offline", "", "Fix", "warn"], ["Promises due today", "3 parties · ₹1,10,000", "", "Call", "info", None, "MobileCollections.dc.html"], ["Collected today", "Cash ₹38,000 · UPI ₹1,56,000", "₹1,94,000", "", "", None, "MobilePayments.dc.html"]],
  "nav": "Home"})
mob('MobileApprovals.dc.html', 'Approvals', {
  "title": "Approvals", "sub": "3 waiting", "back": "MobileOwner.dc.html",
  "hero": {"l": "Discount over limit · Kiran", "v": "14% on ₹42,600", "s": "Cashier limit 8% · margin after 6.2% · party overdue ₹1,10,000", "tone": "warn"},
  "listTitle": "Also waiting",
  "items": [["Stock −22 m · RL-2210", "Anil · damaged roll · photo", "₹3,960", "Approve?", "warn", None, "MobileStepUp.dc.html"], ["Cancel D02-001842", "Mehul · wrong party", "₹18,750", "Approve?", "warn", None, "MobileStepUp.dc.html"]],
  "note": ["Approving needs your fingerprint or PIN. Logged in the audit trail.", "mute"],
  "buttons": [["Reject", "MobileOwner.dc.html"], ["*Approve", "MobileStepUp.dc.html"]]})
mob('MobileParty.dc.html', 'Select party', {
  "title": "Select party", "sub": "Step 1 of bill · speak or type", "back": "MobileBilling.dc.html",
  "fields": [["Search name, phone or GSTIN", "pat"]],
  "items": [["Patel Sarees", "Surat · due ₹2,15,000", "", "Over limit", "bad", None, "MobileBilling.dc.html"], ["Patel Cloth House", "Mahuva · due ₹12,000", "", "OK", "ok", None, "MobileBilling.dc.html"], ["Patel Brothers", "Bhavnagar · no dues", "", "OK", "ok", None, "MobileBilling.dc.html"], ["Walk-in customer", "Cash sale · no GSTIN"]],
  "buttons": [["Quick add item", "MobileProductAdd.dc.html"], ["*+ New party", "MobilePartyAdd.dc.html"]]})
mob('MobileProductAdd.dc.html', 'Quick add item', {
  "title": "Quick add item", "sub": "Full details can be added later on web", "back": "MobileBilling.dc.html",
  "fields": [["Item name", "Linen blend 58\""], ["Rate", "₹210", True], ["HSN", "5309"]],
  "chips": ["Metre", "Piece", "Kg", "Than"], "chipsLabel": "Sold by",
  "note": ["Needs manager approval before it can be billed by cashiers.", "info"],
  "buttons": [["Cancel", "MobileBilling.dc.html"], ["*Save item", "MobileBilling.dc.html"]]})
mob('MobileReturn.dc.html', 'Sales return', {
  "title": "Sales return", "sub": "Against D02-001790 · Shiv Fabrics", "back": D,
  "chips": ["Shade mismatch", "Damaged", "Wrong item", "Other"], "chipsLabel": "Reason",
  "listTitle": "What is coming back",
  "items": [["Rayon print 44\" · RL-2288", "Sold 40 m", "12 m", "Back to stock", "ok", True], ["Cotton cambric 58\" · CC-1175", "Sold 20 m", "0 m", "", "", False]],
  "note": ["A credit note CN-0032 for ₹1,827 will be made. The original bill is not changed.", "info"],
  "buttons": [["Cancel", D], ["*Make credit note", "MobileHome.dc.html"]]})
mob('MobilePrinter.dc.html', 'Printer setup', {
  "title": "Printer", "sub": "Bluetooth receipt & label printer", "back": D, "badge": ["Connected", "ok"],
  "hero": {"l": "This phone prints to", "v": "Counter 1 printer", "s": "80 mm · battery 64% · Gujarati as image", "dark": True},
  "chips": ["58 mm", "80 mm", "Roll labels"], "chipsLabel": "Paper",
  "listTitle": "Printers nearby",
  "items": [["Counter 1 printer", "BT · 66:12:A0:…", "", "Paired", "ok"], ["RPP02N", "BT · 0F:3C:91:…", "", "Pair", "mute"], ["TSC label printer", "BT · 88:1B:22:…", "", "Pair", "mute", None, "MobileLabels.dc.html"], ["Tested printers", "RPP02N · Everycom 80 mm · TVS RP 3160 · Gujarati OK", "", "List", "info"]],
  "buttons": [["Scan again", "MobilePrinter.dc.html"], ["*Print test receipt", "MobilePrinter.dc.html"]]})
mob('MobileStockCount.dc.html', 'Stock count', {
  "title": "Stock count", "sub": "Godown 1 · 164 of 212 lots", "back": D,
  "hero": {"l": "Scanned: RL-2210 · Roll 3 · Rayon print 44\"", "v": "System: 48 m", "s": "Measure and enter what is really there", "dark": True},
  "fields": [["Counted", "26 m", True]],
  "chips": ["Damaged", "Measuring", "Not found", "Other"], "chipsLabel": "Reason for difference",
  "note": ["Difference −22 m goes to the manager for approval.", "warn"],
  "buttons": [["Skip", "MobileStockCount.dc.html"], ["*Save & next roll", "MobileStockCount.dc.html"]]})
mob('MobileCloseDay.dc.html', 'Close day', {
  "title": "Close day", "sub": "Counter 1 · Kiran · 19 Nov", "back": "MobileProfile.dc.html",
  "fields": [["Cash counted in drawer", "₹42,500", True]],
  "listTitle": "Expected",
  "items": [["Opening cash", "", "₹5,000"], ["Cash bills", "18 bills", "₹38,000"], ["Expenses paid in cash", "Transport, labour", "−₹5,000"], ["UPI (not in drawer)", "Auto-matched", "₹40,650", "", ""], ["Expected in drawer", "", "₹38,000 + ₹5,000 = ₹43,000"]],
  "note": ["Short by ₹500. The owner will be told. Add a note if you know why.", "warn"],
  "buttons": [["Add note", "MobileCloseDay.dc.html"], ["*Close day", "MobileLogin.dc.html"]]})
mob('MobileLanguage.dc.html', 'Choose language', {
  "title": "ભાષા પસંદ કરો", "sub": "Choose language · भाषा चुनें", "dark": True,
  "chips": ["ગુજરાતી", "हिंदी", "English"], "chipsLabel": "Language",
  "listTitle": "You can change this any time from the menu",
  "items": [["Screens", "Labels and buttons in your language", "›", "", "", None, "MobileHomeGu.dc.html"], ["Receipts", "Item names print in Gujarati if you want"]],
  "buttons": [["*આગળ · Continue", "MobileRegister.dc.html"]]})

mob('MobileBills.dc.html', 'Bills', {"title": "Bills", "sub": "Today · Counter 1", "menuBtn": True,
  "chips": ["Today", "Unpaid", "On hold", "Not synced"], "chipsLabel": "Filter",
  "items": [["D01-001880 · Patel Sarees", "3:52 pm · credit", "₹17,252", "Saved on device", "warn"], ["D01-001879 · Mahavir Cloth Store", "3:41 pm · credit", "₹18,240", "Saved on device", "warn"], ["D01-001878 · Walk-in", "3:28 pm · UPI", "₹2,150", "Synced", "ok"], ["D01-001877 · Mahavir Cloth Store", "3:12 pm", "₹36,636", "Waiting approval", "info"], ["D01-001876 · Shiv Fabrics", "2:55 pm · UPI", "₹9,860", "Synced", "ok"]],
  "nav": "Bills"})
mob('MobileBillView.dc.html', 'Bill detail', {"title": "D01-001879", "sub": "Mahavir Cloth Store · 19 Nov 3:41 pm", "back": "MobileBills.dc.html", "badge": ["Synced", "ok"],
  "hero": {"l": "Total · credit 45 days", "v": "₹18,240", "s": "Unpaid · due 3 Jan 2027", "tone": "warn", "dark": True},
  "listTitle": "Items",
  "items": [["Rayon print 44\" · RL-2292 R7", "80 m × ₹145", "₹11,600"], ["Cotton cambric 58\" · CC-1180", "50 m × ₹118", "₹5,900"], ["Scheme discount", "Volume 1% (above 100 m)", "−₹128.57"], ["CGST + SGST 5%", "On ₹17,371.43", "₹868.57"], ["History", "Made offline · synced 4:02 pm · shared", "›", "", "", None, "MobileBillView.dc.html"]],
  "buttons": [["Cancel…", "MobileCancelBill.dc.html"], ["UPI QR", "MobileUpiQr.dc.html"], ["*Share", "MobileWhatsApp.dc.html"]]})
mob('MobileHeld.dc.html', 'Held bills', {"title": "Held bills", "sub": "Parked while the customer decides", "back": D,
  "items": [["Walk-in · 2 items", "Held 3:35 pm by Kiran", "₹4,320", "Resume", "info"], ["Jay Ambe Garments · 5 items", "Held 1:10 pm by Mehul", "₹22,900", "Resume", "info"]],
  "note": ["Held bills don't reduce stock or get a bill number until saved.", "mute"], "buttons": [["*+ New bill", "MobileBilling.dc.html"]]})
mob('MobileSearch.dc.html', 'Search', {"title": "Search", "sub": "Bills, parties, items, lots", "back": "MobileHome.dc.html",
  "fields": [["Search", "rayon 2292"]], "chips": ["All", "Items", "Parties", "Bills"], "chipsLabel": "Type",
  "items": [["Rayon print 44\" · RL-2292", "Item · Godown 1", "272 m", "Lot", "mute", None, "MobileStock.dc.html"], ["D01-001880", "Bill · Patel Sarees · has RL-2292", "₹17,252", "Bill", "mute", None, "MobileBillView.dc.html"], ["DC-D04-0091", "Challan · RL-2292 R8, R9", "96 m", "Challan", "mute", None, "MobileChallan.dc.html"]],
  "note": ["Works offline on everything stored on this phone. Tap the mic to search by voice.", "mute"], "nav": "x"})
mob('MobileItems.dc.html', 'Items', {"title": "Items", "sub": "146 items · rates & stock", "back": D,
  "fields": [["Search item, design, barcode", ""]], "chips": ["All", "Fabric (m)", "Pieces", "Low stock"], "chipsLabel": "Filter",
  "items": [["Rayon print 44\"", "₹145 / m · HSN 5408", "272 m", "In stock", "ok"], ["Cotton cambric 58\"", "₹118 / m", "143 m", "Low", "warn"], ["Georgette dress material", "₹640 / pc", "58 pc", "In stock", "ok", None, "MobileStock.dc.html"], ["Chiffon saree", "₹900 / pc", "62 pc", "Slow", "mute", None, "MobileStock.dc.html"]],
  "buttons": [["Scan", "MobileStock.dc.html"], ["*+ Quick add", "MobileProductAdd.dc.html"]]})
mob('MobileLowStock.dc.html', 'Low stock', {"title": "Low stock", "sub": "Below reorder level", "back": D, "badge": ["7", "warn"],
  "items": [["Cotton cambric 58\"", "Sells ~60 m/day · reorder 150 m", "143 m", "2 days left", "warn"], ["Georgette D22", "Reorder 80 pc", "58 pc", "Low", "warn", None, "MobileStock.dc.html"], ["Rayon print R-112", "Reorder 100 m", "36 m", "Low", "warn", None, "MobileStock.dc.html"], ["Lot RL-2291", "Negative after offline sales", "−18 m", "Fix", "bad", None, "MobileOwner.dc.html"]],
  "buttons": [["Share list", "MobileWhatsApp.dc.html"], ["*Make purchase order", "MobilePurchase.dc.html"]]})
mob('MobilePartyView.dc.html', 'Party ledger', {"title": "Mahavir Cloth Store", "sub": "Mahuva · 98790 xxxxx", "back": "MobileOutstanding.dc.html",
  "hero": {"l": "Due", "v": "₹1,64,876", "s": "110% of ₹1,50,000 limit · oldest 71 days · promise broken 15 Nov", "tone": "warn", "dark": True},
  "chips": ["Ledger", "Bills", "Receipts", "Follow-ups"], "chipsLabel": "View",
  "items": [["Bill D01-001879", "19 Nov", "+₹18,240", "", "", None, "MobileBillView.dc.html"], ["Bill D01-001877 (on hold)", "19 Nov", "+₹36,636"], ["Receipt RC-D02-0301", "10 Nov · UPI", "−₹40,000"], ["Bill D01-001701", "9 Sep", "+₹52,000"]],
  "buttons": [["Call", "MobileCollections.dc.html"], ["Remind", "MobileWhatsApp.dc.html"], ["*Receive", "MobilePayment.dc.html"]]})
mob('MobilePartyAdd.dc.html', 'Add party', {"title": "Add party", "sub": "Type GSTIN to fill details", "back": "MobileParty.dc.html",
  "chips": ["Customer", "Supplier", "Broker"], "chipsLabel": "Type",
  "fields": [["GSTIN", "24QRSTU3456V1Z4"], ["Name", "Jay Ambe Fashion"], ["Mobile (WhatsApp)", "98980 xxxxx"], ["City", "Bhavnagar"]],
  "note": ["Credit limit, days and broker % are set by the manager or owner.", "info"],
  "buttons": [["Cancel", "MobileParty.dc.html"], ["*Save party", "MobileBilling.dc.html"]]})
mob('MobilePurchase.dc.html', 'Purchase entry', {"title": "Purchase entry", "sub": "Godown phone · Godown 1", "back": D,
  "fields": [["Supplier", "Surat Rayon House"], ["Supplier bill no.", "SRH/2611"]],
  "listTitle": "Rolls received · scan or type metres",
  "items": [["Rayon print 44\" · Roll 7", "Lot RL-2292", "52 m", "", "", True], ["Rayon print 44\" · Roll 8", "Lot RL-2292", "48 m", "", "", True], ["Roll 9", "Measure…", "— m", "", "", False]],
  "buttons": [["Scan bill (OCR)", "MobileScanBill.dc.html"], ["*Save & print labels", "MobileLabels.dc.html"]]})
mob('MobileQuotation.dc.html', 'Quotation', {"title": "New quotation", "sub": "QT-0059 · no stock moves", "back": D,
  "fields": [["Party", "Navkar Textiles, Ahmedabad"]],
  "items": [["Rayon print 44\" · R-118", "400 m × ₹142", "₹56,800"], ["Georgette D22", "60 pc × ₹630", "₹37,800"]],
  "hero": {"l": "Quote total (with 5% GST)", "v": "₹99,330", "s": "Valid till 26 Nov"},
  "buttons": [["Save", "MobileBills.dc.html"], ["*Send on WhatsApp", "MobileWhatsApp.dc.html"]]})
mob('MobilePayments.dc.html', 'Payments', {"title": "Payments", "sub": "Today · Counter 1", "menuBtn": True,
  "hero": {"l": "Collected today", "v": "₹62,150", "s": "Cash ₹21,500 · UPI ₹40,650 (auto-matched)", "dark": True},
  "chips": ["Received", "Cheques", "Not matched"], "chipsLabel": "Filter",
  "items": [["RC-D01-0541 · Patel Sarees", "Cheque 004520", "₹50,000", "To deposit", "warn"], ["UPI · Shiv Fabrics", "Auto-matched to D02-001850", "₹10,000", "Matched", "ok", None, "MobileUpiQr.dc.html"], ["RC-D01-0540 · Walk-in", "Cash", "₹2,150", "Synced", "ok"]],
  "nav": "x"})
mob('MobileReports.dc.html', 'Reports', {"title": "Reports", "sub": "Owner · today", "menuBtn": True,
  "chips": ["Today", "This week", "This month"], "chipsLabel": "Period",
  "hero": {"l": "Sales", "v": "₹2,86,450", "s": "▲ 12% · profit ₹41,200 (14.4%)", "dark": True},
  "items": [["Sales register", "41 bills", "›"], ["Receivables ageing", "₹6,10,800 overdue", "›", "9 parties", "warn"], ["Stock by lot", "₹62,40,000", "›"], ["Staff activity", "1 over-limit discount", "›", "Check", "warn"], ["Broker commission", "₹38,400 this month", "›", "", "", None, "MobileBroker.dc.html"]],
  "nav": "x"})
mob('MobileDispatch.dc.html', 'Dispatch', {"title": "Dispatch", "sub": "Godown · today", "back": D,
  "chips": ["To pack", "On the road", "Delivered"], "chipsLabel": "Status",
  "items": [["SO-0019 · Raghuvir Traders", "Amreli · own tempo", "6 rolls", "Packing", "warn"], ["DC-D04-0091 · Patel Sarees", "Shree Logistics · LR 5521", "96 m", "On road", "info"], ["D01-001861 · Navkar Textiles", "VRL · LR 88123", "Delivered", "Photo", "ok"]],
  "buttons": [["*Add LR / photo", "MobileDispatch.dc.html"]]})
mob('MobileDevices.dc.html', 'Devices', {"title": "Devices", "sub": "Owner · 6 of 8", "back": D,
  "items": [["Counter 1 · D01", "Kiran, Mehul · synced 1 min", "", "Healthy", "ok"], ["Counter 2 · D02", "synced 2 min", "", "Healthy", "ok"], ["Godown phone · D04", "Anil · 2 days · 14 pending", "", "Not syncing", "bad"], ["Manager tablet · D05", "Divya · 6 min", "", "Healthy", "ok"]],
  "buttons": [["Revoke…", "MobileStepUp.dc.html"], ["*Add phone (QR)", "MobileRegister.dc.html"]]})
mob('MobileSettings.dc.html', 'Settings', {"title": "App settings", "sub": "This phone", "back": D,
  "chips": ["ગુજરાતી", "हिंदी", "English"], "chipsLabel": "Language",
  "items": [["Printer", "Counter 1 printer · 80 mm", "›"], ["Voice button", "On · hold to talk", "›", "", "", None, "MobileVoiceHub.dc.html"], ["Read aloud", "Totals and dues", "›", "", "", None, "MobileReadAloud.dc.html"], ["Text size", "Normal", "›"], ["Sync on mobile data", "On", "›"], ["App version", "1.0.4 · up to date", "", "OK", "ok", None, "MobileUpdate.dc.html"]],
  "note": ["Business settings (tax, numbering, limits) are changed by the owner on web.", "mute"]})
mob('MobileHelp.dc.html', 'Help', {"title": "Help", "sub": "Gujarati · Hindi · English", "back": D,
  "items": [["Video: make a bill", "1 min", "›"], ["Video: printer not printing", "2 min", "›", "", "", None, "MobilePrinter.dc.html"], ["Video: offline & sync", "1 min", "›", "", "", None, "MobileSync.dc.html"], ["Practise in training mode", "Nothing counts", "›", "", "", None, "MobileTraining.dc.html"], ["WhatsApp support", "9 am – 8 pm", "›"], ["Report a problem", "Sends app logs, no bill data", "›"], ["Home for managers", "Approvals, held bills, cash", "›", "", "", None, "MobileManagerHome.dc.html"], ["Home for godown staff", "Dispatch, receive, count · no prices", "›", "", "", None, "MobileGodownHome.dc.html"], ["See all features", "Grid of every screen", "›", "", "", None, "MobileMenu.dc.html"], ["What customers see", "Ledger link on their phone", "›", "", "", None, "MobileCustomerLedger.dc.html"], ["Screens you may see: starting", "Splash · loading · first day", "›", "", "", None, "MobileSplash.dc.html"], ["Loading", "Slow phone or first sync", "›", "", "", None, "MobileLoading.dc.html"], ["First day (no bills yet)", "Empty home", "›", "", "", None, "MobileEmptyHome.dc.html"], ["Locked after 5 wrong PINs", "Manager unlocks", "›", "", "", None, "MobileLocked.dc.html"], ["Phone removed by owner", "Data wiped", "›", "", "", None, "MobileWiped.dc.html"], ["Storage full", "Free space to keep billing", "›", "", "", None, "MobileStorageFull.dc.html"], ["Offline for 7 days", "Connect to keep billing", "›", "", "", None, "MobileGrantExpired.dc.html"], ["Copilot limits (later)", "No permission / unsure", "›", "", "", None, "MobileCopilotLimits.dc.html"]],
  "buttons": [["*WhatsApp us", "MobileHelp.dc.html"]]})
mob('MobileSplash.dc.html', 'Starting', {"title": "UdyamOS", "sub": "Shree Krishna Textiles", "dark": True,
  "hero": {"l": "Opening", "v": "Checking this phone…", "s": "Works without internet", "dark": True},
  "items": [["Data on phone", "Encrypted", "", "OK", "ok"], ["Printer", "Connecting…", "", "Wait", "info"], ["Sync", "Offline · will retry", "", "Offline", "warn"]],
  "buttons": [["*Continue", "MobileLogin.dc.html"]]})
mob('MobileLoading.dc.html', 'Loading', {"title": "Bills", "sub": "Loading…", "menuBtn": True, "skeleton": True, "nav": "Bills"})
