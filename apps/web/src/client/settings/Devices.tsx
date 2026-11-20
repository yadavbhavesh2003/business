import React, { useState } from 'react';
import { Button, ERPTable, StatusBadge, colors, typography } from '@udyamos/ui';

export interface DeviceRecord {
  id: string;
  code: string;
  name: string;
  deviceType: 'Android POS' | 'Desktop Chrome' | 'Tablet';
  operator: string;
  lastSync: string;
  offlineQueueCount: number;
  status: 'online' | 'offline';
}

export const Devices: React.FC = () => {
  const [devices] = useState<DeviceRecord[]>([
    {
      id: 'dev-1',
      code: 'D01',
      name: 'Counter 01 Billing Terminal',
      deviceType: 'Desktop Chrome',
      operator: 'Cashier-01 (Nirav)',
      lastSync: 'Just now (15:42)',
      offlineQueueCount: 0,
      status: 'online'
    },
    {
      id: 'dev-2',
      code: 'D02',
      name: 'Counter 02 Tablet POS',
      deviceType: 'Tablet',
      operator: 'Cashier-02 (Hetal)',
      lastSync: '12 mins ago',
      offlineQueueCount: 1,
      status: 'online'
    },
    {
      id: 'dev-3',
      code: 'D03',
      name: 'Godown 1 Fabric Scanner Phone',
      deviceType: 'Android POS',
      operator: 'Godown Staff (Suresh)',
      lastSync: '1 hour ago',
      offlineQueueCount: 0,
      status: 'offline'
    }
  ]);

  const columns = [
    {
      key: 'code',
      header: 'Device Code',
      render: (r: DeviceRecord) => (
        <span style={{ fontWeight: 700, fontFamily: 'monospace', color: colors.clientPrimary }}>
          {r.code}
        </span>
      )
    },
    { key: 'name', header: 'Device Name' },
    { key: 'deviceType', header: 'Hardware Type' },
    { key: 'operator', header: 'Assigned Operator' },
    { key: 'lastSync', header: 'Last Cloud Sync' },
    {
      key: 'offlineQueueCount',
      header: 'Pending Outbox',
      render: (r: DeviceRecord) => (
        <span style={{ fontWeight: 600, color: r.offlineQueueCount > 0 ? '#D97706' : '#059669' }}>
          {r.offlineQueueCount} events
        </span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (r: DeviceRecord) => (
        <StatusBadge
          status={r.status === 'online' ? 'approved' : 'neutral'}
          label={r.status === 'online' ? 'Online' : 'Offline'}
        />
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right' as const,
      render: (r: DeviceRecord) => (
        <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
          <Button size="sm" variant="outline">
            Ping
          </Button>
          <Button size="sm" variant="danger">
            Revoke
          </Button>
        </div>
      )
    }
  ];

  return (
    <div style={{ padding: '24px', background: colors.clientCanvas, minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ ...typography.screenTitle, margin: '0 0 4px 0' }}>Paired Counter Devices (ડિવાઇસ મેનેજર)</h1>
          <p style={{ ...typography.subtitle, margin: 0 }}>
            Unique device prefixes (`INV-D01-XXXXXX`), cryptographic counter isolation & anti-collision
          </p>
        </div>
        <Button variant="primary">+ Pair New Counter Device</Button>
      </div>

      <ERPTable columns={columns} data={devices} />
    </div>
  );
};

