/**
 * UdyamOS Core — ESC/POS Thermal Printing Formatter
 * Generates monospaced 32-column (58mm) and 48-column (80mm) receipt layouts.
 */

export * from './upi.ts';

export const ESC_BYTES = {
  INIT: [0x1b, 0x40],
  ALIGN_LEFT: [0x1b, 0x61, 0x00],
  ALIGN_CENTER: [0x1b, 0x61, 0x01],
  ALIGN_RIGHT: [0x1b, 0x61, 0x02],
  BOLD_ON: [0x1b, 0x45, 0x01],
  BOLD_OFF: [0x1b, 0x45, 0x00],
  DOUBLE_SIZE: [0x1d, 0x21, 0x11],
  NORMAL_SIZE: [0x1d, 0x21, 0x00],
  LINE_FEED: [0x0a],
  FEED_3_LINES: [0x1b, 0x64, 0x03],
  PARTIAL_CUT: [0x1d, 0x56, 0x42, 0x03],
  DRAWER_KICK_PIN2: [0x1b, 0x70, 0x00, 0x19, 0xfa]
};

/**
 * Formats a key-value row with right-aligned value for a given character width.
 */
export function formatTwoColumns(
  left: string,
  right: string,
  maxCols: number = 32
): string {
  const leftStr = String(left);
  const rightStr = String(right);
  const spacesNeeded = maxCols - (leftStr.length + rightStr.length);
  if (spacesNeeded <= 0) {
    return leftStr.substring(0, maxCols - rightStr.length - 1) + ' ' + rightStr;
  }
  return leftStr + ' '.repeat(spacesNeeded) + rightStr;
}

/**
 * Formats a centered text line.
 */
export function formatCentered(text: string, maxCols: number = 32): string {
  const str = text.trim();
  if (str.length >= maxCols) return str.substring(0, maxCols);
  const leftPad = Math.floor((maxCols - str.length) / 2);
  const rightPad = maxCols - str.length - leftPad;
  return ' '.repeat(leftPad) + str + ' '.repeat(rightPad);
}

/**
 * Formats a line item for 32-column roll (58mm):
 * Item (16 cols) | Qty (5 cols) | Rate (4 cols) | Total (7 cols)
 */
export function formatItemRow32(
  name: string,
  qty: string | number,
  rate: string | number,
  total: string | number
): string {
  const i = String(name).substring(0, 16).padEnd(16, ' ');
  const q = String(qty).padStart(5, ' ');
  const r = String(rate).padStart(4, ' ');
  const t = String(total).padStart(7, ' ');
  return `${i}${q}${r}${t}`;
}

/**
 * Formats a line item for 48-column roll (80mm):
 * Item (22 cols) | HSN (6 cols) | Qty (6 cols) | Rate (6 cols) | Total (8 cols)
 */
export function formatItemRow48(
  name: string,
  hsn: string,
  qty: string | number,
  rate: string | number,
  total: string | number
): string {
  const i = String(name).substring(0, 22).padEnd(22, ' ');
  const h = String(hsn).padStart(6, ' ');
  const q = String(qty).padStart(6, ' ');
  const r = String(rate).padStart(6, ' ');
  const t = String(total).padStart(8, ' ');
  return `${i}${h}${q}${r}${t}`;
}
