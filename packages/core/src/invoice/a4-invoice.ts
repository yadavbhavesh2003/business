/**
 * UdyamOS Core — A4 GST Tax Invoice Generator
 * Generates print-ready, professional A4 HTML/CSS tax invoices compliant with Indian GST rules.
 */

import { formatInr } from '../i18n/index.ts';
import { amountToEnglishWords, amountToGujaratiWords } from '../i18n/words.ts';
import { buildUpiUrl } from '../escpos/upi.ts';
import type { InvoiceSummary } from '../gst/index.ts';

export interface CompanyDetails {
  name: string;
  gujaratiName?: string;
  address: string;
  city: string;
  state: string;
  stateCode: string;
  gstin: string;
  pan: string;
  phone: string;
  email?: string;
  bankDetails: {
    bankName: string;
    accountNumber: string;
    ifsc: string;
    branch: string;
    upiVpa: string;
  };
}

export interface BuyerDetails {
  name: string;
  address: string;
  city: string;
  state: string;
  stateCode: string;
  gstin?: string;
  phone?: string;
}

export interface A4InvoiceProps {
  invoiceNo: string;
  date: string; // e.g. "20-Nov-2026"
  dueDate?: string;
  company: CompanyDetails;
  buyer: BuyerDetails;
  summary: InvoiceSummary;
}

