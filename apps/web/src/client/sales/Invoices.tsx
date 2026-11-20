import React, { useState } from 'react';
import { formatInr, generateInvoiceWhatsAppShare } from '@udyamos/core';
import { Button, ERPTable, StatusBadge, colors, typography } from '@udyamos/ui';

export interface InvoiceRecord {
  id: string;
  billNo: string;
  date: string;
  partyName: string;
  partyMobile: string;
  itemsSummary: string;
  taxableAmount: number;
  taxAmount: number;
  totalAmount: number;
  paymentMode: 'Cash' | 'UPI' | 'Credit' | 'Split';
  syncStatus: 'synced' | 'pending' | 'failed';
}

export interface InvoicesProps {
  onNewInvoice?: () => void;
  onViewInvoice?: (billNo: string) => void;
}

export const Invoices: React.FC<InvoicesProps> = ({ onNewInvoice, onViewInvoice }) => {
  const [filterMode, setFilterMode] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const invoices: InvoiceRecord[] = [
    {
      id: 'inv-1',
      billNo: 'INV-D01-001880',
      date: '2026-11-20 15:42',
      partyName: 'Shreeji Saree Depot',
      partyMobile: '9825012345',
      itemsSummary: 'Cotton 60s (40m) · Lot #L-8842',
      taxableAmount: 2600,
      taxAmount: 130,
      totalAmount: 2730,
      paymentMode: 'UPI',
      syncStatus: 'synced'
    },
    {
      id: 'inv-2',
      billNo: 'INV-D01-001879',
      date: '2026-11-20 14:15',
      partyName: 'Cash Counter Sale',
      partyMobile: '',
      itemsSummary: 'Rayon Print (25m) · Lot #L-8831',
      taxableAmount: 2125,
      taxAmount: 106,
      totalAmount: 2231,
      paymentMode: 'Cash',
      syncStatus: 'synced'
    },
    {
      id: 'inv-3',
      billNo: 'INV-D02-000450',
      date: '2026-11-20 12:30',
      partyName: 'Ambika Fashion',
      partyMobile: '9825123456',
      itemsSummary: 'Chanderi Silk (10m) · Lot #L-8790',
      taxableAmount: 1400,
      taxAmount: 70,
      totalAmount: 1470,
      paymentMode: 'Credit',
      syncStatus: 'pending'
    },
    {
      id: 'inv-4',
      billNo: 'INV-D01-001878',
      date: '2026-11-19 18:20',
      partyName: 'Mahalaxmi Fabrics',
      partyMobile: '9825234567',
      itemsSummary: 'Pure Cambric 50s (50m) · Lot #L-8755',
      taxableAmount: 4000,
      taxAmount: 200,
      totalAmount: 4200,
      paymentMode: 'Credit',
      syncStatus: 'synced'
    }
  ];

  const filtered = invoices.filter((inv) => {
    const matchesFilter = filterMode === 'all' || inv.paymentMode.toLowerCase() === filterMode.toLowerCase();
    const matchesSearch =
      inv.billNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.partyName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const columns = [
    { key: 'billNo', header: 'Bill No' },
    { key: 'date', header: 'Date & Time' },
    { key: 'partyName', header: 'Customer / Party' },
    { key: 'itemsSummary', header: 'Items / Lots' },
    {
      key: 'taxableAmount',
      header: 'Taxable',
      align: 'right' as const,
      render: (r: InvoiceRecord) => (
        <span style={{ fontVariantNumeric: 'tabular-nums' }}>{formatInr(r.taxableAmount)}</span>
      )
    },
    {
      key: 'taxAmount',
      header: 'GST (5%)',
      align: 'right' as const,
      render: (r: InvoiceRecord) => (
        <span style={{ fontVariantNumeric: 'tabular-nums', color: colors.textSecondary }}>
          {formatInr(r.taxAmount)}
        </span>
      )
    },
    {
      key: 'totalAmount',
      header: 'Net Total',
      align: 'right' as const,
      render: (r: InvoiceRecord) => (
        <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: colors.clientPrimary }}>
          {formatInr(r.totalAmount)}
        </span>
      )
    },
    {
      key: 'paymentMode',
      header: 'Payment',
      render: (r: InvoiceRecord) => (
        <StatusBadge
          status={r.paymentMode === 'Credit' ? 'warning' : 'approved'}
          label={r.paymentMode}
        />
      )
    },
    {
      key: 'syncStatus',
      header: 'Cloud Sync',
      render: (r: InvoiceRecord) => (
        <StatusBadge
          status={r.syncStatus === 'synced' ? 'approved' : 'pending'}
          label={r.syncStatus === 'synced' ? 'Synced' : 'Local Only'}
        />
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right' as const,
      render: (r: InvoiceRecord) => {
        const waLink = r.partyMobile
          ? generateInvoiceWhatsAppShare({
              customerMobile: r.partyMobile,
              customerName: r.partyName,
              billNo: r.billNo,
              grandTotal: r.totalAmount,
              businessName: 'Radhe Radhe Textiles',
              invoiceDownloadUrl: `https://udyamos.in/i/${r.billNo}`
            })
          : null;

        return (
          <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onViewInvoice?.(r.billNo)}
            >
              A4 View
            </Button>
            {waLink && (
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: '#25D366',
                  color: '#FFFFFF',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center'
                }}
              >
                WhatsApp
              </a>
            )}
          </div>
        );
      }
    }
  ];

  return (
    <div style={{ padding: '24px', background: colors.clientCanvas, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ ...typography.screenTitle, margin: '0 0 4px 0' }}>Sales Register & Tax Invoices</h1>
          <p style={{ ...typography.subtitle, margin: 0 }}>
            GST compliant tax invoices · Section 170 CGST Act rounded · Immutable counter sequence
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="primary" onClick={onNewInvoice}>
            + Create New Bill (F2)
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          background: '#FFFFFF',
          padding: '12px 16px',
          borderRadius: '8px',
          border: '1px solid #E2E8F0',
          marginBottom: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', gap: '8px' }}>
          {['all', 'cash', 'upi', 'credit'].map((mode) => (
            <button
              key={mode}
              onClick={() => setFilterMode(mode)}
              style={{
                background: filterMode === mode ? colors.clientPrimary : '#F1F5F9',
                color: filterMode === mode ? '#FFFFFF' : colors.textPrimary,
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
        <input
          type="text"
          placeholder="Search by Bill No (e.g. INV-D01) or Party..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '8px 12px',
            fontSize: '12px',
            border: '1px solid #CBD5E1',
            borderRadius: '6px',
            width: '280px',
            outline: 'none'
          }}
        />
      </div>

      {/* Invoice Table */}
      <ERPTable columns={columns} data={filtered} />
    </div>
  );
};

