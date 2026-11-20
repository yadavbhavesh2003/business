-- ==============================================================
-- UdyamOS Edge SQLite Database DDL (Android & Desktop Chrome)
-- Offline-First Sovereignty: Counter Billing Never Freezes
-- ==============================================================

PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

-- Local Device Config & Cursor
CREATE TABLE IF NOT EXISTS local_config (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at INTEGER NOT NULL
);

-- Cached Customers for Point-of-Sale Lookup
CREATE TABLE IF NOT EXISTS customers (
  id TEXT PRIMARY KEY,
  legal_name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  phone_e164 TEXT,
  gstin TEXT,
  credit_limit REAL NOT NULL DEFAULT 0.00,
  credit_days INTEGER NOT NULL DEFAULT 30,
  current_balance REAL NOT NULL DEFAULT 0.00,
  updated_at INTEGER NOT NULL
);

-- Cached Products & SKUs
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  sku TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  gujarati_name TEXT,
  hsn_code TEXT NOT NULL DEFAULT '5208',
  primary_unit TEXT NOT NULL DEFAULT 'meter',
  sale_price REAL NOT NULL DEFAULT 0.00,
  gst_rate INTEGER NOT NULL DEFAULT 5,
  updated_at INTEGER NOT NULL
);

-- Cached Godown Lots (Rolls / Than)
CREATE TABLE IF NOT EXISTS lots (
  lot_id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  available_metres REAL NOT NULL DEFAULT 0.00,
  godown_name TEXT NOT NULL DEFAULT 'Godown 1',
  updated_at INTEGER NOT NULL
);

-- Local Bills (Write-Once, Append-Only)
CREATE TABLE IF NOT EXISTS bills (
  bill_no TEXT PRIMARY KEY, -- e.g. 'INV-D01-001880'
  customer_id TEXT,
  is_intra_state INTEGER NOT NULL DEFAULT 1,
  taxable_total REAL NOT NULL,
  cgst_total REAL NOT NULL DEFAULT 0.00,
  sgst_total REAL NOT NULL DEFAULT 0.00,
  igst_total REAL NOT NULL DEFAULT 0.00,
  round_off REAL NOT NULL DEFAULT 0.00,
  net_payable REAL NOT NULL, -- Section 170 rounded
  payment_mode TEXT NOT NULL, -- cash, upi, credit
  is_provisional INTEGER NOT NULL DEFAULT 0,
  issued_at INTEGER NOT NULL,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS bill_lines (
  id TEXT PRIMARY KEY,
  bill_no TEXT NOT NULL,
  product_id TEXT NOT NULL,
  lot_id TEXT,
  qty REAL NOT NULL,
  rate REAL NOT NULL,
  taxable_amount REAL NOT NULL,
  gst_rate INTEGER NOT NULL,
  cgst_amount REAL NOT NULL DEFAULT 0.00,
  sgst_amount REAL NOT NULL DEFAULT 0.00,
  igst_amount REAL NOT NULL DEFAULT 0.00,
  line_total REAL NOT NULL,
  FOREIGN KEY (bill_no) REFERENCES bills(bill_no) ON DELETE CASCADE
);

-- Local Outbox Queue (Pushed to Cloud Gateway)
CREATE TABLE IF NOT EXISTS outbox_events (
  event_id TEXT PRIMARY KEY, -- UUIDv7
  event_type TEXT NOT NULL, -- BILL_CREATED, PAYMENT_RECEIVED, etc.
  entity_id TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, syncing, synced, failed
  retry_count INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL,
  synced_at INTEGER
);

CREATE INDEX IF NOT EXISTS idx_outbox_status ON outbox_events(status, created_at);

