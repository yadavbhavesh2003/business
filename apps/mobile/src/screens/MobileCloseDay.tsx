import React, { useState } from 'react';
import { formatInr } from '@udyamos/core';

export const MobileCloseDay: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  const [actualCashInDrawer, setActualCashInDrawer] = useState(14200);
  const expectedCash = 14200;
  const variance = actualCashInDrawer - expectedCash;

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
      <div style={{ background: '#0F766E', color: '#FFFFFF', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#FFFFFF', fontSize: '18px', cursor: 'pointer' }}>
          ←
        </button>
        <div style={{ fontWeight: 800, fontSize: '16px' }}>End of Day Register Closure (હિસાબ)</div>
      </div>

      <div style={{ padding: '16px', flex: 1 }}>
        <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '16px' }}>
          <div style={{ fontSize: '12px', color: '#64748B' }}>System Expected Cash:</div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#0F766E', marginTop: '2px' }}>
            {formatInr(expectedCash)}
          </div>
          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>From 14 Cash Counter Bills today</div>
        </div>

        <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '16px' }}>
          <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
            Actual Cash Count in Drawer (રોકડ ગણતરી)
          </label>
          <input
            type="number"
            value={actualCashInDrawer}
            onChange={(e) => setActualCashInDrawer(Number(e.target.value))}
            style={{ width: '100%', padding: '10px', fontSize: '18px', fontWeight: 800, border: '1px solid #CBD5E1', borderRadius: '6px', boxSizing: 'border-box' }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '13px', fontWeight: 700 }}>
            <span>Cash Drawer Variance:</span>
            <span style={{ color: variance === 0 ? '#059669' : '#DC2626' }}>
              {variance === 0 ? '✓ Exact Match' : formatInr(variance)}
            </span>
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
          Print Z-Report & Lock Register
        </button>
      </div>
    </div>
  );
};

