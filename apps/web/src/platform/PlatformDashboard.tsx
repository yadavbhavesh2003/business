import React from 'react';
import { formatInr } from '@udyamos/core';
import { KpiCard, StatusBadge, ERPTable, Button, colors, typography } from '@udyamos/ui';

export interface TenantTelemetry {
  tenantId: string;
  name: string;
  plan: 'Growth' | 'Starter' | 'Pilot';
  devicesCount: number;
  billsProcessedToday: number;
  syncLagSeconds: number;
  activeSupportGrant: boolean;
  status: 'healthy' | 'warning' | 'degraded';
}

export const PlatformDashboard: React.FC = () => {
  const kpis = [
    { label: 'Active Paid Tenants', value: '142', note: '▲ 8 this month · 0 churn', noteTone: 'success' as const },
    { label: 'Today’s Cloud Bills', value: '4,892', note: 'Peak: 18 bills/sec at 12:30 PM', noteTone: 'neutral' as const },
    { label: 'Monthly Recurring (MRR)', value: formatInr(284000), note: 'Annual Run Rate: ₹34.08L', noteTone: 'success' as const },
    { label: 'Active 30-Day Pilots', value: '28 shops', note: '19 high engagement (>20 bills/d)', noteTone: 'neutral' as const },
    { label: 'Sync Health Index', value: '99.94%', note: 'Avg cloud sync latency: 140ms', noteTone: 'success' as const },
    { label: 'Support Grants Active', value: '2 grants', note: 'Time-boxed; audited immutable log', noteTone: 'warning' as const }
  ];

  const tenants: TenantTelemetry[] = [
    {
      tenantId: 'org-radhe-001',
      name: 'Radhe Radhe Textiles (Surat)',
      plan: 'Growth',
      devicesCount: 2,
      billsProcessedToday: 41,
      syncLagSeconds: 1,
      activeSupportGrant: true,
      status: 'healthy'
    },
    {
      tenantId: 'org-navkar-002',
      name: 'Navkar Dress Materials (Ahmedabad)',
      plan: 'Growth',
      devicesCount: 3,
      billsProcessedToday: 68,
      syncLagSeconds: 2,
      activeSupportGrant: false,
      status: 'healthy'
    },
    {
      tenantId: 'org-bhavna-003',
      name: 'Bhavna Saree House (Bhavnagar)',
      plan: 'Pilot',
      devicesCount: 1,
      billsProcessedToday: 14,
      syncLagSeconds: 42,
      activeSupportGrant: false,
      status: 'warning'
    }
  ];

  const columns = [
    { key: 'name', header: 'Tenant Business' },
    { key: 'plan', header: 'Subscription' },
    {
      key: 'devicesCount',
      header: 'Counters',
      align: 'right' as const,
      render: (t: TenantTelemetry) => `${t.devicesCount} devices`
    },
    {
      key: 'billsProcessedToday',
      header: 'Bills Today',
      align: 'right' as const,
      render: (t: TenantTelemetry) => t.billsProcessedToday
    },
    {
      key: 'syncLagSeconds',
      header: 'Sync Latency',
      align: 'right' as const,
      render: (t: TenantTelemetry) => (
        <span
          style={{
            fontWeight: 600,
            color: t.syncLagSeconds > 10 ? '#D97706' : '#059669',
            fontVariantNumeric: 'tabular-nums'
          }}
        >
          {t.syncLagSeconds}s lag
        </span>
      )
    },
    {
      key: 'activeSupportGrant',
      header: 'Zero-Knowledge Privacy',
      render: (t: TenantTelemetry) => {
        if (t.activeSupportGrant) {
          return <StatusBadge status="warning" label="SUPPORT GRANT ACTIVE (2h left)" />;
        }
        return <StatusBadge status="success" label="ENCRYPTED · ZERO ACCESS" />;
      }
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'center' as const,
      render: (t: TenantTelemetry) => (
        <Button size="sm" variant={t.activeSupportGrant ? 'platform' : 'secondary'}>
          {t.activeSupportGrant ? 'Open Support Console' : 'Request Access Grant'}
        </Button>
      )
    }
  ];

  return (
    <div
      style={{
        background: '#0B0F17',
        color: '#FFFFFF',
        minHeight: '100vh',
        padding: '24px 32px',
        fontFamily: typography.fontFamily,
        boxSizing: 'border-box'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', background: '#1E293B', padding: '3px 8px', borderRadius: '4px', color: '#818CF8', fontWeight: 700 }}>
              UDYAMOS SAAS COMMAND CENTER
            </span>
          </div>
          <h1 style={{ margin: '8px 0 0', fontSize: '24px', fontWeight: 700 }}>
            Platform Operational Telemetry
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#94A3B8' }}>
            Strict Zero-Knowledge Privacy Boundary Active · FIDO2 Hardware Key Authenticated
          </p>
        </div>
        <Button variant="platform">+ Provision New Merchant</Button>
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

      {/* Live Tenant Sync Table */}
      <div style={{ background: '#1E293B', borderRadius: '10px', padding: '20px', border: '1px solid #334155' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#FFFFFF' }}>
              Live Tenant Sync Health & Telemetry
            </h2>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#94A3B8' }}>
              Customer financial records remain zero-knowledge encrypted unless time-boxed grant is active
            </p>
          </div>
          <StatusBadge status="success" label="GATEWAY HEALTHY (24,180 ws connections)" />
        </div>

        <ERPTable
          columns={columns}
          data={tenants}
          keyExtractor={(t) => t.tenantId}
        />
      </div>
    </div>
  );
};

