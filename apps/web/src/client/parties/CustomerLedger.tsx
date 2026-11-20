import React, { useState } from 'react';
import { formatInr, calculateDebtAgeing, generatePaymentReminderWhatsApp } from '@udyamos/core';
import { Button, ERPTable, StatusBadge, colors, typography } from '@udyamos/ui';

export interface LedgerEntry {
  id: string;
  date: string;
  refNo: string;
  type: 'Invoice' | 'Payment' | 'CreditNote';
  particulars: string;
  debit: number;
  credit: number;
  balance: number;
}

export interface CustomerLedgerProps {
  partyName?: string;
  onRecordPayment?: () => void;
  onBack?: () => void;
}

export const CustomerLedger: React.FC<CustomerLedgerProps> = ({
  partyName = 'Ambika Fashion',
  onRecordPayment,
  onBack
}) => {
  const party = {
    name: partyName,
    city: 'Surat',
    gstin: '24ABCDE1234F1Z5',
    mobile: '9825123456',
    creditLimit: 200000,
    creditDays: 30
  };

  const entries: LedgerEntry[] = [
    {
      id: 'e-1',
      date: '2026-10-15',
      refNo: 'INV-D01-001710',
      type: 'Invoice',
      particulars: 'Sales: Chanderi Silk 80m',
      debit: 11200,
      credit: 0,
      balance: 11200
    },
    {
      id: 'e-2',
      date: '2026-10-25',
      refNo: 'REC-2026-0045',
      type: 'Payment',
      particulars: 'Received via Bank NEFT / UTR 99124',
      debit: 0,
      credit: 11200,
      balance: 0
    },
    {
      id: 'e-3',
      date: '2026-11-02',
      refNo: 'INV-D01-001790',
      type: 'Invoice',
      particulars: 'Sales: Rayon Print 150m',
      debit: 12750,
      credit: 0,
      balance: 12750
    },
    {
      id: 'e-4',
      date: '2026-11-20',
      refNo: 'INV-D02-000450',
      type: 'Invoice',
      particulars: 'Sales: Chanderi Silk 10m',
      debit: 1470,
      credit: 0,
      balance: 14220
    }
  ];

  const totalDues = 14220;

  // Debt Ageing Buckets
  const ageing = calculateDebtAgeing(
    [
      { invoiceNo: 'INV-D01-001790', invoiceDate: '2026-11-02', grandTotal: 12750, pendingBalance: 12750 },
      { invoiceNo: 'INV-D02-000450', invoiceDate: '2026-11-20', grandTotal: 1470, pendingBalance: 1470 }
    ],
    new Date('2026-11-20')
  );

  const waReminderLink = generatePaymentReminderWhatsApp({
    customerMobile: party.mobile,
    customerName: party.name,
    totalOverdue: totalDues,
    oldestBillNo: 'INV-D01-001790',
    oldestBillDate: '2026-11-02',
    businessName: 'Radhe Radhe Textiles',
    bankUpiId: 'radhe@okaxis'
  });

  const columns = [
    { key: 'date', header: 'Date' },
    { key: 'refNo', header: 'Ref #' },
    {
      key: 'type',
      header: 'Type',
      render: (r: LedgerEntry) => (
        <StatusBadge
          status={r.type === 'Payment' ? 'approved' : r.type === 'CreditNote' ? 'warning' : 'neutral'}
          label={r.type}
        />
      )
    },
    { key: 'particulars', header: 'Particulars / વિગત' },
    {
      key: 'debit',
      header: 'Debit (ઉધાર)',
      align: 'right' as const,
      render: (r: LedgerEntry) => (
        <span style={{ fontVariantNumeric: 'tabular-nums' }}>{r.debit > 0 ? formatInr(r.debit) : '-'}</span>
      )
    },
    {
      key: 'credit',
      header: 'Credit (જમા)',
      align: 'right' as const,
      render: (r: LedgerEntry) => (
        <span style={{ fontVariantNumeric: 'tabular-nums', color: '#059669' }}>
          {r.credit > 0 ? formatInr(r.credit) : '-'}
        </span>
      )
    },
    {
      key: 'balance',
      header: 'Balance (બાકી)',
      align: 'right' as const,
      render: (r: LedgerEntry) => (
        <span style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: colors.clientPrimary }}>
          {formatInr(r.balance)}
        </span>
      )
    }
  ];

  return (
    <div style={{ padding: '24px', background: colors.clientCanvas, minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {onBack && (
              <Button size="sm" variant="outline" onClick={onBack}>
                ← Back
              </Button>
            )}
            <h1 style={{ ...typography.screenTitle, margin: 0 }}>Customer Ledger (ખાતાવહી) — {party.name}</h1>
          </div>
          <p style={{ ...typography.subtitle, margin: '4px 0 0 0' }}>
            GSTIN: {party.gstin} · Mobile: {party.mobile} · Credit Limit: {formatInr(party.creditLimit)}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <a
            href={waReminderLink}
            target="_blank"
            rel="noreferrer"
            style={{
              background: '#25D366',
              color: '#FFFFFF',
              padding: '8px 14px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center'
            }}
          >
            Send WhatsApp Reminder
          </a>
          <Button variant="primary" onClick={onRecordPayment}>
            + Receive Payment (જમા પોંચ)
          </Button>
        </div>
      </div>

      {/* 4-Bucket Debt Ageing Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
        <div style={{ background: '#FFFFFF', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '11px', color: '#64748B' }}>0 - 30 Days (Current)</div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#0F766E', fontVariantNumeric: 'tabular-nums' }}>
            {formatInr(ageing.bucket0to30)}
          </div>
        </div>
        <div style={{ background: '#FFFFFF', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '11px', color: '#64748B' }}>31 - 60 Days (Notice)</div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#D97706', fontVariantNumeric: 'tabular-nums' }}>
            {formatInr(ageing.bucket31to60)}
          </div>
        </div>
        <div style={{ background: '#FFFFFF', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '11px', color: '#64748B' }}>61 - 90 Days (Warning)</div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#DC2626', fontVariantNumeric: 'tabular-nums' }}>
            {formatInr(ageing.bucket61to90)}
          </div>
        </div>
        <div style={{ background: '#FFFFFF', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '11px', color: '#64748B' }}>90+ Days (Critical / Block)</div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#7F1D1D', fontVariantNumeric: 'tabular-nums' }}>
            {formatInr(ageing.bucket90plus)}
          </div>
        </div>
      </div>

      <ERPTable columns={columns} data={entries} />
    </div>
  );
};

