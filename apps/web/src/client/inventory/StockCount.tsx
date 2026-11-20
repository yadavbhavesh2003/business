import React, { useState } from 'react';
import { reconcileStockBalances } from '@udyamos/core';
import { Button, ERPTable, StatusBadge, colors, typography } from '@udyamos/ui';

export interface AuditStockRow {
  lotCode: string;
  quality: string;
  systemMeters: number;
  physicalMeters: number;
  varianceMeters: number;
  status: 'matched' | 'excess' | 'shortage';
}

export const StockCount: React.FC = () => {
  const [rows, setRows] = useState<AuditStockRow[]>([
    {
      lotCode: 'LOT-CTN-60S-041',
      quality: 'Pure Cotton 60s Bleached',
      systemMeters: 400,
      physicalMeters: 395,
      varianceMeters: -5,
      status: 'shortage'
    },
    {
      lotCode: 'LOT-RYN-PRN-019',
      quality: 'Rayon 14kg Discharge Print',
      systemMeters: 180,
      physicalMeters: 180,
      varianceMeters: 0,
      status: 'matched'
    },
    {
      lotCode: 'LOT-CHN-SLK-008',
      quality: 'Chanderi Silk Brocade',
      systemMeters: 60,
      physicalMeters: 65,
      varianceMeters: 5,
      status: 'excess'
    }
  ]);

  const columns = [
    { key: 'lotCode', header: 'Lot Code' },
    { key: 'quality', header: 'Quality / Fabric' },
    {
      key: 'systemMeters',
      header: 'System Metres',
      align: 'right' as const,
      render: (r: AuditStockRow) => <span style={{ fontVariantNumeric: 'tabular-nums' }}>{r.systemMeters} m</span>
    },
    {
      key: 'physicalMeters',
      header: 'Physical Count (ગોડાઉન ગણતરી)',
      align: 'right' as const,
      render: (r: AuditStockRow) => (
        <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{r.physicalMeters} m</span>
      )
    },
    {
      key: 'varianceMeters',
      header: 'Variance',
      align: 'right' as const,
      render: (r: AuditStockRow) => (
        <span
          style={{
            fontWeight: 700,
            fontVariantNumeric: 'tabular-nums',
            color: r.varianceMeters < 0 ? '#DC2626' : r.varianceMeters > 0 ? '#059669' : colors.textPrimary
          }}
        >
          {r.varianceMeters > 0 ? `+${r.varianceMeters}` : r.varianceMeters} m
        </span>
      )
    },
    {
      key: 'status',
      header: 'Audit Status',
      render: (r: AuditStockRow) => (
        <StatusBadge
          status={r.status === 'matched' ? 'approved' : r.status === 'excess' ? 'warning' : 'danger'}
          label={r.status.toUpperCase()}
        />
      )
    }
  ];

  return (
    <div style={{ padding: '24px', background: colors.clientCanvas, minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ ...typography.screenTitle, margin: '0 0 4px 0' }}>Physical Stock Audit & Count (સ્ટોક ગણતરી)</h1>
          <p style={{ ...typography.subtitle, margin: 0 }}>
            CRDT stock reconciler, godown roll recount & ledger adjustment vouchers
          </p>
        </div>
        <Button variant="primary">Post Physical Audit Reconciliation</Button>
      </div>

      <ERPTable columns={columns} data={rows} />
    </div>
  );
};

