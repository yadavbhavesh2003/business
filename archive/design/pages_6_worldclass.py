# World-class features: UPI auto-match, broker commission, collections, ledger link, sales orders,
# bank matching, command bar, training mode, labels, timeline, voice hub, read-aloud
web('UpiCollections.dc.html', 'UPI and bank', {
  "active": "UPI & bank", "title": "UPI & bank collections", "sub": "Every bill and receipt carries a UPI QR for the exact amount. When money arrives, it's matched to the bill by itself.",
  "actions": ["Bank reconcile", "*Show QR"],
  "kpis": [["Auto-matched this month", "₹21,80,000", "412 payments · 96%", "ok"], ["Needs a look", "4", "₹26,500 · amount differs", "warn"], ["Avg. days to get paid", "38", "was 46 before QR", "ok"]],
  "chips": ["Matched", "Needs a look", "Settlements"],
  "table": {"cols": "0.8fr 1.4fr 1fr 1.4fr 1fr", "minW": 860, "heads": ["Time", "From (UPI)", ">Amount", "Matched to", "Status"], "rows": [
    ["10:01 am", B("Shiv Fabrics", "shivfab@okaxis"), "₹30,000", "D02-001850 (part)", C("Auto", "ok")],
    ["9:40 am", B("Navkar Textiles", "navkar@icici"), "₹1,11,510", "D01-001861", C("Auto", "ok")],
    ["9:12 am", B("Unknown · 98980xxxxx"), "₹12,000", "Jay Ambe Garments? (82% sure)", C("Confirm", "warn")],
    ["Yesterday", B("Mahavir Cloth Store"), "₹40,000", "Oldest bills first", C("Auto", "ok")]]},
  "aside": {"title": "How it works", "items": [["QR on bill", "Exact amount + bill no."], ["Provider", "Your bank / payment gateway"], ["Money goes to", "Your account directly"], ["Matching", "Bill no., amount, phone"]], "foot": "Take payment now →"},
  "note": "UdyamOS never holds your money. Collection runs through your bank's UPI or an RBI-authorised payment gateway."})

web('Brokers.dc.html', 'Brokers and commission', {
  "active": "Brokers & commission", "title": "Brokers & commission (dalal)", "sub": "Track which broker brought each sale, commission earned, and what is payable only after the party pays.",
  "actions": ["Commission statement", "*+ Add broker"],
  "kpis": [["Commission this month", "₹38,400", "6 brokers"], ["Payable now", "₹21,600", "Party has paid", "ok"], ["On hold", "₹16,800", "Party hasn't paid yet", "warn"]],
  "chips": ["Brokers", "Bills by broker", "Payouts"],
  "table": {"cols": "1.4fr 1fr 0.8fr 1fr 1fr 1fr", "minW": 860, "heads": ["Broker", "Parties", ">Rate", ">Sales", ">Earned", ">Payable now"], "rows": [
    [B("Ramanbhai Dalal", "Surat · 98250 xxxxx"), "Patel Sarees +4", "1.5%", "₹12,40,000", "₹18,600", {"t": "₹7,200", "c": "ok"}],
    [B("Jitubhai Agent", "Ahmedabad"), "Navkar Textiles +2", "1%", "₹9,80,000", "₹9,800", {"t": "₹9,800", "c": "ok"}],
    [B("Kantibhai", "Mahuva"), "Mahavir Cloth Store", "1.25%", "₹4,20,000", "₹5,250", {"t": "₹0", "c": "warn", "s": "party overdue"}],
    [B("Self (no broker)"), "—", "—", "₹22,22,300", "—", "—"]]},
  "aside": {"title": "Ramanbhai Dalal", "sub": "Rules", "items": [["Commission on", "Taxable value"], ["Paid when", "Party pays the bill"], ["TDS (194H)", "Deducted if above limit"], ["Statement", "WhatsApp monthly"]], "foot": "Commission statement"},
  "note": "Commission rules and TDS treatment to be confirmed with your CA."})

