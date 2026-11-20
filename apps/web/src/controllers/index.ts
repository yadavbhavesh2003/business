/**
 * UdyamOS Web Controllers (ViewModels & State Handlers)
 * Pure TypeScript business logic powering the Web Views.
 */

import { formatInr, calculateInvoice, type InvoiceSummary } from '@udyamos/core';

export interface DashboardViewModel {
  tenantName: string;
  kpis: Array<{
    label: string;
    value: string;
    note: string;
    tone: 'success' | 'warning' | 'danger' | 'neutral';
  }>;
  recentBills: Array<{
    billNo: string;
    party: string;
    amount: number;
    formattedAmount: string;
    status: 'approved' | 'pending';
  }>;
  alerts: Array<{
    type: 'sync_conflict' | 'credit_exceeded';
    message: string;
    severity: 'danger' | 'warning';
  }>;
}

export function getDashboardViewModel(tenantName = 'Radhe Radhe Textiles'): DashboardViewModel {
  return {
    tenantName,
    kpis: [
      { label: "Today's sales", value: formatInr(286450), note: '▲ 12% vs last Thursday · 41 bills', tone: 'success' },
      { label: 'Collected today', value: formatInr(194000), note: 'Cash ₹38,000 · UPI/Bank ₹1,56,000', tone: 'neutral' },
      { label: 'Receivable', value: formatInr(1842300), note: '64 parties with balance dues', tone: 'neutral' },
      { label: 'Overdue > 30 days', value: formatInr(610800), note: '9 parties over credit terms', tone: 'danger' },
      { label: 'Low / negative stock', value: '7 lots', note: '2 negative after offline sync', tone: 'warning' }
    ],
    recentBills: [
      { billNo: 'INV-D01-001880', party: 'Shreeji Saree Depot', amount: 2730, formattedAmount: formatInr(2730), status: 'approved' },
      { billNo: 'INV-D01-001879', party: 'Cash Counter Sale', amount: 2231, formattedAmount: formatInr(2231), status: 'approved' }
    ],
    alerts: [
      {
        type: 'sync_conflict',
        message: 'Lot RL-2291 oversold across D01 and D02 offline. Balance is -15m.',
        severity: 'warning'
      },
      {
        type: 'credit_exceeded',
        message: 'Shiv Fabrics overdue ₹40,000 beyond 45 days. Bill creation paused.',
        severity: 'danger'
      }
    ]
  };
}

export interface PartyRecord {
  id: string;
  name: string;
  city: string;
  creditLimit: number;
  currentBalance: number;
  status: 'normal' | 'near_limit' | 'overdue';
}

export function evaluatePartyCreditStatus(limit: number, balance: number, overdueDays: number): 'normal' | 'near_limit' | 'overdue' {
  if (overdueDays > 30 || balance > limit) return 'overdue';
  if (balance >= limit * 0.9) return 'near_limit';
  return 'normal';
}

export interface PlatformTelemetryViewModel {
  activeTenants: number;
  todayBillsCount: number;
  mrrFormatted: string;
  activeSupportGrantsCount: number;
  syncHealthPct: string;
}

export function getPlatformTelemetry(): PlatformTelemetryViewModel {
  return {
    activeTenants: 142,
    todayBillsCount: 4892,
    mrrFormatted: formatInr(284000),
    activeSupportGrantsCount: 2,
    syncHealthPct: '99.94%'
  };
}

