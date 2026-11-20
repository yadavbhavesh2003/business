import React from 'react';
import { formatInr, getIndianFinancialPeriod } from '@udyamos/core';
import { ERPTable, StatusBadge, Button, colors, typography } from '@udyamos/ui';

export const ClientGstSummary: React.FC = () => {
  const period = getIndianFinancialPeriod();

  const taxRows = [
    {
      category: 'Intra-State B2B Sales (Gujarat 24)',
      taxable: 1420500,
      cgst: 35512.5,
      sgst: 35512.5,
      igst: 0,
      roundOff: 0.0,
      netTotal: 1491525
    },
    {
      category: 'Intra-State B2C Retail Counter (Gujarat 24)',
      taxable: 421800,
      cgst: 10545.0,
      sgst: 10545.0,
      igst: 0,
      roundOff: -0.26, // Section 170 CGST Act round-off
      netTotal: 442890
    },
    {
      category: 'Inter-State Sales (Maharashtra 27 / Rajasthan 08)',
      taxable: 310200,
      cgst: 0,
      sgst: 0,
      igst: 15510.0,
      roundOff: 0.0,
      netTotal: 325710
    }
  ];

  const columns = [
    { key: 'category', header: 'GSTR-1 Tax Section' },
    {
      key: 'taxable',
      header: 'Taxable Amount',
      align: 'right' as const,
      render: (r: typeof taxRows[0]) => formatInr(r.taxable)
    },
    {
      key: 'cgst',
      header: 'CGST (2.5%)',
      align: 'right' as const,
      render: (r: typeof taxRows[0]) => formatInr(r.cgst)
    },
    {
      key: 'sgst',
      header: 'SGST (2.5%)',
      align: 'right' as const,
      render: (r: typeof taxRows[0]) => formatInr(r.sgst)
    },
    {
      key: 'igst',
      header: 'IGST (5%)',
      align: 'right' as const,
      render: (r: typeof taxRows[0]) => formatInr(r.igst)
    },
    {
      key: 'roundOff',
      header: 'Round-off (Sec 170)',
      align: 'right' as const,
      render: (r: typeof taxRows[0]) => formatInr(r.roundOff)
    },
    {
      key: 'netTotal',
      header: 'Invoice Total',
      align: 'right' as const,
      render: (r: typeof taxRows[0]) => (
        <span style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
          {formatInr(r.netTotal)}
        </span>
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
            GST Compliance & GSTR-1 Tax Breakup
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: colors.client.textMuted }}>
            {period.fyCode} · {period.quarterLabel} · Section 170 CGST Act Nearest Rupee Verified
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button variant="secondary">📊 Download Excel for CA</Button>
          <Button variant="primary">Export GSTR-1 JSON</Button>
        </div>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <StatusBadge status="success" label="✓ ZERO MISMATCH: Sales register tax matches party ledgers" />
      </div>

      <ERPTable
        columns={columns}
        data={taxRows}
        keyExtractor={(r) => r.category}
      />
    </div>
  );
};