web('Collections.dc.html', 'Collections', {
  "active": "Collections", "title": "Collections · follow-up", "sub": "Who to call today, what they promised, and whether they kept it. Built for getting paid faster.",
  "actions": ["Call list", "Send ledger link", "*Send reminder"],
  "kpis": [["Promised today", "₹1,10,000", "3 parties"], ["Broken promises", "2", "₹96,000", "bad"], ["Collected vs promised", "78%", "This month", "ok"], ["Auto reminders", "On", "Day 30, 45, 60"]],
  "chips": ["Today", "Broken", "Upcoming", "No promise yet"],
  "table": {"cols": "1.4fr 1fr 1fr 1.2fr 1.4fr", "minW": 900, "heads": ["Party", ">Due", ">Oldest", "Promise", "Last contact"], "rows": [
    [B("Patel Sarees", "Broker: Ramanbhai"), "₹2,15,000", "94 d", C("₹50,000 · 25 Nov", "info"), "Call · 19 Nov · Rameshbhai"],
    [B("Mahavir Cloth Store"), "₹1,64,876", "71 d", C("Broken · 15 Nov", "bad"), "WhatsApp · read, no reply"],
    [B("Shiv Fabrics"), "₹96,400", "52 d", C("₹40,000 · today", "warn"), "Call · 12 Nov"],
    [B("Jay Ambe Garments"), "₹88,200", "38 d", C("None yet", "mute"), "Auto reminder · day 30"]]},
  "aside": {"title": "Log a call · Patel Sarees", "items": [["Spoke to", "Ketanbhai"], ["Promised", "₹50,000 by 25 Nov"], ["Next follow-up", "26 Nov, auto"], ["Ledger link", "Sent · opened 2×", "ok"]], "foot": "Send ledger link"}})

web('LedgerLink.dc.html', 'Customer ledger link', {
  "active": "Parties", "back": "PartyView.dc.html", "backT": "Party ledger", "title": "Live ledger link · what the customer sees", "sub": "A private link (no login) showing the party's own statement, bills and a pay button. Expires in 30 days; you can turn it off.",
  "actions": ["Send ledger link", "*Share on WhatsApp"],
  "paper": ["Shree Krishna Textiles · statement for Patel Sarees", ["As of 20 Nov 2026 · udyam.in/l/7Kx2"], "-", ["Bill", "Date", "Due"], ["D01-001512", "17 Aug", "₹40,000"], ["D02-001601", "3 Sep", "₹55,200"], ["D01-001688", "28 Sep", "₹48,900"], ["D03-000418", "14 Nov", "₹34,500"], ["D01-001880", "19 Nov", "₹17,252"], "-", ["Total due", "", "₹1,95,852", True], ["[ Pay ₹1,95,852 by UPI ]   [ Download PDF ]   [ Raise a query ]"], ["Cheque ₹50,000 received 16 Nov, will reflect after clearing."]],
  "aside": {"title": "Link activity", "items": [["Sent", "19 Nov · WhatsApp"], ["Opened", "2 times", "ok"], ["Paid via link", "—"], ["Queries", "None"], ["Expires", "19 Dec"]]},
  "note": "Shows only this party's data. No staff names, costs or other parties. Turn off any time."})

web('BankMatch.dc.html', 'Bank reconciliation', {
  "active": "UPI & bank", "title": "Bank statement matching", "sub": "Upload or connect your bank statement. We suggest a match for every line; you confirm in one tap.",
  "actions": ["Upload statement", "*Auto-match all"],
  "kpis": [["Lines", "184", "HDFC · 1–19 Nov"], ["Matched", "171", "93%", "ok"], ["Suggested", "9", "Confirm", "warn"], ["Unknown", "4", "Ask Copilot", "warn"]],
  "chips": ["Suggested", "Matched", "Unknown"],
  "table": {"cols": "0.8fr 1.8fr 1fr 1.6fr 1fr", "minW": 900, "heads": ["Date", "Bank narration", ">Amount", "Suggested match", "Action"], "rows": [
    ["19 Nov", "NEFT-HDFCN52611190045-NAVKAR TEXTILES", "+₹1,11,510", "Receipt for D01-001861", C("Matched", "ok")],
    ["18 Nov", "UPI/shivfab@okaxis/payment", "+₹30,000", "D02-001850 (part)", C("Matched", "ok")],
    ["17 Nov", "CHQ DEP 220981 ICICI", "+₹80,000", "Cheque 220981 · Navkar", C("Confirm", "warn")],
    ["15 Nov", "IMPS-SURAT RAYON HOUSE", "−₹46,800", "Payment PB-0340", C("Confirm", "warn")],
    ["14 Nov", "BANK CHARGES CHQ RETURN", "−₹590", "Cheque 771003 bounced", C("Confirm", "warn")]]},
  "note": "Account Aggregator (RBI) connection can replace uploads later. Statements are stored encrypted in India."})

