import React, { useState } from 'react';
import { Button, ERPTable, StatusBadge, colors, typography } from '@udyamos/ui';

export interface IncidentRecord {
  id: string;
  service: string;
  severity: 'P1' | 'P2' | 'P3';
  summary: string;
  startedAt: string;
  resolvedAt?: string;
  status: 'investigating' | 'resolved';
}

export const PlatformIncidents: React.FC = () => {
  const [incidents] = useState<IncidentRecord[]>([
    {
      id: 'INC-2026-004',
      service: 'SMS / WhatsApp Gateway (Karix)',
      severity: 'P2',
      summary: 'Upstream SMS OTP delivery latency exceeding 45 seconds for Gujarat circle',
      startedAt: '2026-11-20 14:10',
      status: 'investigating'
    },
    {
      id: 'INC-2026-003',
      service: 'MariaDB Cloud Shard 02',
      severity: 'P3',
      summary: 'Automated disk compaction drill completed with 0 zero customer downtime',
      startedAt: '2026-11-19 02:00',
      resolvedAt: '2026-11-19 02:18',
      status: 'resolved'
    }
  ]);

  const columns = [
    {
      key: 'id',
      header: 'Incident #',
      render: (r: IncidentRecord) => <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>{r.id}</span>
    },
    { key: 'service', header: 'Subsystem / Provider' },
    {
      key: 'severity',
      header: 'Severity',
      render: (r: IncidentRecord) => (
        <span
          style={{
            background: r.severity === 'P1' ? '#FEE2E2' : r.severity === 'P2' ? '#FEF3C7' : '#E0E7FF',
            color: r.severity === 'P1' ? '#991B1B' : r.severity === 'P2' ? '#92400E' : '#3730A3',
            padding: '2px 8px',
            borderRadius: '4px',
            fontWeight: 800,
            fontSize: '11px'
          }}
        >
          {r.severity}
        </span>
      )
    },
    { key: 'summary', header: 'Incident Summary' },
    { key: 'startedAt', header: 'Started (IST)' },
    {
      key: 'status',
      header: 'War Room Status',
      render: (r: IncidentRecord) => (
        <StatusBadge
          status={r.status === 'investigating' ? 'danger' : 'approved'}
          label={r.status.toUpperCase()}
        />
      )
    }
  ];

  return (
    <div style={{ padding: '24px', background: colors.clientCanvas, minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ ...typography.screenTitle, margin: '0 0 4px 0' }}>Incident War Room & Service Health</h1>
          <p style={{ ...typography.subtitle, margin: 0 }}>
            Real-time infrastructure health, upstream provider telemetry & disaster recovery monitoring
          </p>
        </div>
        <Button variant="danger">+ Declare Incident</Button>
      </div>

      <ERPTable columns={columns} data={incidents} />
    </div>
  );
};

