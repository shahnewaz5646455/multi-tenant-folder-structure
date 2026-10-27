// Blueprint, section D4 sync rule 1: write locally, then push. A completed sale
// is written to outbox with status 'pending' in the same tick the receipt prints;
// the sync worker pushes with Idempotency-Key: <id>.
import type { PosDb, OutboxSale } from './db.ts';

export async function enqueueSale(db: PosDb, sale: Omit<OutboxSale, 'status'>): Promise<void> {
  await db.outbox.put({ ...sale, status: 'pending' });
}

export async function flushOutbox(db: PosDb): Promise<void> {
  const pending = await db.outbox.where('status').equals('pending').toArray();
  for (const sale of pending) {
    await db.outbox.update(sale.id, { status: 'syncing' });
    try {
      // TODO: POST /pos/sales with Idempotency-Key: sale.id. On 2xx, mark synced
      // and store the server orderNo. On 4xx that isn't 409/stock_conflict, mark
      // rejected with the error. 409 = already accepted — treat as synced.
      await db.outbox.update(sale.id, { status: 'synced' });
    } catch (err) {
      await db.outbox.update(sale.id, {
        status: 'rejected',
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }
}

/** Blueprint D4 rule 7: shift close is blocked until the outbox for that shift
 *  is empty. */
export async function hasPendingForShift(db: PosDb, shiftId: string): Promise<boolean> {
  const count = await db.outbox
    .where('status')
    .anyOf('pending', 'syncing')
    .filter((s) => s.shiftId === shiftId)
    .count();
  return count > 0;
}
