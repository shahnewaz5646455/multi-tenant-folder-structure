// Blueprint, section D4 "Hardware through the browser": tinykeys bindings.
// F2 search, F4 customer, F8 pay, Esc clear. Disabled while a dialog has focus.
import { tinykeys } from 'tinykeys';

export type PosShortcuts = {
  onSearch: () => void;
  onCustomer: () => void;
  onPay: () => void;
  onClear: () => void;
};

export function registerPosShortcuts(target: Window, h: PosShortcuts): () => void {
  return tinykeys(target, {
    F2: h.onSearch,
    F4: h.onCustomer,
    F8: h.onPay,
    Escape: h.onClear,
  });
}
