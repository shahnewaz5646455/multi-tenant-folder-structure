// Blueprint, section D4 "Hardware through the browser":
// USB/Bluetooth barcode scanners act as keyboards (HID). We detect bursts of
// keystrokes under ~30 ms apart ending in Enter. Works in every browser; no drivers.
const BURST_WINDOW_MS = 30;

export type ScannerOptions = {
  onScan: (code: string) => void;
  windowMs?: number;
};

export function attachScanner(target: Window | Document, opts: ScannerOptions): () => void {
  const windowMs = opts.windowMs ?? BURST_WINDOW_MS;
  let buffer = '';
  let lastAt = 0;

  const handler = (ev: KeyboardEvent): void => {
    const now = performance.now();
    if (now - lastAt > windowMs) buffer = '';
    lastAt = now;
    if (ev.key === 'Enter') {
      if (buffer.length > 0) opts.onScan(buffer);
      buffer = '';
      return;
    }
    if (ev.key.length === 1) buffer += ev.key;
  };

  (target as Window).addEventListener('keydown', handler as EventListener);
  return () => (target as Window).removeEventListener('keydown', handler as EventListener);
}
