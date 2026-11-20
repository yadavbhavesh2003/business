# Core web screens + Sidebar component + first Android flow screens
SIDEBAR_GROUPS = [
  ['Daily work', [['Dashboard', 'Main'], ['Sales & invoices', 'Invoices'], ['Quotations & orders', 'Quotations'], ['Purchases', 'Purchases'], ['Delivery challans', 'Challans'], ['Dispatch', 'Dispatch'], ['Returns & credit notes', 'Returns'], ['Payments', 'Payments'], ['Collections', 'Collections'], ['Expenses', 'Expenses']]],
  ['Business', [['Parties', 'Parties'], ['Items', 'Products'], ['Stock & lots', 'Stock'], ['Stock count', 'StockCount'], ['Price lists & schemes', 'PriceLists'], ['Branches & godowns', 'Branches'], ['GST summary', 'Gst'], ['Reports', 'Reports']]],
  ['Later (not in MVP)', [['Brokers & commission', 'Brokers', 'Later'], ['UPI & bank matching', 'UpiCollections', 'Later'], ['Accounts & ledgers', 'Accounts', 'Later'], ['Business Copilot', 'Copilot', 'Later'], ['Training mode', 'TrainingMode', 'Later'], ['Manufacturing', 'Manufacturing', 'Later'], ['Metal melting', 'Foundry', 'Later']]],
  ['Admin', [['Approvals', 'Approvals', '3'], ['Notifications', 'Notifications', '5'], ['Devices & sync', 'Devices', '1'], ['Users & roles', 'Users'], ['Audit log', 'Audit'], ['Import & export', 'ImportExport'], ['Subscription', 'Subscription'], ['Settings', 'Settings'], ['Help & support', 'Help']]]]
SIDEBAR = (HEAD % 'Sidebar') + '''<nav aria-label="Main" style="width: 100%; min-height: 100%; box-sizing: border-box; background: #15181C; color: #E8EAED; padding: 20px 14px; display: flex; flex-direction: column; gap: 2px; font-family: Inter, system-ui, sans-serif">
  <a href="Main.dc.html" style="display: flex; align-items: center; gap: 10px; padding: 0 8px 14px; text-decoration: none; color: #FFFFFF">
    <span aria-hidden="true" style="width: 32px; height: 32px; border-radius: 8px; background: #0F766E; display: flex; align-items: center; justify-content: center; font-weight: 700">U</span>
    <span style="display: flex; flex-direction: column"><span style="font-weight: 700; font-size: 16px">UdyamOS</span><span style="font-size: 12px; color: #A9AFB8">Shree Krishna Textiles</span></span>
  </a>
  <a href="CommandPalette.dc.html" style="display: flex; align-items: center; justify-content: space-between; min-height: 40px; padding: 0 12px; margin-bottom: 6px; border-radius: 10px; background: #22262C; color: #C9CDD3; text-decoration: none; font-size: 13px">
    <span>Search or jump to…</span><span style="font-size: 11px; border: 1px solid #3C424B; border-radius: 6px; padding: 1px 6px">Ctrl K</span>
  </a>
  <sc-for list="{{groups}}" as="g" hint-placeholder-count="4">
    <div style="display: flex; flex-direction: column; gap: 1px; padding-top: 10px">
      <span style="font-size: 11px; font-weight: 700; color: #A9AFB8; text-transform: uppercase; letter-spacing: 0.06em; padding: 0 12px 4px">{{g.title}}</span>
      <sc-for list="{{g.items}}" as="n" hint-placeholder-count="6">
        <a href="{{n.href}}" style="{{n.style}}"><span>{{n.label}}</span><sc-if value="{{n.badge}}" hint-placeholder-val="{{false}}"><span style="{{n.badgeStyle}}">{{n.badge}}</span></sc-if></a>
      </sc-for>
    </div>
  </sc-for>
  <a href="Profile.dc.html" style="margin-top: 16px; display: flex; align-items: center; gap: 10px; padding: 10px; border-radius: 10px; background: #22262C; text-decoration: none; color: #FFFFFF">
    <span aria-hidden="true" style="width: 36px; height: 36px; border-radius: 50%; background: #2B3038; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px">RP</span>
    <span style="display: flex; flex-direction: column"><span style="font-size: 14px; font-weight: 600">Rameshbhai Patel</span><span style="font-size: 12px; color: #A9AFB8">Owner · My profile · ગુજ / En</span></span>
  </a>
</nav>
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{"active":{"editor":"text","default":"Dashboard"},"$preview":{"width":232,"height":1700}}'>
class Component extends DCLogic {
  renderVals() {
    const active = this.props.active ?? 'Dashboard';
    const G = ''' + json.dumps(SIDEBAR_GROUPS, ensure_ascii=False) + ''';
    const groups = G.map(([title, items]) => ({ title, items: items.map(([label, file, badge]) => ({
      label, href: file + '.dc.html', badge: badge || '',
      badgeStyle: badge === 'Later' || badge === 'New' ? 'font-size: 11px; font-weight: 700; border-radius: 6px; padding: 1px 6px; background: ' + (badge === 'New' ? '#0F766E; color: #FFFFFF' : '#2B3038; color: #C9CDD3') : 'background: #F59E0B; color: #15181C; font-size: 12px; font-weight: 700; border-radius: 999px; padding: 1px 8px',
      style: 'display: flex; align-items: center; justify-content: space-between; min-height: 36px; padding: 0 12px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 500; ' + (label === active ? 'background: #2B3038; color: #FFFFFF' : 'color: #C9CDD3')
    })) }));
    return { groups };
  }
}
</script>
</body>
</html>
'''
open(os.path.join(OUT, 'Sidebar.dc.html'), 'w').write(SIDEBAR); BUILT.append('Sidebar.dc.html')

