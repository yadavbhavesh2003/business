import React, { useState } from 'react';
import { formatInr } from '@udyamos/core';
import { Button, ERPTable, StatusBadge, colors, typography } from '@udyamos/ui';

export interface PayoutRecord {
  id: string;
  partnerName: string;
  firmType: 'CA Firm' | 'Textile Association' | 'Hardware Vendor';
  referredTenantsCount: number;
  commissionRatePct: number;
  monthlyCommission: number;
  bankAccount: string;
  status: 'approved' | 'paid' | 'pending';
}

export const PlatformPayouts: React.FC = () => {
  const [payouts] = useState<PayoutRecord[]>([
    {
      id: 'PAY-2026-11-01',
      partnerName: 'Dharmeshbhai & Co (Chartered Accountants)',
      firmType: 'CA Firm',
      referredTenantsCount: 14,
      commissionRatePct: 20,
      monthlyCommission: 7000,
      bankAccount: 'HDFC Bank ··· 8812',
      status: 'approved'
    },
    {
      id: 'PAY-2026-11-02',
      partnerName: 'Surat Textile Market Association',
      firmType: 'Textile Association',
      referredTenantsCount: 32,
      commissionRatePct: 15,
      monthlyCommission: 12000,
      bankAccount: 'ICICI Bank ··· 9941',
      status: 'paid'
    }
  ]);

  const columns = [
    { key: 'partnerName', header: 'Partner Firm Name' },
    { key: 'firmType', header: 'Category' },
    {
      key: 'referredTenantsCount',
      header: 'Active Tenants',
      render: (r: PayoutRecord) => <span>{r.referredTenantsCount} merchants</span>
    },
    {
      key: 'commissionRatePct',
      header: 'Rev Share',
      render: (r: PayoutRecord) => <span>{r.commissionRatePct}% MRR</span>
    },
    {
      key: 'monthlyCommission',
      header: 'Commission Amount',
      align: 'right' as const,
      render: (r: PayoutRecord) => (
        <span style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: colors.platformAccent }}>
          {formatInr(r.monthlyCommission)}
        </span>
      )
    },
    { key: 'bankAccount', header: 'Bank NEFT Destination' },
    {
      key: 'status',
      header: 'Payout Status',
      render: (r: PayoutRecord) => (
        <StatusBadge
          status={r.status === 'paid' ? 'approved' : r.status === 'approved' ? 'pending' : 'warning'}
          label={r.status.toUpperCase()}
        />
      )
    }
  ];

  return (
    <div style={{ padding: '24px', background: colors.clientCanvas, minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ ...typography.screenTitle, margin: '0 0 4px 0' }}>CA Partner & Referral Commissions</h1>
          <p style={{ ...typography.subtitle, margin: 0 }}>
            Automated monthly revenue-share payouts to Chartered Accountants and Textile Trade Associations
          </p>
        </div>
        <Button variant="primary">Process Monthly Bank NEFT Batch</Button>
      </div>

      <ERPTable columns={columns} data={payouts} />
    </div>
  );
};

