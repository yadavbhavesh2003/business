import React, { useState } from 'react';
import { formatInr } from '@udyamos/core';
import { Button, colors } from '@udyamos/ui';

export interface LotCutModalProps {
  lotCode?: string;
  fabricName?: string;
  totalRollMeters?: number;
  ratePerMeter?: number;
  isOpen: boolean;
  onClose: () => void;
  onConfirmCut: (cutMeters: number, remainingMeters: number) => void;
}

export const LotCutModal: React.FC<LotCutModalProps> = ({
  lotCode = 'LOT-CTN-60S-041',
  fabricName = 'Pure Cotton 60s Bleached',
  totalRollMeters = 40,
  ratePerMeter = 65,
  isOpen,
  onClose,
  onConfirmCut
}) => {
  const [cutMeters, setCutMeters] = useState<number>(12);

  if (!isOpen) return null;

  const remaining = Math.max(0, totalRollMeters - cutMeters);
  const cutValue = cutMeters * ratePerMeter;

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
          width: '420px',
          padding: '20px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: colors.textPrimary }}>
            Cut Fabric Roll / થાણમાંથી કટિંગ
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer' }}>
            ✕
          </button>
        </div>

        <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '6px', marginBottom: '16px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600 }}>{fabricName}</div>
          <div style={{ fontSize: '11px', color: colors.clientPrimary, fontFamily: 'monospace', marginTop: '2px' }}>
            {lotCode} · Rate {formatInr(ratePerMeter)}/m
          </div>
          <div style={{ fontSize: '12px', marginTop: '6px', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#64748B' }}>Original Roll Length:</span>
            <span style={{ fontWeight: 700 }}>{totalRollMeters} Metres</span>
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
            Cut Length for Counter Bill (મીટર કટ)
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="number"
              value={cutMeters}
              max={totalRollMeters}
              min={1}
              onChange={(e) => setCutMeters(Number(e.target.value))}
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '16px',
                fontWeight: 700,
                border: '2px solid #0F766E',
                borderRadius: '6px',
                outline: 'none'
              }}
            />
            <span style={{ alignSelf: 'center', fontWeight: 600, fontSize: '14px' }}>Metres</span>
          </div>
        </div>

        {/* Visual Roll Representation */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
            <span style={{ color: '#0F766E', fontWeight: 600 }}>Cut: {cutMeters}m ({formatInr(cutValue)})</span>
            <span style={{ color: '#64748B' }}>Remaining: {remaining}m</span>
          </div>
          <div style={{ width: '100%', height: '14px', background: '#E2E8F0', borderRadius: '7px', overflow: 'hidden', display: 'flex' }}>
            <div style={{ width: `${(cutMeters / totalRollMeters) * 100}%`, background: '#0F766E' }} />
            <div style={{ flex: 1, background: '#CBD5E1' }} />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => onConfirmCut(cutMeters, remaining)}>
            Add {cutMeters}m to Bill
          </Button>
        </div>
      </div>
    </div>
  );
};

