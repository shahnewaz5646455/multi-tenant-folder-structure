// Blueprint, section C and D2: Serwist service worker. SCOPE: /pos/ only — a
// POS caching bug cannot serve stale dashboard pages.
//
// Register this from the (pos) layout with { scope: '/pos/' }.

// TODO: wire Serwist precache + runtime cache for /pos routes once the sell
// screen stabilises. Until then this file keeps the module graph consistent.
export {};
