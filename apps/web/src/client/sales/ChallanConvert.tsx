import React, { useState } from 'react';
import { formatInr } from '@udyamos/core';
import { Button, StatusBadge, colors, typography } from '@udyamos/ui';

export interface ChallanConvertProps {
  challanNo?: string;
  onBack?: () => void;
  onConverted?: (invoiceNo: string) => void;
}

export const ChallanConvert: React.FC<ChallanConvertProps> = ({
  challanNo = 'DC-2026-0041',
  onBack,
  onConverted
}) => {
  const [party] = useState({
    name: 'Ambika Fashion',
    gstin: '24ABCDE1234F1Z5',
    creditLimit: 200000,
    currentDues: 145000
  });

  const [items] = useState([
    { name: 'Chanderi Silk Brocade', lotCode: 'LOT-CHN-SLK-008', quantity: 75, rate: 140, total: 10500 }
  ]);

  const subtotal = 10500;
  const gst = 525; // 5%
  const total = subtotal + gst;

  return (
    <div style={{ padding: '24px', background: colors.clientCanvas, minHeight: '100vh' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <Button size="sm" variant="outline" onClick={onBack}>
          ← Back to Challans
        </Button>
        <h1 style={{ ...typography.screenTitle, margin: 0 }}>Convert Challan to Formal Tax Invoice</h1>
      </div>

      <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '8px', border: '1px solid #E2E8F0', maxWidth: '800px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '12px', marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '11px', color: '#64748B' }}>Source Delivery Challan</div>
            <div style={{ fontWeight: 700, fontSize: '16px', color: colors.clientPrimary }}>{challanNo}</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748B' }}>Customer / Party</div>
            <div style={{ fontWeight: 700, fontSize: '14px' }}>{party.name}</div>
            <div style={{ fontSize: '11px', color: '#64748B' }}>GSTIN: {party.gstin}</div>
          </div>
          <div style={{ background: '#FEF3C7', padding: '6px 12px', borderRadius: '6px' }}>
            <div style={{ fontSize: '11px', color: '#92400E', fontWeight: 600 }}>Credit Status</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#B45309' }}>
              Dues {formatInr(party.currentDues)} / {formatInr(party.creditLimit)}
            </div>
          </div>
        </div>

        <h3 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>Challan Goods to Invoice</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', marginBottom: '16px' }}>
          <thead>
            <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', textAlign: 'left' }}>
              <th style={{ padding: '8px' }}>Item</th>
              <th style={{ padding: '8px' }}>Lot</th>
              <th style={{ padding: '8px', textAlign: 'right' }}>Metres</th>
              <th style={{ padding: '8px', textAlign: 'right' }}>Rate</th>
              <th style={{ padding: '8px', textAlign: 'right' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '8px', fontWeight: 600 }}>{it.name}</td>
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>{it.lotCode}</td>
                <td style={{ padding: '8px', textAlign: 'right', fontWeight: 600 }}>{it.quantity} m</td>
                <td style={{ padding: '8px', textAlign: 'right' }}>{formatInr(it.rate)}</td>
                <td style={{ padding: '8px', textAlign: 'right', fontWeight: 700 }}>{formatInr(it.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '6px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
            <span>Subtotal:</span>
            <span style={{ fontWeight: 600 }}>{formatInr(subtotal)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
            <span>GST (5% Intra-State CGST+SGST):</span>
            <span style={{ fontWeight: 600 }}>{formatInr(gst)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 700, borderTop: '1px solid #CBD5E1', paddingTop: '6px' }}>
            <span>Final Invoice Value:</span>
            <span style={{ color: colors.clientPrimary }}>{formatInr(total)}</span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <Button variant="outline" onClick={onBack}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => onConverted?.('INV-D01-001882')}>
            Generate Tax Invoice & Post to Ledger (F10)
          </Button>
        </div>
      </div>
    </div>
  );
};