export function generateA4InvoiceHtml(props: A4InvoiceProps): string {
  const { invoiceNo, date, dueDate, company, buyer, summary } = props;
  const englishWords = amountToEnglishWords(summary.netPayable);
  const gujaratiWords = amountToGujaratiWords(summary.netPayable);
  const upiUrl = buildUpiUrl({
    vpa: company.bankDetails.upiVpa,
    merchantName: company.name,
    amount: summary.netPayable,
    billNo: invoiceNo
  });

  const tableRows = summary.lines
    .map(
      (line, idx) => `
      <tr>
        <td style="text-align: center;">${idx + 1}</td>
        <td><strong>${line.itemName}</strong>${line.hsnCode ? `<br><small style="color:#64748B;">HSN: ${line.hsnCode}</small>` : ''}</td>
        <td style="text-align: right; font-variant-numeric: tabular-nums;">${line.qty} m</td>
        <td style="text-align: right; font-variant-numeric: tabular-nums;">${line.rate.toFixed(2)}</td>
        <td style="text-align: right; font-variant-numeric: tabular-nums;">${line.taxableAmount.toFixed(2)}</td>
        ${
          summary.isIntraState
            ? `
          <td style="text-align: right; font-variant-numeric: tabular-nums;">${line.cgstAmount.toFixed(2)}<br><small>(${line.cgstRate}%)</small></td>
          <td style="text-align: right; font-variant-numeric: tabular-nums;">${line.sgstAmount.toFixed(2)}<br><small>(${line.sgstRate}%)</small></td>
        `
            : `
          <td style="text-align: right; font-variant-numeric: tabular-nums;">${line.igstAmount.toFixed(2)}<br><small>(${line.igstRate}%)</small></td>
        `
        }
        <td style="text-align: right; font-weight: 600; font-variant-numeric: tabular-nums;">${line.lineTotal.toFixed(2)}</td>
      </tr>
    `
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="gu">
<head>
  <meta charset="utf-8">
  <title>Tax Invoice - ${invoiceNo}</title>
  <style>
    @page { size: A4 portrait; margin: 12mm; }
    body { font-family: Inter, 'Noto Sans Gujarati', system-ui, sans-serif; font-size: 12px; color: #1E293B; line-height: 1.5; margin: 0; padding: 20px; }
    .invoice-card { border: 1.5px solid #0F172A; padding: 16px; border-radius: 4px; max-width: 800px; margin: 0 auto; }
    .header-table { width: 100%; border-bottom: 2px solid #0F172A; padding-bottom: 12px; margin-bottom: 12px; }
    .meta-box { border: 1px solid #CBD5E1; padding: 10px; border-radius: 4px; font-size: 11px; margin-bottom: 14px; }
    .invoice-table { width: 100%; border-collapse: collapse; margin-bottom: 14px; }
    .invoice-table th, .invoice-table td { border: 1px solid #CBD5E1; padding: 6px 8px; font-size: 11px; }
    .invoice-table th { background: #F1F5F9; font-weight: 700; color: #0F172A; }
    .totals-table { width: 100%; margin-top: 8px; }
    .totals-table td { padding: 4px 8px; }
    .qr-box { border: 1px solid #CBD5E1; padding: 8px; border-radius: 4px; text-align: center; }
  </style>
</head>
<body>
  <div class="invoice-card">
    <table class="header-table">
      <tr>
        <td style="vertical-align: top;">
          <h1 style="margin: 0; font-size: 20px; color: #0F766E;">${company.name}</h1>
          ${company.gujaratiName ? `<div style="font-size: 14px; font-weight: 600; color: #334155;">${company.gujaratiName}</div>` : ''}
          <div style="font-size: 11px; color: #475569; margin-top: 4px;">
            ${company.address}, ${company.city}, ${company.state} (Code: ${company.stateCode})<br>
            <strong>GSTIN:</strong> ${company.gstin} | <strong>PAN:</strong> ${company.pan}<br>
            <strong>Phone:</strong> ${company.phone}
          </div>
        </td>
        <td style="text-align: right; vertical-align: top;">
          <div style="font-size: 16px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #0F172A;">TAX INVOICE</div>
          <div style="font-size: 13px; font-weight: 700; margin-top: 4px;">No: ${invoiceNo}</div>
          <div style="font-size: 11px; color: #475569;">Date: ${date}</div>
          ${dueDate ? `<div style="font-size: 11px; color: #DC2626; font-weight: 600;">Due: ${dueDate}</div>` : ''}
        </td>
      </tr>
    </table>

    <table style="width: 100%; margin-bottom: 12px;">
      <tr>
        <td style="width: 50%; vertical-align: top; padding-right: 8px;">
          <div class="meta-box">
            <strong style="color: #0F172A; text-transform: uppercase; font-size: 10px;">Billed To (Customer):</strong><br>
            <strong style="font-size: 13px;">${buyer.name}</strong><br>
            ${buyer.address}, ${buyer.city}, ${buyer.state} (Code: ${buyer.stateCode})<br>
            <strong>GSTIN:</strong> ${buyer.gstin || 'Unregistered / Retail'}<br>
            <strong>Phone:</strong> ${buyer.phone || 'N/A'}
          </div>
        </td>
        <td style="width: 50%; vertical-align: top; padding-left: 8px;">
          <div class="meta-box">
            <strong style="color: #0F172A; text-transform: uppercase; font-size: 10px;">Bank Details & Payment:</strong><br>
            <strong>Bank:</strong> ${company.bankDetails.bankName}<br>
            <strong>A/C No:</strong> ${company.bankDetails.accountNumber} | <strong>IFSC:</strong> ${company.bankDetails.ifsc}<br>
            <strong>Branch:</strong> ${company.bankDetails.branch}<br>
            <strong>UPI ID:</strong> ${company.bankDetails.upiVpa}
          </div>
        </td>
      </tr>
    </table>

    <table class="invoice-table">
      <thead>
        <tr>
          <th style="width: 30px;">#</th>
          <th>Description of Goods</th>
          <th style="width: 70px;">Qty</th>
          <th style="width: 65px;">Rate (₹)</th>
          <th style="width: 80px;">Taxable (₹)</th>
          ${
            summary.isIntraState
              ? `<th style="width: 65px;">CGST</th><th style="width: 65px;">SGST</th>`
              : `<th style="width: 80px;">IGST</th>`
          }
          <th style="width: 85px;">Total (₹)</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>

    <table style="width: 100%; border-top: 1px solid #CBD5E1; padding-top: 8px;">
      <tr>
        <td style="vertical-align: top; width: 60%; font-size: 11px;">
          <strong>Amount in Words (English):</strong><br>
          <em>${englishWords}</em><br><br>
          <strong>રકમ શબ્દોમાં (ગુજરાતી):</strong><br>
          <em>${gujaratiWords}</em>
        </td>
        <td style="vertical-align: top; width: 40%;">
          <table class="totals-table">
            <tr>
              <td>Taxable Value:</td>
              <td style="text-align: right; font-variant-numeric: tabular-nums;">${formatInr(summary.taxableTotal, false)}</td>
            </tr>
            ${
              summary.isIntraState
                ? `
              <tr><td>CGST Total:</td><td style="text-align: right; font-variant-numeric: tabular-nums;">${formatInr(summary.cgstTotal, false)}</td></tr>
              <tr><td>SGST Total:</td><td style="text-align: right; font-variant-numeric: tabular-nums;">${formatInr(summary.sgstTotal, false)}</td></tr>
            `
                : `
              <tr><td>IGST Total:</td><td style="text-align: right; font-variant-numeric: tabular-nums;">${formatInr(summary.igstTotal, false)}</td></tr>
            `
            }
            ${
              summary.roundOff !== 0
                ? `<tr><td>Round-off (Sec 170):</td><td style="text-align: right; font-variant-numeric: tabular-nums;">${formatInr(summary.roundOff, false)}</td></tr>`
                : ''
            }
            <tr style="font-size: 14px; font-weight: 800; border-top: 2px solid #0F172A; color: #0F766E;">
              <td>GRAND TOTAL:</td>
              <td style="text-align: right; font-variant-numeric: tabular-nums;">${formatInr(summary.netPayable)}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <div style="border-top: 1px dashed #CBD5E1; margin-top: 16px; padding-top: 8px; font-size: 10px; color: #64748B; display: flex; justify-content: space-between;">
      <div>
        <strong>શરતો / Terms:</strong> Goods once sold will not be returned. Subject to Surat jurisdiction.
      </div>
      <div style="text-align: right; margin-top: 20px;">
        For <strong>${company.name}</strong><br><br><br>
        (Authorized Signatory)
      </div>
    </div>
  </div>
</body>
</html>`;
}

