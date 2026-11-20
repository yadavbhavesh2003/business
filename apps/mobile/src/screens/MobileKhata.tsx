import React, { useState } from 'react';
import { formatInr } from '@udyamos/core';

export const MobileKhata: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  const [parties] = useState([
    { name: 'Shreeji Saree Depot', city: 'Surat', dues: 2730, overdueDays: 0 },
    { name: 'Ambika Fashion', city: 'Surat', dues: 14220, overdueDays: 18 },
    { name: 'Mahalaxmi Fabrics', city: 'Surat', dues: 4200, overdueDays: 0 },
    { name: 'Kisan Textiles', city: 'Navsari', dues: 8900, overdueDays: 45 }
  ]);

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
        <div style={{ fontWeight: 800, fontSize: '16px' }}>Customer Khata (ખાતાવહી)</div>
      </div>

      <div style={{ padding: '16px', flex: 1 }}>
        {parties.map((p, idx) => (
          <div
            key={idx}
            style={{
              background: '#FFFFFF',
              borderRadius: '8px',
              padding: '12px 14px',
              border: '1px solid #E2E8F0',
              marginBottom: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <div style={{ fontWeight: 700, fontSize: '14px' }}>{p.name}</div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>{p.city}</div>
              {p.overdueDays > 30 && (
                <div style={{ fontSize: '10px', color: '#DC2626', fontWeight: 700, marginTop: '2px' }}>
                  ⚠️ Overdue by {p.overdueDays} days
                </div>
              )}
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '11px', color: '#64748B' }}>Balance Due</div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#0F766E', fontVariantNumeric: 'tabular-nums' }}>
                {formatInr(p.dues)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

