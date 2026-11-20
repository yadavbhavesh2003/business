import test from 'node:test';
import assert from 'node:assert';
import {
  formatInr,
  amountToEnglishWords,
  amountToGujaratiWords,
  getIndianFinancialPeriod
} from '../src/i18n/index.ts';

test('i18n - Indian Lakhs/Crores Currency Formatting', () => {
  assert.strictEqual(formatInr(1234567.5), '₹ 12,34,567.50');
  assert.strictEqual(formatInr(100), '₹ 100.00');
  assert.strictEqual(formatInr(100000), '₹ 1,00,000.00');
  assert.strictEqual(formatInr(10000000), '₹ 1,00,00,000.00');
  assert.strictEqual(formatInr(0), '₹ 0.00');
  assert.strictEqual(formatInr(-5400), '-₹ 5,400.00');
});

test('i18n - Legal Amount in English Words', () => {
  const words = amountToEnglishWords(1234567);
  assert.strictEqual(
    words,
    'Rupees Twelve Lakh Thirty-Four Thousand Five Hundred Sixty-Seven Only'
  );

  const wordsWithPaise = amountToEnglishWords(500.50);
  assert.strictEqual(wordsWithPaise, 'Rupees Five Hundred and Fifty Paise Only');
});

test('i18n - Legal Amount in Gujarati Words', () => {
  const gujWords = amountToGujaratiWords(1234567);
  assert.strictEqual(
    gujWords,
    'રૂપિયા બાર લાખ ચોત્રીસ હજાર પાંચસો સડસઠ ફક્ત'
  );
});

test('i18n - Indian Financial Year (FY) Period Calculation', () => {
  // Test November 2026 -> FY 2026-27, Q3
  const novDate = new Date('2026-11-20');
  const fyNov = getIndianFinancialPeriod(novDate);
  assert.strictEqual(fyNov.fyCode, 'FY 2026-27');
  assert.strictEqual(fyNov.ayCode, 'AY 2027-28');
  assert.strictEqual(fyNov.quarter, 'Q3');

  // Test February 2027 -> FY 2026-27, Q4
  const febDate = new Date('2027-02-15');
  const fyFeb = getIndianFinancialPeriod(febDate);
  assert.strictEqual(fyFeb.fyCode, 'FY 2026-27');
  assert.strictEqual(fyFeb.quarter, 'Q4');

  // Test May 2027 -> FY 2027-28, Q1
  const mayDate = new Date('2027-05-10');
  const fyMay = getIndianFinancialPeriod(mayDate);
  assert.strictEqual(fyMay.fyCode, 'FY 2027-28');
  assert.strictEqual(fyMay.quarter, 'Q1');
});
