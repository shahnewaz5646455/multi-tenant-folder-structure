// Blueprint, section B "Client state": Zustand for POS ticket, UI toggles.
// Blueprint D "Anti-patterns": do NOT copy server data into Zustand — Dexie
// is the source of truth for catalog/stock; this store is in-memory UI only.
import { create } from 'zustand';

export type TicketLine = {
  variantId: string;
  name: string;
  qty: number;
  unitPrice: number;
  discount: number;
};

export type Tender = { method: 'cash' | 'bkash' | 'card'; amount: number; ref?: string };

export type PosState = {
  lines: TicketLine[];
  tenders: Tender[];
  customerId?: string;
  addLine: (line: TicketLine) => void;
  removeLine: (variantId: string) => void;
  setQty: (variantId: string, qty: number) => void;
  addTender: (t: Tender) => void;
  clear: () => void;
};

export const usePosStore = create<PosState>((set) => ({
  lines: [],
  tenders: [],
  addLine: (line) =>
    set((s) => {
      const existing = s.lines.find((l) => l.variantId === line.variantId);
      if (existing) {
        return { lines: s.lines.map((l) => (l.variantId === line.variantId ? { ...l, qty: l.qty + line.qty } : l)) };
      }
      return { lines: [...s.lines, line] };
    }),
  removeLine: (variantId) => set((s) => ({ lines: s.lines.filter((l) => l.variantId !== variantId) })),
  setQty: (variantId, qty) =>
    set((s) => ({ lines: s.lines.map((l) => (l.variantId === variantId ? { ...l, qty } : l)) })),
  addTender: (t) => set((s) => ({ tenders: [...s.tenders, t] })),
  clear: () => set({ lines: [], tenders: [], customerId: undefined }),
}));
