import React, { useState } from 'react';
import { Button, ERPTable, StatusBadge, colors, typography } from '@udyamos/ui';

export interface UserRecord {
  id: string;
  name: string;
  role: 'Store Owner' | 'Counter Cashier' | 'Godown Worker' | 'CA Accountant';
  mobile: string;
  pinSet: boolean;
  status: 'active' | 'suspended';
}

export const Users: React.FC = () => {
  const [users] = useState<UserRecord[]>([
    {
      id: 'usr-1',
      name: 'Bhavesh (Proprietor)',
      role: 'Store Owner',
      mobile: '9825000001',
      pinSet: true,
      status: 'active'
    },
    {
      id: 'usr-2',
      name: 'Nirav (Counter 1)',
      role: 'Counter Cashier',
      mobile: '9825000002',
      pinSet: true,
      status: 'active'
    },
    {
      id: 'usr-3',
      name: 'Suresh (Godown)',
      role: 'Godown Worker',
      mobile: '9825000003',
      pinSet: true,
      status: 'active'
    },
    {
      id: 'usr-4',
      name: 'Dharmeshbhai & Co (CA)',
      role: 'CA Accountant',
      mobile: '9825000004',
      pinSet: false,
      status: 'active'
    }
  ]);

  const columns = [
    { key: 'name', header: 'Staff Name' },
    {
      key: 'role',
      header: 'Role (RBAC)',
      render: (r: UserRecord) => (
        <span style={{ fontWeight: 600, color: colors.clientPrimary }}>{r.role}</span>
      )
    },
    { key: 'mobile', header: 'Mobile Number' },
    {
      key: 'pinSet',
      header: 'POS 4-Digit PIN',
      render: (r: UserRecord) => (
        <StatusBadge
          status={r.pinSet ? 'approved' : 'warning'}
          label={r.pinSet ? 'PIN Active' : 'Not Set'}
        />
      )
    },
    {
      key: 'status',
      header: 'Account Status',
      render: (r: UserRecord) => (
        <StatusBadge
          status={r.status === 'active' ? 'approved' : 'danger'}
          label={r.status.toUpperCase()}
        />
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right' as const,
      render: (r: UserRecord) => (
        <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
          <Button size="sm" variant="outline">
            Reset PIN
          </Button>
          <Button size="sm" variant="outline">
            Edit
          </Button>
        </div>
      )
    }
  ];

  return (
    <div style={{ padding: '24px', background: colors.clientCanvas, minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ ...typography.screenTitle, margin: '0 0 4px 0' }}>Staff Users & POS Permissions (કર્મચારી અધિકારો)</h1>
          <p style={{ ...typography.subtitle, margin: 0 }}>
            Role-based access control (RBAC), 4-digit quick counter PINs & privilege boundaries
          </p>
        </div>
        <Button variant="primary">+ Add Staff Member</Button>
      </div>

      <ERPTable columns={columns} data={users} />
    </div>
  );
};