web('Invoices.dc.html', 'Sales and invoices', {
  "active": "Sales & invoices", "title": "Sales & invoices", "sub": "All bills from every counter and phone. Posted bills are never edited: corrections go through credit notes.",
  "actions": ["Export", "Sales return", "*+ New invoice"],
  "kpis": [["This month", "₹48,62,300", "612 invoices", "ok"], ["Unpaid", "₹18,42,300", "64 parties"], ["Not synced yet", "1 bill", "Godown phone · D04", "warn"], ["Cancelled this month", "4", "₹61,200 · all with credit notes"]],
  "chips": ["All", "Unpaid", "Partly paid", "Paid", "On hold", "Cancelled"], "search": "Invoice no., party, amount…",
  "table": {"cols": "1.1fr 1.7fr 0.8fr 1fr 1fr 1fr 1.1fr", "minW": 900, "heads": ["Invoice", "Party", "Date", ">Amount", ">Balance", "Status", "Sync"], "rows": [
    [B("D01-001879", "Kiran · Counter 1"), B("Mahavir Cloth Store", "Mahuva"), "19 Nov", "₹18,240", "₹18,240", C("Unpaid", "warn"), C("Synced", "ok")],
    [B("D01-001878", "Kiran · Counter 1"), B("Walk-in customer", "Cash"), "19 Nov", "₹2,150", "₹0", C("Paid", "ok"), C("Synced", "ok")],
    [B("D01-001877", "Kiran · Counter 1"), B("Mahavir Cloth Store", "Mahuva"), "19 Nov", "₹36,636", "₹36,636", C("On hold", "info"), C("Synced", "ok")],
    [B("D04-000214", "Anil · Godown"), B("Raghuvir Traders", "Amreli"), "17 Nov", "₹22,400", "₹22,400", C("Unpaid", "warn"), C("On device", "warn")],
    [B("D02-001850", "Mehul · Counter 2"), B("Shiv Fabrics", "Palitana"), "18 Nov", "₹41,300", "₹11,300", C("Partly paid", "info"), C("Synced", "ok")],
    [B("D03-000418", "Rameshbhai"), B("Patel Sarees", "Surat"), "14 Nov", "₹34,500", "₹34,500", C("Unpaid", "warn"), C("Synced", "ok")],
    [B("D02-001842", "Mehul · Counter 2"), B("Jay Ambe Garments", "Bhavnagar"), "18 Nov", "₹18,750", "₹0", C("Cancelled", "mute"), C("Synced", "ok")],
    [B("D01-001861", "Kiran · Counter 1"), B("Navkar Textiles", "Ahmedabad"), "16 Nov", "₹1,11,510", "₹0", C("Paid", "ok"), C("Synced", "ok")]]},
  "note": "Bill numbers carry the device prefix (D01, D02…) so phones can bill offline without clashing. Format to be approved by your CA. Press N for a new invoice, / to search."})

