export interface ScreenMeta {
  id: string;
  label: string;
  folder: string;
  path: string;
  category: string;
  device: "desktop" | "mobile" | "tablet";
}

export const ALL_SCREENS: ScreenMeta[] = [
  {
    "id": "Main",
    "label": "Web \u00b7 Dashboard",
    "folder": "01-web-app-core",
    "path": "01-web-app-core/Main.html",
    "category": "Web app \u00b7 core",
    "device": "desktop"
  },
  {
    "id": "Approvals",
    "label": "Web \u00b7 Approvals & sync review",
    "folder": "01-web-app-core",
    "path": "01-web-app-core/Approvals.html",
    "category": "Web app \u00b7 core",
    "device": "desktop"
  },
  {
    "id": "Invoices",
    "label": "Web \u00b7 Sales & invoices",
    "folder": "01-web-app-core",
    "path": "01-web-app-core/Invoices.html",
    "category": "Web app \u00b7 core",
    "device": "desktop"
  },
  {
    "id": "Challans",
    "label": "Web \u00b7 Delivery challans",
    "folder": "01-web-app-core",
    "path": "01-web-app-core/Challans.html",
    "category": "Web app \u00b7 core",
    "device": "desktop"
  },
  {
    "id": "Parties",
    "label": "Web \u00b7 Parties",
    "folder": "01-web-app-core",
    "path": "01-web-app-core/Parties.html",
    "category": "Web app \u00b7 core",
    "device": "desktop"
  },
  {
    "id": "Stock",
    "label": "Web \u00b7 Stock & lots",
    "folder": "01-web-app-core",
    "path": "01-web-app-core/Stock.html",
    "category": "Web app \u00b7 core",
    "device": "desktop"
  },
  {
    "id": "Payments",
    "label": "Web \u00b7 Payments",
    "folder": "01-web-app-core",
    "path": "01-web-app-core/Payments.html",
    "category": "Web app \u00b7 core",
    "device": "desktop"
  },
  {
    "id": "Reports",
    "label": "Web \u00b7 Reports",
    "folder": "01-web-app-core",
    "path": "01-web-app-core/Reports.html",
    "category": "Web app \u00b7 core",
    "device": "desktop"
  },
  {
    "id": "Devices",
    "label": "Web \u00b7 Devices & sync",
    "folder": "01-web-app-core",
    "path": "01-web-app-core/Devices.html",
    "category": "Web app \u00b7 core",
    "device": "desktop"
  },
  {
    "id": "Users",
    "label": "Web \u00b7 Users & roles",
    "folder": "01-web-app-core",
    "path": "01-web-app-core/Users.html",
    "category": "Web app \u00b7 core",
    "device": "desktop"
  },
  {
    "id": "Settings",
    "label": "Web \u00b7 Settings",
    "folder": "01-web-app-core",
    "path": "01-web-app-core/Settings.html",
    "category": "Web app \u00b7 core",
    "device": "desktop"
  },
  {
    "id": "Sidebar",
    "label": "Component \u00b7 Sidebar",
    "folder": "01-web-app-core",
    "path": "01-web-app-core/Sidebar.html",
    "category": "Web app \u00b7 core",
    "device": "desktop"
  },
  {
    "id": "Profile",
    "label": "Web \u00b7 My profile",
    "folder": "02-web-app-all-modules",
    "path": "02-web-app-all-modules/Profile.html",
    "category": "Web app \u00b7 all modules",
    "device": "desktop"
  },
  {
    "id": "Purchases",
    "label": "Web \u00b7 Purchases",
    "folder": "02-web-app-all-modules",
    "path": "02-web-app-all-modules/Purchases.html",
    "category": "Web app \u00b7 all modules",
    "device": "desktop"
  },
  {
    "id": "Returns",
    "label": "Web \u00b7 Returns & credit notes",
    "folder": "02-web-app-all-modules",
    "path": "02-web-app-all-modules/Returns.html",
    "category": "Web app \u00b7 all modules",
    "device": "desktop"
  },
  {
    "id": "Expenses",
    "label": "Web \u00b7 Expenses",
    "folder": "02-web-app-all-modules",
    "path": "02-web-app-all-modules/Expenses.html",
    "category": "Web app \u00b7 all modules",
    "device": "desktop"
  },
  {
    "id": "Accounts",
    "label": "Web \u00b7 Accounts & ledgers",
    "folder": "02-web-app-all-modules",
    "path": "02-web-app-all-modules/Accounts.html",
    "category": "Web app \u00b7 all modules",
    "device": "desktop"
  },
  {
    "id": "Gst",
    "label": "Web \u00b7 GST & e-invoice",
    "folder": "02-web-app-all-modules",
    "path": "02-web-app-all-modules/Gst.html",
    "category": "Web app \u00b7 all modules",
    "device": "desktop"
  },
  {
    "id": "Branches",
    "label": "Web \u00b7 Branches & godowns",
    "folder": "02-web-app-all-modules",
    "path": "02-web-app-all-modules/Branches.html",
    "category": "Web app \u00b7 all modules",
    "device": "desktop"
  },
  {
    "id": "PriceLists",
    "label": "Web \u00b7 Price lists & schemes",
    "folder": "02-web-app-all-modules",
    "path": "02-web-app-all-modules/PriceLists.html",
    "category": "Web app \u00b7 all modules",
    "device": "desktop"
  },
  {
    "id": "Notifications",
    "label": "Web \u00b7 Notifications",
    "folder": "02-web-app-all-modules",
    "path": "02-web-app-all-modules/Notifications.html",
    "category": "Web app \u00b7 all modules",
    "device": "desktop"
  },
  {
    "id": "Audit",
    "label": "Web \u00b7 Audit log",
    "folder": "02-web-app-all-modules",
    "path": "02-web-app-all-modules/Audit.html",
    "category": "Web app \u00b7 all modules",
    "device": "desktop"
  },
  {
    "id": "ImportExport",
    "label": "Web \u00b7 Import & export",
    "folder": "02-web-app-all-modules",
    "path": "02-web-app-all-modules/ImportExport.html",
    "category": "Web app \u00b7 all modules",
    "device": "desktop"
  },
  {
    "id": "Subscription",
    "label": "Web \u00b7 Subscription",
    "folder": "02-web-app-all-modules",
    "path": "02-web-app-all-modules/Subscription.html",
    "category": "Web app \u00b7 all modules",
    "device": "desktop"
  },
  {
    "id": "Help",
    "label": "Web \u00b7 Help & support",
    "folder": "02-web-app-all-modules",
    "path": "02-web-app-all-modules/Help.html",
    "category": "Web app \u00b7 all modules",
    "device": "desktop"
  },
  {
    "id": "Manufacturing",
    "label": "Web \u00b7 Manufacturing (later)",
    "folder": "02-web-app-all-modules",
    "path": "02-web-app-all-modules/Manufacturing.html",
    "category": "Web app \u00b7 all modules",
    "device": "desktop"
  },
  {
    "id": "Foundry",
    "label": "Web \u00b7 Metal melting (later)",
    "folder": "02-web-app-all-modules",
    "path": "02-web-app-all-modules/Foundry.html",
    "category": "Web app \u00b7 all modules",
    "device": "desktop"
  },
  {
    "id": "Products",
    "label": "Web \u00b7 Items catalogue",
    "folder": "03-web-app-forms-details",
    "path": "03-web-app-forms-details/Products.html",
    "category": "Web app \u00b7 forms & details",
    "device": "desktop"
  },
  {
    "id": "ProductEdit",
    "label": "Web \u00b7 Add item (units, variants, HSN)",
    "folder": "03-web-app-forms-details",
    "path": "03-web-app-forms-details/ProductEdit.html",
    "category": "Web app \u00b7 forms & details",
    "device": "desktop"
  },
  {
    "id": "InvoiceNew",
    "label": "Web \u00b7 New invoice",
    "folder": "03-web-app-forms-details",
    "path": "03-web-app-forms-details/InvoiceNew.html",
    "category": "Web app \u00b7 forms & details",
    "device": "desktop"
  },
  {
    "id": "InvoiceView",
    "label": "Web \u00b7 Invoice A4 preview",
    "folder": "03-web-app-forms-details",
    "path": "03-web-app-forms-details/InvoiceView.html",
    "category": "Web app \u00b7 forms & details",
    "device": "desktop"
  },
  {
    "id": "Quotations",
    "label": "Web \u00b7 Quotations & orders",
    "folder": "03-web-app-forms-details",
    "path": "03-web-app-forms-details/Quotations.html",
    "category": "Web app \u00b7 forms & details",
    "device": "desktop"
  },
  {
    "id": "PartyView",
    "label": "Web \u00b7 Party ledger",
    "folder": "03-web-app-forms-details",
    "path": "03-web-app-forms-details/PartyView.html",
    "category": "Web app \u00b7 forms & details",
    "device": "desktop"
  },
  {
    "id": "PartyEdit",
    "label": "Web \u00b7 Add party + credit limit + broker",
    "folder": "03-web-app-forms-details",
    "path": "03-web-app-forms-details/PartyEdit.html",
    "category": "Web app \u00b7 forms & details",
    "device": "desktop"
  },
  {
    "id": "PurchaseNew",
    "label": "Web \u00b7 Purchase entry (lots & rolls)",
    "folder": "03-web-app-forms-details",
    "path": "03-web-app-forms-details/PurchaseNew.html",
    "category": "Web app \u00b7 forms & details",
    "device": "desktop"
  },
  {
    "id": "StockCount",
    "label": "Web \u00b7 Stock count",
    "folder": "03-web-app-forms-details",
    "path": "03-web-app-forms-details/StockCount.html",
    "category": "Web app \u00b7 forms & details",
    "device": "desktop"
  },
  {
    "id": "RoleEdit",
    "label": "Web \u00b7 Roles & permissions matrix",
    "folder": "03-web-app-forms-details",
    "path": "03-web-app-forms-details/RoleEdit.html",
    "category": "Web app \u00b7 forms & details",
    "device": "desktop"
  },
  {
    "id": "UserInvite",
    "label": "Web \u00b7 Invite user",
    "folder": "03-web-app-forms-details",
    "path": "03-web-app-forms-details/UserInvite.html",
    "category": "Web app \u00b7 forms & details",
    "device": "desktop"
  },
  {
    "id": "Dispatch",
    "label": "Web \u00b7 Dispatch & salespeople",
    "folder": "03-web-app-forms-details",
    "path": "03-web-app-forms-details/Dispatch.html",
    "category": "Web app \u00b7 forms & details",
    "device": "desktop"
  },
  {
    "id": "ProfitReport",
    "label": "Web \u00b7 Profit report",
    "folder": "03-web-app-forms-details",
    "path": "03-web-app-forms-details/ProfitReport.html",
    "category": "Web app \u00b7 forms & details",
    "device": "desktop"
  },
  {
    "id": "States",
    "label": "Web \u00b7 Messages & states",
    "folder": "03-web-app-forms-details",
    "path": "03-web-app-forms-details/States.html",
    "category": "Web app \u00b7 forms & details",
    "device": "desktop"
  },
  {
    "id": "LoadingState",
    "label": "Web \u00b7 Loading state (skeleton)",
    "folder": "03-web-app-forms-details",
    "path": "03-web-app-forms-details/LoadingState.html",
    "category": "Web app \u00b7 forms & details",
    "device": "desktop"
  },
  {
    "id": "ChallanConvert",
    "label": "Web \u00b7 Bill from challans",
    "folder": "04-web-flows-dialogs",
    "path": "04-web-flows-dialogs/ChallanConvert.html",
    "category": "Web \u00b7 flows & dialogs",
    "device": "desktop"
  },
  {
    "id": "CancelInvoice",
    "label": "Web \u00b7 Cancel invoice",
    "folder": "04-web-flows-dialogs",
    "path": "04-web-flows-dialogs/CancelInvoice.html",
    "category": "Web \u00b7 flows & dialogs",
    "device": "desktop"
  },
  {
    "id": "WhatsAppShare",
    "label": "Web \u00b7 WhatsApp reminder preview",
    "folder": "04-web-flows-dialogs",
    "path": "04-web-flows-dialogs/WhatsAppShare.html",
    "category": "Web \u00b7 flows & dialogs",
    "device": "desktop"
  },
  {
    "id": "SupplierPay",
    "label": "Web \u00b7 Pay supplier",
    "folder": "04-web-flows-dialogs",
    "path": "04-web-flows-dialogs/SupplierPay.html",
    "category": "Web \u00b7 flows & dialogs",
    "device": "desktop"
  },
  {
    "id": "Cheques",
    "label": "Web \u00b7 Cheques",
    "folder": "04-web-flows-dialogs",
    "path": "04-web-flows-dialogs/Cheques.html",
    "category": "Web \u00b7 flows & dialogs",
    "device": "desktop"
  },
  {
    "id": "Transfer",
    "label": "Web \u00b7 Stock transfer",
    "folder": "04-web-flows-dialogs",
    "path": "04-web-flows-dialogs/Transfer.html",
    "category": "Web \u00b7 flows & dialogs",
    "device": "desktop"
  },
  {
    "id": "ConflictDetail",
    "label": "Web \u00b7 Resolve sync conflict",
    "folder": "04-web-flows-dialogs",
    "path": "04-web-flows-dialogs/ConflictDetail.html",
    "category": "Web \u00b7 flows & dialogs",
    "device": "desktop"
  },
  {
    "id": "SalesRegister",
    "label": "Web \u00b7 Sales register",
    "folder": "04-web-flows-dialogs",
    "path": "04-web-flows-dialogs/SalesRegister.html",
    "category": "Web \u00b7 flows & dialogs",
    "device": "desktop"
  },
  {
    "id": "GstSummary",
    "label": "Web \u00b7 GST summary",
    "folder": "04-web-flows-dialogs",
    "path": "04-web-flows-dialogs/GstSummary.html",
    "category": "Web \u00b7 flows & dialogs",
    "device": "desktop"
  },
  {
    "id": "ImportWizard",
    "label": "Web \u00b7 Import wizard",
    "folder": "04-web-flows-dialogs",
    "path": "04-web-flows-dialogs/ImportWizard.html",
    "category": "Web \u00b7 flows & dialogs",
    "device": "desktop"
  },
  {
    "id": "RevokeDevice",
    "label": "Web \u00b7 Revoke device",
    "folder": "04-web-flows-dialogs",
    "path": "04-web-flows-dialogs/RevokeDevice.html",
    "category": "Web \u00b7 flows & dialogs",
    "device": "desktop"
  },
  {
    "id": "SubscriptionLimit",
    "label": "Web \u00b7 Subscription alerts",
    "folder": "04-web-flows-dialogs",
    "path": "04-web-flows-dialogs/SubscriptionLimit.html",
    "category": "Web \u00b7 flows & dialogs",
    "device": "desktop"
  },
  {
    "id": "EmptyDashboard",
    "label": "Web \u00b7 First-day dashboard",
    "folder": "04-web-flows-dialogs",
    "path": "04-web-flows-dialogs/EmptyDashboard.html",
    "category": "Web \u00b7 flows & dialogs",
    "device": "desktop"
  },
  {
    "id": "ChallanView",
    "label": "Web \u00b7 Challan document",
    "folder": "04-web-flows-dialogs",
    "path": "04-web-flows-dialogs/ChallanView.html",
    "category": "Web \u00b7 flows & dialogs",
    "device": "desktop"
  },
  {
    "id": "ReceiptView",
    "label": "Web \u00b7 Receipt document",
    "folder": "04-web-flows-dialogs",
    "path": "04-web-flows-dialogs/ReceiptView.html",
    "category": "Web \u00b7 flows & dialogs",
    "device": "desktop"
  },
  {
    "id": "ExpenseView",
    "label": "Web \u00b7 Expense detail",
    "folder": "04-web-flows-dialogs",
    "path": "04-web-flows-dialogs/ExpenseView.html",
    "category": "Web \u00b7 flows & dialogs",
    "device": "desktop"
  },
  {
    "id": "PriceListEdit",
    "label": "Web \u00b7 Edit price list & scheme",
    "folder": "04-web-flows-dialogs",
    "path": "04-web-flows-dialogs/PriceListEdit.html",
    "category": "Web \u00b7 flows & dialogs",
    "device": "desktop"
  },
  {
    "id": "TemplateEdit",
    "label": "Web \u00b7 Message template",
    "folder": "04-web-flows-dialogs",
    "path": "04-web-flows-dialogs/TemplateEdit.html",
    "category": "Web \u00b7 flows & dialogs",
    "device": "desktop"
  },
  {
    "id": "PrivacyRequests",
    "label": "Web \u00b7 Privacy & support access",
    "folder": "04-web-flows-dialogs",
    "path": "04-web-flows-dialogs/PrivacyRequests.html",
    "category": "Web \u00b7 flows & dialogs",
    "device": "desktop"
  },
  {
    "id": "TabletBilling",
    "label": "Tablet \u00b7 Manager billing (two-pane)",
    "folder": "04-web-flows-dialogs",
    "path": "04-web-flows-dialogs/TabletBilling.html",
    "category": "Web \u00b7 flows & dialogs",
    "device": "tablet"
  },
  {
    "id": "UpiCollections",
    "label": "Web \u00b7 UPI QR & auto-match",
    "folder": "05-world-class-features",
    "path": "05-world-class-features/UpiCollections.html",
    "category": "World-class features",
    "device": "desktop"
  },
  {
    "id": "Collections",
    "label": "Web \u00b7 Collections & promises",
    "folder": "05-world-class-features",
    "path": "05-world-class-features/Collections.html",
    "category": "World-class features",
    "device": "desktop"
  },
  {
    "id": "Brokers",
    "label": "Web \u00b7 Broker (dalal) commission",
    "folder": "05-world-class-features",
    "path": "05-world-class-features/Brokers.html",
    "category": "World-class features",
    "device": "desktop"
  },
  {
    "id": "LedgerLink",
    "label": "Web \u00b7 Live ledger link (customer view)",
    "folder": "05-world-class-features",
    "path": "05-world-class-features/LedgerLink.html",
    "category": "World-class features",
    "device": "desktop"
  },
  {
    "id": "BankMatch",
    "label": "Web \u00b7 Bank statement matching",
    "folder": "05-world-class-features",
    "path": "05-world-class-features/BankMatch.html",
    "category": "World-class features",
    "device": "desktop"
  },
  {
    "id": "CommandPalette",
    "label": "Web \u00b7 Ctrl K command bar & shortcuts",
    "folder": "05-world-class-features",
    "path": "05-world-class-features/CommandPalette.html",
    "category": "World-class features",
    "device": "desktop"
  },
  {
    "id": "TrainingMode",
    "label": "Web \u00b7 Training mode",
    "folder": "05-world-class-features",
    "path": "05-world-class-features/TrainingMode.html",
    "category": "World-class features",
    "device": "desktop"
  },
  {
    "id": "LabelDesigner",
    "label": "Web \u00b7 Roll & barcode labels",
    "folder": "05-world-class-features",
    "path": "05-world-class-features/LabelDesigner.html",
    "category": "World-class features",
    "device": "desktop"
  },
  {
    "id": "Timeline",
    "label": "Web \u00b7 Activity timeline",
    "folder": "05-world-class-features",
    "path": "05-world-class-features/Timeline.html",
    "category": "World-class features",
    "device": "desktop"
  },
  {
    "id": "MobileVoiceHub",
    "label": "Android \u00b7 Voice assistant (centre mic)",
    "folder": "05-world-class-features",
    "path": "05-world-class-features/MobileVoiceHub.html",
    "category": "World-class features",
    "device": "mobile"
  },
  {
    "id": "MobileReadAloud",
    "label": "Android \u00b7 Read aloud",
    "folder": "05-world-class-features",
    "path": "05-world-class-features/MobileReadAloud.html",
    "category": "World-class features",
    "device": "mobile"
  },
  {
    "id": "MobileUpiQr",
    "label": "Android \u00b7 UPI QR on screen",
    "folder": "05-world-class-features",
    "path": "05-world-class-features/MobileUpiQr.html",
    "category": "World-class features",
    "device": "mobile"
  },
  {
    "id": "MobileCollections",
    "label": "Android \u00b7 Collections today",
    "folder": "05-world-class-features",
    "path": "05-world-class-features/MobileCollections.html",
    "category": "World-class features",
    "device": "mobile"
  },
  {
    "id": "MobileCustomerLedger",
    "label": "Android \u00b7 Customer's ledger link view",
    "folder": "05-world-class-features",
    "path": "05-world-class-features/MobileCustomerLedger.html",
    "category": "World-class features",
    "device": "mobile"
  },
  {
    "id": "MobileSalesOrder",
    "label": "Android \u00b7 Salesman order taking",
    "folder": "05-world-class-features",
    "path": "05-world-class-features/MobileSalesOrder.html",
    "category": "World-class features",
    "device": "mobile"
  },
  {
    "id": "MobileBroker",
    "label": "Android \u00b7 Broker commission",
    "folder": "05-world-class-features",
    "path": "05-world-class-features/MobileBroker.html",
    "category": "World-class features",
    "device": "mobile"
  },
  {
    "id": "MobileTraining",
    "label": "Android \u00b7 Training mode",
    "folder": "05-world-class-features",
    "path": "05-world-class-features/MobileTraining.html",
    "category": "World-class features",
    "device": "mobile"
  },
  {
    "id": "MobileLabels",
    "label": "Android \u00b7 Print roll labels",
    "folder": "05-world-class-features",
    "path": "05-world-class-features/MobileLabels.html",
    "category": "World-class features",
    "device": "mobile"
  },
  {
    "id": "MobileHome",
    "label": "Android \u00b7 Counter home (4 tiles + new bill)",
    "folder": "06-android-app",
    "path": "06-android-app/MobileHome.html",
    "category": "Android app",
    "device": "mobile"
  },
  {
    "id": "MobileBilling",
    "label": "Android \u00b7 New bill (offline)",
    "folder": "06-android-app",
    "path": "06-android-app/MobileBilling.html",
    "category": "Android app",
    "device": "mobile"
  },
  {
    "id": "MobileManagerPin",
    "label": "Android \u00b7 Manager PIN approval",
    "folder": "06-android-app",
    "path": "06-android-app/MobileManagerPin.html",
    "category": "Android app",
    "device": "mobile"
  },
  {
    "id": "MobileReceipt",
    "label": "Android \u00b7 Bill saved & receipt",
    "folder": "06-android-app",
    "path": "06-android-app/MobileReceipt.html",
    "category": "Android app",
    "device": "mobile"
  },
  {
    "id": "MobileOutstanding",
    "label": "Android \u00b7 Party outstanding",
    "folder": "06-android-app",
    "path": "06-android-app/MobileOutstanding.html",
    "category": "Android app",
    "device": "mobile"
  },
  {
    "id": "MobileDrawer",
    "label": "Android \u00b7 Left menu drawer (\u2630)",
    "folder": "06-android-app",
    "path": "06-android-app/MobileDrawer.html",
    "category": "Android app",
    "device": "mobile"
  },
  {
    "id": "MobilePayment",
    "label": "Android \u00b7 Receive payment",
    "folder": "06-android-app",
    "path": "06-android-app/MobilePayment.html",
    "category": "Android app",
    "device": "mobile"
  },
  {
    "id": "MobileChallan",
    "label": "Android \u00b7 Delivery challan",
    "folder": "06-android-app",
    "path": "06-android-app/MobileChallan.html",
    "category": "Android app",
    "device": "mobile"
  },
  {
    "id": "MobileStock",
    "label": "Android \u00b7 Stock check (scan)",
    "folder": "06-android-app",
    "path": "06-android-app/MobileStock.html",
    "category": "Android app",
    "device": "mobile"
  },
  {
    "id": "MobileSync",
    "label": "Android \u00b7 Sync status",
    "folder": "06-android-app",
    "path": "06-android-app/MobileSync.html",
    "category": "Android app",
    "device": "mobile"
  },
  {
    "id": "MobileBills",
    "label": "Android \u00b7 Bill history",
    "folder": "06-android-app",
    "path": "06-android-app/MobileBills.html",
    "category": "Android app",
    "device": "mobile"
  },
  {
    "id": "MobileBillView",
    "label": "Android \u00b7 Bill detail",
    "folder": "06-android-app",
    "path": "06-android-app/MobileBillView.html",
    "category": "Android app",
    "device": "mobile"
  },
  {
    "id": "MobileHeld",
    "label": "Android \u00b7 Held bills",
    "folder": "06-android-app",
    "path": "06-android-app/MobileHeld.html",
    "category": "Android app",
    "device": "mobile"
  },
  {
    "id": "MobileSearch",
    "label": "Android \u00b7 Global search",
    "folder": "06-android-app",
    "path": "06-android-app/MobileSearch.html",
    "category": "Android app",
    "device": "mobile"
  },
  {
    "id": "MobileItems",
    "label": "Android \u00b7 Items list",
    "folder": "06-android-app",
    "path": "06-android-app/MobileItems.html",
    "category": "Android app",
    "device": "mobile"
  },
  {
    "id": "MobileLowStock",
    "label": "Android \u00b7 Low stock",
    "folder": "06-android-app",
    "path": "06-android-app/MobileLowStock.html",
    "category": "Android app",
    "device": "mobile"
  },
  {
    "id": "MobileParty",
    "label": "Android \u00b7 Select party",
    "folder": "06-android-app",
    "path": "06-android-app/MobileParty.html",
    "category": "Android app",
    "device": "mobile"
  },
  {
    "id": "MobilePartyView",
    "label": "Android \u00b7 Party ledger",
    "folder": "06-android-app",
    "path": "06-android-app/MobilePartyView.html",
    "category": "Android app",
    "device": "mobile"
  },
  {
    "id": "MobilePartyAdd",
    "label": "Android \u00b7 Add party",
    "folder": "06-android-app",
    "path": "06-android-app/MobilePartyAdd.html",
    "category": "Android app",
    "device": "mobile"
  },
  {
    "id": "MobileProductAdd",
    "label": "Android \u00b7 Quick add item",
    "folder": "06-android-app",
    "path": "06-android-app/MobileProductAdd.html",
    "category": "Android app",
    "device": "mobile"
  },
  {
    "id": "MobilePurchase",
    "label": "Android \u00b7 Purchase entry",
    "folder": "06-android-app",
    "path": "06-android-app/MobilePurchase.html",
    "category": "Android app",
    "device": "mobile"
  },
  {
    "id": "MobileQuotation",
    "label": "Android \u00b7 Quotation",
    "folder": "06-android-app",
    "path": "06-android-app/MobileQuotation.html",
    "category": "Android app",
    "device": "mobile"
  },
  {
    "id": "MobileReturn",
    "label": "Android \u00b7 Sales return",
    "folder": "06-android-app",
    "path": "06-android-app/MobileReturn.html",
    "category": "Android app",
    "device": "mobile"
  },
  {
    "id": "MobileExpense",
    "label": "Android \u00b7 Add expense",
    "folder": "06-android-app",
    "path": "06-android-app/MobileExpense.html",
    "category": "Android app",
    "device": "mobile"
  },
  {
    "id": "MobilePayments",
    "label": "Android \u00b7 Payments list",
    "folder": "06-android-app",
    "path": "06-android-app/MobilePayments.html",
    "category": "Android app",
    "device": "mobile"
  },
  {
    "id": "MobileOwner",
    "label": "Android \u00b7 Owner home",
    "folder": "06-android-app",
    "path": "06-android-app/MobileOwner.html",
    "category": "Android app",
    "device": "mobile"
  },
  {
    "id": "MobileApprovals",
    "label": "Android \u00b7 Owner approvals",
    "folder": "06-android-app",
    "path": "06-android-app/MobileApprovals.html",
    "category": "Android app",
    "device": "mobile"
  },
  {
    "id": "MobileReports",
    "label": "Android \u00b7 Owner reports",
    "folder": "06-android-app",
    "path": "06-android-app/MobileReports.html",
    "category": "Android app",
    "device": "mobile"
  },
  {
    "id": "MobileDevices",
    "label": "Android \u00b7 Owner \u00b7 devices",
    "folder": "06-android-app",
    "path": "06-android-app/MobileDevices.html",
    "category": "Android app",
    "device": "mobile"
  },
  {
    "id": "MobileDispatch",
    "label": "Android \u00b7 Dispatch",
    "folder": "06-android-app",
    "path": "06-android-app/MobileDispatch.html",
    "category": "Android app",
    "device": "mobile"
  },
  {
    "id": "MobileStockCount",
    "label": "Android \u00b7 Stock count",
    "folder": "06-android-app",
    "path": "06-android-app/MobileStockCount.html",
    "category": "Android app",
    "device": "mobile"
  },
  {
    "id": "MobilePrinter",
    "label": "Android \u00b7 Printer setup",
    "folder": "06-android-app",
    "path": "06-android-app/MobilePrinter.html",
    "category": "Android app",
    "device": "mobile"
  },
  {
    "id": "MobileCloseDay",
    "label": "Android \u00b7 Close day (cash)",
    "folder": "06-android-app",
    "path": "06-android-app/MobileCloseDay.html",
    "category": "Android app",
    "device": "mobile"
  },
  {
    "id": "MobileProfile",
    "label": "Android \u00b7 My profile",
    "folder": "06-android-app",
    "path": "06-android-app/MobileProfile.html",
    "category": "Android app",
    "device": "mobile"
  },
  {
    "id": "MobileSettings",
    "label": "Android \u00b7 App settings",
    "folder": "06-android-app",
    "path": "06-android-app/MobileSettings.html",
    "category": "Android app",
    "device": "mobile"
  },
  {
    "id": "MobileNotifications",
    "label": "Android \u00b7 Notifications",
    "folder": "06-android-app",
    "path": "06-android-app/MobileNotifications.html",
    "category": "Android app",
    "device": "mobile"
  },
  {
    "id": "MobileMenu",
    "label": "Android \u00b7 All features (grid)",
    "folder": "06-android-app",
    "path": "06-android-app/MobileMenu.html",
    "category": "Android app",
    "device": "mobile"
  },
  {
    "id": "MobileHelp",
    "label": "Android \u00b7 Help",
    "folder": "06-android-app",
    "path": "06-android-app/MobileHelp.html",
    "category": "Android app",
    "device": "mobile"
  },
  {
    "id": "MobileSplash",
    "label": "Android \u00b7 Splash / startup",
    "folder": "06-android-app",
    "path": "06-android-app/MobileSplash.html",
    "category": "Android app",
    "device": "mobile"
  },
  {
    "id": "MobileLoading",
    "label": "Android \u00b7 Loading state",
    "folder": "06-android-app",
    "path": "06-android-app/MobileLoading.html",
    "category": "Android app",
    "device": "mobile"
  },
  {
    "id": "MobileConsent",
    "label": "Android \u00b7 Privacy consent",
    "folder": "07-android-edge-cases-dialogs",
    "path": "07-android-edge-cases-dialogs/MobileConsent.html",
    "category": "Android \u00b7 edge cases & dialogs",
    "device": "mobile"
  },
  {
    "id": "MobileForgotPin",
    "label": "Android \u00b7 Forgot PIN",
    "folder": "07-android-edge-cases-dialogs",
    "path": "07-android-edge-cases-dialogs/MobileForgotPin.html",
    "category": "Android \u00b7 edge cases & dialogs",
    "device": "mobile"
  },
  {
    "id": "MobileLocked",
    "label": "Android \u00b7 User locked",
    "folder": "07-android-edge-cases-dialogs",
    "path": "07-android-edge-cases-dialogs/MobileLocked.html",
    "category": "Android \u00b7 edge cases & dialogs",
    "device": "mobile"
  },
  {
    "id": "MobileWiped",
    "label": "Android \u00b7 Phone wiped",
    "folder": "07-android-edge-cases-dialogs",
    "path": "07-android-edge-cases-dialogs/MobileWiped.html",
    "category": "Android \u00b7 edge cases & dialogs",
    "device": "mobile"
  },
  {
    "id": "MobileGrantExpired",
    "label": "Android \u00b7 Offline limit reached",
    "folder": "07-android-edge-cases-dialogs",
    "path": "07-android-edge-cases-dialogs/MobileGrantExpired.html",
    "category": "Android \u00b7 edge cases & dialogs",
    "device": "mobile"
  },
  {
    "id": "MobileUpdate",
    "label": "Android \u00b7 Update required",
    "folder": "07-android-edge-cases-dialogs",
    "path": "07-android-edge-cases-dialogs/MobileUpdate.html",
    "category": "Android \u00b7 edge cases & dialogs",
    "device": "mobile"
  },
  {
    "id": "MobileStorageFull",
    "label": "Android \u00b7 Storage full",
    "folder": "07-android-edge-cases-dialogs",
    "path": "07-android-edge-cases-dialogs/MobileStorageFull.html",
    "category": "Android \u00b7 edge cases & dialogs",
    "device": "mobile"
  },
  {
    "id": "MobileSyncRejected",
    "label": "Android \u00b7 Bill rejected by server",
    "folder": "07-android-edge-cases-dialogs",
    "path": "07-android-edge-cases-dialogs/MobileSyncRejected.html",
    "category": "Android \u00b7 edge cases & dialogs",
    "device": "mobile"
  },
  {
    "id": "MobileCancelBill",
    "label": "Android \u00b7 Cancel bill request",
    "folder": "07-android-edge-cases-dialogs",
    "path": "07-android-edge-cases-dialogs/MobileCancelBill.html",
    "category": "Android \u00b7 edge cases & dialogs",
    "device": "mobile"
  },
  {
    "id": "MobileWhatsApp",
    "label": "Android \u00b7 Share on WhatsApp",
    "folder": "07-android-edge-cases-dialogs",
    "path": "07-android-edge-cases-dialogs/MobileWhatsApp.html",
    "category": "Android \u00b7 edge cases & dialogs",
    "device": "mobile"
  },
  {
    "id": "MobileReceiptPrint",
    "label": "Android \u00b7 Payment receipt print",
    "folder": "07-android-edge-cases-dialogs",
    "path": "07-android-edge-cases-dialogs/MobileReceiptPrint.html",
    "category": "Android \u00b7 edge cases & dialogs",
    "device": "mobile"
  },
  {
    "id": "MobileChallanToBill",
    "label": "Android \u00b7 Bill from challans",
    "folder": "07-android-edge-cases-dialogs",
    "path": "07-android-edge-cases-dialogs/MobileChallanToBill.html",
    "category": "Android \u00b7 edge cases & dialogs",
    "device": "mobile"
  },
  {
    "id": "MobileTransfer",
    "label": "Android \u00b7 Stock transfer",
    "folder": "07-android-edge-cases-dialogs",
    "path": "07-android-edge-cases-dialogs/MobileTransfer.html",
    "category": "Android \u00b7 edge cases & dialogs",
    "device": "mobile"
  },
  {
    "id": "MobileStepUp",
    "label": "Android \u00b7 Fingerprint / PIN confirm",
    "folder": "07-android-edge-cases-dialogs",
    "path": "07-android-edge-cases-dialogs/MobileStepUp.html",
    "category": "Android \u00b7 edge cases & dialogs",
    "device": "mobile"
  },
  {
    "id": "MobileCopilotLimits",
    "label": "Android \u00b7 Copilot: no permission / unsure",
    "folder": "07-android-edge-cases-dialogs",
    "path": "07-android-edge-cases-dialogs/MobileCopilotLimits.html",
    "category": "Android \u00b7 edge cases & dialogs",
    "device": "mobile"
  },
  {
    "id": "MobileEmptyHome",
    "label": "Android \u00b7 First-day home",
    "folder": "07-android-edge-cases-dialogs",
    "path": "07-android-edge-cases-dialogs/MobileEmptyHome.html",
    "category": "Android \u00b7 edge cases & dialogs",
    "device": "mobile"
  },
  {
    "id": "MobileHomeGu",
    "label": "Android \u00b7 Counter home \u00b7 \u0a97\u0ac1\u0a9c\u0ab0\u0abe\u0aa4\u0ac0",
    "folder": "07-android-edge-cases-dialogs",
    "path": "07-android-edge-cases-dialogs/MobileHomeGu.html",
    "category": "Android \u00b7 edge cases & dialogs",
    "device": "mobile"
  },
  {
    "id": "MobileBillingGu",
    "label": "Android \u00b7 New bill \u00b7 \u0a97\u0ac1\u0a9c\u0ab0\u0abe\u0aa4\u0ac0",
    "folder": "07-android-edge-cases-dialogs",
    "path": "07-android-edge-cases-dialogs/MobileBillingGu.html",
    "category": "Android \u00b7 edge cases & dialogs",
    "device": "mobile"
  },
  {
    "id": "Copilot",
    "label": "Web \u00b7 Business Copilot (voice + AI)",
    "folder": "08-ai-voice-ocr",
    "path": "08-ai-voice-ocr/Copilot.html",
    "category": "AI, voice & OCR",
    "device": "desktop"
  },
  {
    "id": "MobileVoice",
    "label": "Android \u00b7 Voice bill",
    "folder": "08-ai-voice-ocr",
    "path": "08-ai-voice-ocr/MobileVoice.html",
    "category": "AI, voice & OCR",
    "device": "mobile"
  },
  {
    "id": "MobileCopilot",
    "label": "Android \u00b7 Copilot chat",
    "folder": "08-ai-voice-ocr",
    "path": "08-ai-voice-ocr/MobileCopilot.html",
    "category": "AI, voice & OCR",
    "device": "mobile"
  },
  {
    "id": "MobileScanBill",
    "label": "Android \u00b7 Scan supplier bill (OCR)",
    "folder": "08-ai-voice-ocr",
    "path": "08-ai-voice-ocr/MobileScanBill.html",
    "category": "AI, voice & OCR",
    "device": "mobile"
  },
  {
    "id": "WebLogin",
    "label": "Web \u00b7 Sign in with 2FA",
    "folder": "09-login-setup",
    "path": "09-login-setup/WebLogin.html",
    "category": "Login & setup",
    "device": "desktop"
  },
  {
    "id": "WebConsent",
    "label": "Web \u00b7 Privacy notice & consent",
    "folder": "09-login-setup",
    "path": "09-login-setup/WebConsent.html",
    "category": "Login & setup",
    "device": "desktop"
  },
  {
    "id": "WebOnboarding",
    "label": "Web \u00b7 Setup \u00b7 tax & bills",
    "folder": "09-login-setup",
    "path": "09-login-setup/WebOnboarding.html",
    "category": "Login & setup",
    "device": "desktop"
  },
  {
    "id": "WebOnbGodowns",
    "label": "Web \u00b7 Setup \u00b7 godowns",
    "folder": "09-login-setup",
    "path": "09-login-setup/WebOnbGodowns.html",
    "category": "Login & setup",
    "device": "desktop"
  },
  {
    "id": "WebOnbStaff",
    "label": "Web \u00b7 Setup \u00b7 staff",
    "folder": "09-login-setup",
    "path": "09-login-setup/WebOnbStaff.html",
    "category": "Login & setup",
    "device": "desktop"
  },
  {
    "id": "WebOnbPhones",
    "label": "Web \u00b7 Setup \u00b7 phones",
    "folder": "09-login-setup",
    "path": "09-login-setup/WebOnbPhones.html",
    "category": "Login & setup",
    "device": "desktop"
  },
  {
    "id": "WebOnbImport",
    "label": "Web \u00b7 Setup \u00b7 import",
    "folder": "09-login-setup",
    "path": "09-login-setup/WebOnbImport.html",
    "category": "Login & setup",
    "device": "desktop"
  },
  {
    "id": "Recovery",
    "label": "Web \u00b7 Owner account recovery",
    "folder": "09-login-setup",
    "path": "09-login-setup/Recovery.html",
    "category": "Login & setup",
    "device": "desktop"
  },
  {
    "id": "StepUp",
    "label": "Web \u00b7 Step-up confirm (2FA)",
    "folder": "09-login-setup",
    "path": "09-login-setup/StepUp.html",
    "category": "Login & setup",
    "device": "desktop"
  },
  {
    "id": "MobileLanguage",
    "label": "Android \u00b7 First-run language",
    "folder": "09-login-setup",
    "path": "09-login-setup/MobileLanguage.html",
    "category": "Login & setup",
    "device": "mobile"
  },
  {
    "id": "MobileRegister",
    "label": "Android \u00b7 Register phone",
    "folder": "09-login-setup",
    "path": "09-login-setup/MobileRegister.html",
    "category": "Login & setup",
    "device": "mobile"
  },
  {
    "id": "MobileLogin",
    "label": "Android \u00b7 Staff PIN sign in",
    "folder": "09-login-setup",
    "path": "09-login-setup/MobileLogin.html",
    "category": "Login & setup",
    "device": "mobile"
  },
  {
    "id": "BomEdit",
    "label": "Web \u00b7 BOM editor",
    "folder": "10-later-releases",
    "path": "10-later-releases/BomEdit.html",
    "category": "Later releases",
    "device": "desktop"
  },
  {
    "id": "ProductionOrder",
    "label": "Web \u00b7 Production order",
    "folder": "10-later-releases",
    "path": "10-later-releases/ProductionOrder.html",
    "category": "Later releases",
    "device": "desktop"
  },
  {
    "id": "QualityCheck",
    "label": "Web \u00b7 Quality checks",
    "folder": "10-later-releases",
    "path": "10-later-releases/QualityCheck.html",
    "category": "Later releases",
    "device": "desktop"
  },
  {
    "id": "MeltBatchNew",
    "label": "Web \u00b7 New melting batch",
    "folder": "10-later-releases",
    "path": "10-later-releases/MeltBatchNew.html",
    "category": "Later releases",
    "device": "desktop"
  },
  {
    "id": "EInvoiceFlow",
    "label": "Web \u00b7 E-invoice queue & errors",
    "folder": "10-later-releases",
    "path": "10-later-releases/EInvoiceFlow.html",
    "category": "Later releases",
    "device": "desktop"
  },
  {
    "id": "MultiBranch",
    "label": "Web \u00b7 All branches (consolidated)",
    "folder": "10-later-releases",
    "path": "10-later-releases/MultiBranch.html",
    "category": "Later releases",
    "device": "desktop"
  },
  {
    "id": "PlatformHome",
    "label": "Web \u00b7 Platform dashboard",
    "folder": "11-platform-admin-our-team",
    "path": "11-platform-admin-our-team/PlatformHome.html",
    "category": "Platform admin (our team)",
    "device": "desktop"
  },
  {
    "id": "PlatformAnalytics",
    "label": "Web \u00b7 Analytics & metrics",
    "folder": "11-platform-admin-our-team",
    "path": "11-platform-admin-our-team/PlatformAnalytics.html",
    "category": "Platform admin (our team)",
    "device": "desktop"
  },
  {
    "id": "PlatformFunnel",
    "label": "Web \u00b7 Funnel, leads & pilots",
    "folder": "11-platform-admin-our-team",
    "path": "11-platform-admin-our-team/PlatformFunnel.html",
    "category": "Platform admin (our team)",
    "device": "desktop"
  },
  {
    "id": "PlatformTenants",
    "label": "Web \u00b7 Businesses (tenants)",
    "folder": "11-platform-admin-our-team",
    "path": "11-platform-admin-our-team/PlatformTenants.html",
    "category": "Platform admin (our team)",
    "device": "desktop"
  },
  {
    "id": "PlatformTenant",
    "label": "Web \u00b7 Business detail",
    "folder": "11-platform-admin-our-team",
    "path": "11-platform-admin-our-team/PlatformTenant.html",
    "category": "Platform admin (our team)",
    "device": "desktop"
  },
  {
    "id": "PlatformSubscriptions",
    "label": "Web \u00b7 Subscriptions",
    "folder": "11-platform-admin-our-team",
    "path": "11-platform-admin-our-team/PlatformSubscriptions.html",
    "category": "Platform admin (our team)",
    "device": "desktop"
  },
  {
    "id": "PlatformRenewals",
    "label": "Web \u00b7 Renewals at risk",
    "folder": "11-platform-admin-our-team",
    "path": "11-platform-admin-our-team/PlatformRenewals.html",
    "category": "Platform admin (our team)",
    "device": "desktop"
  },
  {
    "id": "PlatformPartners",
    "label": "Web \u00b7 Partners & CAs",
    "folder": "11-platform-admin-our-team",
    "path": "11-platform-admin-our-team/PlatformPartners.html",
    "category": "Platform admin (our team)",
    "device": "desktop"
  },
  {
    "id": "PlatformBilling",
    "label": "Web \u00b7 Billing & invoices",
    "folder": "11-platform-admin-our-team",
    "path": "11-platform-admin-our-team/PlatformBilling.html",
    "category": "Platform admin (our team)",
    "device": "desktop"
  },
  {
    "id": "PlatformPlans",
    "label": "Web \u00b7 Plans & pricing",
    "folder": "11-platform-admin-our-team",
    "path": "11-platform-admin-our-team/PlatformPlans.html",
    "category": "Platform admin (our team)",
    "device": "desktop"
  },
  {
    "id": "PlatformPayouts",
    "label": "Web \u00b7 Payouts & commissions",
    "folder": "11-platform-admin-our-team",
    "path": "11-platform-admin-our-team/PlatformPayouts.html",
    "category": "Platform admin (our team)",
    "device": "desktop"
  },
  {
    "id": "PlatformSupport",
    "label": "Web \u00b7 Support console",
    "folder": "11-platform-admin-our-team",
    "path": "11-platform-admin-our-team/PlatformSupport.html",
    "category": "Platform admin (our team)",
    "device": "desktop"
  },
  {
    "id": "PlatformGrants",
    "label": "Web \u00b7 Active grants",
    "folder": "11-platform-admin-our-team",
    "path": "11-platform-admin-our-team/PlatformGrants.html",
    "category": "Platform admin (our team)",
    "device": "desktop"
  },
  {
    "id": "PlatformIncidents",
    "label": "Web \u00b7 Incidents",
    "folder": "11-platform-admin-our-team",
    "path": "11-platform-admin-our-team/PlatformIncidents.html",
    "category": "Platform admin (our team)",
    "device": "desktop"
  },
  {
    "id": "PlatformDevices",
    "label": "Web \u00b7 Devices & sync",
    "folder": "11-platform-admin-our-team",
    "path": "11-platform-admin-our-team/PlatformDevices.html",
    "category": "Platform admin (our team)",
    "device": "desktop"
  },
  {
    "id": "PlatformReleases",
    "label": "Web \u00b7 App releases",
    "folder": "11-platform-admin-our-team",
    "path": "11-platform-admin-our-team/PlatformReleases.html",
    "category": "Platform admin (our team)",
    "device": "desktop"
  },
  {
    "id": "PlatformFlags",
    "label": "Web \u00b7 Feature flags",
    "folder": "11-platform-admin-our-team",
    "path": "11-platform-admin-our-team/PlatformFlags.html",
    "category": "Platform admin (our team)",
    "device": "desktop"
  },
  {
    "id": "PlatformBackups",
    "label": "Web \u00b7 Backups & DR",
    "folder": "11-platform-admin-our-team",
    "path": "11-platform-admin-our-team/PlatformBackups.html",
    "category": "Platform admin (our team)",
    "device": "desktop"
  },
  {
    "id": "PlatformMessaging",
    "label": "Web \u00b7 Messaging & push",
    "folder": "11-platform-admin-our-team",
    "path": "11-platform-admin-our-team/PlatformMessaging.html",
    "category": "Platform admin (our team)",
    "device": "desktop"
  },
  {
    "id": "PlatformGst",
    "label": "Web \u00b7 GST rates & HSN",
    "folder": "11-platform-admin-our-team",
    "path": "11-platform-admin-our-team/PlatformGst.html",
    "category": "Platform admin (our team)",
    "device": "desktop"
  },
  {
    "id": "PlatformUnits",
    "label": "Web \u00b7 Units & conversions",
    "folder": "11-platform-admin-our-team",
    "path": "11-platform-admin-our-team/PlatformUnits.html",
    "category": "Platform admin (our team)",
    "device": "desktop"
  },
  {
    "id": "PlatformTemplates",
    "label": "Web \u00b7 Print templates",
    "folder": "11-platform-admin-our-team",
    "path": "11-platform-admin-our-team/PlatformTemplates.html",
    "category": "Platform admin (our team)",
    "device": "desktop"
  },
  {
    "id": "PlatformLanguages",
    "label": "Web \u00b7 Languages & localisation",
    "folder": "11-platform-admin-our-team",
    "path": "11-platform-admin-our-team/PlatformLanguages.html",
    "category": "Platform admin (our team)",
    "device": "desktop"
  },
  {
    "id": "PlatformPlanDefs",
    "label": "Web \u00b7 Plan definitions",
    "folder": "11-platform-admin-our-team",
    "path": "11-platform-admin-our-team/PlatformPlanDefs.html",
    "category": "Platform admin (our team)",
    "device": "desktop"
  },
  {
    "id": "PlatformAudit",
    "label": "Web \u00b7 Platform audit log",
    "folder": "11-platform-admin-our-team",
    "path": "11-platform-admin-our-team/PlatformAudit.html",
    "category": "Platform admin (our team)",
    "device": "desktop"
  },
  {
    "id": "PlatformLogs",
    "label": "Web \u00b7 System logs",
    "folder": "11-platform-admin-our-team",
    "path": "11-platform-admin-our-team/PlatformLogs.html",
    "category": "Platform admin (our team)",
    "device": "desktop"
  },
  {
    "id": "PlatformPrivacy",
    "label": "Web \u00b7 Privacy requests",
    "folder": "11-platform-admin-our-team",
    "path": "11-platform-admin-our-team/PlatformPrivacy.html",
    "category": "Platform admin (our team)",
    "device": "desktop"
  },
  {
    "id": "PlatformIntegrations",
    "label": "Web \u00b7 Integrations",
    "folder": "11-platform-admin-our-team",
    "path": "11-platform-admin-our-team/PlatformIntegrations.html",
    "category": "Platform admin (our team)",
    "device": "desktop"
  },
  {
    "id": "PlatformStaff",
    "label": "Web \u00b7 Team & roles",
    "folder": "11-platform-admin-our-team",
    "path": "11-platform-admin-our-team/PlatformStaff.html",
    "category": "Platform admin (our team)",
    "device": "desktop"
  },
  {
    "id": "PlatformSettings",
    "label": "Web \u00b7 Platform settings",
    "folder": "11-platform-admin-our-team",
    "path": "11-platform-admin-our-team/PlatformSettings.html",
    "category": "Platform admin (our team)",
    "device": "desktop"
  },
  {
    "id": "PlatformSidebar",
    "label": "Component \u00b7 Platform sidebar",
    "folder": "11-platform-admin-our-team",
    "path": "11-platform-admin-our-team/PlatformSidebar.html",
    "category": "Platform admin (our team)",
    "device": "desktop"
  },
  {
    "id": "AccountantHome",
    "label": "Web \u00b7 Accountant (CA) home",
    "folder": "12-client-role-dashboards",
    "path": "12-client-role-dashboards/AccountantHome.html",
    "category": "Client role dashboards",
    "device": "desktop"
  },
  {
    "id": "MobileManagerHome",
    "label": "Android \u00b7 Manager home",
    "folder": "12-client-role-dashboards",
    "path": "12-client-role-dashboards/MobileManagerHome.html",
    "category": "Client role dashboards",
    "device": "mobile"
  },
  {
    "id": "MobileGodownHome",
    "label": "Android \u00b7 Godown home",
    "folder": "12-client-role-dashboards",
    "path": "12-client-role-dashboards/MobileGodownHome.html",
    "category": "Client role dashboards",
    "device": "mobile"
  }
];

export const SCREEN_MAP: Record<string, ScreenMeta> = Object.fromEntries(ALL_SCREENS.map(s => [s.id, s]));
