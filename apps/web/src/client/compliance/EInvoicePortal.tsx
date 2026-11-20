import React, { useState } from 'react';
import { formatInr } from '@udyamos/core';
import { Button, ERPTable, StatusBadge, colors, typography } from '@udyamos/ui';

export interface EInvoiceRecord {
  billNo: string;
  party: string;
  date: string;
  value: number;
  irnStatus: 'generated' | 'pending' | 'failed';
  irnNumber?: string;
  ackNo?: string;
  ewayBillNo?: string;
}

export const EInvoicePortal: React.FC = () => {
  const [invoices] = useState<EInvoiceRecord[]>([
    {
      billNo: 'INV-D01-001878',
      party: 'Mahalaxmi Fabrics',
      date: '2026-11-19',
      value: 142000,
      irnStatus: 'generated',
      irnNumber: '7a9c2b184e80...99f',
      ackNo: '112690048123',
      ewayBillNo: '241199048123'
    },
    {
      billNo: 'INV-D01-001880',
      party: 'Shreeji Saree Depot',
      date: '2026-11-20',
      value: 62730,
      irnStatus: 'pending'
    }
  ]);

  const columns = [
    { key: 'billNo', header: 'Bill No' },
    { key: 'party', header: 'Party / Customer' },
    { key: 'date', header: 'Date' },
    {
      key: 'value',
      header: 'Invoice Amount',
      align: 'right' as const,
      render: (r: EInvoiceRecord) => (
        <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{formatInr(r.value)}</span>
      )
    },
    {
      key: 'irnStatus',
      header: 'IRN Status',
      render: (r: EInvoiceRecord) => (
        <StatusBadge
          status={r.irnStatus === 'generated' ? 'approved' : 'warning'}
          label={r.irnStatus === 'generated' ? 'IRN Signed' : 'Ready to Generate'}
        />
      )
    },
    {
      key: 'ackNo',
      header: 'NIC Ack # & E-Way Bill',
      render: (r: EInvoiceRecord) =>
        r.ackNo ? (
          <div style={{ fontSize: '11px', fontFamily: 'monospace' }}>
            <div>Ack: {r.ackNo}</div>
            <div style={{ color: '#0F766E' }}>E-Way: {r.ewayBillNo}</div>
          </div>
        ) : (
          <span style={{ color: '#94A3B8' }}>-</span>
        )
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right' as const,
      render: (r: EInvoiceRecord) => (
        <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
          {r.irnStatus === 'pending' ? (
            <Button size="sm" variant="primary">
              Generate IRN (NIC)
            </Button>
          ) : (
            <Button size="sm" variant="outline">
              Print Signed QR
            </Button>
          )}
        </div>
      )
    }
  ];

  return (
    <div style={{ padding: '24px', background: colors.clientCanvas, minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ ...typography.screenTitle, margin: '0 0 4px 0' }}>e-Invoice & E-Way Bill Portal (NIC)</h1>
          <p style={{ ...typography.subtitle, margin: 0 }}>
            IRN 64-character hash generation, signed QR codes & E-Way bill generation for consignments {'>'} ₹ 50,000
          </p>
        </div>
        <Button variant="primary">Generate Bulk IRN</Button>
      </div>

      <ERPTable columns={columns} data={invoices} />
    </div>
  );
};