web('Challans.dc.html', 'Delivery challans', {
  "active": "Delivery challans", "title": "Delivery challans", "sub": "Goods that left the godown before billing, and lots sent to processors for job work.",
  "actions": ["Print", "*Make bill"],
  "kpis": [["Open challans", "12", "₹3,84,000 of goods out"], ["Not billed > 7 days", "3", "Convert to invoice", "warn"], ["Job work out", "5 lots", "At 2 processors"], ["Returned this month", "2", "Stock added back", "ok"]],
  "chips": ["Open", "Job work", "Billed", "Returned"], "search": "Challan no., party, lot…",
  "table": {"cols": "1fr 1.6fr 1.3fr 0.8fr 0.8fr 0.6fr 1fr", "minW": 900, "heads": ["Challan", "Party / processor", "Lots", ">Qty", "Out on", ">Days", "Status"], "rows": [
    [B("DC-D04-0091", "Anil · Godown"), B("Patel Sarees", "Surat"), "RL-2292 · R8, R9", "96 m", "18 Nov", "1", C("Open", "info")],
    [B("DC-D04-0088", "Anil · Godown"), B("Shiv Fabrics", "Palitana"), "CC-1180 · R3", "52 m", "10 Nov", "9", C("Bill now", "warn")],
    [B("DC-D04-0087", "Anil · Godown"), B("Om Dyeing Works", "Job work · dyeing"), "GR-0920 · 4 rolls", "410 m", "9 Nov", "10", C("At processor", "mute")],
    [B("DC-D02-0045", "Mehul · Counter 2"), B("Mahavir Cloth Store", "Mahuva"), "GD-0431 · D22", "30 pc", "8 Nov", "11", C("Bill now", "warn")],
    [B("DC-D04-0083", "Anil · Godown"), B("Ambika Printers", "Job work · printing"), "GR-0915 · 6 rolls", "620 m", "5 Nov", "14", C("At processor", "mute")]]},
  "aside": {"title": "Challan rules", "sub": "How stock moves, so nothing is counted twice.", "items": [["Stock leaves", "At challan"], ["Invoice from challan", "No second stock move"], ["Job work return", "Adds processed lot"], ["Bill reminder", "After 7 days", "warn"], ["GST form ITC-04", "Later release"]]}})

web('Parties.dc.html', 'Parties', {
  "active": "Parties", "title": "Parties", "sub": "Customers and suppliers with credit limits, credit days and live outstanding.",
  "actions": ["Import from Excel", "Send ledger link", "*+ Add party"],
  "kpis": [["Customers", "64", "48 active this month"], ["Suppliers", "21", "₹7,20,000 payable"], ["Over credit limit", "3", "Billing needs manager PIN", "warn"], ["Overdue", "9 parties", "₹6,10,800", "warn"]],
  "chips": ["Customers", "Suppliers", "Overdue", "Over limit"], "search": "Name, phone, GSTIN, city…",
  "table": {"cols": "1.6fr 1.4fr 1fr 1fr 0.7fr 0.8fr 1fr", "minW": 940, "heads": ["Party", "GSTIN", ">Credit limit", ">Due", ">Oldest", ">Limit used", "Promise to pay"], "rows": [
    [B("Patel Sarees", "Surat · broker Ramanbhai"), "24ABCDE1234F1Z5", "₹2,00,000", "₹2,15,000", {"t": "94 d", "c": "bad"}, C("108%", "bad"), C("₹50,000 · 25 Nov", "info")],
    [B("Mahavir Cloth Store", "Mahuva"), "24FGHIJ5678K1Z2", "₹1,50,000", "₹1,64,876", {"t": "71 d", "c": "warn"}, C("110%", "bad"), C("Broken · 15 Nov", "bad")],
    [B("Shiv Fabrics", "Palitana"), "24KLMNO9012P1Z8", "₹1,00,000", "₹96,400", {"t": "52 d", "c": "warn"}, C("96%", "warn"), "—"],
    [B("Jay Ambe Garments", "Bhavnagar"), "24QRSTU3456V1Z4", "₹1,50,000", "₹88,200", "38 d", C("59%", "ok"), "—"],
    [B("Raghuvir Traders", "Amreli"), "24WXYZA7890B1Z6", "₹1,50,000", "₹83,900", "33 d", C("56%", "ok"), "—"],
    [B("Navkar Textiles", "Ahmedabad"), "24CDEFG2345H1Z1", "₹3,00,000", "₹0", "—", C("0%", "ok"), "—"]]},
  "aside": {"title": "Patel Sarees", "sub": "Selected party", "items": [["Credit limit", "₹2,00,000"], ["Credit days", "45"], ["Due now", "₹2,15,000", "bad"], ["Avg. days to pay", "61"], ["Broker", "Ramanbhai Dalal"], ["Block when overdue", "On"]], "foot": "Open ledger →"}})

