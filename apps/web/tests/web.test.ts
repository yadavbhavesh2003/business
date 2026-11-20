import test from 'node:test';
import assert from 'node:assert';
import {
  getDashboardViewModel,
  evaluatePartyCreditStatus,
  getPlatformTelemetry
} from '../src/controllers/index.ts';
import { formatInr } from '@udyamos/core';

test('Web App - Client & Platform ViewModels Suite', async (t) => {
  // 1. Dashboard ViewModel
  await t.test('getDashboardViewModel generates correct KPI metrics', () => {
    const vm = getDashboardViewModel('Radhe Radhe Textiles');
    assert.strictEqual(vm.tenantName, 'Radhe Radhe Textiles');
    assert.strictEqual(vm.kpis.length, 5);
    assert.strictEqual(vm.kpis[0].label, "Today's sales");
    assert.strictEqual(vm.recentBills[0].formattedAmount, '₹ 2,730.00');
    assert.strictEqual(vm.alerts.length, 2);
  });

  // 2. Party Credit Limit Evaluation
  await t.test('evaluatePartyCreditStatus flags overdue and near-limit parties', () => {
    // Normal healthy party
    const s1 = evaluatePartyCreditStatus(500000, 180000, 10);
    assert.strictEqual(s1, 'normal');

    // Overdue party (>30 days)
    const s2 = evaluatePartyCreditStatus(200000, 150000, 35);
    assert.strictEqual(s2, 'overdue');

    // Balance exceeded limit
    const s3 = evaluatePartyCreditStatus(200000, 240000, 10);
    assert.strictEqual(s3, 'overdue');

    // Near limit (>= 90%)
    const s4 = evaluatePartyCreditStatus(300000, 285000, 15);
    assert.strictEqual(s4, 'near_limit');
  });

  // 3. Platform Admin Telemetry (Zero-Knowledge Rule)
  await t.test('getPlatformTelemetry contains high-level telemetry without leaking customer records', () => {
    const platform = getPlatformTelemetry();
    assert.strictEqual(platform.activeTenants, 142);
    assert.strictEqual(platform.todayBillsCount, 4892);
    assert.strictEqual(platform.mrrFormatted, '₹ 2,84,000.00');
    assert.strictEqual(platform.activeSupportGrantsCount, 2);
    assert.strictEqual(platform.syncHealthPct, '99.94%');
  });
});
