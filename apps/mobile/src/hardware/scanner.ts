/**
 * UdyamOS Mobile Hardware Driver — HID Barcode Scanner Keystroke Listener
 * Detects rapid character bursts (< 50ms) ending with Enter from handheld USB/Bluetooth scanners.
 */

export class BarcodeScannerParser {
  private buffer: string = '';
  private lastTimestamp: number = 0;
  private readonly maxIntervalMs: number;
  private readonly onScan: (barcode: string) => void;

  constructor(
    onScan: (barcode: string) => void,
    maxIntervalMs: number = 50
  ) {
    this.onScan = onScan;
    this.maxIntervalMs = maxIntervalMs;
  }

  /**
   * Processes an incoming key event.
   */
  public handleKeyPress(key: string, timestamp: number = Date.now()): boolean {
    const timeDelta = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;

    if (key === 'Enter') {
      const scannedCode = this.buffer.trim();
      this.buffer = '';

      if (scannedCode.length >= 4) {
        this.onScan(scannedCode);
        return true; // Barcode consumed
      }
      return false;
    }

    // Reset buffer if keystroke was typed slowly by hand
    if (timeDelta > this.maxIntervalMs && this.buffer.length > 0) {
      this.buffer = '';
    }

    if (key.length === 1) {
      this.buffer += key;
    }

    return false;
  }

  public getBuffer(): string {
    return this.buffer;
  }
}