web('Stock.dc.html', 'Stock and lots', {
  "active": "Stock & lots", "title": "Stock & lots", "sub": "Every roll and lot by godown. Balances come from the stock ledger, so they always add up.",
  "actions": ["Stock count", "Transfer", "Print labels", "*+ Purchase entry"],
  "kpis": [["Stock value (cost)", "₹62,40,000", "318 lots"], ["Negative lots", "2", "From offline sales · review", "warn"], ["Slow stock > 90 days", "24 lots", "₹6,85,000 tied up", "warn"], ["At processors", "10 rolls", "1,030 m out on job work"]],
  "chips": ["All godowns", "Godown 1", "Godown 2", "At processors"], "search": "Item, lot, roll, barcode…",
  "table": {"cols": "1.6fr 1.2fr 0.9fr 0.8fr 0.8fr 0.9fr 1fr 0.7fr", "minW": 980, "heads": ["Item", "Lot · roll", "Godown", ">In", ">Out", ">Balance", ">Value", ">Age"], "rows": [
    [B("Rayon print 44\"", "Design R-118"), {"t": "RL-2291 · R6", "h": "ConflictDetail.dc.html"}, "Godown 1", "52 m", "70 m", {"t": "−18 m", "c": "bad"}, "−₹2,610", "12 d"],
    [B("Rayon print 44\"", "Design R-118"), "RL-2292 · R7–R12", "Godown 1", "312 m", "40 m", B("272 m"), "₹39,440", "12 d"],
    [B("Cotton cambric 58\"", "White"), "CC-1180 · R1–R4", "Godown 2", "220 m", "77 m", B("143 m"), "₹16,874", "34 d"],
    [B("Georgette dress material", "Design 22"), "GD-0431", "Godown 1", "120 pc", "62 pc", B("58 pc"), "₹37,120", "41 d"],
    [B("Grey cloth 63\"", "For dyeing"), "GR-0920", "Om Dyeing Works", "410 m", "0 m", B("410 m"), "₹32,800", "10 d"],
    [B("Chiffon saree", "Assorted"), "CS-0077", "Godown 2", "80 pc", "18 pc", B("62 pc"), "₹55,800", {"t": "128 d", "c": "warn"}]]},
  "aside": {"title": "Lot RL-2291 · ledger", "sub": "Why it is negative", "items": [["12 Nov · Purchase PB-0331", "+52 m", "ok"], ["19 Nov · D01-001869 (offline)", "−40 m"], ["19 Nov · D04-000212 (offline)", "−30 m"], ["Balance", "−18 m", "bad"]], "foot": "Fix: transfer 18 m from RL-2292 →"}})

web('Payments.dc.html', 'Payments', {
  "active": "Payments", "title": "Payments", "sub": "Money received from customers and paid to suppliers, matched to bills.",
  "actions": ["Bank reconcile", "Pay supplier", "Show QR", "*+ Receive payment"],
  "kpis": [["Received this month", "₹31,40,000", "Cash 18% · UPI/Bank 82%", "ok"], ["Paid to suppliers", "₹22,80,000", "14 payments"], ["Not matched to bills", "₹12,000", "2 receipts", "warn"], ["Cheques to deposit", "3", "₹1,45,000", "warn"]],
  "chips": ["Received", "Paid", "Not matched", "Cheques"], "search": "Receipt no., party, UTR…",
  "table": {"cols": "1fr 1.5fr 0.8fr 0.9fr 1fr 1.4fr 1fr", "minW": 940, "heads": ["Receipt", "Party", "Date", "Mode", ">Amount", "Against bills", "By"], "rows": [
    [B("RC-D03-0211"), B("Navkar Textiles", "Ahmedabad"), "19 Nov", "Bank · NEFT", "₹1,11,510", "D01-001861", "Rameshbhai"],
    [B("RC-D01-0540"), B("Walk-in customer"), "19 Nov", "Cash", "₹2,150", "D01-001878", "Kiran"],
    [B("RC-D02-0318"), B("Shiv Fabrics", "Palitana"), "18 Nov", "UPI · auto-matched", "₹30,000", "D02-001850 (part)", "UPI"],
    [B("RC-D03-0209"), B("Patel Sarees", "Surat"), "16 Nov", "Cheque", "₹50,000", C("Cheque not deposited", "warn"), "Rameshbhai"],
    [B("RC-D01-0532"), B("Jay Ambe Garments", "Bhavnagar"), "15 Nov", "UPI", "₹12,000", C("Not matched", "warn"), "Kiran"]]},
  "aside": {"title": "Cash today", "sub": "Counter closing, expected vs counted", "items": [["Counter 1 · Kiran", "−₹500", "bad"], ["Counter 2 · Mehul", "₹0", "ok"], ["Opening cash", "₹5,000"], ["Cash received", "₹38,000"], ["Expected in drawers", "₹43,000"]], "foot": "Close day →"}})

