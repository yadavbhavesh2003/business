import React, { useState, useEffect } from 'react';
import { formatInr, generateInvoiceWhatsAppShare } from '@udyamos/core';
import { Button, ERPTable, StatusBadge, colors, typography } from '@udyamos/ui';
import { apiClient, type InvoiceRecord as ApiInvoiceRecord } from '../../api/client.ts';

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
  const [invoices, setInvoices] = useState<InvoiceRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const data: ApiInvoiceRecord[] = await apiClient.getInvoices({
        search: searchQuery,
        paymentMode: filterMode
      });

      const mapped: InvoiceRecord[] = data.map((inv) => ({
        id: inv.id,
        billNo: inv.billNo,
        date: inv.date,
        partyName: inv.partyName,
        partyMobile: inv.partyMobile || '',
        itemsSummary: inv.itemsSummary,
        taxableAmount: inv.taxableTotal,
        taxAmount: (inv.cgstTotal || 0) + (inv.sgstTotal || 0) + (inv.igstTotal || 0),
        totalAmount: inv.netPayable,
        paymentMode: inv.paymentMode,
        syncStatus: inv.syncStatus
      }));

      setInvoices(mapped);
    } catch (err) {
      console.error('Failed to fetch invoices:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, [filterMode, searchQuery]);

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
      align: 'center' as const,
      render: (r: InvoiceRecord) => {
        const shareUrl = generateInvoiceWhatsAppShare({
          customerPhone: r.partyMobile,
          customerName: r.partyName,
          billNo: r.billNo,
          netPayable: r.totalAmount,
          invoiceUrl: `https://biz.udyamos.in/b/${r.billNo}`,
          isGujarati: true
        });

        return (
          <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onViewInvoice?.(r.billNo)}
            >
              View
            </Button>
            {r.partyMobile ? (
              <a
                href={shareUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: '#25D366',
                  color: '#FFFFFF',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
                title="Share invoice on WhatsApp in Gujarati"
              >
                WA
              </a>
            ) : null}
          </div>
        );
      }
    }
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '24px 32px',
        background: '#F6F7F5',
        minHeight: '100%',
        boxSizing: 'border-box'
      }}
    >
      {/* Top action bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ ...typography.headingLarge, margin: 0 }}>Sales Invoices (વેચાણ બિલ)</h2>
          <p style={{ ...typography.caption, color: colors.textSecondary, margin: '4px 0 0' }}>
            Device-prefixed bills with Section 170 CGST+SGST rounding & WhatsApp sharing
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Button variant="secondary" onClick={fetchInvoices}>
            🔄 Refresh
          </Button>
          <Button variant="primary" onClick={onNewInvoice}>
            + Create New Bill (F2)
          </Button>
        </div>
      </div>

      {/* Filter and Search */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          background: '#FFFFFF',
          padding: '12px 16px',
          borderRadius: '8px',
          border: '1px solid #E3E5E1'
        }}
      >
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: colors.textSecondary }}>Filter:</span>
          {['all', 'cash', 'upi', 'credit'].map((mode) => (
            <button
              key={mode}
              onClick={() => setFilterMode(mode)}
              style={{
                background: filterMode === mode ? colors.clientPrimary : '#F1F3F0',
                color: filterMode === mode ? '#FFFFFF' : '#15181C',
                border: 'none',
                borderRadius: '4px',
                padding: '4px 12px',
                fontSize: '12px',
                fontWeight: 600,
                textTransform: 'uppercase',
                cursor: 'pointer'
              }}
            >
              {mode}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '280px' }}>
          <input
            type="text"
            placeholder="Search bill no or party name…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              fontSize: '13px',
              border: '1px solid #DADDD8',
              borderRadius: '6px',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* Table */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '8px',
          border: '1px solid #E3E5E1',
          overflow: 'hidden'
        }}
      >
        <ERPTable
          columns={columns}
          data={invoices}
          keyField="billNo"
          emptyMessage={loading ? 'Loading sales invoices from backend…' : 'No invoices found matching criteria'}
        />
      </div>
    </div>
  );
};
