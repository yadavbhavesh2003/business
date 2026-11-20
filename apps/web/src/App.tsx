import React, { useState, useEffect } from 'react';
import { ALL_SCREENS, SCREEN_MAP, type ScreenMeta } from './screens-manifest.js';

// Interactive React View Components (Web SPA)
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
import { GenericModuleView } from './client/GenericModuleView.js';

// Platform Admin Views
import { PlatformDashboard } from './platform/PlatformDashboard.js';
import { PlatformTenants } from './platform/PlatformTenants.js';
import { PlatformGrants } from './platform/PlatformGrants.js';
import { PlatformIncidents } from './platform/PlatformIncidents.js';
import { PlatformPayouts } from './platform/PlatformPayouts.js';
import { PlatformFlags } from './platform/PlatformFlags.js';

// Native Mobile React Components
import { MobileHome } from '../../mobile/src/screens/MobileHome.tsx';
import { MobileBilling } from '../../mobile/src/screens/MobileBilling.tsx';
import { MobileBillingGu } from '../../mobile/src/screens/MobileBillingGu.tsx';
import { MobileCloseDay } from '../../mobile/src/screens/MobileCloseDay.tsx';
import { MobileKhata } from '../../mobile/src/screens/MobileKhata.tsx';

export type AppMode = 'client' | 'platform' | 'mobile';
export type ViewportMode = 'desktop' | 'tablet' | 'mobile';

const CLIENT_SIDEBAR_GROUPS = [
  {
    title: 'Daily work',
    items: [
      { label: 'Dashboard', screenId: 'Main' },
      { label: 'Sales & invoices', screenId: 'Invoices' },
      { label: 'Quotations & orders', screenId: 'Quotations' },
      { label: 'Purchases', screenId: 'Purchases' },
      { label: 'Delivery challans', screenId: 'Challans' },
      { label: 'Returns & credit notes', screenId: 'CreditNotes' }
    ]
  },
  {
    title: 'Business',
    items: [
      { label: 'Parties & Ledgers', screenId: 'Parties' },
      { label: 'Customer Ledger', screenId: 'CustomerLedger' },
      { label: 'Brokers', screenId: 'Brokers' },
      { label: 'Stock & Lots', screenId: 'Stock' },
      { label: 'Stock Count', screenId: 'StockCount' },
      { label: 'Barcode Labels', screenId: 'BarcodeLabels' },
      { label: 'Godown Transfer', screenId: 'Transfer' },
      { label: 'GST Summary', screenId: 'Gst' }
    ]
  },
  {
    title: 'Compliance & CA',
    items: [
      { label: 'GSTR-1 Portal', screenId: 'Gstr1' },
      { label: 'E-Invoice Flow', screenId: 'EInvoicePortal' },
      { label: 'CA Auditor View', screenId: 'CaPortal' },
      { label: 'Audit Trail Log', screenId: 'Audit' }
    ]
  },
  {
    title: 'Hardware & Setup',
    items: [
      { label: 'Devices & Counters', screenId: 'Devices' },
      { label: 'Thermal ESC/POS', screenId: 'ThermalPrinterSetup' },
      { label: 'Dynamic UPI QR', screenId: 'UpiQrSetup' },
      { label: 'Users & Permissions', screenId: 'Users' }
    ]
  }
];

const PLATFORM_SIDEBAR_GROUPS = [
  {
    title: 'Platform SaaS Operations',
    items: [
      { label: 'Command Center', screenId: 'PlatformHome' },
      { label: 'Tenants Fleet', screenId: 'PlatformTenants' },
      { label: 'Zero-Knowledge Grants', screenId: 'PlatformGrants' },
      { label: 'Incidents & Telemetry', screenId: 'PlatformIncidents' },
      { label: 'CA Partner Payouts', screenId: 'PlatformPayouts' },
      { label: 'Feature Flags', screenId: 'PlatformFlags' }
    ]
  }
];

