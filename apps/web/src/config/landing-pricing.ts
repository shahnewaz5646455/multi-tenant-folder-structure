/** Billing cycle keys for the Plans toggle. Each resolves under `pricing.cycles.<key>`. */
export const BILLING_CYCLE_KEYS = ['monthly', 'half-yearly', 'yearly'] as const;
export type BillingCycleKey = (typeof BILLING_CYCLE_KEYS)[number];
export const DEFAULT_BILLING_CYCLE: BillingCycleKey = 'yearly';

/** Plan keys in display order. Each resolves under `pricing.plans.<key>`. */
export const PLAN_KEYS = ['free', 'starter', 'pro', 'growth', 'enterprise'] as const;
export type PlanKey = (typeof PLAN_KEYS)[number];

/** Non-translatable attributes per plan: visual + routing concerns only. */
export type PlanConfig = {
  key: PlanKey;
  featured?: boolean;
  billingNoteTone?: 'default' | 'success';
  ctaHref: string;
  ctaVariant: 'primary' | 'secondary';
};

export const PRICING_PLANS: readonly PlanConfig[] = [
  { key: 'free', ctaHref: '#', ctaVariant: 'secondary' },
  { key: 'starter', billingNoteTone: 'success', ctaHref: '#', ctaVariant: 'secondary' },
  { key: 'pro', featured: true, billingNoteTone: 'success', ctaHref: '#', ctaVariant: 'primary' },
  { key: 'growth', billingNoteTone: 'success', ctaHref: '#', ctaVariant: 'secondary' },
  { key: 'enterprise', ctaHref: '#', ctaVariant: 'secondary' },
] as const;
