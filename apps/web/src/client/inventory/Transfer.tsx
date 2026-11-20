import React, { useState } from 'react';
import { Button, ERPTable, StatusBadge, colors, typography } from '@udyamos/ui';

export interface TransferRecord {
  id: string;
  transferNo: string;
  date: string;
  sourceGodown: string;
  destinationGodown: string;
  lotSummary: string;
  totalMeters: number;
  status: 'dispatched' | 'received';
}

export const Transfer: React.FC = () => {
  const [transfers] = useState<TransferRecord[]>([
    {
      id: 'tr-1',
      transferNo: 'TR-2026-0012',
      date: '2026-11-20',
      sourceGodown: 'Ring Road Head Office (G1)',
      destinationGodown: 'Bhatena Process House (G2)',
      lotSummary: 'LOT-CTN-60S-041 (10 rolls / 400m)',
      totalMeters: 400,
      status: 'dispatched'
    },
    {
      id: 'tr-2',
      transferNo: 'TR-2026-0011',
      date: '2026-11-18',
      sourceGodown: 'Surat Textile Market (G3)',
      destinationGodown: 'Ring Road Head Office (G1)',
      lotSummary: 'LOT-CHN-SLK-008 (5 rolls / 125m)',
      totalMeters: 125,
      status: 'received'
    }
  ]);

  const columns = [
    { key: 'transferNo', header: 'Transfer #' },
    { key: 'date', header: 'Date' },
    { key: 'sourceGodown', header: 'From Godown' },
    { key: 'destinationGodown', header: 'To Godown' },
    { key: 'lotSummary', header: 'Lots Transferred' },
    {
      key: 'totalMeters',
      header: 'Total Metres',
      align: 'right' as const,
      render: (r: TransferRecord) => (
        <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{r.totalMeters} m</span>
      )
    },
    {
      key: 'status',
      header: 'Transfer Status',
      render: (r: TransferRecord) => (
        <StatusBadge
          status={r.status === 'received' ? 'approved' : 'warning'}
          label={r.status === 'received' ? 'Received at Destination' : 'In Transit'}
        />
      )
    }
  ];

  return (
    <div style={{ padding: '24px', background: colors.clientCanvas, minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ ...typography.screenTitle, margin: '0 0 4px 0' }}>Inter-Godown Lot Transfers (ગોડાઉન ટ્રાન્સફર)</h1>
          <p style={{ ...typography.subtitle, margin: 0 }}>
            Transfer fabric bales between godowns, markets, and dyeing processing houses
          </p>
        </div>
        <Button variant="primary">+ New Inter-Godown Challan</Button>
      </div>

      <ERPTable columns={columns} data={transfers} />
    </div>
  );
};

