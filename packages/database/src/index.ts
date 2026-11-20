/**
 * UdyamOS Database Module
 * Provides schema references and seed definitions for MariaDB and SQLite.
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const SCHEMA_PATHS = {
  mariadb: path.resolve(__dirname, '../schema.sql'),
  sqlite: path.resolve(__dirname, '../sqlite-schema.sql')
};

export interface SeedData {
  organisation: {
    id: string;
    legalName: string;
    displayName: string;
    gstin: string;
    stateCode: string;
  };
  users: Array<{
    id: string;
    phone: string;
    displayName: string;
    role: 'owner' | 'cashier' | 'godown' | 'accountant';
  }>;
  devices: Array<{
    id: string;
    deviceCode: string;
    displayName: string;
  }>;
}

export const PILOT_SEED_DATA: SeedData = {
  organisation: {
    id: 'org-radhe-001',
    legalName: 'Radhe Radhe Textiles Pvt Ltd',
    displayName: 'Radhe Radhe Textiles',
    gstin: '24AAACR1234A1Z5',
    stateCode: '24'
  },
  users: [
    {
      id: 'usr-owner-001',
      phone: '+919825012345',
      displayName: 'Rameshbhai Patel',
      role: 'owner'
    },
    {
      id: 'usr-cashier-001',
      phone: '+919825012346',
      displayName: 'Kiran',
      role: 'cashier'
    }
  ],
  devices: [
    {
      id: 'dev-counter-001',
      deviceCode: 'D01',
      displayName: 'Main Counter Phone'
    },
    {
      id: 'dev-counter-002',
      deviceCode: 'D02',
      displayName: 'Second Counter Tablet'
    }
  ]
};

