import React, { useState, useEffect } from 'react';
import { ERPTable, StatusBadge, Button, colors, typography } from '@udyamos/ui';
import { apiClient, type LotItem } from '../api/client.ts';

export const ClientStock: React.FC = () => {
  const [lots, setLots] = useState<LotItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchStock = async () => {
    try {
      setLoading(true);
      const data = await apiClient.getStock();
      setLots(data);
    } catch (err) {
      console.error('Failed to fetch stock:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStock();
  }, []);

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
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: colors.client.textMain }}>
            Godown Lots & Fabric Rolls (થાણ / મીટર)
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: colors.client.textMuted }}>
            {lots.length} Fabric Lots · Multi-Godown Inventory & CRDT Offline Stock Reconciliation
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button variant="secondary" onClick={fetchStock}>
            🔄 Refresh
          </Button>
          <Button variant="primary">+ Inward New Lot / Challan</Button>
        </div>
      </div>

      <ERPTable
        columns={columns}
        data={lots}
        keyExtractor={(l) => l.lotId}
      />
    </div>
  );
};
