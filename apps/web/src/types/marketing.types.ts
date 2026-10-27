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
