import React, { useState } from 'react';
import { formatInr } from '@udyamos/core';
import { Button, ERPTable, StatusBadge, colors, typography } from '@udyamos/ui';

export interface TenantRecord {
  id: string;
  name: string;
  city: string;
  plan: 'Starter Counter' | 'Standard Wholesale' | 'Enterprise Multi-Store';
  mrr: number;
  devicesCount: number;
  trialDaysRemaining: number;
  status: 'active' | 'trial' | 'suspended';
}

export const PlatformTenants: React.FC = () => {
  const [tenants] = useState<TenantRecord[]>([
    {
      id: 'ten-001',
      name: 'Radhe Radhe Textiles',
      city: 'Surat (Ring Road)',
      plan: 'Standard Wholesale',
      mrr: 2500,
      devicesCount: 3,
      trialDaysRemaining: 0,
      status: 'active'
    },
    {
      id: 'ten-002',
      name: 'Krishna Fashion Sarees',
      city: 'Ahmedabad (Ratanpole)',
      plan: 'Starter Counter',
      mrr: 1200,
      devicesCount: 1,
      trialDaysRemaining: 18,
      status: 'trial'
    },
    {
      id: 'ten-003',
      name: 'Mahadev Silks',
      city: 'Surat (Mill Market)',
      plan: 'Enterprise Multi-Store',
      mrr: 6000,
      devicesCount: 6,
      trialDaysRemaining: 0,
      status: 'active'
    }
  ]);

  const columns = [
    { key: 'name', header: 'Store / Merchant Name' },
    { key: 'city', header: 'City & Market' },
    {
      key: 'plan',
      header: 'Subscription Tier',
      render: (r: TenantRecord) => <span style={{ fontWeight: 600 }}>{r.plan}</span>
    },
    {
      key: 'mrr',
      header: 'Monthly MRR',
      align: 'right' as const,
      render: (r: TenantRecord) => (
        <span style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: colors.platformAccent }}>
          {formatInr(r.mrr)}
        </span>
      )
    },
    {
      key: 'devicesCount',
      header: 'Counters Paired',
      render: (r: TenantRecord) => <span>{r.devicesCount} devices</span>
    },
    {
      key: 'status',
      header: 'Lifecycle Status',
      render: (r: TenantRecord) => (
        <StatusBadge
          status={r.status === 'active' ? 'approved' : r.status === 'trial' ? 'warning' : 'danger'}
          label={r.status === 'trial' ? `30-Day Pilot (${r.trialDaysRemaining}d left)` : r.status.toUpperCase()}
        />
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right' as const,
      render: (r: TenantRecord) => (
        <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
          <Button size="sm" variant="outline">
            Telemetry
          </Button>
          <Button size="sm" variant="primary">
            Request Support Grant
          </Button>
        </div>
      )
    }
  ];

  return (
    <div style={{ padding: '24px', background: colors.clientCanvas, minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ ...typography.screenTitle, margin: '0 0 4px 0' }}>SaaS Tenant Lifecycle & Pilots</h1>
          <p style={{ ...typography.subtitle, margin: 0 }}>
            142 Active Gujarati Merchants · 30-Day Guided Pilot Validation · Section 170 Compliant
          </p>
        </div>
        <Button variant="primary">+ Provision New Tenant</Button>
      </div>

      <ERPTable columns={columns} data={tenants} />
    </div>
  );
};

