import type { LucideIcon } from 'lucide-react';

export type IconTone = 'success' | 'info' | 'warning';

export type FeatureTileData = {
  icon: LucideIcon;
  tone?: IconTone;
  title: string;
  description: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  meta: string;
  rating: 1 | 2 | 3 | 4 | 5;
  initials: string;
};

export type FaqEntry = {
  question: string;
  answer: string;
};

/** One bar in the hero dashboard chart. Values are pixel heights at the Figma 420px frame. */
export type ChartBar = { online: number; cod: number };

/** Compact KPI tile (hero dashboard "Sales / Orders / Visitors"). */
export type KpiTile = { label: string; value: string };

/** Full stat card (live-stats grid). Icon lets the rating card show a star. */
export type Stat = { value: string; label: string; icon?: LucideIcon };

/** Sales split-bar card data. Percents must sum to 100. */
export type SalesSplit = {
  total: string;
  online: { value: string; percent: number };
  cod: { value: string; percent: number };
};

/** Partner / provider placeholder tile. Hex is a one-off brand colour, not a token. */
export type Provider = {
  name: string;
  initials: string;
  /** Brand hex — placeholder tile only. Replace with an SVG asset when provided. */
  tileHex: string;
};

/** Theme card entry for the Templates section. `tone` picks the hero band fill. */
export type ThemeEntry = {
  name: string;
  niche: string;
  tone: 'orange' | 'blue' | 'red' | 'green';
  previewHref: string;
};

/** Category tab for the Templates section. */
export type ThemeCategory = {
  key: string;
  label: string;
  href: string;
};

/** One billing cycle option for the pricing page toggle. */
export type BillingCycle = {
  key: 'monthly' | 'half-yearly' | 'yearly';
  label: string;
  /** Optional savings tag, e.g. "save 10%". Rendered beside the label on wide
   * viewports and on its own line inside the chip on mobile. */
  badge?: string;
};

/** CTA button on a plan card. */
export type PlanCta = {
  label: string;
  href: string;
  variant: 'primary' | 'secondary';
};

/** Cell value in the pricing compare table.
 * `true`  → green check (included)
 * `false` → grey minus (not included)
 * string  → inline text (number, limit, "Unlimited", "Custom", …) */
export type CompareValue = string | boolean;

/** One row in the compare table — label + one value per plan key. */
export type CompareRow = {
  label: string;
  /** Values keyed by plan name, matching PRICING_PLANS[].name. */
  values: Readonly<Record<string, CompareValue>>;
};

/** Grouping of rows under an uppercase overline (e.g. "SELLING"). */
export type CompareGroup = {
  title: string;
  rows: readonly CompareRow[];
};

/** One per-order fee tile shown in the pricing-fees card. */
export type FeeTile = {
  icon: LucideIcon;
  label: string;
  /** Big value, e.g. "0.2% – 2%", "1%", "৳ 10". */
  value: string;
  hint: string;
};

/** One plan tile (Free / Starter / Pro / Growth / Enterprise). */
export type Plan = {
  name: string;
  /** Rendered as the big number — a string so "Custom" works alongside "৳ 1,118". */
  price: string;
  /** "/month"; omit for Custom. */
  priceSuffix?: string;
  /** First info line under the price. `tone: 'success'` paints the savings line green. */
  billingNote: string;
  billingNoteTone?: 'default' | 'success';
  /** One-line pitch under the billing note. */
  pitch: string;
  cta: PlanCta;
  features: readonly string[];
  /** Highlights the Pro plan with the orange border and "Most popular" badge. */
  featured?: boolean;
  badge?: string;
};