web('CommandPalette.dc.html', 'Command bar', {
  "active": "Dashboard", "title": "Ctrl K · search or jump", "sub": "One box for everything: parties, bills, lots, screens and actions. Built for accountants who live on the keyboard.",
  "search": "pat",
  "table": {"cols": "0.8fr 2fr 1fr", "minW": 700, "heads": ["Type", "Result", "Shortcut"], "rows": [
    [C("Party", "info"), {"t": "Patel Sarees · ₹2,15,000 due", "b": True, "h": "PartyView.dc.html"}, "Enter"],
    [C("Party", "info"), {"t": "Patel Cloth House · ₹12,000 due", "b": True, "h": "PartyView.dc.html"}, ""],
    [C("Action", "ok"), {"t": "New invoice for Patel Sarees", "b": True, "h": "InvoiceNew.dc.html"}, "N"],
    [C("Action", "ok"), {"t": "Send reminder to Patel Sarees", "b": True, "h": "WhatsAppShare.dc.html"}, "R"],
    [C("Screen", "mute"), {"t": "Parties", "b": True, "h": "Parties.dc.html"}, "G then P"]]},
  "aside": {"title": "Keyboard shortcuts", "items": [["Search anything", "Ctrl K"], ["New invoice", "N"], ["Receive payment", "P"], ["Save", "F2"], ["Next field / row", "Tab / ↓"], ["Go to dashboard", "G then D"], ["Help", "?"]]}})

web('TrainingMode.dc.html', 'Training mode', {
  "active": "Training mode", "title": "Training mode", "sub": "A copy of your business with sample data. Staff practise billing, returns and printing. Nothing counts, nothing syncs to your books.",
  "banner": ["TRAINING MODE", "Bills here use series TR- and are deleted after 7 days. An orange bar shows on every screen.", "warn"],
  "actions": ["Leave training mode", "*Start training mode"],
  "kpis": [["Staff in training", "2", "Pooja, Suresh"], ["Practice bills", "37"], ["Lessons done", "4 of 6", "", "ok"]],
  "table": {"cols": "1.6fr 1fr 1fr", "minW": 640, "heads": ["Lesson", "Time", "Status"], "rows": [[B("Make a bill and print"), "3 min", C("Done", "ok")], [B("Bill by voice"), "2 min", C("Done", "ok")], [B("Receive UPI payment"), "2 min", C("Done", "ok")], [B("Delivery challan → bill"), "4 min", C("Done", "ok")], [B("Sales return"), "3 min", C("Next", "info")], [B("Close day"), "2 min", C("Not started", "mute")]]},
  "note": "Also great for sales demos: show a prospect the real app without touching real data."})

web('LabelDesigner.dc.html', 'Label designer', {
  "active": "Items", "back": "Stock.dc.html", "backT": "Stock & lots", "title": "Roll & barcode labels", "sub": "Design once, print a label for every roll at purchase. Scan it at billing, challan and stock count.",
  "actions": ["*Print labels"],
  "forms": [{"title": "Label", "fields": [{"k": "select", "l": "Size", "v": "50 × 25 mm (thermal)"}, {"k": "select", "l": "Barcode", "v": "Code 128 · lot + roll"}, {"k": "toggle", "l": "Show item name in Gujarati", "on": True}, {"k": "toggle", "l": "Show rate", "on": False}, {"k": "toggle", "l": "Show metres", "on": True}, {"k": "select", "l": "Printer", "v": "TSC label printer (Bluetooth)"}]}],
  "paper": ["Preview", ["રેયોન પ્રિન્ટ 44\" · Rayon print 44\""], ["Lot RL-2292 · Roll 7 · 52 m"], ["||| |||| || ||| |||| | ||| (Code 128)"], ["Shree Krishna Textiles"]]})

