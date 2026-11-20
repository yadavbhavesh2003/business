import React, { useState } from 'react';
import { generateTallySalesVoucherXml, formatInr } from '@udyamos/core';
import { Button, colors, typography } from '@udyamos/ui';

export const CaPortal: React.FC = () => {
  const [fyPeriod] = useState('FY 2026-27 (01-Apr-2026 to 31-Mar-2027)');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadTallyXml = () => {
    // Uses core generateTallySalesVoucherXml
    const sampleVouchers = [
      {
        voucherNumber: 'INV-D01-001880',
        date: '20261120',
        partyName: 'Shreeji Saree Depot',
        taxableAmount: 2600,
        cgstAmount: 65,
        sgstAmount: 65,
        totalAmount: 2730
      }
    ];

    const xml = generateTallySalesVoucherXml(sampleVouchers);
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'UdyamOS_Tally_Sales_Vouchers.xml';
    a.click();
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <div style={{ padding: '24px', background: colors.clientCanvas, minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ ...typography.screenTitle, margin: '0 0 4px 0' }}>CA & Tax Auditor Portal (ચાર્ટર્ડ એકાઉન્ટન્ટ)</h1>
          <p style={{ ...typography.subtitle, margin: 0 }}>
            Read-only financial audit, Trial Balance, Tally Prime XML export & Section 36 statutory verification
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="primary" onClick={handleDownloadTallyXml}>
            📥 Export Tally Prime XML
          </Button>
        </div>
      </div>

      {downloadSuccess && (
        <div
          style={{
            background: '#ECFDF5',
            border: '1px solid #A7F3D0',
            color: '#065F46',
            padding: '12px 16px',
            borderRadius: '6px',
            marginBottom: '16px',
            fontSize: '13px',
            fontWeight: 600
          }}
        >
          ✓ Tally Prime XML exported successfully! You can import this directly into Tally via 'Import Data {'>'} Vouchers'.
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
        <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '11px', color: '#64748B' }}>Audit Period</div>
          <div style={{ fontSize: '14px', fontWeight: 700, marginTop: '4px' }}>{fyPeriod}</div>
          <div style={{ fontSize: '11px', color: '#0F766E', marginTop: '2px' }}>Books open · 72 months retention</div>
        </div>
        <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '11px', color: '#64748B' }}>Section 170 Rounding Integrity</div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#059669', marginTop: '4px' }}>100% Compliant</div>
          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>Zero round-off variance</div>
        </div>
        <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '11px', color: '#64748B' }}>ITC Reconciliation</div>
          <div style={{ fontSize: '14px', fontWeight: 700, marginTop: '4px' }}>{formatInr(6050)}</div>
          <div style={{ fontSize: '11px', color: '#0F766E', marginTop: '2px' }}>Matched with GSTR-2B</div>
        </div>
      </div>

      {/* Trial Balance Overview */}
      <div style={{ background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', padding: '16px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 12px 0' }}>Trial Balance Summary (કાચું સરવૈયું)</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', textAlign: 'left' }}>
              <th style={{ padding: '8px 12px' }}>Ledger Account Head</th>
              <th style={{ padding: '8px 12px' }}>Group Classification</th>
              <th style={{ padding: '8px 12px', textAlign: 'right' }}>Debit (₹)</th>
              <th style={{ padding: '8px 12px', textAlign: 'right' }}>Credit (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
              <td style={{ padding: '8px 12px', fontWeight: 600 }}>Sales Account (કાપડ વેચાણ)</td>
              <td style={{ padding: '8px 12px', color: '#64748B' }}>Direct Income</td>
              <td style={{ padding: '8px 12px', textAlign: 'right' }}>-</td>
              <td style={{ padding: '8px 12px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{formatInr(286450)}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
              <td style={{ padding: '8px 12px', fontWeight: 600 }}>Sundry Debtors (ગ્રાહકો - બાકી લેણું)</td>
              <td style={{ padding: '8px 12px', color: '#64748B' }}>Current Assets</td>
              <td style={{ padding: '8px 12px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{formatInr(1842300)}</td>
              <td style={{ padding: '8px 12px', textAlign: 'right' }}>-</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
              <td style={{ padding: '8px 12px', fontWeight: 600 }}>Input Tax Credit (ITC - CGST+SGST)</td>
              <td style={{ padding: '8px 12px', color: '#64748B' }}>Current Assets</td>
              <td style={{ padding: '8px 12px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{formatInr(6050)}</td>
              <td style={{ padding: '8px 12px', textAlign: 'right' }}>-</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
              <td style={{ padding: '8px 12px', fontWeight: 600 }}>Cash & Bank Balances</td>
              <td style={{ padding: '8px 12px', color: '#64748B' }}>Bank Accounts</td>
              <td style={{ padding: '8px 12px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{formatInr(194000)}</td>
              <td style={{ padding: '8px 12px', textAlign: 'right' }}>-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

