/** FAQ entry keys for the pricing page. Resolve under `pricing.faq.entries.<key>` for q/a. */
export const PRICING_FAQ_KEYS = ['trial', 'changePlan', 'payment', 'courier'] as const;
export type PricingFaqKey = (typeof PRICING_FAQ_KEYS)[number];