web('Timeline.dc.html', 'Activity timeline', {
  "active": "Sales & invoices", "back": "InvoiceView.dc.html", "backT": "Invoice", "title": "Timeline · D01-001861", "sub": "Everything that happened to this bill, from every device, in order. Same view exists for parties and lots.",
  "table": {"cols": "1fr 1.2fr 2fr", "minW": 760, "heads": ["When", "Who · where", "What"], "rows": [
    ["16 Nov 3:58 pm", B("Kiran", "Counter 1 · offline"), "Bill made · ₹1,11,510"],
    ["16 Nov 3:59 pm", B("Kiran", "Counter 1"), "Printed 80 mm · WhatsApp queued"],
    ["16 Nov 4:02 pm", B("System", "Sync"), C("Synced · posted", "ok")],
    ["16 Nov 4:05 pm", B("System", "IRP"), "E-invoice IRN 7c2e…a91f"],
    ["19 Nov 9:40 am", B("System", "UPI"), C("₹1,11,510 received · auto-matched", "ok")]]}})

# ---- Android
mob('MobileVoiceHub.dc.html', 'Voice assistant', {"title": "Speak", "sub": "Hold the mic, speak, let go", "back": "MobileHome.dc.html", "badge": ["ગુજરાતી", "ok"],
  "voice": ["Patel Sarees nu khatu batavo", "Opening Patel Sarees ledger…", "Listening… ગુજરાતી · हिंदी · English"],
  "chips": ["ગુજરાતી", "हिंदी", "English"], "chipsLabel": "Voice language",
  "listTitle": "Try saying",
  "items": [["“Navu bill Mahavir mate”", "Start a bill", "›", "", "", None, "MobileVoice.dc.html"], ["“Rayon 2292 ketlo stock?”", "Check stock", "›", "", "", None, "MobileStock.dc.html"], ["“Aaje ketlu vechan?”", "Ask a question", "›", "", "", None, "MobileCopilot.dc.html"], ["“Patel ne reminder moklo”", "Draft a reminder", "›", "", "", None, "MobileWhatsApp.dc.html"]],
  "note": ["Drafts only. Nothing is saved or sent until you tap Confirm. Audio is not stored.", "mute"], "nav": "x"})

mob('MobileUpiQr.dc.html', 'UPI QR', {"title": "Scan to pay", "sub": "D01-001880 · Patel Sarees", "back": "MobileReceipt.dc.html", "badge": ["Waiting", "info"],
  "qr": "[ UPI QR ]\n₹17,252\nshreekrishna@hdfc\nBill D01-001880",
  "hero": {"l": "Customer scans with any UPI app", "v": "₹17,252", "s": "Marked paid automatically when the money arrives"},
  "buttons": [["Paid by cash instead", "MobilePayment.dc.html"], ["*Done", "MobileHome.dc.html"]]})

mob('MobileCollections.dc.html', 'Collections', {"title": "Collections today", "sub": "3 promises · ₹1,10,000", "menuBtn": True,
  "items": [["Shiv Fabrics", "Promised ₹40,000 today · 52 d", "₹96,400", "Call now", "warn"], ["Patel Sarees", "Promised ₹50,000 on 25 Nov", "₹2,15,000", "Upcoming", "info"], ["Mahavir Cloth Store", "Promise broken 15 Nov", "₹1,64,876", "Broken", "bad"], ["Jay Ambe Garments", "No promise yet · 38 d", "₹88,200", "Ask", "mute"]],
  "buttons": [["Log promise", "MobileCollections.dc.html"], ["*Send ledger link", "MobileWhatsApp.dc.html"]], "nav": "x"})

mob('MobileCustomerLedger.dc.html', 'Customer view', {"title": "Shree Krishna Textiles", "sub": "Your statement · Patel Sarees", "dark": True, "badge": ["Customer view", "info"],
  "hero": {"l": "Total due", "v": "₹1,95,852", "s": "Oldest bill 17 Aug · cheque ₹50,000 clearing", "tone": "warn", "dark": True},
  "items": [["D01-001512", "17 Aug", "₹40,000"], ["D02-001601", "3 Sep", "₹55,200"], ["D01-001688", "28 Sep", "₹48,900"], ["D03-000418", "14 Nov", "₹34,500"], ["D01-001880", "19 Nov", "₹17,252"]],
  "buttons": [["Raise a query", "MobileCustomerLedger.dc.html"], ["*Pay by UPI", "MobileUpiQr.dc.html"]]})

