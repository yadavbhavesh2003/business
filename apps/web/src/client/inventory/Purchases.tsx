import React, { useState } from 'react';
import { formatInr } from '@udyamos/core';
import { Button, ERPTable, StatusBadge, colors, typography } from '@udyamos/ui';

export interface PurchaseRecord {
  id: string;
  inwardNo: string;
  millInvoiceNo: string;
  date: string;
  supplierName: string;
  lotsGenerated: string;
  totalMeters: number;
  taxableAmount: number;
  gstAmount: number;
  netPayable: number;
  paymentStatus: 'paid' | 'pending';
}

export interface PurchasesProps {
  onNewPurchase?: () => void;
}

export const Purchases: React.FC<PurchasesProps> = ({ onNewPurchase }) => {
  const [purchases] = useState<PurchaseRecord[]>([
    {
      id: 'pur-1',
      inwardNo: 'INW-2026-0034',
      millInvoiceNo: 'TEX/9941',
      date: '2026-11-19',
      supplierName: 'Vardhman Polytex Mills',
      lotsGenerated: 'LOT-CTN-60S-041 (1,200m / 30 rolls)',
      totalMeters: 1200,
      taxableAmount: 66000,
      gstAmount: 3300,
      netPayable: 69300,
      paymentStatus: 'pending'
    },
    {
      id: 'pur-2',
      inwardNo: 'INW-2026-0033',
      millInvoiceNo: 'SRM/1102',
      date: '2026-11-15',
      supplierName: 'Shree Ram Silk Mills',
      lotsGenerated: 'LOT-CHN-SLK-008 (500m / 10 rolls)',
      totalMeters: 500,
      taxableAmount: 55000,
      gstAmount: 2750,
      netPayable: 57750,
      paymentStatus: 'paid'
    }
  ]);

  const columns = [
    { key: 'inwardNo', header: 'Inward #' },
    { key: 'millInvoiceNo', header: 'Mill Bill No' },
    { key: 'date', header: 'Date' },
    { key: 'supplierName', header: 'Mill / Supplier (વેપારી)' },
    { key: 'lotsGenerated', header: 'Lot Batch Created' },
    {
      key: 'totalMeters',
      header: 'Total Metres',
      align: 'right' as const,
      render: (r: PurchaseRecord) => (
        <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{r.totalMeters} m</span>
      )
    },
    {
      key: 'netPayable',
      header: 'Net Inward Cost',
      align: 'right' as const,
      render: (r: PurchaseRecord) => (
        <span style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: colors.clientPrimary }}>
          {formatInr(r.netPayable)}
        </span>
      )
    },
    {
      key: 'paymentStatus',
      header: 'Payment',
      render: (r: PurchaseRecord) => (
        <StatusBadge
          status={r.paymentStatus === 'paid' ? 'approved' : 'warning'}
          label={r.paymentStatus === 'paid' ? 'Paid' : 'Due'}
        />
      )
    }
  ];

  return (
    <div style={{ padding: '24px', background: colors.clientCanvas, minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ ...typography.screenTitle, margin: '0 0 4px 0' }}>Wholesale Purchases & Mill Inwards (આવક બિલ)</h1>
          <p style={{ ...typography.subtitle, margin: 0 }}>
            Fabric inward register, mill challans, lot provisioning & input tax credit (ITC)
          </p>
        </div>
        <Button variant="primary" onClick={onNewPurchase}>
          + Inward New Fabric Purchase
        </Button>
      </div>

      <ERPTable columns={columns} data={purchases} />
    </div>
  );
};

