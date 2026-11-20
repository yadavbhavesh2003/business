import React, { useState } from 'react';
import { Button, ERPTable, StatusBadge, colors, typography } from '@udyamos/ui';

export interface AuditTrailRecord {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  targetEntity: string;
  entityId: string;
  deviceCode: string;
  hashSignature: string;
}

export const AuditLogViewer: React.FC = () => {
  const [logs] = useState<AuditTrailRecord[]>([
    {
      id: 'log-1',
      timestamp: '2026-11-20 15:42:11',
      actor: 'Cashier-01',
      action: 'BILL_POSTED',
      targetEntity: 'Invoice',
      entityId: 'INV-D01-001880',
      deviceCode: 'D01',
      hashSignature: 'e3b0c442...a98f'
    },
    {
      id: 'log-2',
      timestamp: '2026-11-20 15:30:04',
      actor: 'Owner (Bhavesh)',
      action: 'SUPPORT_GRANT_APPROVED',
      targetEntity: 'SupportGrant',
      entityId: 'GRNT-2026-881',
      deviceCode: 'D01',
      hashSignature: '8f4a1c90...33e1'
    },
    {
      id: 'log-3',
      timestamp: '2026-11-20 14:15:32',
      actor: 'Cashier-01',
      action: 'BILL_POSTED',
      targetEntity: 'Invoice',
      entityId: 'INV-D01-001879',
      deviceCode: 'D01',
      hashSignature: '4a1b8c2d...77a0'
    }
  ]);

  const columns = [
    { key: 'timestamp', header: 'Timestamp (IST)' },
    { key: 'actor', header: 'Staff Actor' },
    {
      key: 'action',
      header: 'Action Performed',
      render: (r: AuditTrailRecord) => (
        <span style={{ fontFamily: 'monospace', fontWeight: 600, color: colors.clientPrimary }}>
          {r.action}
        </span>
      )
    },
    { key: 'targetEntity', header: 'Entity' },
    { key: 'entityId', header: 'Entity Ref #' },
    { key: 'deviceCode', header: 'Device' },
    {
      key: 'hashSignature',
      header: 'SHA-256 Signature',
      render: (r: AuditTrailRecord) => (
        <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#64748B' }}>
          {r.hashSignature}
        </span>
      )
    }
  ];

  return (
    <div style={{ padding: '24px', background: colors.clientCanvas, minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ ...typography.screenTitle, margin: '0 0 4px 0' }}>Immutable Audit Trail & Logs (ઓડિટ લોગ્સ)</h1>
          <p style={{ ...typography.subtitle, margin: 0 }}>
            Section 36 CGST Act & MCA statutory 72-month immutable append-only event ledger
          </p>
        </div>
        <Button variant="outline">Verify SHA-256 Hash Chain</Button>
      </div>

      <ERPTable columns={columns} data={logs} />
    </div>
  );
};

