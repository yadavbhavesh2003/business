/**
 * UdyamOS Core — Number-to-Words in English and Gujarati
 * Generates formal legal financial phrases for invoices, vouchers, and cash receipts.
 */

const ENG_ONES = [
  '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
  'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
  'Seventeen', 'Eighteen', 'Nineteen'
];

const ENG_TENS = [
  '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
];

function convertEngUnderThousand(n: number): string {
  let str = '';
  if (n >= 100) {
    str += ENG_ONES[Math.floor(n / 100)] + ' Hundred ';
    n %= 100;
  }
  if (n >= 20) {
    const t = Math.floor(n / 10);
    const rem = n % 10;
    str += ENG_TENS[t] + (rem > 0 ? '-' + ENG_ONES[rem] : '') + ' ';
  } else if (n > 0) {
    str += ENG_ONES[n] + ' ';
  }
  return str.trim();
}

/**
 * Converts rupee amount into Indian English Words format (Lakhs, Crores).
 * Example: 1234567 -> "Rupees Twelve Lakh Thirty-Four Thousand Five Hundred Sixty-Seven Only"
 */
export function amountToEnglishWords(amount: number): string {
  const rounded = Math.round(Number(amount) * 100) / 100;
  const rupees = Math.floor(rounded);
  const paise = Math.round((rounded - rupees) * 100);

  if (rupees === 0 && paise === 0) return 'Rupees Zero Only';

  let words = '';
  const crore = Math.floor(rupees / 10000000);
  let rem = rupees % 10000000;
  const lakh = Math.floor(rem / 100000);
  rem = rem % 100000;
  const thousand = Math.floor(rem / 1000);
  rem = rem % 1000;
  const hundred = rem;

  if (crore > 0) words += convertEngUnderThousand(crore) + ' Crore ';
  if (lakh > 0) words += convertEngUnderThousand(lakh) + ' Lakh ';
  if (thousand > 0) words += convertEngUnderThousand(thousand) + ' Thousand ';
  if (hundred > 0) words += convertEngUnderThousand(hundred) + ' ';

  let result = 'Rupees ' + words.trim();
  if (paise > 0) {
    result += ' and ' + convertEngUnderThousand(paise) + ' Paise';
  }
  return result + ' Only';
}

/**
 * Complete Authentic Gujarati Number Words (0 to 99).
 */
const GUJARATI_0_TO_99 = [
  'શૂન્ય', 'એક', 'બે', 'ત્રણ', 'ચાર', 'પાંચ', 'છ', 'સાત', 'આઠ', 'નવ', 'દસ',
  'અગિયાર', 'બાર', 'તેર', 'ચૌદ', 'પંદર', 'સોળ', 'સત્તર', 'અઢાર', 'ઓગણીસ', 'વીસ',
  'એકવીસ', 'બાવીસ', 'ત્રેવીસ', 'ચોવીસ', 'પચ્ચીસ', 'છવીસ', 'સત્તાવીસ', 'અઠ્ઠાવીસ', 'ઓગણત્રીસ', 'ત્રીસ',
  'એકત્રીસ', 'બત્રીસ', 'તેત્રીસ', 'ચોત્રીસ', 'પાંત્રીસ', 'છત્રીસ', 'સાડત્રીસ', 'અડત્રીસ', 'ઓગણચાલીસ', 'ચાલીસ',
  'એકતાલીસ', 'બેતાલીસ', 'તેતાલીસ', 'ચુમ્માલીસ', 'પિસ્તાલીસ', 'છેતાલીસ', 'સુડતાલીસ', 'અડતાલીસ', 'ઓગણપચાસ', 'પચાસ',
  'એકાવન', 'બાવન', 'ત્રેપન', 'ચોપન', 'પંચાવન', 'છપ્પન', 'સત્તાવન', 'અઠ્ઠાવન', 'ઓગણસાઠ', 'સાઠ',
  'એકસઠ', 'બાસઠ', 'ત્રએસઠ', 'ચોસઠ', 'પાંસઠ', 'છાસઠ', 'સડસઠ', 'અડસઠ', 'અગણોસિત્તેર', 'સિત્તેર',
  'એકોતેર', 'બોતેર', 'તોતેર', 'ચુમોતેર', 'પંચોતેર', 'છોતેર', 'સત્તોતેર', 'અઠ્ઠોતેર', 'ઓગણાએંસી', 'એંસી',
  'એક્યાસી', 'બ્યાસી', 'ત્યાસી', 'ચોર્યાસી', 'પંચાસી', 'છ્યાસી', 'સિત્યાસી', 'અઠ્યાસી', 'નેવ્યાસી', 'નેવું',
  'એકાણું', 'બાણું', 'ત્રાણું', 'ચોરાણું', 'પંચાણું', 'છન્નું', 'સત્તાણું', 'અઠ્ઠાણું', 'નવાણું'
];

const GUJARATI_HUNDREDS = [
  '', 'સો', 'બસો', 'ત્રણસો', 'ચારસો', 'પાંચસો', 'છસો', 'સાતસો', 'આઠસો', 'નવસો'
];

function convertGujUnderThousand(n: number): string {
  let str = '';
  if (n >= 100) {
    const h = Math.floor(n / 100);
    str += GUJARATI_HUNDREDS[h] + ' ';
    n %= 100;
  }
  if (n > 0) {
    str += GUJARATI_0_TO_99[n] + ' ';
  }
  return str.trim();
}

/**
 * Converts numerical amount into formal legal Gujarati receipt string.
 * Example: 1234567 -> "રૂપિયા બાર લાખ ચોત્રીસ હજાર પાંચસો સડસઠ ફક્ત"
 */
export function amountToGujaratiWords(amount: number): string {
  const rounded = Math.round(Number(amount) * 100) / 100;
  const rupees = Math.floor(rounded);
  const paise = Math.round((rounded - rupees) * 100);

  if (rupees === 0 && paise === 0) return 'રૂપિયા શૂન્ય ફક્ત';

  let words = '';
  const crore = Math.floor(rupees / 10000000);
  let rem = rupees % 10000000;
  const lakh = Math.floor(rem / 100000);
  rem = rem % 100000;
  const thousand = Math.floor(rem / 1000);
  rem = rem % 1000;
  const hundred = rem;

  if (crore > 0) words += GUJARATI_0_TO_99[crore] + ' કરોડ ';
  if (lakh > 0) words += GUJARATI_0_TO_99[lakh] + ' લાખ ';
  if (thousand > 0) words += GUJARATI_0_TO_99[thousand] + ' હજાર ';
  if (hundred > 0) words += convertGujUnderThousand(hundred) + ' ';

  let result = 'રૂપિયા ' + words.trim();
  if (paise > 0) {
    result += ' અને ' + GUJARATI_0_TO_99[paise] + ' પૈસા';
  }
  return result + ' ફક્ત';
}

export const numberToGujaratiWords = amountToGujaratiWords;
export const numberToEnglishWords = amountToEnglishWords;

