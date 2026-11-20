import React, { useState } from 'react';
import { calculateGstSplit, formatInr, numberToGujaratiWords, generateDeviceBillNumber } from '@udyamos/core';

export const MobileBillingGu: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  const [meters, setMeters] = useState(40);
  const [rate] = useState(65);
  const billNo = generateDeviceBillNumber('D01', 1882);

  const taxable = meters * rate;
  const gst = calculateGstSplit(taxable, 5, '24');
  const total = gst.roundedTotal;

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
        fontFamily: "'Noto Sans Gujarati', sans-serif"
      }}
    >
      <div style={{ background: '#0F766E', color: '#FFFFFF', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#FFFFFF', fontSize: '18px', cursor: 'pointer' }}>
          ←
        </button>
        <div style={{ fontWeight: 800, fontSize: '16px' }}>કાપડ વેચાણ બિલ · {billNo}</div>
        <div style={{ fontSize: '11px', background: '#0D5F58', padding: '3px 8px', borderRadius: '4px' }}>ગુજરાતી</div>
      </div>

      <div style={{ padding: '16px', flex: 1 }}>
        <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '12px' }}>
          <div style={{ fontSize: '14px', fontWeight: 700 }}>પ્યોર કોટન 60s સુપર વ્હાઇટ</div>
          <div style={{ fontSize: '11px', color: '#0F766E', fontFamily: 'monospace' }}>લોટ: LOT-CTN-60S-041 · HSN 5208</div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>કાપડ લંબાઈ (મીટર):</div>
              <div style={{ fontSize: '18px', fontWeight: 800, marginTop: '2px' }}>{meters} મીટર</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '12px', color: '#64748B' }}>ભાવ / મીટર:</div>
              <div style={{ fontSize: '18px', fontWeight: 800, marginTop: '2px' }}>{formatInr(rate)}</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
            <span>કરપાત્ર રકમ:</span>
            <span>{formatInr(taxable)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
            <span>જીએસટી (CGST 2.5% + SGST 2.5%):</span>
            <span>{formatInr(gst.cgst + gst.sgst)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: 800, color: '#0F766E', borderTop: '1px solid #E2E8F0', paddingTop: '8px', marginTop: '4px' }}>
            <span>કુલ ચૂકવવાપાત્ર રકમ:</span>
            <span>{formatInr(total)}</span>
          </div>
          <div style={{ fontSize: '12px', color: '#0F766E', marginTop: '6px', lineHeight: '1.6', fontWeight: 600 }}>
            {numberToGujaratiWords(total)}
          </div>
        </div>
      </div>

      <div style={{ padding: '16px', background: '#FFFFFF', borderTop: '1px solid #E2E8F0' }}>
        <button
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
          બિલ પૂરું કરો અને પ્રિન્ટ કરો (🖨️)
        </button>
      </div>
    </div>
  );
};

