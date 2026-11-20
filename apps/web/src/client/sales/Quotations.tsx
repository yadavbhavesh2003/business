import React, { useState } from 'react';
import { formatInr } from '@udyamos/core';
import { Button, ERPTable, StatusBadge, colors, typography } from '@udyamos/ui';

export interface QuotationRecord {
  id: string;
  quotationNo: string;
  date: string;
  validUntil: string;
  partyName: string;
  itemsSummary: string;
  totalEstimate: number;
  status: 'active' | 'accepted' | 'expired';
}

export const Quotations: React.FC = () => {
  const [quotations] = useState<QuotationRecord[]>([
    {
      id: 'q-1',
      quotationNo: 'EST-2026-0092',
      date: '2026-11-20',
      validUntil: '2026-11-27',
      partyName: 'New Gujarat Saree House',
      itemsSummary: 'Cotton 60s (200m) + Rayon (150m)',
      totalEstimate: 28450,
      status: 'active'
    },
    {
      id: 'q-2',
      quotationNo: 'EST-2026-0089',
      date: '2026-11-16',
      validUntil: '2026-11-23',
      partyName: 'Radhika Textiles',
      itemsSummary: 'Chanderi Silk (80m)',
      totalEstimate: 11200,
      status: 'accepted'
    }
  ]);

  const columns = [
    { key: 'quotationNo', header: 'Quotation No' },
    { key: 'date', header: 'Date' },
    { key: 'validUntil', header: 'Valid Till' },
    { key: 'partyName', header: 'Party / Prospect' },
    { key: 'itemsSummary', header: 'Estimated Goods' },
    {
      key: 'totalEstimate',
      header: 'Est. Amount',
      align: 'right' as const,
      render: (r: QuotationRecord) => (
        <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{formatInr(r.totalEstimate)}</span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (r: QuotationRecord) => (
        <StatusBadge
          status={r.status === 'accepted' ? 'approved' : r.status === 'active' ? 'pending' : 'warning'}
          label={r.status.toUpperCase()}
        />
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right' as const,
      render: (r: QuotationRecord) => (
        <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
          <Button size="sm" variant="primary">
            Convert to Bill
          </Button>
          <Button size="sm" variant="outline">
            Share PDF
          </Button>
        </div>
      )
    }
  ];

  return (
    <div style={{ padding: '24px', background: colors.clientCanvas, minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ ...typography.screenTitle, margin: '0 0 4px 0' }}>Proforma Invoices & Quotations (અંદાજપત્ર)</h1>
          <p style={{ ...typography.subtitle, margin: 0 }}>
            Price estimates, validity periods, and one-click conversion to sales bills
          </p>
        </div>
        <Button variant="primary">+ Create New Quotation</Button>
      </div>

      <ERPTable columns={columns} data={quotations} />
    </div>
  );
};

