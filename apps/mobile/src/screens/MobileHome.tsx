import React, { useState } from 'react';
import { formatInr } from '@udyamos/core';

export interface MobileHomeProps {
  onStartBilling?: () => void;
  onOpenKhata?: () => void;
  onCloseDay?: () => void;
}

export const MobileHome: React.FC<MobileHomeProps> = ({
  onStartBilling,
  onOpenKhata,
  onCloseDay
}) => {
  const [deviceCode] = useState('D01');
  const [isOnline] = useState(true);
  const [offlineQueue] = useState(0);

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
      {/* Mobile App Header */}
      <div
        style={{
          background: '#0F766E',
          color: '#FFFFFF',
          padding: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.9 }}>
            Counter POS Terminal · {deviceCode}
          </div>
          <div style={{ fontSize: '16px', fontWeight: 800 }}>Radhe Radhe Textiles</div>
        </div>

        <div
          style={{
            background: isOnline ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
            border: `1px solid ${isOnline ? '#34D399' : '#F87171'}`,
            padding: '4px 10px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: isOnline ? '#34D399' : '#F87171' }} />
          {isOnline ? 'Online (Synced)' : `Offline (${offlineQueue})`}
        </div>
      </div>

      {/* Today's Sales Card */}
      <div style={{ padding: '16px' }}>
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
            border: '1px solid #E2E8F0',
            marginBottom: '16px'
          }}
        >
          <div style={{ fontSize: '12px', color: '#64748B' }}>Today's Counter Sales (આજનું વેચાણ)</div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#0F766E', marginTop: '4px', fontVariantNumeric: 'tabular-nums' }}>
            {formatInr(48650)}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', borderTop: '1px solid #F1F5F9', paddingTop: '8px', fontSize: '12px' }}>
            <div>Cash: <strong>{formatInr(14200)}</strong></div>
            <div>UPI: <strong>{formatInr(34450)}</strong></div>
            <div>Bills: <strong>23</strong></div>
          </div>
        </div>

        {/* Big Action Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
          <button
            onClick={onStartBilling}
            style={{
              background: '#0F766E',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '10px',
              padding: '18px 12px',
              fontWeight: 800,
              fontSize: '15px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span style={{ fontSize: '24px' }}>⚡</span>
            <span>+ New Bill (બિલ)</span>
          </button>

          <button
            onClick={onOpenKhata}
            style={{
              background: '#FFFFFF',
              color: '#0F766E',
              border: '2px solid #0F766E',
              borderRadius: '10px',
              padding: '18px 12px',
              fontWeight: 800,
              fontSize: '15px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span style={{ fontSize: '24px' }}>📖</span>
            <span>Khata (ખાતાવહી)</span>
          </button>
        </div>

        {/* Secondary Quick Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <button
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              padding: '12px',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '13px',
              color: '#334155',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            📦 Scan Lots & Thaan
          </button>

          <button
            onClick={onCloseDay}
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              padding: '12px',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '13px',
              color: '#334155',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            🔒 Close Register (હિસાબ)
          </button>
        </div>
      </div>
    </div>
  );
};

