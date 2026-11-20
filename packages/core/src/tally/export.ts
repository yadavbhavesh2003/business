/**
 * UdyamOS Core — Tally Prime XML Sales Voucher Exporter
 * Generates official Tally XML import envelopes for Chartered Accountants.
 */

import type { InvoiceSummary } from '../gst/index.ts';

export interface TallyVoucherInput {
  invoiceNo: string;
  date: string; // YYYYMMDD e.g. "20261120"
  partyName: string;
  salesLedgerName?: string;
  summary: InvoiceSummary;
}

/**
 * Formats a single sales invoice into Tally Prime XML Sales Voucher.
 */
export function generateTallySalesVoucherXml(input: TallyVoucherInput): string {
  const { invoiceNo, date, partyName, summary } = input;
  const salesLedger = input.salesLedgerName || 'Textile Sales Account';

  return `    <VOUCHER VCHTYPE="Sales" ACTION="Create">
      <DATE>${date}</DATE>
      <VOUCHERTYPENAME>Sales</VOUCHERTYPENAME>
      <VOUCHERNUMBER>${invoiceNo}</VOUCHERNUMBER>
      <PARTYLEDGERNAME>${partyName}</PARTYLEDGERNAME>
      <NARRATION>Auto-exported from UdyamOS Offline POS. Bill: ${invoiceNo}</NARRATION>
      <!-- Party Debit Entry -->
      <ALLLEDGERENTRIES.LIST>
        <LEDGERNAME>${partyName}</LEDGERNAME>
        <ISDEEMEDPOSITIVE>Yes</ISDEEMEDPOSITIVE>
        <AMOUNT>-${summary.netPayable.toFixed(2)}</AMOUNT>
      </ALLLEDGERENTRIES.LIST>
      <!-- Sales Credit Entry -->
      <ALLLEDGERENTRIES.LIST>
        <LEDGERNAME>${salesLedger}</LEDGERNAME>
        <ISDEEMEDPOSITIVE>No</ISDEEMEDPOSITIVE>
        <AMOUNT>${summary.taxableTotal.toFixed(2)}</AMOUNT>
      </ALLLEDGERENTRIES.LIST>
      ${
        summary.isIntraState && summary.cgstTotal > 0
          ? `<!-- Output CGST -->
      <ALLLEDGERENTRIES.LIST>
        <LEDGERNAME>Output CGST 2.5%</LEDGERNAME>
        <ISDEEMEDPOSITIVE>No</ISDEEMEDPOSITIVE>
        <AMOUNT>${summary.cgstTotal.toFixed(2)}</AMOUNT>
      </ALLLEDGERENTRIES.LIST>
      <!-- Output SGST -->
      <ALLLEDGERENTRIES.LIST>
        <LEDGERNAME>Output SGST 2.5%</LEDGERNAME>
        <ISDEEMEDPOSITIVE>No</ISDEEMEDPOSITIVE>
        <AMOUNT>${summary.sgstTotal.toFixed(2)}</AMOUNT>
      </ALLLEDGERENTRIES.LIST>`
          : ''
      }
      ${
        !summary.isIntraState && summary.igstTotal > 0
          ? `<!-- Output IGST -->
      <ALLLEDGERENTRIES.LIST>
        <LEDGERNAME>Output IGST 5%</LEDGERNAME>
        <ISDEEMEDPOSITIVE>No</ISDEEMEDPOSITIVE>
        <AMOUNT>${summary.igstTotal.toFixed(2)}</AMOUNT>
      </ALLLEDGERENTRIES.LIST>`
          : ''
      }
      ${
        summary.roundOff !== 0
          ? `<!-- Section 170 Round-off Ledger -->
      <ALLLEDGERENTRIES.LIST>
        <LEDGERNAME>Round Off (+/-)</LEDGERNAME>
        <ISDEEMEDPOSITIVE>${summary.roundOff > 0 ? 'No' : 'Yes'}</ISDEEMEDPOSITIVE>
        <AMOUNT>${Math.abs(summary.roundOff).toFixed(2)}</AMOUNT>
      </ALLLEDGERENTRIES.LIST>`
          : ''
      }
    </VOUCHER>`;
}

/**
 * Wraps multiple vouchers in the official Tally XML Import Envelope.
 */
export function generateTallyEnvelopeXml(vouchersXml: string): string {
  return `<ENVELOPE>
  <HEADER>
    <TALLYREQUEST>Import Data</TALLYREQUEST>
  </HEADER>
  <BODY>
    <IMPORTDATA>
      <REQUESTDESC>
        <REPORTNAME>Vouchers</REPORTNAME>
      </REQUESTDESC>
      <REQUESTDATA>
        <TALLYMESSAGE xmlns:UDF="TallyUDF">
${vouchersXml}
        </TALLYMESSAGE>
      </REQUESTDATA>
    </IMPORTDATA>
  </BODY>
</ENVELOPE>`;
}

