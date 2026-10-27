// Blueprint, section D4 sync rule 2: pull catalog by cursor every 60 s and on
// reconnect. Blueprint rule 3: triggers, not just Background Sync — flush the
// outbox on `online` events, on a 15 s interval while pending items exist, and
// on app focus. Background Sync is a bonus where supported (unavailable on
// Safari/Firefox).
export const SYNC_INTERVALS = {
  catalogMs: 60_000,
  outboxWhenPendingMs: 15_000,
} as const;

// TODO: register this worker from the POS layout. Wire up:
//   - fetch /pos/catalog?since=<cursor> → upsert products + stock, store cursor in meta.
//   - call flushOutbox when `online`, on focus, or on the pending-items interval.
