// Blueprint, section D3 "Permission catalogue and session shape".
//
// The frontend reasons about PERMISSIONS, never about role names — the role
// matrix is still open (SRS OI-23) and the brief and SRS disagree on it.
// Hard-coded role checks (`role === 'Cashier'`) are banned by lint.

export const PERMISSIONS = [
  'orders.read',
  'orders.update_status',
  'orders.cancel',
  'orders.refund',
  'products.read',
  'products.write',
  'inventory.adjust',
  'shipping.book',
  'payments.configure',
  'payouts.request',
  'pos.sell',
  'pos.discount',
  'pos.shift_close',
  'staff.manage',
  'billing.manage',
  'store.design',
] as const;

export type Permission = (typeof PERMISSIONS)[number];

/** Delivered by the backend per store, after login and on store switch. */
export type StoreSession = {
  userId: string;
  storeId: string;
  /** Resolved server-side from the user's role. */
  permissions: Permission[];
  /** From the plan, separate from permissions — a Cashier lacks products.write
   *  (permission error), an Owner on Free hits the product limit (upgrade prompt).
   *  Mixing these produces upgrade prompts for staff who cannot upgrade. */
  entitlements: {
    limits: { products: number; staff: number; warehouses: number };
    features: Record<string, boolean>;
  };
  impersonatedBy?: { adminId: string; expiresAt: string };
};

export const can = (s: StoreSession, p: Permission): boolean => s.permissions.includes(p);