web('Reports.dc.html', 'Reports', {
  "active": "Reports", "title": "Reports", "sub": "Ready-made reports for you and your CA. Every report exports to Excel and PDF.",
  "actions": ["*Export to Tally"],
  "chips": ["All", "Sales", "GST", "Stock", "Money", "Audit"], "search": "Find a report…",
  "table": {"cols": "1.4fr 2.2fr 0.9fr 1fr", "minW": 820, "heads": ["Report", "What it shows", "Last opened", "Formats"], "rows": [
    [B("Sales register"), "Every bill with tax split, by date or party", "Today", "Excel · PDF"],
    [B("GST summary (GSTR-1 view)"), "B2B, B2C and HSN summary for the month, for your CA to file", "2 Nov", "Excel · JSON"],
    [B("Receivables ageing"), "Who owes how much, split by 0–30, 31–60, 61–90 and 90+ days", "Today", "Excel · PDF"],
    [{"t": "Stock by lot and godown", "b": True, "h": "Stock.dc.html"}, "Balance and value of every lot, slow stock flagged", "Yesterday", "Excel"],
    [B("Profit by item"), "Sales minus purchase cost by item and lot", "12 Nov", "Excel"],
    [{"t": "Broker commission", "b": True, "h": "Brokers.dc.html"}, "Commission earned and payable per broker", "10 Nov", "Excel · PDF"],
    [{"t": "Staff activity", "b": True, "h": "Audit.dc.html"}, "Bills, discounts, cancellations and cash difference per person", "Today", "Excel · PDF"],
    [B("Audit trail"), "Every change with who, when and before/after. Cannot be switched off.", "1 Nov", "Excel · CSV"]]},
  "aside": {"title": "For your CA", "sub": "Month end, November 2026", "items": [["Tally XML export", "Ready", "ok"], ["GST summary", "Ready", "ok"], ["Bills not synced", "1", "warn"], ["Open sync conflicts", "2", "warn"], ["CA access", "Read-only until 15 Dec"]], "foot": "Share with CA →"}})

web('Devices.dc.html', 'Devices and sync', {
  "active": "Devices & sync", "title": "Devices & sync", "sub": "Every phone and computer that can bill. Lost a phone? Revoke it: pending bills upload first, then it is wiped.",
  "actions": ["Sync log", "*+ Register device"],
  "kpis": [["Devices", "6 of 8", "Business plan"], ["Waiting to sync", "14 events", "Godown phone", "warn"], ["Open conflicts", "2", "Review in Approvals", "warn"], ["Last cloud backup", "2:00 am", "Stored in India", "ok"]],
  "table": {"cols": "1.5fr 1.2fr 0.6fr 0.8fr 1fr 0.7fr 1fr", "minW": 940, "heads": ["Device", "Who uses it", "Series", "App", "Last sync", ">Pending", "Status"], "rows": [
    [B("Counter 1", "Redmi 12 · Android 14"), "Kiran, Mehul", "D01", "1.0.4", "1 min ago", "0", C("Healthy", "ok")],
    [B("Counter 2", "Galaxy A15 · Android 14"), "Kiran, Mehul", "D02", "1.0.4", "2 min ago", "0", C("Healthy", "ok")],
    [B("Owner phone", "Pixel 8a · Android 15"), "Rameshbhai", "D03", "1.0.4", "Just now", "0", C("Healthy", "ok")],
    [B("Godown phone", "Redmi 10 · Android 12"), "Anil", "D04", "1.0.3", "Tue 6:40 pm", "14", C("Not syncing", "bad")],
    [B("Manager tablet", "Tab A9 · Android 14"), "Divya", "D05", "1.0.4", "6 min ago", "0", C("Healthy", "ok")],
    [B("Office PC", "Chrome · Windows"), "Accountant", "Web", "—", "Online", "0", C("Online only", "mute")]]},
  "aside": {"title": "Godown phone · D04", "sub": "Selected device", "items": [["Pending events", "14", "warn"], ["Oldest pending", "Tue 6:40 pm"], ["App version", "1.0.3 (update)", "warn"], ["Local data", "Encrypted"], ["Integrity check", "Passed", "ok"]], "foot": "Revoke & wipe →"}})

web('Users.dc.html', 'Users and roles', {
  "active": "Users & roles", "title": "Users & roles", "sub": "Who can do what, where. The server checks every action, even on bills made offline.",
  "actions": ["Edit roles", "*+ Invite user"],
  "chips": ["Users", "Roles & limits", "Pending invites"], "search": "Name or phone…",
  "table": {"cols": "1.4fr 1fr 1fr 1.1fr 0.9fr 0.8fr", "minW": 860, "heads": ["Person", "Role", "Where", "Sign-in", "2FA", "Status"], "rows": [
    [B("Rameshbhai Patel", "98250 xxxxx"), "Owner", "All branches", "OTP + passkey", C("On", "ok"), C("Active", "ok")],
    [B("Divya Joshi", "99090 xxxxx"), "Manager", "Bhavnagar", "OTP + PIN", C("On", "ok"), C("Active", "ok")],
    [B("Kiran Solanki", "Counter PIN"), "Cashier", "Counter 1, 2", "PIN on device", C("Device", "mute"), C("Active", "ok")],
    [B("Mehul Rathod", "Counter PIN"), "Cashier", "Counter 1, 2", "PIN on device", C("Device", "mute"), C("Active", "ok")],
    [B("Anil Makwana", "Godown PIN"), "Godown", "Godown 1, 2", "PIN on device", C("Device", "mute"), C("Active", "ok")],
    [B("CA Hitesh Shah", "hitesh@…"), "Accountant (read)", "All · until 15 Dec", "Email + TOTP", C("On", "ok"), C("Time-boxed", "info")]]},
  "aside": {"title": "Cashier limits", "sub": "Above these, a manager must approve", "items": [["Max discount", "8%"], ["Lowest price", "List − 5%"], ["Bill over credit limit", "Manager PIN"], ["Cancel a bill", "Approval"], ["See purchase cost", "No"], ["Export data", "No"]], "foot": "Edit cashier role →"}})

