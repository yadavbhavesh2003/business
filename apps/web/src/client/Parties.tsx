import React, { useState, useEffect } from 'react';
import { formatInr } from '@udyamos/core';
import { ERPTable, StatusBadge, Button, colors, typography } from '@udyamos/ui';
import { apiClient, type CustomerParty } from '../api/client.ts';

export const ClientParties: React.FC = () => {
  const [parties, setParties] = useState<CustomerParty[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchParties = async () => {
    try {
      setLoading(true);
      const data = await apiClient.getParties();
      setParties(data);
    } catch (err) {
      console.error('Failed to fetch parties:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParties();
  }, []);

  const columns = [
    { key: 'name', header: 'Party / Shop Name' },
    { key: 'city', header: 'City' },
    { key: 'phone', header: 'Contact' },
    {
      key: 'creditLimit',
      header: 'Credit Limit',
      align: 'right' as const,
      render: (p: CustomerParty) => formatInr(p.creditLimit)
    },
    {
      key: 'currentBalance',
      header: 'Outstanding Due',
      align: 'right' as const,
      render: (p: CustomerParty) => (
        <span
          style={{
            fontWeight: 600,
            color: p.status === 'overdue' ? '#DC2626' : undefined,
            fontVariantNumeric: 'tabular-nums'
          }}
        >
          {formatInr(p.currentBalance)}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (p: CustomerParty) => {
        if (p.status === 'overdue') {
          return <StatusBadge status="danger" label={`OVERDUE (${p.overdueDays || 30}d)`} />;
        }
        if (p.status === 'near_limit') {
          return <StatusBadge status="warning" label="NEAR LIMIT (90%+)" />;
        }
        return <StatusBadge status="success" label="HEALTHY" />;
      }
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'center' as const,
      render: (p: CustomerParty) => (
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <Button size="sm" variant="secondary">
            Ledger
          </Button>
          <Button size="sm" variant="primary">
            💬 WhatsApp
          </Button>
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
            Customer Ledger & Parties (ખાતાવહી)
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: colors.client.textMuted }}>
            {parties.length} Registered Parties · Credit Limit Control & WhatsApp Payment Reminders
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button variant="secondary" onClick={fetchParties}>
            🔄 Refresh
          </Button>
          <Button variant="primary">+ Add New Customer</Button>
        </div>
      </div>

      <ERPTable
        columns={columns}
        data={parties}
        keyExtractor={(p) => p.id}
      />
    </div>
  );
};
