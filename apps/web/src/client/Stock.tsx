import React from 'react';
import { ERPTable, StatusBadge, Button, colors, typography } from '@udyamos/ui';

export interface LotItem {
  lotId: string;
  itemName: string;
  godown: string;
  thanCount: number; // Rolls / Than
  metres: number;
  ratePerMetre: number;
  status: 'available' | 'low' | 'negative_conflict';
}

export const ClientStock: React.FC = () => {
  const lots: LotItem[] = [
    {
      lotId: 'LOT-CTN-601',
      itemName: 'Cotton Than 60s (Surat Mill)',
      godown: 'Godown 1 (Ring Road)',
      thanCount: 14,
      metres: 560,
      ratePerMetre: 65,
      status: 'available'
    },
    {
      lotId: 'LOT-RYN-2291',
      itemName: 'Rayon Floral Print 14kg',
      godown: 'Godown 1 (Ring Road)',
      thanCount: 0,
      metres: -15, // Oversold offline across 2 devices!
      ratePerMetre: 85,
      status: 'negative_conflict'
    },
    {
      lotId: 'LOT-CHN-440',
      itemName: 'Chanderi Silk Jacquard Border',
      godown: 'Godown 2 (Khatodara)',
      thanCount: 2,
      metres: 35,
      ratePerMetre: 140,
      status: 'low'
    }
  ];

  const columns = [
    { key: 'lotId', header: 'Lot / Roll No' },
    { key: 'itemName', header: 'Fabric Description' },
    { key: 'godown', header: 'Location' },
    {
      key: 'thanCount',
      header: 'Than (થાણ)',
      align: 'right' as const,
      render: (l: LotItem) => `${l.thanCount} rolls`
    },
    {
      key: 'metres',
      header: 'Available Metres',
      align: 'right' as const,
      render: (l: LotItem) => (
        <span
          style={{
            fontWeight: 700,
            color: l.status === 'negative_conflict' ? '#DC2626' : undefined,
            fontVariantNumeric: 'tabular-nums'
          }}
        >
          {l.metres} m
        </span>
      )
    },
    {
      key: 'status',
      header: 'Stock Health',
      render: (l: LotItem) => {
        if (l.status === 'negative_conflict') {
          return <StatusBadge status="danger" label="⚠️ CRDT DEFICIT (-15m)" />;
        }
        if (l.status === 'low') {
          return <StatusBadge status="warning" label="LOW STOCK" />;
        }
        return <StatusBadge status="success" label="IN STOCK" />;
      }
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'center' as const,
      render: (l: LotItem) => (
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <Button size="sm" variant="secondary">
            Transfer
          </Button>
          {l.status === 'negative_conflict' ? (
            <Button size="sm" variant="danger">
              Resolve Deficit
            </Button>
          ) : null}
        </div>
      )
    }
  ];

  return (
    <div
      style={{
        background: colors.client.canvas,
        minHeight: '100vh',
        padding: '24px 32px',
        fontFamily: typography.fontFamily,
        boxSizing: 'border-box'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: colors.client.textMain }}>
            Godown Lots & Fabric Rolls (થાણ / મીટર)
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: colors.client.textMuted }}>
            Multi-Godown Inventory · Lot-wise Batch Tracking & CRDT Offline Stock Reconciliation
          </p>
        </div>
        <Button variant="primary">+ Inward New Lot / Challan</Button>
      </div>

      <ERPTable
        columns={columns}
        data={lots}
        keyExtractor={(l) => l.lotId}
      />
    </div>
  );
};

