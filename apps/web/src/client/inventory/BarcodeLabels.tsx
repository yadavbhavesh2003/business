import React, { useState } from 'react';
import { formatInr } from '@udyamos/core';
import { Button, colors, typography } from '@udyamos/ui';

export interface BarcodeLabelsProps {
  onBack?: () => void;
}

export const BarcodeLabels: React.FC<BarcodeLabelsProps> = ({ onBack }) => {
  const [selectedLot, setSelectedLot] = useState({
    code: 'LOT-CTN-60S-041',
    quality: 'Pure Cotton 60s Super Bleached',
    meters: 40,
    rate: 65,
    hsn: '5208',
    rack: 'G1-A4'
  });

  const [labelSize, setLabelSize] = useState<'50x25' | '38x25'>('50x25');
  const [copies, setCopies] = useState<number>(10);

  return (
    <div style={{ padding: '24px', background: colors.clientCanvas, minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ ...typography.screenTitle, margin: '0 0 4px 0' }}>Barcode Label Sticker Printing</h1>
          <p style={{ ...typography.subtitle, margin: 0 }}>
            Thermal roll stickers for fabric bales & cut rolls · ESC/POS TSPL Barcode compatible
          </p>
        </div>
        <Button variant="primary">Print {copies} Stickers</Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
        <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 700, margin: '0 0 12px 0' }}>Sticker Configuration</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                Label Dimensions (mm)
              </label>
              <select
                value={labelSize}
                onChange={(e) => setLabelSize(e.target.value as any)}
                style={{ width: '100%', padding: '8px', border: '1px solid #CBD5E1', borderRadius: '4px' }}
              >
                <option value="50x25">50mm x 25mm (Standard Textile Roll)</option>
                <option value="38x25">38mm x 25mm (Compact 2-Across)</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                Print Copies (Number of Stickers)
              </label>
              <input
                type="number"
                value={copies}
                onChange={(e) => setCopies(Number(e.target.value))}
                style={{ width: '100%', padding: '8px', border: '1px solid #CBD5E1', borderRadius: '4px' }}
              />
            </div>
          </div>

          <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '6px', fontSize: '12px' }}>
            <div style={{ fontWeight: 600, marginBottom: '4px' }}>Fabric Details to Print:</div>
            <div>Item: {selectedLot.quality}</div>
            <div>Lot Code: {selectedLot.code}</div>
            <div>HSN: {selectedLot.hsn} · Rate: {formatInr(selectedLot.rate)}/m · Bin: {selectedLot.rack}</div>
          </div>
        </div>

        {/* Live Sticker Preview */}
        <div>
          <h3 style={{ fontSize: '13px', fontWeight: 700, margin: '0 0 12px 0' }}>Thermal Sticker Preview</h3>
          <div
            style={{
              background: '#FFFFFF',
              border: '2px solid #000000',
              borderRadius: '4px',
              padding: '10px',
              width: '240px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              fontFamily: 'monospace'
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: 800, textAlign: 'center', borderBottom: '1px solid #000', paddingBottom: '2px' }}>
              RADHE RADHE TEXTILES
            </div>
            <div style={{ fontSize: '10px', fontWeight: 700, marginTop: '4px' }}>
              {selectedLot.quality}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', marginTop: '2px' }}>
              <span>HSN: {selectedLot.hsn}</span>
              <span>BIN: {selectedLot.rack}</span>
            </div>
            <div style={{ textAlign: 'center', margin: '6px 0', border: '1px dashed #000', padding: '4px 0' }}>
              <div style={{ letterSpacing: '4px', fontWeight: 700, fontSize: '12px' }}>||| | |||| | |||</div>
              <div style={{ fontSize: '9px' }}>{selectedLot.code}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 800, borderTop: '1px solid #000', paddingTop: '2px' }}>
              <span>LEN: {selectedLot.meters}m</span>
              <span>MRP: {formatInr(selectedLot.rate)}/m</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

