import React, { useState } from 'react';
import { Button, colors, typography } from '@udyamos/ui';

export interface FeatureFlag {
  key: string;
  title: string;
  description: string;
  category: 'Compliance' | 'Billing' | 'Hardware';
  enabled: boolean;
}

export const PlatformFlags: React.FC = () => {
  const [flags, setFlags] = useState<FeatureFlag[]>([
    {
      key: 'einvoice_nic_live',
      title: 'NIC e-Invoice Live Production Gateway',
      description: 'Enables automatic 64-char IRN hash and signed QR code generation via GSTN NIC API.',
      category: 'Compliance',
      enabled: true
    },
    {
      key: 'dynamic_upi_qr_thermal',
      title: 'Dynamic UPI QR on 80mm/58mm Thermal Printers',
      description: 'Prints dynamic NPCI UPI QR with bill amount and reference directly on paper receipt.',
      category: 'Hardware',
      enabled: true
    },
    {
      key: 'whatsapp_cloud_direct',
      title: 'WhatsApp Business Cloud API Direct Send',
      description: 'Sends A4 invoice PDF & payment reminder messages automatically without manual wa.me clicks.',
      category: 'Billing',
      enabled: false
    },
    {
      key: 'crdt_negative_stock_prevention',
      title: 'Strict CRDT Stock Guard (Prevent Offline Negative Balance)',
      description: 'Warns cashier when cut length exceeds current local lot balance during offline billing.',
      category: 'Billing',
      enabled: true
    }
  ]);

  const toggleFlag = (key: string) => {
    setFlags(flags.map((f) => (f.key === key ? { ...f, enabled: !f.enabled } : f)));
  };

  return (
    <div style={{ padding: '24px', background: colors.clientCanvas, minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ ...typography.screenTitle, margin: '0 0 4px 0' }}>Feature Flag & Capability Control</h1>
          <p style={{ ...typography.subtitle, margin: 0 }}>
            Dynamic tenant feature rollout, beta capability gates & compliance switches
          </p>
        </div>
        <Button variant="primary">Deploy Updated Flags</Button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '800px' }}>
        {flags.map((flag) => (
          <div
            key={flag.key}
            style={{
              background: '#FFFFFF',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              padding: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontWeight: 700, fontSize: '13px' }}>{flag.title}</span>
                <span
                  style={{
                    background: '#F1F5F9',
                    color: '#475569',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '10px',
                    fontWeight: 600
                  }}
                >
                  {flag.category}
                </span>
              </div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>{flag.description}</div>
              <code style={{ fontSize: '11px', color: colors.platformAccent, marginTop: '4px', display: 'block' }}>
                flag: {flag.key}
              </code>
            </div>

            <div>
              <button
                onClick={() => toggleFlag(flag.key)}
                style={{
                  background: flag.enabled ? '#059669' : '#CBD5E1',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  minWidth: '80px'
                }}
              >
                {flag.enabled ? 'ENABLED' : 'OFF'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

