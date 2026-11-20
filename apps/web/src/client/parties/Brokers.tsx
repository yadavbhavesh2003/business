import React, { useState } from 'react';
import { formatInr } from '@udyamos/core';
import { Button, ERPTable, colors, typography } from '@udyamos/ui';

export interface BrokerRecord {
  id: string;
  name: string;
  mobile: string;
  commissionRatePct: number;
  totalSalesVolume: number;
  commissionEarned: number;
  commissionPaid: number;
  pendingBalance: number;
}

export const Brokers: React.FC = () => {
  const [brokers] = useState<BrokerRecord[]>([
    {
      id: 'brk-1',
      name: 'Ketanbhai Dalal (Ring Road)',
      mobile: '9825411223',
      commissionRatePct: 2.0,
      totalSalesVolume: 1240000,
      commissionEarned: 24800,
      commissionPaid: 18000,
      pendingBalance: 6800
    },
    {
      id: 'brk-2',
      name: 'Pravinbhai Kapadia (Mill Agent)',
      mobile: '9825522334',
      commissionRatePct: 1.5,
      totalSalesVolume: 850000,
      commissionEarned: 12750,
      commissionPaid: 12750,
      pendingBalance: 0
    }
  ]);

  const columns = [
    { key: 'name', header: 'Broker / Agent (દલાલ)' },
    { key: 'mobile', header: 'Mobile' },
    {
      key: 'commissionRatePct',
      header: 'Dalali Rate',
      render: (r: BrokerRecord) => <span>{r.commissionRatePct}%</span>
    },
    {
      key: 'totalSalesVolume',
      header: 'Sales Volume Driven',
      align: 'right' as const,
      render: (r: BrokerRecord) => (
        <span style={{ fontVariantNumeric: 'tabular-nums' }}>{formatInr(r.totalSalesVolume)}</span>
      )
    },
    {
      key: 'commissionEarned',
      header: 'Commission Earned',
      align: 'right' as const,
      render: (r: BrokerRecord) => (
        <span style={{ fontVariantNumeric: 'tabular-nums' }}>{formatInr(r.commissionEarned)}</span>
      )
    },
    {
      key: 'pendingBalance',
      header: 'Pending Payout',
      align: 'right' as const,
      render: (r: BrokerRecord) => (
        <span
          style={{
            fontWeight: 700,
            fontVariantNumeric: 'tabular-nums',
            color: r.pendingBalance > 0 ? '#DC2626' : '#059669'
          }}
        >
          {formatInr(r.pendingBalance)}
        </span>
      )
    }
  ];

  return (
    <div style={{ padding: '24px', background: colors.clientCanvas, minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ ...typography.screenTitle, margin: '0 0 4px 0' }}>Textile Brokers & Dalali Ledger (દલાલી ખાતા)</h1>
          <p style={{ ...typography.subtitle, margin: 0 }}>
            Brokerage settlements, turnover commission calculations & agent statements
          </p>
        </div>
        <Button variant="primary">+ Register New Broker</Button>
      </div>

      <ERPTable columns={columns} data={brokers} />
    </div>
  );
};