mob('MobileSalesOrder.dc.html', 'Sales order', {"title": "Take order", "sub": "At customer's shop · Divya", "back": "MobileDrawer.dc.html", "badge": ["Offline OK", "mute"],
  "fields": [["Party", "Raghuvir Traders, Amreli"]],
  "items": [["Rayon print 44\" · R-118", "Stock 272 m · ₹145", "120 m"], ["Georgette D22", "Stock 58 pc · ₹640", "20 pc"], ["Chiffon saree", "Stock 62 pc · ₹900", "10 pc"]],
  "hero": {"l": "Order total (with GST)", "v": "₹45,150", "s": "Credit OK · delivery Fri"},
  "note": ["The order goes to the godown for packing. Stock is reserved, not reduced.", "info"],
  "buttons": [["Add item", "MobileItems.dc.html"], ["*Send order", "MobileDispatch.dc.html"]]})

mob('MobileBroker.dc.html', 'Broker', {"title": "Ramanbhai Dalal", "sub": "Broker · Surat · 1.5%", "back": "MobileReports.dc.html",
  "hero": {"l": "Commission this month", "v": "₹18,600", "s": "Payable now ₹7,200 · on hold ₹11,400", "dark": True},
  "items": [["Patel Sarees", "Sales ₹6,10,000", "₹9,150", "On hold", "warn"], ["Om Textiles", "Sales ₹3,20,000", "₹4,800", "Payable", "ok"], ["Krishna Fashion", "Sales ₹1,60,000", "₹2,400", "Payable", "ok"]],
  "buttons": [["Statement", "MobileWhatsApp.dc.html"], ["*Pay ₹7,200", "MobileStepUp.dc.html"]]})

mob('MobileTraining.dc.html', 'Training mode', {"title": "Training mode", "sub": "Practice · nothing counts", "back": "MobileHelp.dc.html",
  "banner": ["TRAINING MODE · bills use series TR- and are deleted in 7 days", "warn"],
  "items": [["Make a bill and print", "3 min", "", "Done", "ok"], ["Bill by voice", "2 min", "", "Done", "ok", None, "MobileVoice.dc.html"], ["Receive UPI payment", "2 min", "", "Next", "info", None, "MobileUpiQr.dc.html"], ["Sales return", "3 min", "", "", ""], ["Close day", "2 min", "", "", "", None, "MobileCloseDay.dc.html"]],
  "buttons": [["Exit training", "MobileHome.dc.html"], ["*Start lesson", "MobileBilling.dc.html"]]})

mob('MobileLabels.dc.html', 'Print labels', {"title": "Print roll labels", "sub": "Lot RL-2292 · 6 rolls", "back": "MobilePurchase.dc.html",
  "receipt": ["રેયોન પ્રિન્ટ 44\"", "Rayon print 44\"", "-", ["Lot", "RL-2292"], ["Roll", "7 of 12"], ["Metres", "52 m"], "-", "||| |||| || ||| ||||"],
  "chips": ["All 6 rolls", "Roll 7 only"], "chipsLabel": "Which",
  "buttons": [["Printer", "MobilePrinter.dc.html"], ["*Print 6 labels", "MobileStock.dc.html"]]})

mob('MobileReadAloud.dc.html', 'Read aloud', {"title": "Speaking", "sub": "Read aloud · ગુજરાતી", "back": "MobileReceipt.dc.html",
  "voice": ["Bill ni total sattar hajaar be so baavan rupiya. Patel Sarees nu baki be lakh pandar hajaar.", "Bill total ₹17,252. Patel Sarees owes ₹2,15,000.", "🔊 Speaking… ગુજરાતી"],
  "note": ["Helps staff and customers who prefer listening. Turn on or off in Settings.", "mute"],
  "buttons": [["Repeat", "MobileReadAloud.dc.html"], ["*Stop", "MobileHome.dc.html"]]})
