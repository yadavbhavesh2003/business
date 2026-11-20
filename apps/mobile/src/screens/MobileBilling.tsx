import React, { useState } from 'react';
import { calculateGstSplit, formatInr, numberToGujaratiWords, generateDeviceBillNumber } from '@udyamos/core';

export interface MobileBillingProps {
  onBack?: () => void;
  onBillSaved?: (billNo: string) => void;
}

export const MobileBilling: React.FC<MobileBillingProps> = ({ onBack, onBillSaved }) => {
  const [deviceSeq] = useState(1881);
  const billNo = generateDeviceBillNumber('D01', deviceSeq);
  const [partyName, setPartyName] = useState('Cash Counter Walk-in');
  const [meters, setMeters] = useState(25);
  const [rate, setRate] = useState(65);
  const [paymentMode, setPaymentMode] = useState<'Cash' | 'UPI'>('Cash');
  const [cashGiven, setCashGiven] = useState(2000);

  const taxable = meters * rate;
  const gst = calculateGstSplit(taxable, 5, '24');
  const total = gst.roundedTotal;
  const change = Math.max(0, cashGiven - total);

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '420px',
        margin: '0 auto',
        minHeight: '100vh',
        background: '#F8FAFC',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'sans-serif'
      }}
    >
      {/* Mobile Top Header */}
      <div
        style={{
          background: '#0F766E',
          color: '#FFFFFF',
          padding: '12px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <button
          onClick={onBack}
          style={{ background: 'none', border: 'none', color: '#FFFFFF', fontSize: '18px', cursor: 'pointer' }}
        >
          ←
        </button>
        <div style={{ fontWeight: 800, fontSize: '15px' }}>Quick Bill: {billNo}</div>
        <div style={{ fontSize: '11px', background: '#0D5F58', padding: '3px 8px', borderRadius: '4px' }}>
          Section 170 GST
        </div>
      </div>

      <div style={{ padding: '16px', flex: 1 }}>
        {/* Item Selector */}
        <div style={{ background: '#FFFFFF', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '12px' }}>
          <div style={{ fontSize: '11px', color: '#64748B' }}>Customer / Party</div>
          <div style={{ fontWeight: 700, fontSize: '14px', marginTop: '2px' }}>{partyName}</div>
        </div>

        {/* Fabric Item & Quick Stepper */}
        <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '12px' }}>
          <div style={{ fontWeight: 700, fontSize: '14px' }}>Pure Cotton 60s Bleached</div>
          <div style={{ fontSize: '11px', color: '#0F766E', fontFamily: 'monospace' }}>LOT-CTN-60S-041 · HSN 5208</div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>Metres (મીટર)</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                <button
                  onClick={() => setMeters(Math.max(1, meters - 5))}
                  style={{ width: '32px', height: '32px', borderRadius: '6px', background: '#F1F5F9', border: 'none', fontWeight: 800, fontSize: '16px' }}
                >
                  -
                </button>
                <span style={{ fontWeight: 800, fontSize: '18px', width: '45px', textAlign: 'center' }}>{meters}m</span>
                <button
                  onClick={() => setMeters(meters + 5)}
                  style={{ width: '32px', height: '32px', borderRadius: '6px', background: '#F1F5F9', border: 'none', fontWeight: 800, fontSize: '16px' }}
                >
                  +
                </button>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '11px', color: '#64748B' }}>Rate / Metre</div>
              <div style={{ fontWeight: 700, fontSize: '16px', marginTop: '4px' }}>{formatInr(rate)}</div>
            </div>
          </div>
        </div>

        {/* GST & Totals Card */}
        <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
            <span>Taxable Amount:</span>
            <span>{formatInr(taxable)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
            <span>CGST + SGST (5% Intra-State):</span>
            <span>{formatInr(gst.cgst + gst.sgst)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 800, color: '#0F766E', borderTop: '1px solid #E2E8F0', paddingTop: '8px', marginTop: '4px' }}>
            <span>Total Payable:</span>
            <span>{formatInr(total)}</span>
          </div>
          <div style={{ fontSize: '11px', color: '#0F766E', marginTop: '4px', lineHeight: '1.5' }}>
            {numberToGujaratiWords(total)}
          </div>
        </div>

        {/* Payment Toggle */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
          <button
            onClick={() => setPaymentMode('Cash')}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              background: paymentMode === 'Cash' ? '#0F766E' : '#FFFFFF',
              color: paymentMode === 'Cash' ? '#FFFFFF' : '#334155',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            💵 Cash (રોકડ)
          </button>
          <button
            onClick={() => setPaymentMode('UPI')}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              background: paymentMode === 'UPI' ? '#0F766E' : '#FFFFFF',
              color: paymentMode === 'UPI' ? '#FFFFFF' : '#334155',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            📱 Dynamic UPI QR
          </button>
        </div>

        {paymentMode === 'Cash' && (
          <div style={{ background: '#FFFFFF', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '16px' }}>
            <div style={{ fontSize: '11px', color: '#64748B' }}>Cash Tendered by Customer</div>
            <input
              type="number"
              value={cashGiven}
              onChange={(e) => setCashGiven(Number(e.target.value))}
              style={{ width: '100%', padding: '8px', fontSize: '18px', fontWeight: 800, border: '1px solid #CBD5E1', borderRadius: '4px', marginTop: '4px', boxSizing: 'border-box' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '13px', fontWeight: 700, color: '#059669' }}>
              <span>Change to Return:</span>
              <span>{formatInr(change)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Save & Thermal Print Button */}
      <div style={{ padding: '16px', background: '#FFFFFF', borderTop: '1px solid #E2E8F0' }}>
        <button
          onClick={() => onBillSaved?.(billNo)}
          style={{
            width: '100%',
            background: '#0F766E',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '10px',
            padding: '16px',
            fontSize: '16px',
            fontWeight: 800,
            cursor: 'pointer'
          }}
        >
          Post & Print 80mm Bill (🖨️)
        </button>
      </div>
    </div>
  );
};

