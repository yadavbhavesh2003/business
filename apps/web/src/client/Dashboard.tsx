import React from 'react';
import { formatInr } from '@udyamos/core';
import { KpiCard, StatusBadge, ERPTable, Button, colors, typography } from '@udyamos/ui';

export interface DashboardProps {
  tenantName?: string;
  onNavigate?: (screen: string) => void;
}

export const ClientDashboard: React.FC<DashboardProps> = ({
  tenantName = 'Radhe Radhe Textiles',
  onNavigate
}) => {
  // KPI Metrics matching prototype
  const kpis = [
    { label: "Today's sales", value: formatInr(286450), note: '▲ 12% vs last Thursday · 41 bills', noteTone: 'success' as const },
    { label: 'Collected today', value: formatInr(194000), note: 'Cash ₹38,000 · UPI/Bank ₹1,56,000', noteTone: 'neutral' as const },
    { label: 'Receivable', value: formatInr(1842300), note: '64 parties with balance dues', noteTone: 'neutral' as const },
    { label: 'Overdue > 30 days', value: formatInr(610800), note: '9 parties over credit terms', noteTone: 'danger' as const },
    { label: 'Low / negative stock', value: '7 lots', note: '2 negative after offline sync', noteTone: 'warning' as const }
  ];

  // 14-day sales vs collections bars
  const dayLabels = ['6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'];
  const salesAmounts = [180, 220, 140, 260, 300, 90, 0, 210, 240, 190, 280, 310, 250, 286];
  const collectionAmounts = [120, 160, 150, 180, 200, 140, 0, 130, 210, 170, 160, 260, 220, 194];

  // Recent Sales Table Rows
  const recentBills = [
    { billNo: 'INV-D01-001880', party: 'Shreeji Saree Depot', items: 'Cotton 60s (40m)', amount: 2730, mode: 'UPI', status: 'approved' as const },
    { billNo: 'INV-D01-001879', party: 'Cash Counter Sale', items: 'Rayon Print (25m)', amount: 2231, mode: 'Cash', status: 'approved' as const },
    { billNo: 'INV-D02-000450', party: 'Ambika Fashion', items: 'Chanderi Silk (10m)', amount: 1470, mode: 'Credit', status: 'pending' as const },
    { billNo: 'INV-D01-001878', party: 'Mahalaxmi Fabrics', items: 'Pure Cambric (50m)', amount: 4200, mode: 'Credit', status: 'approved' as const }
  ];

  const columns = [
    { key: 'billNo', header: 'Bill No' },
    { key: 'party', header: 'Customer / Party' },
    { key: 'items', header: 'Items (Lots/Units)' },
    {
      key: 'amount',
      header: 'Net Total',
      align: 'right' as const,
      render: (row: typeof recentBills[0]) => (
        <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
          {formatInr(row.amount)}
        </span>
      )
    },
    { key: 'mode', header: 'Payment Mode' },
    {
      key: 'status',
      header: 'Status',
      render: (row: typeof recentBills[0]) => (
        <StatusBadge status={row.status} label={row.status.toUpperCase()} />
      )
    }
  ];

  return (
    <div
      style={{
        background: colors.client.canvas,
        minHeight: '100vh',
        padding: '24px 32px',
        fontFamily: typography.fontFamily,
        boxSizing: 'border-box'
      }}
    >
      {/* Top Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: colors.client.textMain }}>
            {tenantName}
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: colors.client.textMuted }}>
            Daily Counter Summary · Surat Textile Market · ગુજ / En
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button variant="secondary" onClick={() => onNavigate?.('stock')}>
            📦 Check Lots
          </Button>
          <Button variant="primary" onClick={() => onNavigate?.('billing')}>
            + New Sales Invoice
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
        {kpis.map((k, i) => (
          <KpiCard key={i} label={k.label} value={k.value} note={k.note} noteTone={k.noteTone} />
        ))}
      </div>

      {/* Throughput Bar Chart & Alert Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '24px' }}>
        {/* Dual Bar Chart */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '10px',
            border: `1px solid ${colors.client.border}`,
            padding: '20px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontWeight: 600, fontSize: '14px', color: colors.client.textMain }}>
              14-Day Sales vs Collections (₹ in Thousands)
            </span>
            <div style={{ display: 'flex', gap: '16px', fontSize: '12px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', background: '#15181C', borderRadius: '2px' }} />
                Sales
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', background: '#5FB3A9', borderRadius: '2px' }} />
                Collections
              </span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              height: '140px',
              gap: '12px',
              borderBottom: `1px solid ${colors.client.border}`,
              paddingBottom: '8px'
            }}
          >
            {dayLabels.map((day, i) => (
              <div
                key={day}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  height: '100%'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '2px',
                    height: '100%',
                    width: '100%'
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      background: '#15181C',
                      height: `${(salesAmounts[i] / 320) * 100}%`,
                      borderRadius: '2px 2px 0 0'
                    }}
                  />
                  <div
                    style={{
                      flex: 1,
                      background: '#5FB3A9',
                      height: `${(collectionAmounts[i] / 320) * 100}%`,
                      borderRadius: '2px 2px 0 0'
                    }}
                  />
                </div>
                <span style={{ fontSize: '11px', color: colors.client.textMuted }}>{day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* High-Priority Operational Alerts */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '10px',
            border: `1px solid ${colors.client.border}`,
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <span style={{ fontWeight: 600, fontSize: '14px', color: colors.client.textMain }}>
            Priority Counter Actions
          </span>
          <div style={{ background: '#FFFBEB', padding: '12px', borderRadius: '8px', borderLeft: '4px solid #D97706' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#92400E' }}>⚠️ Sync Conflict</span>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#78350F' }}>
              Lot RL-2291 oversold across D01 and D02 offline. Balance is -15m.
            </p>
          </div>
          <div style={{ background: '#FEF2F2', padding: '12px', borderRadius: '8px', borderLeft: '4px solid #DC2626' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#991B1B' }}>🛑 Credit Limit Exceeded</span>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#7F1D1D' }}>
              Shiv Fabrics overdue ₹40,000 beyond 45 days. Bill creation paused.
            </p>
          </div>
        </div>
      </div>

      {/* Live Counter Sales Feed */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: colors.client.textMain }}>
            Today's Invoices (Counter D01 & D02)
          </h2>
          <span style={{ fontSize: '12px', color: colors.client.textMuted }}>
            Auto-synced with Cloud Gateway
          </span>
        </div>
        <ERPTable
          columns={columns}
          data={recentBills}
          keyExtractor={(row) => row.billNo}
        />
      </div>
    </div>
  );
};

