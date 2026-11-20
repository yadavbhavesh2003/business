import React, { useState } from 'react';
import { processPurchaseInward, formatInr } from '@udyamos/core';
import { Button, colors, typography } from '@udyamos/ui';

export interface PurchaseNewProps {
  onBack?: () => void;
  onSaved?: () => void;
}

export const PurchaseNew: React.FC<PurchaseNewProps> = ({ onBack, onSaved }) => {
  const [supplierName, setSupplierName] = useState('Vardhman Polytex Mills');
  const [millInvoiceNo, setMillInvoiceNo] = useState('TEX/9942');
  const [fabricName, setFabricName] = useState('Pure Cotton 60s Bleached');
  const [rollsCount, setRollsCount] = useState(25);
  const [metersPerRoll, setMetersPerRoll] = useState(40);
  const [ratePerMeter, setRatePerMeter] = useState(55);
  const [hsn, setHsn] = useState('5208');
  const [godownBin, setGodownBin] = useState('G1-A4');

  const totalMeters = rollsCount * metersPerRoll;
  const taxable = totalMeters * ratePerMeter;
  const gst = taxable * 0.05;
  const total = taxable + gst;

  const handleSave = () => {
    // Uses core processPurchaseInward
    processPurchaseInward({
      inwardId: `INW-${Date.now()}`,
      millInvoiceNo,
      supplierId: 'SUP-001',
      supplierName,
      inwardDate: new Date().toISOString().split('T')[0],
      items: [
        {
          fabricName,
          hsn,
          rollsCount,
          metersPerRoll,
          ratePerMeter,
          gstRate: 5,
          godownBin
        }
      ]
    });
    onSaved?.();
  };

  return (
    <div style={{ padding: '24px', background: colors.clientCanvas, minHeight: '100vh' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <Button size="sm" variant="outline" onClick={onBack}>
          ← Back to Purchases
        </Button>
        <h1 style={{ ...typography.screenTitle, margin: 0 }}>Inward Purchase & Lot Provisioning</h1>
      </div>

      <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '8px', border: '1px solid #E2E8F0', maxWidth: '750px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
              Supplier / Mill Name (વેપારી)
            </label>
            <input
              type="text"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
              style={{ width: '100%', padding: '8px', fontSize: '13px', border: '1px solid #CBD5E1', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
              Mill Invoice No (ચલણ / બિલ નંબર)
            </label>
            <input
              type="text"
              value={millInvoiceNo}
              onChange={(e) => setMillInvoiceNo(e.target.value)}
              style={{ width: '100%', padding: '8px', fontSize: '13px', border: '1px solid #CBD5E1', borderRadius: '4px' }}
            />
          </div>
        </div>

        <h3 style={{ fontSize: '13px', fontWeight: 700, borderTop: '1px solid #E2E8F0', paddingTop: '12px', marginBottom: '12px' }}>
          Fabric Goods & Lot Specification
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px', marginBottom: '12px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Fabric Name / ક્વોલિટી</label>
            <input
              type="text"
              value={fabricName}
              onChange={(e) => setFabricName(e.target.value)}
              style={{ width: '100%', padding: '8px', fontSize: '13px', border: '1px solid #CBD5E1', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>HSN Code</label>
            <input
              type="text"
              value={hsn}
              onChange={(e) => setHsn(e.target.value)}
              style={{ width: '100%', padding: '8px', fontSize: '13px', border: '1px solid #CBD5E1', borderRadius: '4px' }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Rolls / Thaan (થાણ)</label>
            <input
              type="number"
              value={rollsCount}
              onChange={(e) => setRollsCount(Number(e.target.value))}
              style={{ width: '100%', padding: '8px', fontSize: '13px', border: '1px solid #CBD5E1', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Meters / Roll</label>
            <input
              type="number"
              value={metersPerRoll}
              onChange={(e) => setMetersPerRoll(Number(e.target.value))}
              style={{ width: '100%', padding: '8px', fontSize: '13px', border: '1px solid #CBD5E1', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Rate / Meter (₹)</label>
            <input
              type="number"
              value={ratePerMeter}
              onChange={(e) => setRatePerMeter(Number(e.target.value))}
              style={{ width: '100%', padding: '8px', fontSize: '13px', border: '1px solid #CBD5E1', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Godown Rack/Bin</label>
            <input
              type="text"
              value={godownBin}
              onChange={(e) => setGodownBin(e.target.value)}
              style={{ width: '100%', padding: '8px', fontSize: '13px', border: '1px solid #CBD5E1', borderRadius: '4px' }}
            />
          </div>
        </div>

        <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '6px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
            <span>Total Inward Length:</span>
            <span style={{ fontWeight: 700 }}>{totalMeters} Metres</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
            <span>Taxable Value:</span>
            <span style={{ fontWeight: 600 }}>{formatInr(taxable)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
            <span>GST (5% ITC Eligible):</span>
            <span style={{ fontWeight: 600 }}>{formatInr(gst)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 700, borderTop: '1px solid #E2E8F0', paddingTop: '6px' }}>
            <span>Total Inward Bill Amount:</span>
            <span style={{ color: colors.clientPrimary }}>{formatInr(total)}</span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <Button variant="outline" onClick={onBack}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Generate Lot Barcodes & Inward Stock
          </Button>
        </div>
      </div>
    </div>
  );
};

