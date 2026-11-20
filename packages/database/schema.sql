-- ==============================================================
-- UdyamOS Cloud Database Schema (MariaDB / MySQL 8.0)
-- Multi-Tenant Event Sourcing & Offline-First Delta Replication
-- ==============================================================

-- 1. Multi-Tenant Organisations (Tenants)
CREATE TABLE IF NOT EXISTS organisations (
  id VARCHAR(36) PRIMARY KEY,
  legal_name VARCHAR(255) NOT NULL,
  display_name VARCHAR(255) NOT NULL,
  gstin VARCHAR(15) NULL,
  state_code CHAR(2) NOT NULL DEFAULT '24', -- Gujarat
  currency_code CHAR(3) NOT NULL DEFAULT 'INR',
  financial_year_start_month TINYINT NOT NULL DEFAULT 4, -- April
  status ENUM('trial', 'active', 'suspended', 'cancelled') NOT NULL DEFAULT 'trial',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Staff Users & Roles
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY,
  phone_e164 VARCHAR(20) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NULL,
  password_hash VARCHAR(255) NULL,
  display_name VARCHAR(255) NOT NULL,
  status ENUM('active', 'invited', 'suspended') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS organisation_memberships (
  id VARCHAR(36) PRIMARY KEY,
  organisation_id VARCHAR(36) NOT NULL,
  user_id VARCHAR(36) NOT NULL,
  role_code ENUM('owner', 'cashier', 'godown', 'accountant', 'ca_auditor') NOT NULL,
  status ENUM('active', 'suspended') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (organisation_id) REFERENCES organisations(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Edge Devices (POS Counters & Tablets)
CREATE TABLE IF NOT EXISTS devices (
  id VARCHAR(36) PRIMARY KEY,
  organisation_id VARCHAR(36) NOT NULL,
  device_code VARCHAR(16) NOT NULL, -- e.g. 'D01', 'D02', 'WEB1'
  display_name VARCHAR(100) NOT NULL,
  public_key TEXT NULL,
  last_sync_at TIMESTAMP NULL,
  last_sync_cursor BIGINT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_org_device (organisation_id, device_code),
  FOREIGN KEY (organisation_id) REFERENCES organisations(id) ON DELETE CASCADE
);

-- 4. Customer Parties (Wholesale Traders & Retail Buyers)
CREATE TABLE IF NOT EXISTS customers (
  id VARCHAR(36) PRIMARY KEY,
  organisation_id VARCHAR(36) NOT NULL,
  legal_name VARCHAR(255) NOT NULL,
  display_name VARCHAR(255) NOT NULL,
  phone_e164 VARCHAR(20) NULL,
  gstin VARCHAR(15) NULL,
  state_code CHAR(2) NOT NULL DEFAULT '24',
  credit_limit DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  credit_days INT NOT NULL DEFAULT 30,
  opening_balance DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  current_balance DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (organisation_id) REFERENCES organisations(id) ON DELETE CASCADE
);

-- 5. Products, Lots & Inventory Items
CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(36) PRIMARY KEY,
  organisation_id VARCHAR(36) NOT NULL,
  sku VARCHAR(64) NOT NULL,
  name VARCHAR(255) NOT NULL,
  gujarati_name VARCHAR(255) NULL,
  hsn_code VARCHAR(8) NOT NULL DEFAULT '5208', -- Textile default
  primary_unit VARCHAR(16) NOT NULL DEFAULT 'meter', -- meter, than, pcs
  sale_price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  gst_rate TINYINT NOT NULL DEFAULT 5, -- 0, 5, 12, 18, 28
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_org_sku (organisation_id, sku),
  FOREIGN KEY (organisation_id) REFERENCES organisations(id) ON DELETE CASCADE
);

-- 6. Sales Invoices (Immutable Posted Bills)
CREATE TABLE IF NOT EXISTS sales_invoices (
  id VARCHAR(36) PRIMARY KEY,
  organisation_id VARCHAR(36) NOT NULL,
  bill_no VARCHAR(32) NOT NULL, -- e.g. 'INV-D01-001880'
  device_id VARCHAR(36) NOT NULL,
  customer_id VARCHAR(36) NULL,
  is_intra_state BOOLEAN NOT NULL DEFAULT TRUE,
  taxable_total DECIMAL(12,2) NOT NULL,
  cgst_total DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  sgst_total DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  igst_total DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  round_off DECIMAL(6,2) NOT NULL DEFAULT 0.00,
  net_payable DECIMAL(12,2) NOT NULL, -- Section 170 CGST Act rounded
  payment_mode ENUM('cash', 'upi', 'credit', 'split') NOT NULL,
  is_provisional BOOLEAN NOT NULL DEFAULT FALSE,
  issued_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_org_bill (organisation_id, bill_no),
  FOREIGN KEY (organisation_id) REFERENCES organisations(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS sales_invoice_lines (
  id VARCHAR(36) PRIMARY KEY,
  invoice_id VARCHAR(36) NOT NULL,
  product_id VARCHAR(36) NOT NULL,
  lot_id VARCHAR(64) NULL,
  qty DECIMAL(10,2) NOT NULL,
  rate DECIMAL(10,2) NOT NULL,
  taxable_amount DECIMAL(12,2) NOT NULL,
  gst_rate TINYINT NOT NULL,
  cgst_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  sgst_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  igst_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  line_total DECIMAL(12,2) NOT NULL,
  FOREIGN KEY (invoice_id) REFERENCES sales_invoices(id) ON DELETE CASCADE
);

-- 7. Change Log (Delta Replication Stream for Edge Pull)
CREATE TABLE IF NOT EXISTS change_log (
  cursor_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  organisation_id VARCHAR(36) NOT NULL,
  entity_type VARCHAR(32) NOT NULL, -- 'customer', 'product', 'invoice', etc.
  entity_id VARCHAR(36) NOT NULL,
  action ENUM('upsert', 'delete') NOT NULL,
  payload_json JSON NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_org_cursor (organisation_id, cursor_id)
);

-- 8. Idempotency Records (Prevents Duplicate Push Writes on Network Retry)
CREATE TABLE IF NOT EXISTS idempotency_records (
  organisation_id VARCHAR(36) NOT NULL,
  idempotency_key VARCHAR(128) NOT NULL,
  event_id VARCHAR(36) NOT NULL,
  response_status INT NOT NULL DEFAULT 200,
  response_json JSON NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (organisation_id, idempotency_key)
);

-- 9. Zero-Knowledge Support Grants (Owner Time-Boxed Access)
CREATE TABLE IF NOT EXISTS support_grants (
  id VARCHAR(36) PRIMARY KEY,
  organisation_id VARCHAR(36) NOT NULL,
  staff_user_id VARCHAR(36) NOT NULL,
  reason VARCHAR(255) NOT NULL,
  granted_by_user_id VARCHAR(36) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  revoked_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (organisation_id) REFERENCES organisations(id) ON DELETE CASCADE
);

