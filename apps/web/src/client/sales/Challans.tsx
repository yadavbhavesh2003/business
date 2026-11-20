import React, { useState } from 'react';
import { formatInr } from '@udyamos/core';
import { Button, ERPTable, StatusBadge, colors, typography } from '@udyamos/ui';

export interface ChallanRecord {
  id: string;
  challanNo: string;
  date: string;
  partyName: string;
  itemsSummary: string;
  quantityMeters: number;
  estAmount: number;
  status: 'pending' | 'converted' | 'cancelled';
  ageDays: number;
}

export interface ChallansProps {
  onNewChallan?: () => void;
  onConvertChallan?: (challanNo: string) => void;
}

export const Challans: React.FC<ChallansProps> = ({ onNewChallan, onConvertChallan }) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'converted'>('all');

  const challans: ChallanRecord[] = [
    {
      id: 'ch-1',
      challanNo: 'DC-2026-0041',
      date: '2026-11-18',
      partyName: 'Ambika Fashion',
      itemsSummary: 'Chanderi Silk (3 rolls / 75m)',
      quantityMeters: 75,
      estAmount: 10500,
      status: 'pending',
      ageDays: 2
    },
    {
      id: 'ch-2',
      challanNo: 'DC-2026-0038',
      date: '2026-11-12',
      partyName: 'Shreeji Saree Depot',
      itemsSummary: 'Pure Cotton Cambric (5 rolls / 250m)',
      quantityMeters: 250,
      estAmount: 20000,
      status: 'pending',
      ageDays: 8 // Alert: over 7 days unbilled!
    },
    {
      id: 'ch-3',
      challanNo: 'DC-2026-0035',
      date: '2026-11-10',
      partyName: 'Mahalaxmi Fabrics',
      itemsSummary: 'Rayon 14kg Print (2 rolls / 60m)',
      quantityMeters: 60,
      estAmount: 5100,
      status: 'converted',
      ageDays: 10
    }
  ];

  const filtered = challans.filter((c) => (filter === 'all' ? true : c.status === filter));

  const columns = [
    { key: 'challanNo', header: 'Challan No' },
    { key: 'date', header: 'Dispatch Date' },
    { key: 'partyName', header: 'Party / Jobworker' },
    { key: 'itemsSummary', header: 'Items & Fabric' },
    {
      key: 'quantityMeters',
      header: 'Total Metres',
      align: 'right' as const,
      render: (r: ChallanRecord) => (
        <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{r.quantityMeters} m</span>
      )
    },
    {
      key: 'estAmount',
      header: 'Est. Value',
      align: 'right' as const,
      render: (r: ChallanRecord) => (
        <span style={{ fontVariantNumeric: 'tabular-nums' }}>{formatInr(r.estAmount)}</span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (r: ChallanRecord) => {
        if (r.status === 'converted') {
          return <StatusBadge status="approved" label="Invoiced" />;
        }
        if (r.ageDays > 7) {
          return <StatusBadge status="danger" label={`Unbilled (${r.ageDays}d)`} />;
        }
        return <StatusBadge status="warning" label={`Pending (${r.ageDays}d)`} />;
      }
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right' as const,
      render: (r: ChallanRecord) => (
        <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
          {r.status === 'pending' && (
            <Button size="sm" variant="primary" onClick={() => onConvertChallan?.(r.challanNo)}>
              Convert to Bill
            </Button>
          )}
          <Button size="sm" variant="outline">
            Print
          </Button>
        </div>
      )
    }
  ];

  return (
    <div style={{ padding: '24px', background: colors.clientCanvas, minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ ...typography.screenTitle, margin: '0 0 4px 0' }}>Delivery Challans (ચલણ રજીસ્ટર)</h1>
          <p style={{ ...typography.subtitle, margin: 0 }}>
            Fabric delivery challans, job-work dispatches & unbilled ageing tracker
          </p>
        </div>
        <Button variant="primary" onClick={onNewChallan}>
          + New Delivery Challan
        </Button>
      </div>

      <div
        style={{
          background: '#FFFFFF',
          padding: '12px 16px',
          borderRadius: '8px',
          border: '1px solid #E2E8F0',
          marginBottom: '16px',
          display: 'flex',
          gap: '8px'
        }}
      >
        {(['all', 'pending', 'converted'] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setFilter(mode)}
            style={{
              background: filter === mode ? colors.clientPrimary : '#F1F5F9',
              color: filter === mode ? '#FFFFFF' : colors.textPrimary,
              border: 'none',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {mode.toUpperCase()}
          </button>
        ))}
      </div>

      <ERPTable columns={columns} data={filtered} />
    </div>
  );
};

