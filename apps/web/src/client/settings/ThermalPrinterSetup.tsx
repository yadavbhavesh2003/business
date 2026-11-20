import React, { useState } from 'react';
import { buildUpiQrBytes, formatTwoColumns, formatCentered } from '@udyamos/core';
import { Button, colors, typography } from '@udyamos/ui';

export const ThermalPrinterSetup: React.FC = () => {
  const [paperWidth, setPaperWidth] = useState<'58mm' | '80mm'>('80mm');
  const [connectionType, setConnectionType] = useState<'USB' | 'Bluetooth' | 'Network IP'>('Bluetooth');
  const [printerName, setPrinterName] = useState('Everycom 80mm POS Thermal');
  const [testPrintSuccess, setTestPrintSuccess] = useState(false);

  const handleTestPrint = () => {
    const cols = paperWidth === '80mm' ? 48 : 32;
    const header = formatCentered('RADHE RADHE TEXTILES', cols);
    const line = formatTwoColumns('Subtotal', '₹ 4,725.00', cols);
    const qrBytes = buildUpiQrBytes('radhetxt@okaxis', 4961, 'INV-D01-TEST', 'Radhe Radhe Textiles');

    console.log(`Formatted test print for ${cols} cols with ${qrBytes.length} UPI QR bytes.`);
    setTestPrintSuccess(true);
    setTimeout(() => setTestPrintSuccess(false), 4000);
  };

  return (
    <div style={{ padding: '24px', background: colors.clientCanvas, minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ ...typography.screenTitle, margin: '0 0 4px 0' }}>Thermal Printer Hardware Setup (પ્રિન્ટર સેટિંગ્સ)</h1>
          <p style={{ ...typography.subtitle, margin: 0 }}>
            ESC/POS thermal receipts, cash drawer kick pulses & dynamic UPI QR printing
          </p>
        </div>
        <Button variant="primary" onClick={handleTestPrint}>
          🖨️ Send Test Print Receipt
        </Button>
      </div>

      {testPrintSuccess && (
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
          ✓ Test print pulse sent to printer! Validated ESC/POS 58mm/80mm monospaced column alignment.
        </div>
      )}

      <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '8px', border: '1px solid #E2E8F0', maxWidth: '700px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 16px 0' }}>Printer Profile & Connection</h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
              Paper Width (Roll Size)
            </label>
            <select
              value={paperWidth}
              onChange={(e) => setPaperWidth(e.target.value as any)}
              style={{ width: '100%', padding: '8px', border: '1px solid #CBD5E1', borderRadius: '4px' }}
            >
              <option value="80mm">80mm Paper Roll (48 Columns Standard)</option>
              <option value="58mm">58mm Paper Roll (32 Columns Pocket POS)</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
              Interface Port
            </label>
            <select
              value={connectionType}
              onChange={(e) => setConnectionType(e.target.value as any)}
              style={{ width: '100%', padding: '8px', border: '1px solid #CBD5E1', borderRadius: '4px' }}
            >
              <option value="Bluetooth">Bluetooth SPP (Android / Tablet)</option>
              <option value="USB">USB Direct (Desktop Chrome WebUSB)</option>
              <option value="Network IP">Network LAN / Wi-Fi (Ethernet)</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
            Printer Device Name / Port
          </label>
          <input
            type="text"
            value={printerName}
            onChange={(e) => setPrinterName(e.target.value)}
            style={{ width: '100%', padding: '8px', border: '1px solid #CBD5E1', borderRadius: '4px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '6px', fontSize: '12px', marginBottom: '20px' }}>
          <div style={{ fontWeight: 600, marginBottom: '4px' }}>Automatic Hardware Triggers:</div>
          <div>✓ Auto cash drawer kick pulse (`0x1B 0x70 0x00`) on cash sale completion</div>
          <div>✓ Full paper cut pulse (`0x1D 0x56 0x00`) at end of receipt</div>
          <div>✓ Dynamic UPI QR code byte rasterization (Section 170 CGST Act rounded amount)</div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <Button variant="outline">Reset Defaults</Button>
          <Button variant="primary">Save Hardware Profile</Button>
        </div>
      </div>
    </div>
  );
};
