import React, { useState } from 'react';
import {
  calculateGstSplit,
  formatInr,
  numberToGujaratiWords,
  numberToEnglishWords,
  generateDeviceBillNumber
} from '@udyamos/core';
import { Button, StatusBadge, colors, typography } from '@udyamos/ui';

export interface BillItem {
  id: string;
  lotCode: string;
  name: string;
  hsn: string;
  quantityMeters: number;
  ratePerMeter: number;
  discountPct: number;
  gstRate: number;
}

export interface InvoiceNewProps {
  onBack?: () => void;
  onSave?: (billData: any) => void;
}

export const InvoiceNew: React.FC<InvoiceNewProps> = ({ onBack, onSave }) => {
  const [deviceSeq] = useState<number>(1881);
  const billNo = generateDeviceBillNumber('D01', deviceSeq);
  const [partyType, setPartyType] = useState<'regular' | 'cash'>('regular');
  const [selectedParty, setSelectedParty] = useState({
    name: 'Ambika Fashion',
    gstin: '24ABCDE1234F1Z5',
    city: 'Surat',
    stateCode: '24', // Gujarat
    currentDues: 145000,
    creditLimit: 200000
  });

  const [items, setItems] = useState<BillItem[]>([
    {
      id: 'item-1',
      lotCode: 'LOT-CTN-60S-041',
      name: 'Pure Cotton 60s Super Bleached',
      hsn: '5208',
      quantityMeters: 40,
      ratePerMeter: 65,
      discountPct: 0,
      gstRate: 5
    },
    {
      id: 'item-2',
      lotCode: 'LOT-RYN-PRN-019',
      name: 'Rayon 14kg Discharge Print',
      hsn: '5407',
      quantityMeters: 25,
      ratePerMeter: 85,
      discountPct: 0,
      gstRate: 5
    }
  ]);

  const [paymentMode, setPaymentMode] = useState<'Cash' | 'UPI' | 'Credit'>('UPI');
  const [cashTendered, setCashTendered] = useState<number>(5000);

  // Calculations
  const taxableSum = items.reduce((acc, it) => {
    const raw = it.quantityMeters * it.ratePerMeter;
    const disc = (raw * it.discountPct) / 100;
    return acc + (raw - disc);
  }, 0);

  const gstBreakdown = calculateGstSplit(taxableSum, 5, selectedParty.stateCode);
  const legalTotal = gstBreakdown.roundedTotal;
  const changeDue = Math.max(0, cashTendered - legalTotal);

  const handleAddItem = () => {
    const newItem: BillItem = {
      id: `item-${Date.now()}`,
      lotCode: 'LOT-CHN-SLK-008',
      name: 'Chanderi Silk Brocade Border',
      hsn: '5007',
      quantityMeters: 10,
      ratePerMeter: 140,
      discountPct: 0,
      gstRate: 5
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((it) => it.id !== id));
  };

  return (
    <div style={{ padding: '24px', background: colors.clientCanvas, minHeight: '100vh' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Button size="sm" variant="outline" onClick={onBack}>
              ← Back to Invoices
            </Button>
            <h1 style={{ ...typography.screenTitle, margin: 0 }}>Fast Counter POS Billing</h1>
            <span
              style={{
                background: '#FEF3C7',
                color: '#92400E',
                padding: '3px 8px',
                borderRadius: '4px',
                fontWeight: 700,
                fontSize: '11px'
              }}
            >
              BILL: {billNo}
            </span>
          </div>
          <p style={{ ...typography.subtitle, margin: '4px 0 0 0' }}>
            Counter POS · Section 170 CGST Act nearest rupee rounding · Immutable audit entry
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="outline" onClick={onBack}>
            Cancel (Esc)
          </Button>
          <Button
            variant="primary"
            onClick={() => onSave?.({ billNo, party: selectedParty, items, legalTotal, paymentMode })}
          >
            Post & Print Bill (F10)
          </Button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '16px' }}>
        {/* Left Side: Party & Item Entry */}
        <div>
          {/* Party Selector Card */}
          <div
            style={{
              background: '#FFFFFF',
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              marginBottom: '16px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: 700, fontSize: '13px', color: colors.textPrimary }}>
                Customer Details / ગ્રાહક વિગત
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <label style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <input
                    type="radio"
                    name="partyType"
                    checked={partyType === 'regular'}
                    onChange={() => setPartyType('regular')}
                  />
                  Registered Party
                </label>
                <label style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <input
                    type="radio"
                    name="partyType"
                    checked={partyType === 'cash'}
                    onChange={() => setPartyType('cash')}
                  />
                  Cash Counter Walk-in
                </label>
              </div>
            </div>

            {partyType === 'regular' ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '11px', color: colors.textSecondary, marginBottom: '2px' }}>Party Name</div>
                  <div style={{ fontWeight: 600, fontSize: '13px' }}>{selectedParty.name}</div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>GSTIN: {selectedParty.gstin}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: colors.textSecondary, marginBottom: '2px' }}>Place of Supply</div>
                  <div style={{ fontSize: '12px', fontWeight: 600 }}>
                    Gujarat (24) — Intra-State CGST+SGST
                  </div>
                </div>
                <div style={{ background: '#FFFBEB', padding: '8px', borderRadius: '6px', border: '1px solid #FDE68A' }}>
                  <div style={{ fontSize: '11px', color: '#92400E', fontWeight: 600 }}>Credit Limit Status</div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#B45309' }}>
                    Dues: {formatInr(selectedParty.currentDues)} / Limit {formatInr(selectedParty.creditLimit)}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ fontSize: '12px', color: colors.textSecondary, padding: '4px 0' }}>
                Walk-in counter sale. B2C Intra-state GST will apply.
              </div>
            )}
          </div>

          {/* Line Items Table Card */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              overflow: 'hidden',
              marginBottom: '16px'
            }}
          >
            <div
              style={{
                padding: '12px 16px',
                borderBottom: '1px solid #E2E8F0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span style={{ fontWeight: 700, fontSize: '13px' }}>Line Items / કાપડ થાણ વિગત</span>
              <Button size="sm" variant="outline" onClick={handleAddItem}>
                + Add Item / Scan Barcode (F3)
              </Button>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569', textAlign: 'left' }}>
                  <th style={{ padding: '8px 12px' }}>#</th>
                  <th style={{ padding: '8px 12px' }}>Lot & Fabric Item</th>
                  <th style={{ padding: '8px 12px' }}>HSN</th>
                  <th style={{ padding: '8px 12px', textAlign: 'right' }}>Metres (મીટર)</th>
                  <th style={{ padding: '8px 12px', textAlign: 'right' }}>Rate / m</th>
                  <th style={{ padding: '8px 12px', textAlign: 'right' }}>Taxable</th>
                  <th style={{ padding: '8px 12px', textAlign: 'right' }}>GST%</th>
                  <th style={{ padding: '8px 12px', textAlign: 'right' }}>Line Total</th>
                  <th style={{ padding: '8px 12px', textAlign: 'center' }}>Remove</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it, idx) => {
                  const lineTotal = it.quantityMeters * it.ratePerMeter * (1 + it.gstRate / 100);
                  return (
                    <tr key={it.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '10px 12px', color: '#94A3B8' }}>{idx + 1}</td>
                      <td style={{ padding: '10px 12px' }}>
                        <div style={{ fontWeight: 600 }}>{it.name}</div>
                        <div style={{ fontSize: '11px', color: colors.clientPrimary, fontFamily: 'monospace' }}>
                          {it.lotCode}
                        </div>
                      </td>
                      <td style={{ padding: '10px 12px', fontFamily: 'monospace' }}>{it.hsn}</td>
                      <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
                        {it.quantityMeters} m
                      </td>
                      <td style={{ padding: '10px 12px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                        {formatInr(it.ratePerMeter)}
                      </td>
                      <td style={{ padding: '10px 12px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                        {formatInr(it.quantityMeters * it.ratePerMeter)}
                      </td>
                      <td style={{ padding: '10px 12px', textAlign: 'right' }}>{it.gstRate}%</td>
                      <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                        {formatInr(lineTotal)}
                      </td>
                      <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                        <button
                          onClick={() => handleRemoveItem(it.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#DC2626',
                            cursor: 'pointer',
                            fontSize: '14px'
                          }}
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Amount in Words Card (Gujarati & English) */}
          <div
            style={{
              background: '#F0FDFA',
              border: '1px solid #CCFBF1',
              padding: '12px 16px',
              borderRadius: '8px'
            }}
          >
            <div style={{ fontSize: '11px', color: '#0F766E', fontWeight: 700, textTransform: 'uppercase' }}>
              Legal Amount in Words (Section 170 CGST Act Compliant)
            </div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#134E4A', marginTop: '2px', lineHeight: '1.6' }}>
              {numberToGujaratiWords(legalTotal)}
            </div>
            <div style={{ fontSize: '11px', color: '#0F766E', marginTop: '2px' }}>
              {numberToEnglishWords(legalTotal)}
            </div>
          </div>
        </div>

        {/* Right Side: Totals & Payment Tender */}
        <div>
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              padding: '16px',
              position: 'sticky',
              top: '16px'
            }}
          >
            <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 700 }}>Tax Summary & Settlement</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: colors.textSecondary }}>Taxable Amount:</span>
                <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{formatInr(taxableSum)}</span>
              </div>

              {gstBreakdown.isInterState ? (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: colors.textSecondary }}>IGST (5%):</span>
                  <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{formatInr(gstBreakdown.igst)}</span>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: colors.textSecondary }}>CGST (2.5%):</span>
                    <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{formatInr(gstBreakdown.cgst)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: colors.textSecondary }}>SGST (2.5%):</span>
                    <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{formatInr(gstBreakdown.sgst)}</span>
                  </div>
                </>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', fontSize: '11px' }}>
                <span>Sec 170 Rounding:</span>
                <span>{gstBreakdown.roundingAdjustment >= 0 ? `+ ₹ ${gstBreakdown.roundingAdjustment.toFixed(2)}` : `- ₹ ${Math.abs(gstBreakdown.roundingAdjustment).toFixed(2)}`}</span>
              </div>

              <div
                style={{
                  borderTop: '2px dashed #E2E8F0',
                  paddingTop: '8px',
                  marginTop: '4px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline'
                }}
              >
                <span style={{ fontSize: '14px', fontWeight: 700 }}>Net Payable:</span>
                <span style={{ fontSize: '18px', fontWeight: 800, color: colors.clientPrimary, fontVariantNumeric: 'tabular-nums' }}>
                  {formatInr(legalTotal)}
                </span>
              </div>
            </div>

            {/* Payment Mode Selection */}
            <div style={{ marginTop: '16px', borderTop: '1px solid #E2E8F0', paddingTop: '12px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px' }}>Payment Method</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
                {(['UPI', 'Cash', 'Credit'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setPaymentMode(m)}
                    style={{
                      background: paymentMode === m ? colors.clientPrimary : '#F1F5F9',
                      color: paymentMode === m ? '#FFFFFF' : colors.textPrimary,
                      border: 'none',
                      padding: '8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {m}
                  </button>
                ))}
              </div>

              {paymentMode === 'Cash' && (
                <div style={{ marginTop: '12px', background: '#F8FAFC', padding: '10px', borderRadius: '6px' }}>
                  <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '4px' }}>Cash Tendered / જમા રોકડ</div>
                  <input
                    type="number"
                    value={cashTendered}
                    onChange={(e) => setCashTendered(Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '6px 8px',
                      fontSize: '14px',
                      fontWeight: 700,
                      border: '1px solid #CBD5E1',
                      borderRadius: '4px',
                      boxSizing: 'border-box'
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '12px' }}>
                    <span style={{ color: '#059669', fontWeight: 600 }}>Change to Return:</span>
                    <span style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{formatInr(changeDue)}</span>
                  </div>
                </div>
              )}

              {paymentMode === 'UPI' && (
                <div
                  style={{
                    marginTop: '12px',
                    background: '#F0FDFA',
                    padding: '12px',
                    borderRadius: '6px',
                    textAlign: 'center',
                    border: '1px solid #CCFBF1'
                  }}
                >
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#0F766E' }}>
                    Dynamic UPI QR Generated
                  </div>
                  <div style={{ margin: '8px auto', width: '100px', height: '100px', background: '#FFFFFF', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '10px', color: '#64748B' }}>[ UPI QR CODE ]</span>
                  </div>
                  <div style={{ fontSize: '10px', color: '#0F766E' }}>
                    upi://pay?pa=radhe@okaxis&am={legalTotal}
                  </div>
                </div>
              )}

              {paymentMode === 'Credit' && (
                <div
                  style={{
                    marginTop: '12px',
                    background: '#FFFBEB',
                    padding: '10px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    color: '#92400E',
                    border: '1px solid #FDE68A'
                  }}
                >
                  Bill will be posted to {selectedParty.name}'s Khata ledger. New balance will be{' '}
                  <strong>{formatInr(selectedParty.currentDues + legalTotal)}</strong>.
                </div>
              )}
            </div>

            <div style={{ marginTop: '16px' }}>
              <Button
                variant="primary"
                style={{ width: '100%', padding: '12px', fontSize: '14px' }}
                onClick={() => onSave?.({ billNo, party: selectedParty, items, legalTotal, paymentMode })}
              >
                Post & Print Bill (F10)
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

