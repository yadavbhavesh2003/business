import React from 'react';
import { formatInr } from '@udyamos/core';
import { ERPTable, StatusBadge, Button, colors, typography } from '@udyamos/ui';

export interface CustomerParty {
  id: string;
  name: string;
  city: string;
  gstin: string;
  phone: string;
  creditLimit: number;
  creditDays: number;
  currentBalance: number;
  status: 'normal' | 'near_limit' | 'overdue';
}

export const ClientParties: React.FC = () => {
  const parties: CustomerParty[] = [
    {
      id: 'cust-001',
      name: 'Shreeji Saree Depot',
      city: 'Surat',
      gstin: '24AAACS1122S1Z9',
      phone: '+91 98251 11222',
      creditLimit: 500000,
      creditDays: 30,
      currentBalance: 182400,
      status: 'normal'
    },
    {
      id: 'cust-002',
      name: 'Shiv Fabrics',
      city: 'Ahmedabad',
      gstin: '24BBBPS3344B1Z4',
      phone: '+91 98252 33444',
      creditLimit: 200000,
      creditDays: 15,
      currentBalance: 240000,
      status: 'overdue'
    },
    {
      id: 'cust-003',
      name: 'Mahalaxmi Textiles',
      city: 'Bhavnagar',
      gstin: '24CCCPS5566C1Z2',
      phone: '+91 98253 55666',
      creditLimit: 300000,
      creditDays: 30,
      currentBalance: 285000,
      status: 'near_limit'
    }
  ];

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
          return <StatusBadge status="danger" label="OVERDUE (38d)" />;
        }
        if (p.status === 'near_limit') {
          return <StatusBadge status="warning" label="NEAR LIMIT (95%)" />;
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
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: colors.client.textMain }}>
            Customer Ledger & Parties (ખાતાવહી)
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: colors.client.textMuted }}>
            64 Total Parties · Credit Limit Control & WhatsApp Payment Reminders
          </p>
        </div>
        <Button variant="primary">+ Add New Customer</Button>
      </div>

      <ERPTable
        columns={columns}
        data={parties}
        keyExtractor={(p) => p.id}
      />
    </div>
  );
};

