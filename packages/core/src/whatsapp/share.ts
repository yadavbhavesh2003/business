/**
 * UdyamOS Core — WhatsApp Direct Share & Reminders Engine
 * Generates direct wa.me links with pre-formatted bilingual messages for invoices & payment dues.
 */

import { formatInr } from '../i18n/index.ts';

export interface InvoiceShareParams {
  phone: string; // e.g. "+91 98250 12345" or "9825012345"
  merchantName: string;
  partyName: string;
  billNo: string;
  amount: number;
  date: string;
  upiVpa?: string;
  language?: 'gu' | 'en';
}

export interface PaymentReminderParams {
  phone: string;
  merchantName: string;
  partyName: string;
  balanceDue: number;
  overdueDays: number;
  upiVpa?: string;
  language?: 'gu' | 'en';
}

function cleanPhoneNumber(phone: string): string {
  let clean = phone.replace(/[^0-9]/g, '');
  if (clean.length === 10) {
    clean = '91' + clean;
  }
  return clean;
}

/**
 * Builds direct WhatsApp URL to share an invoice summary and UPI payment request.
 */
export function generateInvoiceWhatsAppShare(params: InvoiceShareParams): {
  url: string;
  messageText: string;
} {
  const phone = cleanPhoneNumber(params.phone);
  const formattedAmt = formatInr(params.amount);
  const lang = params.language || 'gu';

  let messageText = '';
  if (lang === 'gu') {
    messageText =
      `નમસ્તે ${params.partyName} જી,\n\n` +
      `આપનું બિલ *${params.merchantName}* તરફથી તૈયાર છે:\n` +
      `🧾 *બિલ નંબર:* ${params.billNo}\n` +
      `📅 *તારીખ:* ${params.date}\n` +
      `💰 *કુલ રકમ:* *${formattedAmt}*\n\n` +
      (params.upiVpa
        ? `📲 *UPI પેમેન્ટ ID:* ${params.upiVpa}\n(Scan & Pay via GPay/PhonePe/Paytm)\n\n`
        : '') +
      `આભાર! આપનો વેપાર વધે તેવી શુભેચ્છાઓ.`;
  } else {
    messageText =
      `Hello ${params.partyName},\n\n` +
      `Your invoice from *${params.merchantName}* is ready:\n` +
      `🧾 *Invoice No:* ${params.billNo}\n` +
      `📅 *Date:* ${params.date}\n` +
      `💰 *Total Amount:* *${formattedAmt}*\n\n` +
      (params.upiVpa ? `📲 *Pay via UPI:* ${params.upiVpa}\n\n` : '') +
      `Thank you! We appreciate your business.`;
  }

  const encoded = encodeURIComponent(messageText);
  return {
    url: `https://wa.me/${phone}?text=${encoded}`,
    messageText
  };
}

/**
 * Builds direct WhatsApp payment reminder message with overdue days.
 */
export function generatePaymentReminderWhatsApp(params: PaymentReminderParams): {
  url: string;
  messageText: string;
} {
  const phone = cleanPhoneNumber(params.phone);
  const formattedAmt = formatInr(params.balanceDue);
  const lang = params.language || 'gu';

  let messageText = '';
  if (lang === 'gu') {
    messageText =
      `નમસ્તે ${params.partyName} જી,\n\n` +
      `*${params.merchantName}* તરફથી નમ્ર સ્મૃતિ:\n` +
      `આપની ખાતાવહીમાં બાકી રકમ: *${formattedAmt}* છે.\n` +
      `⏳ *મુદત વીતી ગયેલ:* ${params.overdueDays} દિવસ\n\n` +
      `કૃપા કરીને આ રકમનું ઝડપી ચુકવણું કરવા વિનંતી જેથી વેપારમાં અવિરત સુવિધા જળવાઈ રહે.\n\n` +
      (params.upiVpa ? `📲 *UPI ID:* ${params.upiVpa}\n\n` : '') +
      `સહકાર બદલ આભાર!`;
  } else {
    messageText =
      `Dear ${params.partyName},\n\n` +
      `Gentle payment reminder from *${params.merchantName}*:\n` +
      `Your outstanding ledger balance is *${formattedAmt}*.\n` +
      `⏳ *Overdue by:* ${params.overdueDays} days\n\n` +
      `Kindly arrange payment at your earliest convenience.\n\n` +
      (params.upiVpa ? `📲 *UPI ID:* ${params.upiVpa}\n\n` : '') +
      `Thank you for your continued cooperation!`;
  }

  const encoded = encodeURIComponent(messageText);
  return {
    url: `https://wa.me/${phone}?text=${encoded}`,
    messageText
  };
}

