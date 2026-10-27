// Blueprint, section D4 "POS: offline and real-time" — local data model.
// One Dexie database PER STORE so tenant isolation extends to the device.
import Dexie, { type Table } from 'dexie';

export type OutboxSale = {
  /** ULID created on the device = idempotency key. */
  id: string;
  storeId: string;
  deviceId: string;
  shiftId: string;
  /** Printed on the receipt until synced, e.g. "D3-000123". */
  localNo: string;
  lines: { variantId: string; qty: number; unitPrice: number; discount: number }[];
  tenders: { method: 'cash' | 'bkash' | 'card'; amount: number; ref?: string }[];
  /** ISO, Asia/Dhaka shown in UI only. */
  createdAt: string;
  status: 'pending' | 'syncing' | 'synced' | 'rejected';
  /** Server order number once accepted. */
  orderNo?: string;
  error?: string;
};

export type Product = {
  variantId: string;
  barcode?: string;
  name: string;
  price: number;
  updatedAt: string;
};

export type Stock = { variantId: string; qty: number; asOf: string };
export type Meta = { key: string; value: string };

export class PosDb extends Dexie {
  products!: Table<Product>;
  stock!: Table<Stock>;
  outbox!: Table<OutboxSale>;
  /** Catalog cursor, device id. */
  meta!: Table<Meta>;

  constructor(storeId: string) {
    super(`pos-${storeId}`);
    this.version(1).stores({
      products: 'variantId, barcode, name',
      stock: 'variantId',
      outbox: 'id, status, createdAt',
      meta: 'key',
    });
  }
}
