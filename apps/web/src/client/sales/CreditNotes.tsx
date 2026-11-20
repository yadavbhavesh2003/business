import React, { useState } from 'react';
import { formatInr } from '@udyamos/core';
import { Button, ERPTable, StatusBadge, colors, typography } from '@udyamos/ui';

export interface CreditNoteRecord {
  id: string;
  noteNo: string;
  originalBillNo: string;
  date: string;
  partyName: string;
  itemsReturned: string;
  returnReason: string;
  taxableAmount: number;
  taxRefund: number;
  totalRefund: number;
  restockStatus: 'Restocked' | 'Damaged Scrap';
}

export const CreditNotes: React.FC = () => {
  const [notes] = useState<CreditNoteRecord[]>([
    {
      id: 'cn-1',
      noteNo: 'CN-2026-0008',
      originalBillNo: 'INV-D01-001840',
      date: '2026-11-19',
      partyName: 'Shreeji Saree Depot',
      itemsReturned: 'Cotton 60s (5m cut)',
      returnReason: 'Weaving defect in warp',
      taxableAmount: 325,
      taxRefund: 16.25,
      totalRefund: 341,
      restockStatus: 'Damaged Scrap'
    },
    {
      id: 'cn-2',
      noteNo: 'CN-2026-0007',
      originalBillNo: 'INV-D01-001790',
      date: '2026-11-15',
      partyName: 'Ambika Fashion',
      itemsReturned: 'Rayon Print (10m)',
      returnReason: 'Excess order returned',
      taxableAmount: 850,
      taxRefund: 42.5,
      totalRefund: 893,
      restockStatus: 'Restocked'
    }
  ]);

  const columns = [
    { key: 'noteNo', header: 'Credit Note #' },
    { key: 'originalBillNo', header: 'Original Invoice' },
    { key: 'date', header: 'Return Date' },
    { key: 'partyName', header: 'Party / Customer' },
    { key: 'itemsReturned', header: 'Items Returned' },
    { key: 'returnReason', header: 'Reason / ખામી વિગત' },
    {
      key: 'totalRefund',
      header: 'Credit Total',
      align: 'right' as const,
      render: (r: CreditNoteRecord) => (
        <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: '#DC2626' }}>
          - {formatInr(r.totalRefund)}
        </span>
      )
    },
    {
      key: 'restockStatus',
      header: 'Inventory Reversal',
      render: (r: CreditNoteRecord) => (
        <StatusBadge
          status={r.restockStatus === 'Restocked' ? 'approved' : 'warning'}
          label={r.restockStatus}
        />
      )
    }
  ];

  return (
    <div style={{ padding: '24px', background: colors.clientCanvas, minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ ...typography.screenTitle, margin: '0 0 4px 0' }}>Sales Returns & Credit Notes (જમા ચિઠ્ઠી)</h1>
          <p style={{ ...typography.subtitle, margin: 0 }}>
            GST compliant sales returns, inventory stock reversals & customer ledger adjustments
          </p>
        </div>
        <Button variant="primary">+ Issue Credit Note</Button>
      </div>

      <ERPTable columns={columns} data={notes} />
    </div>
  );
};

