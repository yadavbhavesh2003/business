import React, { useState } from 'react';
import { Button, colors, typography } from '@udyamos/ui';

export const UpiQrSetup: React.FC = () => {
  const [upiId, setUpiId] = useState('radhetxt@okaxis');
  const [payeeName, setPayeeName] = useState('Radhe Radhe Textiles');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={{ padding: '24px', background: colors.clientCanvas, minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ ...typography.screenTitle, margin: '0 0 4px 0' }}>Dynamic UPI QR Configuration (યુપીઆઇ ક્યૂઆર)</h1>
          <p style={{ ...typography.subtitle, margin: 0 }}>
            Configure merchant VPA for dynamic on-screen and thermal printed bill QR codes
          </p>
        </div>
        <Button variant="primary" onClick={handleSave}>
          Save VPA Configuration
        </Button>
      </div>

      {saved && (
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
          ✓ Merchant UPI VPA saved successfully! Counter bills will generate dynamic amount QRs automatically.
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px', maxWidth: '800px' }}>
        <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 16px 0' }}>Bank UPI VPA Details</h3>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
              Merchant UPI VPA (ID)
            </label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="e.g. storename@okaxis"
              style={{ width: '100%', padding: '8px', fontSize: '13px', border: '1px solid #CBD5E1', borderRadius: '4px', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
              Merchant Business Name
            </label>
            <input
              type="text"
              value={payeeName}
              onChange={(e) => setPayeeName(e.target.value)}
              style={{ width: '100%', padding: '8px', fontSize: '13px', border: '1px solid #CBD5E1', borderRadius: '4px', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '6px', fontSize: '12px' }}>
            <div style={{ fontWeight: 600, marginBottom: '4px' }}>NPCI UPI URI Format:</div>
            <code style={{ fontSize: '11px', color: '#0F766E' }}>
              upi://pay?pa={upiId}&pn={encodeURIComponent(payeeName)}&am=[AMOUNT]&tr=[BILL_NO]
            </code>
          </div>
        </div>

        {/* Live Preview Card */}
        <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '8px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#64748B' }}>Counter Customer Display Preview</h4>
          <div style={{ width: '140px', height: '140px', background: '#F1F5F9', border: '1px solid #CBD5E1', margin: '0 auto 12px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '11px', color: '#64748B' }}>[ SAMPLE QR ]</span>
          </div>
          <div style={{ fontWeight: 700, fontSize: '13px' }}>{payeeName}</div>
          <div style={{ fontSize: '11px', color: colors.clientPrimary, fontFamily: 'monospace' }}>{upiId}</div>
          <div style={{ fontSize: '11px', color: '#059669', marginTop: '6px', fontWeight: 600 }}>Zero MDR · Direct Bank Credit</div>
        </div>
      </div>
    </div>
  );
};

