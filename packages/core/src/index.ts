/**
 * UdyamOS Core — Main Entry Point
 * Exports all foundational business logic, GST rules, i18n, sync protocols, and ESC/POS formatters.
 */

export * from './gst/index.ts';
export * from './i18n/index.ts';
export * from './sync/index.ts';
export * from './escpos/index.ts';
export * from './invoice/a4-invoice.ts';
export * from './whatsapp/share.ts';
export * from './payments/allocation.ts';
export * from './tally/export.ts';
export * from './challan/index.ts';
export * from './inventory/purchase.ts';
export * from './inventory/ledger.ts';
