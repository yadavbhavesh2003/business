import React, { useState } from 'react';
import { formatInr } from '@udyamos/core';
import { Button, ERPTable, colors, typography } from '@udyamos/ui';

export const Gstr1Portal: React.FC = () => {
  const [returnPeriod] = useState('November 2026');

  const b2bInvoices = [
    {
      gstin: '24ABCDE1234F1Z5',
      party: 'Ambika Fashion',
      billNo: 'INV-D02-000450',
      date: '2026-11-20',
      value: 1470,
      taxable: 1400,
      cgst: 35,
      sgst: 35,
      igst: 0
    },
    {
      gstin: '24XYZAB9876C1Z2',
      party: 'Mahalaxmi Fabrics',
      billNo: 'INV-D01-001878',
      date: '2026-11-19',
      value: 4200,
      taxable: 4000,
      cgst: 100,
      sgst: 100,
      igst: 0
    }
  ];

  const columns = [
    { key: 'gstin', header: 'Receiver GSTIN' },
    { key: 'party', header: 'Party Trade Name' },
    { key: 'billNo', header: 'Invoice #' },
    { key: 'date', header: 'Invoice Date' },
    {
      key: 'taxable',
      header: 'Taxable Value',
      align: 'right' as const,
      render: (r: any) => <span style={{ fontVariantNumeric: 'tabular-nums' }}>{formatInr(r.taxable)}</span>
    },
    {
      key: 'cgst',
      header: 'CGST (2.5%)',
      align: 'right' as const,
      render: (r: any) => <span style={{ fontVariantNumeric: 'tabular-nums' }}>{formatInr(r.cgst)}</span>
    },
    {
      key: 'sgst',
      header: 'SGST (2.5%)',
      align: 'right' as const,
      render: (r: any) => <span style={{ fontVariantNumeric: 'tabular-nums' }}>{formatInr(r.sgst)}</span>
    },
    {
      key: 'value',
      header: 'Total Invoice Value',
      align: 'right' as const,
      render: (r: any) => (
        <span style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: colors.clientPrimary }}>
          {formatInr(r.value)}
        </span>
      )
    }
  ];

  return (
    <div style={{ padding: '24px', background: colors.clientCanvas, minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ ...typography.screenTitle, margin: '0 0 4px 0' }}>GSTR-1 Monthly Return Portal</h1>
          <p style={{ ...typography.subtitle, margin: 0 }}>
            GST Portal Tables 4A, 4B (B2B), Table 7 (B2C Large), Table 8 (B2C Small) · Return Period: {returnPeriod}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="outline">Download JSON for GST Portal</Button>
          <Button variant="primary">Export GSTR-1 Excel</Button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px' }}>
        <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '11px', color: '#64748B' }}>Table 4 (B2B Taxable)</div>
          <div style={{ fontSize: '18px', fontWeight: 800, marginTop: '4px' }}>{formatInr(5400)}</div>
          <div style={{ fontSize: '11px', color: '#0F766E', marginTop: '2px' }}>2 invoices filed</div>
        </div>
        <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '11px', color: '#64748B' }}>Table 8 (B2C Counter Retail)</div>
          <div style={{ fontSize: '18px', fontWeight: 800, marginTop: '4px' }}>{formatInr(4961)}</div>
          <div style={{ fontSize: '11px', color: '#0F766E', marginTop: '2px' }}>2 cash sales</div>
        </div>
        <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '11px', color: '#64748B' }}>Total CGST + SGST</div>
          <div style={{ fontSize: '18px', fontWeight: 800, marginTop: '4px', color: colors.clientPrimary }}>
            {formatInr(518)}
          </div>
          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>50/50 intra-state split</div>
        </div>
        <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '11px', color: '#64748B' }}>Table 12 (HSN Summary)</div>
          <div style={{ fontSize: '18px', fontWeight: 800, marginTop: '4px' }}>4 HSNs</div>
          <div style={{ fontSize: '11px', color: '#0F766E', marginTop: '2px' }}>100% matched</div>
        </div>
      </div>

      <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px' }}>Table 4A — Taxable Outward B2B Supplies</h3>
      <ERPTable columns={columns} data={b2bInvoices} />
    </div>
  );
};

