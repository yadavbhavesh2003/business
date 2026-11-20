/**
 * UdyamOS Core — Dynamic UPI QR Code Generator for Thermal Printers
 * Emits raw ESC/POS Model 2 QR Code byte commands.
 */

export interface UpiPaymentDetails {
  vpa: string; // e.g. merchant@icici
  merchantName: string;
  amount: number;
  billNo: string;
}

/**
 * Builds standard NPCI UPI payment deep-link URL.
 */
export function buildUpiUrl(details: UpiPaymentDetails): string {
  const pa = encodeURIComponent(details.vpa.trim());
  const pn = encodeURIComponent(details.merchantName.trim());
  const am = details.amount.toFixed(2);
  const tn = encodeURIComponent(`Bill ${details.billNo.trim()}`);
  return `upi://pay?pa=${pa}&pn=${pn}&am=${am}&cu=INR&tn=${tn}`;
}

/**
 * Generates raw ESC/POS byte sequence for Model 2 QR Code on thermal receipt printers.
 */
export function buildUpiQrBytes(details: UpiPaymentDetails): Uint8Array {
  const upiUrl = buildUpiUrl(details);
  const urlBytes = Buffer.from(upiUrl, 'utf-8');
  const len = urlBytes.length + 3;
  const pL = len % 256;
  const pH = Math.floor(len / 256);

  const command = [
    // 1. Center alignment
    0x1b, 0x61, 0x01,
    // 2. Set QR Model 2
    0x1d, 0x28, 0x6b, 0x04, 0x00, 0x31, 0x41, 0x32, 0x00,
    // 3. Set QR Module Size (4 dots per module)
    0x1d, 0x28, 0x6b, 0x03, 0x00, 0x31, 0x43, 0x04,
    // 4. Set Error Correction Level M (15% recovery)
    0x1d, 0x28, 0x6b, 0x03, 0x00, 0x31, 0x45, 0x31,
    // 5. Store QR Data in Symbol Storage Area
    0x1d, 0x28, 0x6b, pL, pH, 0x31, 0x50, 0x30,
    ...urlBytes,
    // 6. Print the Symbol in Storage Area
    0x1d, 0x28, 0x6b, 0x03, 0x00, 0x31, 0x51, 0x30,
    // 7. Reset to Left Alignment
    0x1b, 0x61, 0x00
  ];

  return new Uint8Array(command);
}