web('Settings.dc.html', 'Settings', {
  "active": "Settings", "title": "Settings", "sub": "Business, tax, offline, language and security settings. Changes here are recorded in the audit trail.",
  "forms": [
    {"title": "Business", "desc": "Printed on every bill.", "fields": [{"l": "Legal name", "v": "Shree Krishna Textiles"}, {"l": "GSTIN", "v": "24AAAPK1234L1Z9"}, {"k": "select", "l": "State", "v": "Gujarat (24)"}, {"l": "Address", "v": "12, Kapad Bazar, Bhavnagar 364001"}, {"l": "UPI ID for bills", "v": "shreekrishna@hdfc", "help": "A payment QR is printed on every bill and receipt."}]},
    {"title": "Tax & invoices", "desc": "Ask your CA before changing numbering.", "fields": [{"k": "select", "l": "Financial year", "v": "2026–27"}, {"l": "Invoice number format", "v": "{device}/{fy}/{seq}", "help": "Example: D01/26-27/001880 · max 16 characters"}, {"k": "toggle", "l": "Round off totals", "on": True}, {"k": "toggle", "l": "E-Invoice (IRP)", "on": False, "help": "Needed above the notified turnover threshold. Coming in Release 2."}]},
    {"title": "Language & voice", "desc": "Each person can also choose their own in Profile.", "fields": [{"k": "select", "l": "Default language for staff", "v": "ગુજરાતી"}, {"k": "select", "l": "Bills & receipts print in", "v": "English + Gujarati item names"}, {"k": "toggle", "l": "Voice button on phones", "on": True}, {"k": "toggle", "l": "Read totals aloud after billing", "on": False}]},
    {"title": "Offline & sync", "desc": "How phones behave without internet.", "fields": [{"k": "toggle", "l": "Allow selling below zero stock offline", "on": True, "help": "Flagged for review after sync."}, {"k": "select", "l": "Phone can bill offline for", "v": "7 days"}, {"k": "select", "l": "Auto-lock counter phone after", "v": "5 minutes"}]},
    {"title": "Security", "desc": "Protects against stolen phones and misuse.", "fields": [{"k": "toggle", "l": "2FA required for owners and accountants", "on": True, "help": "Always on. Cannot be switched off."}, {"k": "select", "l": "Staff PIN length", "v": "4 digits"}, {"k": "toggle", "l": "Alert me on WhatsApp when a bill is cancelled", "on": True}, {"k": "toggle", "l": "Hide profit screens from screenshots", "on": False}]},
    {"title": "Printing", "desc": "Receipt printers on Android phones.", "fields": [{"k": "select", "l": "Paper width", "v": "80 mm"}, {"k": "toggle", "l": "Print item names in Gujarati", "on": True}, {"k": "button", "l": "Print a test receipt"}]}],
  "formButtons": [["Cancel", "Main.dc.html"], ["*Save changes", "Main.dc.html"]]}, h=2000)

web('WebLogin.dc.html', 'Sign in', {
  "sidebar": False, "centered": True, "maxW": 520, "title": "Sign in to UdyamOS", "sub": "For owners, managers and accountants. Counter staff sign in on the phone with their PIN.",
  "forms": [
    {"title": "1 · Your mobile number", "desc": "We send a 6-digit code by SMS. It expires in 5 minutes.", "fields": [{"k": "select", "l": "Language", "v": "ગુજરાતી · हिंदी · English"}, {"l": "Mobile number", "v": "+91 98250 12345"}, {"l": "Code from SMS", "v": "", "ph": "6-digit code"}]},
    {"title": "2 · Confirm it's you", "desc": "Owners and accountants always need a second step. An SMS code alone can be stolen with a SIM swap.", "fields": [{"k": "button", "l": "Use passkey (fingerprint / face)"}, {"l": "Or code from authenticator app", "v": "", "ph": "6-digit code"}, {"k": "toggle", "l": "Trust this computer for 30 days", "on": False}]}, {"title": "UdyamOS staff", "desc": "Separate login for our team: company SSO + hardware security key.", "fields": [{"k": "button", "l": "UdyamOS team sign in (staff only)", "h": "PlatformHome.dc.html"}]}],
  "formButtons": [["Use a recovery code", "Recovery.dc.html"], ["*Sign in", "WebConsent.dc.html"]],
  "note": "Lost your phone and passkey? Account recovery needs GSTIN + PAN check and takes 48 hours, so no one can take over your business quickly."}, h=1000)

