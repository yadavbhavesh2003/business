/**
 * UdyamOS Core — Bharat Accounting & Internationalization (i18n)
 * Currency formatting in Indian Lakhs/Crores (₹ 12,34,567.00),
 * Financial Year boundary calculations (Apr-Mar), and bilingual dictionaries.
 */

export * from './words.ts';

/**
 * Formats a number into Indian Lakhs/Crores format with rupee symbol.
 * Example: formatInr(1234567.5) -> "₹ 12,34,567.50"
 */
export function formatInr(amount: number, includeSymbol: boolean = true): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return includeSymbol ? '₹ 0.00' : '0.00';
  }

  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  const num = absAmount.toFixed(2);
  const [integerPart, decimalPart] = num.split('.');

  let lastThree = integerPart.substring(integerPart.length - 3);
  const otherNumbers = integerPart.substring(0, integerPart.length - 3);

  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }
  const formattedInt =
    otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;

  const res = `${formattedInt}.${decimalPart}`;
  const prefix = isNegative ? '-' : '';

  return includeSymbol ? `${prefix}₹ ${res}` : `${prefix}${res}`;
}

export interface FinancialPeriod {
  fyCode: string; // e.g. "FY 2026-27"
  ayCode: string; // Assessment Year e.g. "AY 2027-28"
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  quarterLabel: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
}

/**
 * Calculates the current Indian Financial Year (Apr 1 to Mar 31).
 */
export function getIndianFinancialPeriod(date: Date = new Date()): FinancialPeriod {
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-indexed (0 = Jan, 3 = Apr)

  let startYear: number;
  let endYear: number;
  let quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  let quarterLabel: string;

  if (month >= 3) {
    // April to December
    startYear = year;
    endYear = year + 1;
    if (month <= 5) {
      quarter = 'Q1';
      quarterLabel = 'Q1 (Apr–Jun)';
    } else if (month <= 8) {
      quarter = 'Q2';
      quarterLabel = 'Q2 (Jul–Sep)';
    } else {
      quarter = 'Q3';
      quarterLabel = 'Q3 (Oct–Dec)';
    }
  } else {
    // January to March
    startYear = year - 1;
    endYear = year;
    quarter = 'Q4';
    quarterLabel = 'Q4 (Jan–Mar)';
  }

  const fyCode = `FY ${startYear}-${String(endYear).slice(-2)}`;
  const ayCode = `AY ${endYear}-${String(endYear + 1).slice(-2)}`;

  return {
    fyCode,
    ayCode,
    quarter,
    quarterLabel,
    startDate: `${startYear}-04-01`,
    endDate: `${endYear}-03-31`
  };
}

/**
 * Gujarati Unicode Lexicon for MSME Textile ERP.
 */
export const GUJARATI_LEXICON: Record<string, string> = {
  dashboard: 'ડેશબોર્ડ',
  salesRegister: 'વેચાણ રજીસ્ટર',
  ledger: 'ખાતાવહી',
  credit: 'જમા',
  debit: 'ઉધાર',
  rollOrThan: 'થાણ',
  metres: 'મીટર',
  pieces: 'તાકા',
  cash: 'રોકડ',
  creditLimit: 'ઉધારી લિમિટ',
  deliveryChallan: 'ડિલિવરી ચલણ',
  receipt: 'પહોંચ / રસીદ',
  balanceDue: 'બાકી રકમ',
  overdue: 'મુદત વીતી ગયેલ'
};
