import React, { useState } from 'react';
import { ClientDashboard } from './client/Dashboard.js';
import { ClientParties } from './client/Parties.js';
import { ClientStock } from './client/Stock.js';
import { ClientGstSummary } from './client/GstSummary.js';
import { Invoices } from './client/sales/Invoices.js';
import { InvoiceNew } from './client/sales/InvoiceNew.js';
import { Challans } from './client/sales/Challans.js';
import { ChallanConvert } from './client/sales/ChallanConvert.js';
import { CreditNotes } from './client/sales/CreditNotes.js';
import { Quotations } from './client/sales/Quotations.js';
import { Purchases } from './client/inventory/Purchases.js';
import { PurchaseNew } from './client/inventory/PurchaseNew.js';
import { StockCount } from './client/inventory/StockCount.js';
import { Transfer } from './client/inventory/Transfer.js';
import { BarcodeLabels } from './client/inventory/BarcodeLabels.js';
import { CustomerLedger } from './client/parties/CustomerLedger.js';
import { Brokers } from './client/parties/Brokers.js';
import { Gstr1Portal } from './client/compliance/Gstr1Portal.js';
import { EInvoicePortal } from './client/compliance/EInvoicePortal.js';
import { CaPortal } from './client/compliance/CaPortal.js';
import { AuditLogViewer } from './client/compliance/AuditLogViewer.js';
import { Devices } from './client/settings/Devices.js';
import { ThermalPrinterSetup } from './client/settings/ThermalPrinterSetup.js';
import { UpiQrSetup } from './client/settings/UpiQrSetup.js';
import { Users } from './client/settings/Users.js';

// Platform Admin modules
import { PlatformDashboard } from './platform/PlatformDashboard.js';
import { PlatformTenants } from './platform/PlatformTenants.js';
import { PlatformGrants } from './platform/PlatformGrants.js';
import { PlatformIncidents } from './platform/PlatformIncidents.js';
import { PlatformPayouts } from './platform/PlatformPayouts.js';
import { PlatformFlags } from './platform/PlatformFlags.js';

export type AppMode = 'client' | 'platform';
export type ClientScreen =
  | 'dashboard'
  | 'invoices'
  | 'new_invoice'
  | 'challans'
  | 'challan_convert'
  | 'credit_notes'
  | 'quotations'
  | 'stock'
  | 'purchases'
  | 'new_purchase'
  | 'stock_count'
  | 'transfer'
  | 'barcode_labels'
  | 'parties'
  | 'customer_ledger'
  | 'brokers'
  | 'gst'
  | 'gstr1'
  | 'einvoice'
  | 'ca_portal'
  | 'audit_trail'
  | 'devices'
  | 'printers'
  | 'upi'
  | 'users';

export type PlatformScreen =
  | 'dashboard'
  | 'tenants'
  | 'grants'
  | 'incidents'
  | 'payouts'
  | 'flags';