const MOBILE_QUICK_SCREENS = [
  { label: 'Mobile Home', screenId: 'MobileHome' },
  { label: 'Counter Sale (Fast POS)', screenId: 'MobileBilling' },
  { label: 'વેચાણ બિલ (ગુજરાતી)', screenId: 'MobileBillingGu' },
  { label: 'Daily Cashier Close', screenId: 'MobileCloseDay' },
  { label: 'Khata & WhatsApp Dues', screenId: 'MobileKhata' }
];

export const App: React.FC = () => {
  const [activeScreenId, setActiveScreenId] = useState<string>('Main');
  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const activeMeta: ScreenMeta = SCREEN_MAP[activeScreenId] || {
    id: activeScreenId,
    label: activeScreenId,
    folder: 'client',
    category: 'Client',
    device: 'desktop',
    path: `client/${activeScreenId}`
  };

  // Determine App Mode
  const isPlatformScreen = activeScreenId.startsWith('Platform');
  const isMobileScreen = activeScreenId.startsWith('Mobile') || activeMeta.device === 'mobile';
  const mode: AppMode = isPlatformScreen ? 'platform' : isMobileScreen ? 'mobile' : 'client';

  const selectScreen = (screenId: string) => {
    setActiveScreenId(screenId);
    if (screenId.startsWith('Mobile')) {
      setViewport('mobile');
    } else if (viewport === 'mobile' && !screenId.startsWith('Mobile')) {
      setViewport('desktop');
    }
  };

  // Keyboard shortcut listener (Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
      if (e.key === 'F2') {
        e.preventDefault();
        selectScreen('InvoiceNew');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredScreens = ALL_SCREENS.filter(
    (s) =>
      s.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 20);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        background: '#0F172A',
        fontFamily: "Inter, 'Noto Sans Gujarati', system-ui, sans-serif"
      }}
    >
      {/* Top Application Control Bar */}
      <header
        style={{
          height: '48px',
          background: '#0B0F17',
          borderBottom: '1px solid #1E293B',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          color: '#E2E8F0',
          fontSize: '13px',
          userSelect: 'none',
          flexShrink: 0
        }}
      >
        {/* Left: App Logo & Workspace Mode Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800 }}>
            <span
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '6px',
                background: mode === 'platform' ? '#6366F1' : '#0F766E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: 900
              }}
            >
              U
            </span>
            <span style={{ letterSpacing: '-0.02em', fontSize: '15px' }}>UdyamOS</span>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                padding: '2px 6px',
                borderRadius: '4px',
                background: '#1E293B',
                color: mode === 'platform' ? '#A5B4FC' : '#5EEAD4'
              }}
            >
              React 19 + Vite
            </span>
          </div>

          {/* Mode Switch Tabs */}
          <div style={{ display: 'flex', background: '#1E293B', padding: '2px', borderRadius: '6px', gap: '2px' }}>
            <button
              onClick={() => selectScreen('Main')}
              style={{
                background: mode === 'client' ? '#0F766E' : 'transparent',
                color: '#FFFFFF',
                border: 'none',
                padding: '4px 10px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Merchant ERP
            </button>
            <button
              onClick={() => selectScreen('MobileHome')}
              style={{
                background: mode === 'mobile' ? '#0284C7' : 'transparent',
                color: '#FFFFFF',
                border: 'none',
                padding: '4px 10px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Mobile POS
            </button>
            <button
              onClick={() => selectScreen('PlatformHome')}
              style={{
                background: mode === 'platform' ? '#6366F1' : 'transparent',
                color: '#FFFFFF',
                border: 'none',
                padding: '4px 10px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              SaaS Admin
            </button>
          </div>
        </div>

        {/* Center: Screen Search Bar (Ctrl + K) */}
        <button
          onClick={() => setIsSearchOpen(true)}
          style={{
            background: '#1E293B',
            border: '1px solid #334155',
            color: '#94A3B8',
            borderRadius: '8px',
            padding: '4px 12px',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            minWidth: '280px',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>🔍</span>
            <span style={{ color: '#E2E8F0', fontWeight: 500 }}>{activeMeta.label}</span>
          </div>
          <span style={{ fontSize: '10px', background: '#334155', padding: '1px 5px', borderRadius: '4px', color: '#94A3B8' }}>
            Ctrl K
          </span>
        </button>

        {/* Right: Device Viewport Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', background: '#1E293B', padding: '2px', borderRadius: '6px' }}>
            <button
              onClick={() => setViewport('desktop')}
              style={{
                background: viewport === 'desktop' ? '#334155' : 'transparent',
                color: '#FFFFFF',
                border: 'none',
                padding: '3px 8px',
                borderRadius: '4px',
                fontSize: '11px',
                cursor: 'pointer'
              }}
              title="Desktop View"
            >
              🖥️ Desktop
            </button>
            <button
              onClick={() => setViewport('tablet')}
              style={{
                background: viewport === 'tablet' ? '#334155' : 'transparent',
                color: '#FFFFFF',
                border: 'none',
                padding: '3px 8px',
                borderRadius: '4px',
                fontSize: '11px',
                cursor: 'pointer'
              }}
              title="Tablet 768px View"
            >
              📟 Tablet
            </button>
            <button
              onClick={() => setViewport('mobile')}
              style={{
                background: viewport === 'mobile' ? '#334155' : 'transparent',
                color: '#FFFFFF',
                border: 'none',
                padding: '3px 8px',
                borderRadius: '4px',
                fontSize: '11px',
                cursor: 'pointer'
              }}
              title="Mobile 375px Device Frame"
            >
              📱 Mobile
            </button>
          </div>

          {/* Backend Online status pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '3px 10px',
              borderRadius: '12px',
              background: '#064E3B',
              color: '#6EE7B7',
              fontSize: '11px',
              fontWeight: 600
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }}></span>
            API Connected
          </div>
        </div>
      </header>

      {/* Main Layout: Sidebar + Pure React Viewport */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' }}>
        {/* Left Sidebar */}
        <aside
          style={{
            width: mode === 'platform' ? '240px' : '230px',
            flexShrink: 0,
            background: mode === 'platform' ? '#0F172A' : '#15181C',
            color: '#E8EAED',
            padding: '16px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            overflowY: 'auto',
            borderRight: mode === 'platform' ? '1px solid #1E293B' : '1px solid #2B3038'
          }}
        >
          {/* Business Profile Title */}
          <div style={{ padding: '0 8px 12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: mode === 'platform' ? '#6366F1' : '#0F766E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                color: '#FFFFFF',
                fontSize: '14px'
              }}
            >
              {mode === 'platform' ? 'P' : 'S'}
            </span>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 700, fontSize: '14px', color: '#FFFFFF' }}>
                {mode === 'platform' ? 'Platform HQ' : 'Shree Krishna'}
              </span>
              <span style={{ fontSize: '11px', color: '#94A3B8' }}>
                {mode === 'platform' ? 'Super Admin' : 'Bhavnagar · GST 24'}
              </span>
            </div>
          </div>

          {/* Quick Action Button */}
          <button
            onClick={() => selectScreen(mode === 'platform' ? 'PlatformTenants' : 'InvoiceNew')}
            style={{
              background: mode === 'platform' ? '#6366F1' : '#0F766E',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 12px',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <span>+</span>
            <span>{mode === 'platform' ? 'Add Tenant' : 'New sale bill (F2)'}</span>
          </button>

          {/* Nav Groups */}
          {mode === 'client' &&
            CLIENT_SIDEBAR_GROUPS.map((group) => (
              <div key={group.title} style={{ display: 'flex', flexDirection: 'column', gap: '1px', paddingTop: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#A9AFB8', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '0 10px 4px' }}>
                  {group.title}
                </span>
                {group.items.map((item) => {
                  const isActive = activeScreenId === item.screenId;
                  return (
                    <button
                      key={item.label}
                      onClick={() => selectScreen(item.screenId)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        minHeight: '34px',
                        padding: '0 10px',
                        borderRadius: '6px',
                        border: 'none',
                        background: isActive ? '#0F766E' : 'transparent',
                        color: isActive ? '#FFFFFF' : '#C9CDD3',
                        fontSize: '13px',
                        fontWeight: isActive ? 700 : 500,
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            ))}

          {mode === 'platform' &&
            PLATFORM_SIDEBAR_GROUPS.map((group) => (
              <div key={group.title} style={{ display: 'flex', flexDirection: 'column', gap: '1px', paddingTop: '8px' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.07em', padding: '0 10px 4px' }}>
                  {group.title}
                </span>
                {group.items.map((item) => {
                  const isActive = activeScreenId === item.screenId;
                  return (
                    <button
                      key={item.label}
                      onClick={() => selectScreen(item.screenId)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        minHeight: '32px',
                        padding: '0 10px',
                        borderRadius: '6px',
                        border: 'none',
                        background: isActive ? '#1E293B' : 'transparent',
                        color: isActive ? '#FFFFFF' : '#94A3B8',
                        fontSize: '13px',
                        fontWeight: isActive ? 700 : 500,
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            ))}

          {mode === 'mobile' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', paddingTop: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#A9AFB8', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '0 10px 4px' }}>
                React Native POS Screens
              </span>
              {MOBILE_QUICK_SCREENS.map((item) => {
                const isActive = activeScreenId === item.screenId;
                return (
                  <button
                    key={item.label}
                    onClick={() => selectScreen(item.screenId)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      minHeight: '34px',
                      padding: '0 10px',
                      borderRadius: '6px',
                      border: 'none',
                      background: isActive ? '#0284C7' : 'transparent',
                      color: isActive ? '#FFFFFF' : '#C9CDD3',
                      fontSize: '13px',
                      fontWeight: isActive ? 700 : 500,
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* User profile footer */}
          <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 10px',
                borderRadius: '8px',
                background: '#22262C',
                color: '#FFFFFF'
              }}
            >
              <span
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#2B3038',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '13px'
                }}
              >
                RP
              </span>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '13px', fontWeight: 600 }}>Rameshbhai Patel</span>
                <span style={{ fontSize: '11px', color: '#A9AFB8' }}>Owner · Gujarati / En</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Center Main Stage / Screen Viewport (100% Pure React) */}
        <main
          style={{
            flex: 1,
            minWidth: 0,
            height: '100%',
            overflowY: 'auto',
            background: viewport === 'mobile' ? '#0B0F17' : '#F6F7F5',
            display: 'flex',
            flexDirection: 'column',
            alignItems: viewport === 'desktop' ? 'stretch' : 'center',
            justifyContent: viewport === 'desktop' ? 'stretch' : 'flex-start',
            padding: viewport === 'desktop' ? '0' : '24px 0'
          }}
        >
          {viewport === 'mobile' || isMobileScreen ? (
            // Native Mobile POS Device Frame (React Native components running in React Web)
            <div
              style={{
                width: '390px',
                height: '844px',
                background: '#FFFFFF',
                borderRadius: '44px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 10px #1E293B',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
            >
              {/* Phone Speaker & Dynamic Island */}
              <div
                style={{
                  height: '24px',
                  background: '#0F766E',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div style={{ width: '80px', height: '4px', background: '#0D5F58', borderRadius: '2px' }} />
              </div>

              {/* Mobile React Viewport */}
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {activeScreenId === 'MobileBilling' && (
                  <MobileBilling onBack={() => selectScreen('MobileHome')} onBillSaved={() => selectScreen('MobileHome')} />
                )}
                {activeScreenId === 'MobileBillingGu' && (
                  <MobileBillingGu onBack={() => selectScreen('MobileHome')} onBillSaved={() => selectScreen('MobileHome')} />
                )}
                {activeScreenId === 'MobileCloseDay' && (
                  <MobileCloseDay onBack={() => selectScreen('MobileHome')} onCloseConfirmed={() => selectScreen('MobileHome')} />
                )}
                {activeScreenId === 'MobileKhata' && (
                  <MobileKhata onBack={() => selectScreen('MobileHome')} />
                )}
                {(!['MobileBilling', 'MobileBillingGu', 'MobileCloseDay', 'MobileKhata'].includes(activeScreenId)) && (
                  <MobileHome
                    onStartBilling={() => selectScreen('MobileBilling')}
                    onOpenKhata={() => selectScreen('MobileKhata')}
                    onCloseDay={() => selectScreen('MobileCloseDay')}
                  />
                )}
              </div>
            </div>
          ) : viewport === 'tablet' ? (
            // Tablet Frame (768px)
            <div
              style={{
                width: '768px',
                minHeight: '100%',
                background: '#FFFFFF',
                borderRadius: '16px',
                boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 0 6px #1E293B',
                overflow: 'hidden'
              }}
            >
              {activeScreenId === 'Main' && <ClientDashboard tenantName="Shree Krishna Textiles" onNavigate={selectScreen} />}
              {activeScreenId === 'Invoices' && <Invoices onNewInvoice={() => selectScreen('InvoiceNew')} />}
              {activeScreenId === 'InvoiceNew' && <InvoiceNew onBack={() => selectScreen('Invoices')} />}
              {activeScreenId === 'Parties' && <ClientParties />}
              {activeScreenId === 'Stock' && <ClientStock />}
            </div>
          ) : (
            // Full-bleed Desktop ERP Canvas (Pure React JSX)
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {activeScreenId === 'Main' && <ClientDashboard tenantName="Shree Krishna Textiles" onNavigate={selectScreen} />}
              {activeScreenId === 'Invoices' && <Invoices onNewInvoice={() => selectScreen('InvoiceNew')} />}
              {activeScreenId === 'InvoiceNew' && <InvoiceNew onBack={() => selectScreen('Invoices')} />}
              {activeScreenId === 'Challans' && <Challans onConvert={() => selectScreen('ChallanConvert')} />}
              {activeScreenId === 'ChallanConvert' && <ChallanConvert onBack={() => selectScreen('Challans')} />}
              {activeScreenId === 'CreditNotes' && <CreditNotes onBack={() => selectScreen('Invoices')} />}
              {activeScreenId === 'Quotations' && <Quotations onConvert={() => selectScreen('InvoiceNew')} />}
              {activeScreenId === 'Stock' && <ClientStock />}
              {activeScreenId === 'Purchases' && <Purchases onNewPurchase={() => selectScreen('PurchaseNew')} />}
              {activeScreenId === 'PurchaseNew' && <PurchaseNew onBack={() => selectScreen('Purchases')} />}
              {activeScreenId === 'StockCount' && <StockCount onBack={() => selectScreen('Stock')} />}
              {activeScreenId === 'Transfer' && <Transfer onBack={() => selectScreen('Stock')} />}
              {activeScreenId === 'BarcodeLabels' && <BarcodeLabels onBack={() => selectScreen('Stock')} />}
              {activeScreenId === 'Parties' && <ClientParties />}
              {activeScreenId === 'CustomerLedger' && <CustomerLedger onBack={() => selectScreen('Parties')} />}
              {activeScreenId === 'Brokers' && <Brokers onBack={() => selectScreen('Parties')} />}
              {activeScreenId === 'Gst' && <ClientGstSummary onNavigate={selectScreen} />}
              {activeScreenId === 'Gstr1' && <Gstr1Portal onBack={() => selectScreen('Gst')} />}
              {activeScreenId === 'EInvoicePortal' && <EInvoicePortal onBack={() => selectScreen('Gst')} />}
              {activeScreenId === 'CaPortal' && <CaPortal onBack={() => selectScreen('Gst')} />}
              {activeScreenId === 'Audit' && <AuditLogViewer onBack={() => selectScreen('Main')} />}
              {activeScreenId === 'Devices' && <Devices onBack={() => selectScreen('Main')} />}
              {activeScreenId === 'ThermalPrinterSetup' && <ThermalPrinterSetup onBack={() => selectScreen('Devices')} />}
              {activeScreenId === 'UpiQrSetup' && <UpiQrSetup onBack={() => selectScreen('Devices')} />}
              {activeScreenId === 'Users' && <Users onBack={() => selectScreen('Main')} />}

              {/* Platform Super Admin Views */}
              {activeScreenId === 'PlatformHome' && <PlatformDashboard />}
              {activeScreenId === 'PlatformTenants' && <PlatformTenants />}
              {activeScreenId === 'PlatformGrants' && <PlatformGrants />}
              {activeScreenId === 'PlatformIncidents' && <PlatformIncidents />}
              {activeScreenId === 'PlatformPayouts' && <PlatformPayouts />}
              {activeScreenId === 'PlatformFlags' && <PlatformFlags />}

              {/* Any other of the 194 Screens - Seamless Interactive Pure React View */}
              {![
                'Main', 'Invoices', 'InvoiceNew', 'Challans', 'ChallanConvert', 'CreditNotes',
                'Quotations', 'Stock', 'Purchases', 'PurchaseNew', 'StockCount', 'Transfer',
                'BarcodeLabels', 'Parties', 'CustomerLedger', 'Brokers', 'Gst', 'Gstr1',
                'EInvoicePortal', 'CaPortal', 'Audit', 'Devices', 'ThermalPrinterSetup',
                'UpiQrSetup', 'Users', 'PlatformHome', 'PlatformTenants', 'PlatformGrants',
                'PlatformIncidents', 'PlatformPayouts', 'PlatformFlags'
              ].includes(activeScreenId) && (
                <GenericModuleView meta={activeMeta} onNavigate={selectScreen} />
              )}
            </div>
          )}
        </main>
      </div>

      {/* Global Quick Search Modal (Ctrl + K) */}
      {isSearchOpen && (
        <div
          onClick={() => setIsSearchOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(4px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '80px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '640px',
              maxWidth: '90vw',
              background: '#15181C',
              border: '1px solid #334155',
              borderRadius: '14px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.75)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Search Input Bar */}
            <div style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #2B3038' }}>
              <span style={{ fontSize: '18px', marginRight: '12px' }}>🔍</span>
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search screen (Invoices, Challan, Gujarati, Stock, Platform...)"
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#FFFFFF',
                  fontSize: '15px',
                  flex: 1,
                  fontFamily: 'inherit'
                }}
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                style={{ background: 'transparent', border: 'none', color: '#94A3B8', fontSize: '13px', cursor: 'pointer' }}
              >
                ESC
              </button>
            </div>

            {/* Results List */}
            <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '8px 12px' }}>
              {filteredScreens.length === 0 ? (
                <div style={{ padding: '24px', textAlign: 'center', color: '#94A3B8' }}>
                  No screen matching "{searchQuery}"
                </div>
              ) : (
                filteredScreens.map((screen) => (
                  <button
                    key={screen.id}
                    onClick={() => {
                      selectScreen(screen.id);
                      setIsSearchOpen(false);
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: activeScreenId === screen.id ? '#0F766E' : 'transparent',
                      color: '#FFFFFF',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '14px' }}>{screen.label}</div>
                      <div style={{ fontSize: '11px', color: activeScreenId === screen.id ? '#CCFBF1' : '#94A3B8' }}>
                        {screen.category} · {screen.path}
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: '11px',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background: screen.device === 'mobile' ? '#0284C7' : '#334155',
                        color: '#FFFFFF',
                        fontWeight: 600
                      }}
                    >
                      {screen.device.toUpperCase()}
                    </span>
                  </button>
                ))
              )}
            </div>

            {/* Footer Tip */}
            <div style={{ padding: '10px 20px', background: '#0F172A', fontSize: '11px', color: '#64748B', display: 'flex', justifyContent: 'space-between' }}>
              <span>Pure React 19 SPA Architecture</span>
              <span>Press ESC to close</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
