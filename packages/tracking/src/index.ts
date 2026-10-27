// Blueprint, section D2 storefront rule 4: third-party scripts through ONE
// component. GTM + Pixel load with strategy="lazyOnload". Purchase events go
// server-side via Conversions API (SRS MKT) so a late-loading browser pixel
// loses no revenue data.
//
// This package is storefront-only — enforced by eslint-plugin-boundaries.

export type TrackingConfig = {
  gtmId?: string;
  pixelId?: string;
};

export type PurchaseEvent = {
  orderId: string;
  valuePaisa: number;
  currency: 'BDT';
  items: { productId: string; quantity: number; pricePaisa: number }[];
};

/** Browser-side: enqueues a dataLayer event. The CAPI call is the source of truth. */
export function trackPurchase(_event: PurchaseEvent): void {
  // TODO: push to window.dataLayer, fbq('track', 'Purchase', ...).
}

/** Server-side: Conversions API call. Call from the order ServerAction. */
export async function sendPurchaseToCapi(_event: PurchaseEvent): Promise<void> {
  // TODO: POST to Meta CAPI through api-client once the backend proxies it.
}