export const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>('client');
  const [clientScreen, setClientScreen] = useState<ClientScreen>('dashboard');
  const [platformScreen, setPlatformScreen] = useState<PlatformScreen>('dashboard');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: "'Plus Jakarta Sans', 'Noto Sans Gujarati', sans-serif" }}>
      {/* Top Universal App Switcher Bar */}
      <div
        style={{
          background: '#0F172A',
          color: '#E2E8F0',
          padding: '8px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12px',
          borderBottom: '1px solid #1E293B',
          zIndex: 100
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontWeight: 800, letterSpacing: '0.05em' }}>UDYAMOS ERP & SAAS</span>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => setMode('client')}
              style={{
                background: mode === 'client' ? '#0F766E' : '#1E293B',
                color: '#FFFFFF',
                border: 'none',
                padding: '5px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 700
              }}
            >
              🏪 Merchant Store App (Radhe Radhe Textiles)
            </button>
            <button
              onClick={() => setMode('platform')}
              style={{
                background: mode === 'platform' ? '#6366F1' : '#1E293B',
                color: '#FFFFFF',
                border: 'none',
                padding: '5px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 700
              }}
            >
              ⚡ SaaS Platform Command Center
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px', color: '#94A3B8' }}>
          <span>Counter D01</span>
          <span>·</span>
          <span style={{ color: '#34D399', fontWeight: 600 }}>● Online (Cloud Gateway Connected)</span>
        </div>
      </div>

      {/* Main Body with Sidebar & Content */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Navigation Sidebar */}
        <div
          style={{
            width: '240px',
            background: mode === 'client' ? '#15181C' : '#0B0F19',
            color: '#F8FAFC',
            padding: '16px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            borderRight: '1px solid #1E293B'
          }}
        >
          {mode === 'client' ? (
            <>
              <div>
                <div style={{ fontSize: '10px', textTransform: 'uppercase', color: '#64748B', fontWeight: 700, padding: '0 8px', marginBottom: '6px' }}>
                  Sales & Billing
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {[
                    { id: 'dashboard', label: '📊 Dashboard' },
                    { id: 'new_invoice', label: '⚡ Fast Counter Bill (F2)' },
                    { id: 'invoices', label: '📄 Sales Invoices' },
                    { id: 'challans', label: '🚚 Delivery Challans' },
                    { id: 'credit_notes', label: '🔄 Returns & Credit Notes' },
                    { id: 'quotations', label: '📝 Quotations' }
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setClientScreen(s.id as ClientScreen)}
                      style={{
                        background: clientScreen === s.id ? '#0F766E' : 'transparent',
                        color: clientScreen === s.id ? '#FFFFFF' : '#CBD5E1',
                        border: 'none',
                        textAlign: 'left',
                        padding: '8px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: clientScreen === s.id ? 700 : 500,
                        cursor: 'pointer'
                      }}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '10px', textTransform: 'uppercase', color: '#64748B', fontWeight: 700, padding: '0 8px', marginBottom: '6px' }}>
                  Inventory & Fabric
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {[
                    { id: 'stock', label: '📦 Lot Stock Summary' },
                    { id: 'purchases', label: '🏭 Inward Purchases' },
                    { id: 'stock_count', label: '🔍 Physical Stock Audit' },
                    { id: 'transfer', label: '🔀 Inter-Godown Transfer' },
                    { id: 'barcode_labels', label: '🏷️ Barcode Stickers' }
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setClientScreen(s.id as ClientScreen)}
                      style={{
                        background: clientScreen === s.id ? '#0F766E' : 'transparent',
                        color: clientScreen === s.id ? '#FFFFFF' : '#CBD5E1',
                        border: 'none',
                        textAlign: 'left',
                        padding: '8px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: clientScreen === s.id ? 700 : 500,
                        cursor: 'pointer'
                      }}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '10px', textTransform: 'uppercase', color: '#64748B', fontWeight: 700, padding: '0 8px', marginBottom: '6px' }}>
                  Accounts & Ledgers
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {[
                    { id: 'parties', label: '👥 Customer Khata' },
                    { id: 'customer_ledger', label: '📖 Ledger Statement' },
                    { id: 'brokers', label: '🤝 Dalali Brokers' }
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setClientScreen(s.id as ClientScreen)}
                      style={{
                        background: clientScreen === s.id ? '#0F766E' : 'transparent',
                        color: clientScreen === s.id ? '#FFFFFF' : '#CBD5E1',
                        border: 'none',
                        textAlign: 'left',
                        padding: '8px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: clientScreen === s.id ? 700 : 500,
                        cursor: 'pointer'
                      }}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '10px', textTransform: 'uppercase', color: '#64748B', fontWeight: 700, padding: '0 8px', marginBottom: '6px' }}>
                  Compliance & CA
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {[
                    { id: 'gst', label: '🏛️ GSTR-1 Summary' },
                    { id: 'gstr1', label: '📋 GSTR-1 Portal Table' },
                    { id: 'einvoice', label: '🛡️ NIC e-Invoice / E-Way' },
                    { id: 'ca_portal', label: '🎓 CA & Tally Export' },
                    { id: 'audit_trail', label: '📜 Section 36 Audit Logs' }
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setClientScreen(s.id as ClientScreen)}
                      style={{
                        background: clientScreen === s.id ? '#0F766E' : 'transparent',
                        color: clientScreen === s.id ? '#FFFFFF' : '#CBD5E1',
                        border: 'none',
                        textAlign: 'left',
                        padding: '8px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: clientScreen === s.id ? 700 : 500,
                        cursor: 'pointer'
                      }}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '10px', textTransform: 'uppercase', color: '#64748B', fontWeight: 700, padding: '0 8px', marginBottom: '6px' }}>
                  Hardware & Settings
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {[
                    { id: 'devices', label: '💻 Counter Devices' },
                    { id: 'printers', label: '🖨️ Thermal Printer Setup' },
                    { id: 'upi', label: '📱 Dynamic UPI QR' },
                    { id: 'users', label: '🔑 Staff Permissions' }
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setClientScreen(s.id as ClientScreen)}
                      style={{
                        background: clientScreen === s.id ? '#0F766E' : 'transparent',
                        color: clientScreen === s.id ? '#FFFFFF' : '#CBD5E1',
                        border: 'none',
                        textAlign: 'left',
                        padding: '8px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: clientScreen === s.id ? 700 : 500,
                        cursor: 'pointer'
                      }}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div>
              <div style={{ fontSize: '10px', textTransform: 'uppercase', color: '#64748B', fontWeight: 700, padding: '0 8px', marginBottom: '6px' }}>
                SaaS Operations
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {[
                  { id: 'dashboard', label: '📈 Platform Telemetry' },
                  { id: 'tenants', label: '🏢 Merchant Tenants' },
                  { id: 'grants', label: '🔒 Zero-Knowledge Grants' },
                  { id: 'incidents', label: '🚨 Incident War Room' },
                  { id: 'payouts', label: '💰 CA Partner Payouts' },
                  { id: 'flags', label: '🚩 Feature Flags' }
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setPlatformScreen(s.id as PlatformScreen)}
                    style={{
                      background: platformScreen === s.id ? '#6366F1' : 'transparent',
                      color: platformScreen === s.id ? '#FFFFFF' : '#CBD5E1',
                      border: 'none',
                      textAlign: 'left',
                      padding: '8px 10px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: platformScreen === s.id ? 700 : 500,
                      cursor: 'pointer'
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Screen Viewport */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {mode === 'client' ? (
            <>
              {clientScreen === 'dashboard' && <ClientDashboard onNavigate={(s) => setClientScreen(s as ClientScreen)} />}
              {clientScreen === 'new_invoice' && <InvoiceNew onBack={() => setClientScreen('invoices')} />}
              {clientScreen === 'invoices' && <Invoices onNewInvoice={() => setClientScreen('new_invoice')} />}
              {clientScreen === 'challans' && <Challans onConvertChallan={() => setClientScreen('challan_convert')} />}
              {clientScreen === 'challan_convert' && <ChallanConvert onBack={() => setClientScreen('challans')} />}
              {clientScreen === 'credit_notes' && <CreditNotes />}
              {clientScreen === 'quotations' && <Quotations />}
              {clientScreen === 'stock' && <ClientStock onNavigate={(s) => setClientScreen(s as ClientScreen)} />}
              {clientScreen === 'purchases' && <Purchases onNewPurchase={() => setClientScreen('new_purchase')} />}
              {clientScreen === 'new_purchase' && <PurchaseNew onBack={() => setClientScreen('purchases')} />}
              {clientScreen === 'stock_count' && <StockCount />}
              {clientScreen === 'transfer' && <Transfer />}
              {clientScreen === 'barcode_labels' && <BarcodeLabels onBack={() => setClientScreen('stock')} />}
              {clientScreen === 'parties' && <ClientParties onNavigate={(s) => setClientScreen(s as ClientScreen)} />}
              {clientScreen === 'customer_ledger' && <CustomerLedger onBack={() => setClientScreen('parties')} />}
              {clientScreen === 'brokers' && <Brokers />}
              {clientScreen === 'gst' && <ClientGstSummary onNavigate={(s) => setClientScreen(s as ClientScreen)} />}
              {clientScreen === 'gstr1' && <Gstr1Portal />}
              {clientScreen === 'einvoice' && <EInvoicePortal />}
              {clientScreen === 'ca_portal' && <CaPortal />}
              {clientScreen === 'audit_trail' && <AuditLogViewer />}
              {clientScreen === 'devices' && <Devices />}
              {clientScreen === 'printers' && <ThermalPrinterSetup />}
              {clientScreen === 'upi' && <UpiQrSetup />}
              {clientScreen === 'users' && <Users />}
            </>
          ) : (
            <>
              {platformScreen === 'dashboard' && <PlatformDashboard />}
              {platformScreen === 'tenants' && <PlatformTenants />}
              {platformScreen === 'grants' && <PlatformGrants />}
              {platformScreen === 'incidents' && <PlatformIncidents />}
              {platformScreen === 'payouts' && <PlatformPayouts />}
              {platformScreen === 'flags' && <PlatformFlags />}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