ONB = ["Business", "Tax & bills", "Godowns", "Staff", "Phones", "Import data"]
web('WebOnboarding.dc.html', 'Business setup', {
  "sidebar": False, "centered": True, "maxW": 980, "steps": ONB, "stepAt": 1,
  "title": "Set up tax and bills", "sub": "About 10 minutes. You can change most of this later in Settings.",
  "forms": [
    {"title": "GST", "desc": "Filled from your GSTIN. Check and correct.", "fields": [{"l": "GSTIN", "v": "24AAAPK1234L1Z9", "help": "Verified · Shree Krishna Textiles"}, {"k": "select", "l": "Registration type", "v": "Regular"}, {"k": "select", "l": "Most items are taxed at", "v": "5% (fabrics)"}, {"k": "select", "l": "Financial year starts", "v": "April"}]},
    {"title": "Bill numbering", "desc": "Each phone gets its own series so offline bills never clash.", "fields": [{"l": "Format", "v": "{device}/{fy}/{seq}", "help": "Preview: D01/26-27/000001"}, {"l": "Start number (if moving from Tally)", "v": "1"}, {"k": "toggle", "l": "My CA has approved this format", "on": False, "help": "You can bill now and confirm later."}]},
    {"title": "What you sell in", "desc": "Units you use. Add more any time.", "fields": [{"k": "toggle", "l": "Metres (rolls, lots)", "on": True}, {"k": "toggle", "l": "Pieces", "on": True}, {"k": "toggle", "l": "Kilograms", "on": False}, {"k": "toggle", "l": "Than / bundle", "on": True}]}],
  "formButtons": [["Back", "WebConsent.dc.html"], ["*Continue", "WebOnbGodowns.dc.html"]]}, h=1100)

# ---- first Android flow screens
mob('MobileManagerPin.dc.html', 'Manager approval', {
  "title": "Manager approval", "sub": "Bill D01-001880 · Patel Sarees", "back": "MobileBilling.dc.html", "badge": ["Offline", "warn"],
  "hero": {"l": "Credit limit crossed", "v": "₹17,252", "s": "Due will be ₹2,32,252 on a ₹2,00,000 limit", "tone": "warn"},
  "items": [["Divya Joshi", "Manager · approves on this phone", "", "Selected", "ok"]],
  "keypad": "Divya, enter your PIN",
  "note": ["Offline, a manager can approve up to ₹25,000 over the limit per bill (owner sets this). Above that, the owner approves on their phone. Saved in the audit log: who asked, who approved, on which phone.", "mute"],
  "buttons": [["Cancel", "MobileBilling.dc.html"], ["*Approve", "MobileReceipt.dc.html"]]})

mob('MobileReceipt.dc.html', 'Bill saved', {
  "title": "Bill saved", "sub": "Provisional · D01/26-27/001880", "back": "MobileHome.dc.html", "badge": ["Saved on device", "warn"],
  "receipt": ["SHREE KRISHNA TEXTILES", "Kapad Bazar, Bhavnagar", "GSTIN 24AAAPK1234L1Z9", "-", "PROVISIONAL BILL · NOT A TAX INVOICE", ["Ref", "D01/26-27/001880"], ["Date", "19-11-2026 15:52"], ["To", "Patel Sarees, Surat"], "-", ["Rayon print 44\" 40m×145", "5,800.00"], ["Cotton cambric 58\" 25m×118", "2,950.00"], ["Georgette D22 12pc×640", "7,680.00"], "-", ["Taxable", "16,430.00"], ["CGST 2.5%", "410.75"], ["SGST 2.5%", "410.75"], ["Round off", "+0.50"], ["TOTAL", "₹17,252", True], "-", "[ UPI QR · scan to pay ]", "આભાર · Thank you"],
  "note": ["Printed on Counter 1 printer (80 mm). Tax invoice is issued and shared when this bill syncs.", "mute"],
  "buttons": [["Print again", "MobilePrinter.dc.html"], ["Show UPI QR", "MobileUpiQr.dc.html"], ["*WhatsApp", "MobileWhatsApp.dc.html"]]})

mob('MobilePayment.dc.html', 'Receive payment', {
  "title": "Receive payment", "sub": "Patel Sarees · Surat", "back": "MobileOutstanding.dc.html",
  "hero": {"l": "Due now", "v": "₹2,15,000", "s": "Oldest bill 94 days · promised ₹50,000 on 25 Nov", "tone": "warn", "dark": True},
  "fields": [["Amount received", "₹50,000", True]],
  "chips": ["UPI QR", "Cash", "Cheque", "Bank transfer"], "chipsLabel": "Payment mode",
  "listTitle": "Adjust against bills (oldest first)",
  "items": [["D01-001512 · 17 Aug", "Due ₹40,000", "₹40,000", "Fully paid", "ok", True], ["D02-001601 · 3 Sep", "Due ₹55,200", "₹10,000", "Part", "info", True], ["D01-001688 · 28 Sep", "Due ₹48,900", "₹0", "", "", False]],
  "buttons": [["Show UPI QR", "MobileUpiQr.dc.html"], ["*Save receipt", "MobileReceiptPrint.dc.html"]]})

