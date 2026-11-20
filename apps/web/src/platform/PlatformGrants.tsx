import React, { useState } from 'react';
import { Button, ERPTable, StatusBadge, colors, typography } from '@udyamos/ui';

export interface SupportGrantRecord {
  id: string;
  tenantName: string;
  reason: string;
  assignedStaff: string;
  durationHours: number;
  expiresInMinutes: number;
  approvedBy: string;
  status: 'active' | 'expired' | 'revoked';
}

export const PlatformGrants: React.FC = () => {
  const [grants] = useState<SupportGrantRecord[]>([
    {
      id: 'GRNT-2026-881',
      tenantName: 'Radhe Radhe Textiles',
      reason: 'Assisting with printer barcode calibration issue on Counter 02',
      assignedStaff: 'Hetal (L2 Support)',
      durationHours: 2,
      expiresInMinutes: 48,
      approvedBy: 'Bhavesh (Store Owner SMS OTP)',
      status: 'active'
    },
    {
      id: 'GRNT-2026-879',
      tenantName: 'Krishna Fashion Sarees',
      reason: 'GSTR-1 JSON export validation support for CA',
      assignedStaff: 'Nirav (Support Lead)',
      durationHours: 4,
      expiresInMinutes: 0,
      approvedBy: 'Sanjaybhai (Store Owner)',
      status: 'expired'
    }
  ]);

  const columns = [
    {
      key: 'id',
      header: 'Grant ID',
      render: (r: SupportGrantRecord) => (
        <span style={{ fontFamily: 'monospace', fontWeight: 700, color: colors.platformAccent }}>
          {r.id}
        </span>
      )
    },
    { key: 'tenantName', header: 'Store / Tenant' },
    { key: 'reason', header: 'Business Reason' },
    { key: 'assignedStaff', header: 'Assigned Staff' },
    { key: 'approvedBy', header: 'Owner Authorization' },
    {
      key: 'status',
      header: 'Grant Status',
      render: (r: SupportGrantRecord) => (
        <StatusBadge
          status={r.status === 'active' ? 'approved' : 'neutral'}
          label={r.status === 'active' ? `Active (${r.expiresInMinutes}m left)` : 'Expired'}
        />
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right' as const,
      render: (r: SupportGrantRecord) => (
        <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
          {r.status === 'active' && (
            <Button size="sm" variant="danger">
              Revoke Early
            </Button>
          )}
          <Button size="sm" variant="outline">
            Audit Trail
          </Button>
        </div>
      )
    }
  ];

  return (
    <div style={{ padding: '24px', background: colors.clientCanvas, minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ ...typography.screenTitle, margin: '0 0 4px 0' }}>Zero-Knowledge Support Grants (સપોર્ટ એક્સેસ)</h1>
          <p style={{ ...typography.subtitle, margin: 0 }}>
            Strict Zero-Knowledge boundary: Platform staff cannot see tenant sales without owner-approved time-boxed grant
          </p>
        </div>
        <Button variant="primary">+ Request Time-Boxed Access</Button>
      </div>

      <ERPTable columns={columns} data={grants} />
    </div>
  );
};

