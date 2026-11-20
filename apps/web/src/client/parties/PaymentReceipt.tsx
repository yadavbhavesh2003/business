import React, { useState } from 'react';
import { allocatePaymentFifo, formatInr } from '@udyamos/core';
import { Button, colors } from '@udyamos/ui';

export interface PaymentReceiptProps {
  partyName?: string;
  isOpen: boolean;
  onClose: () => void;
  onPaymentSaved: (receiptNo: string) => void;
}

export const PaymentReceipt: React.FC<PaymentReceiptProps> = ({
  partyName = 'Ambika Fashion',
  isOpen,
  onClose,
  onPaymentSaved
}) => {
  const [amount, setAmount] = useState<number>(10000);
  const [paymentMode, setPaymentMode] = useState<'Bank NEFT' | 'UPI' | 'Cash' | 'Cheque'>('UPI');
  const [referenceNo, setReferenceNo] = useState<string>('UTR-9912048');

  if (!isOpen) return null;

  // Unpaid invoices for FIFO allocation
  const unpaidInvoices = [
    { invoiceNo: 'INV-D01-001790', invoiceDate: '2026-11-02', grandTotal: 12750, pendingBalance: 12750 },
    { invoiceNo: 'INV-D02-000450', invoiceDate: '2026-11-20', grandTotal: 1470, pendingBalance: 1470 }
  ];

  const allocation = allocatePaymentFifo(unpaidInvoices, amount);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
    >
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '10px',
          width: '480px',
          padding: '24px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>Receive Payment / જમા પોંચ</h2>
            <div style={{ fontSize: '12px', color: '#64748B' }}>Party: {partyName}</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}>
            ✕
          </button>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
            Amount Received (₹)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '18px',
              fontWeight: 700,
              border: '2px solid #0F766E',
              borderRadius: '6px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
              Mode
            </label>
            <select
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value as any)}
              style={{ width: '100%', padding: '8px', border: '1px solid #CBD5E1', borderRadius: '4px' }}
            >
              <option value="UPI">UPI / QR Code</option>
              <option value="Bank NEFT">Bank NEFT / RTGS</option>
              <option value="Cash">Cash (રોકડ)</option>
              <option value="Cheque">Bank Cheque</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
              UTR / Cheque Ref #
            </label>
            <input
              type="text"
              value={referenceNo}
              onChange={(e) => setReferenceNo(e.target.value)}
              style={{ width: '100%', padding: '8px', border: '1px solid #CBD5E1', borderRadius: '4px', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        {/* FIFO Allocation Preview */}
        <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '6px', marginBottom: '20px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#0F766E', textTransform: 'uppercase', marginBottom: '6px' }}>
            Automated FIFO Allocation Against Oldest Bills
          </div>
          {allocation.allocations.map((a, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
              <span>{a.invoiceNo}:</span>
              <span style={{ fontWeight: 600 }}>Allocated: {formatInr(a.allocatedAmount)} (Rem: {formatInr(a.remainingBillBalance)})</span>
            </div>
          ))}
          <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '6px', marginTop: '6px', display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700 }}>
            <span>Unallocated Advance Balance:</span>
            <span>{formatInr(allocation.unallocatedAmount)}</span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => onPaymentSaved('REC-2026-0046')}>
            Post Receipt & Print Slip
          </Button>
        </div>
      </div>
    </div>
  );
};