mob('MobileChallan.dc.html', 'New delivery challan', {
  "title": "New delivery challan", "sub": "DC-D04-0092 · Godown phone", "back": "MobileDrawer.dc.html", "badge": ["Online", "ok"],
  "chips": ["To customer", "Job work out", "Return in"], "chipsLabel": "Challan type",
  "fields": [["Party", "Patel Sarees, Surat"], ["Vehicle / transporter", "GJ04 AB 1234 · Shree Logistics"]],
  "listTitle": "Rolls going out",
  "items": [["Rayon print 44\" · RL-2292", "Roll 10 · scanned", "48 m", "Godown 1", "mute"], ["Rayon print 44\" · RL-2292", "Roll 11 · scanned", "52 m", "Godown 1", "mute"], ["Cotton cambric 58\" · CC-1180", "Roll 4 · scanned", "36 m", "Godown 2", "mute"]],
  "note": ["Stock moves now. When you bill this challan later, stock is not reduced again.", "info"],
  "buttons": [["Bill from challans", "MobileChallanToBill.dc.html"], ["*Save challan", "MobileHome.dc.html"]]})

mob('MobileStock.dc.html', 'Stock check', {
  "title": "Stock check", "sub": "Scanned: RL-2292 · Roll 7", "back": "MobileHome.dc.html",
  "hero": {"l": "Rayon print 44\" · Design R-118", "v": "272 m", "s": "Across 6 rolls · ₹145 / m", "dark": True},
  "chips": ["All", "Godown 1", "Godown 2"], "chipsLabel": "Godown",
  "listTitle": "Rolls in this lot",
  "items": [["Roll 7", "Godown 1 · rack B2", "52 m", "In stock", "ok"], ["Roll 8", "Godown 1 · rack B2", "0 m", "On challan", "info"], ["Roll 10", "Godown 1 · rack B3", "48 m", "In stock", "ok"], ["Roll 11", "Godown 1 · rack B3", "52 m", "In stock", "ok"], ["Roll 12", "Godown 2 · rack A1", "60 m", "In stock", "ok"]],
  "buttons": [["Scan again", "MobileStock.dc.html"], ["*Add to bill", "MobileBilling.dc.html"]]})

mob('MobileSync.dc.html', 'Sync status', {
  "title": "Sync status", "sub": "Counter 1 · D01", "back": "MobileHome.dc.html", "badge": ["Offline", "warn"],
  "hero": {"l": "Waiting on this phone", "v": "2 bills", "s": "Safe and encrypted. They upload by themselves when internet returns.", "tone": "warn", "dark": True},
  "listTitle": "Queue",
  "items": [["Bill D01-001880 · ₹17,252", "Patel Sarees · 3:52 pm", "Waiting", "Saved on device", "warn"], ["Bill D01-001879 · ₹18,240", "Mahavir Cloth Store · 3:41 pm", "Waiting", "Saved on device", "warn"], ["Bill D01-001881 · ₹6,200", "Rejected by server", "Check", "Needs attention", "bad", None, "MobileSyncRejected.dc.html"], ["Price list update", "From office · 9:15 am", "Done", "Received", "ok"]],
  "note": ["Never uninstall the app or clear its data while bills are waiting.", "warn"],
  "buttons": [["Details", "MobileSync.dc.html"], ["*Try sync now", "MobileSync.dc.html"]]})

mob('MobileLogin.dc.html', 'Staff sign in', {
  "title": "Who is billing?", "sub": "Shree Krishna Textiles · Counter 1", "dark": True,
  "items": [["Kiran Solanki", "Cashier", "", "Selected", "ok", True, "MobileHome.dc.html"], ["Mehul Rathod", "Cashier", "", "", "", False], ["Divya Joshi", "Manager", "", "", "", False]],
  "keypad": "Kiran, enter your 4-digit PIN",
  "note": ["5 wrong tries locks this user on this phone until a manager unlocks it.", "mute"],
  "buttons": [["Forgot PIN", "MobileForgotPin.dc.html"], ["*Sign in", "MobileHome.dc.html"]]})

mob('MobileRegister.dc.html', 'Register this phone', {
  "title": "Register this phone", "sub": "One-time setup by the owner", "dark": True,
  "qr": "Point the camera at the QR code on the web Devices page",
  "fields": [["Name this phone", "Counter 3"]],
  "listTitle": "This phone will get",
  "items": [["Bill series D06", "Its own numbers, safe offline"], ["Encrypted storage", "Data locked to this phone"], ["Remote wipe", "If lost, owner can wipe it"]],
  "buttons": [["*Scan QR code", "MobileConsent.dc.html"]]})
