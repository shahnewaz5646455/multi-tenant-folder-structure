import type { ChartBar } from '@/types/marketing.types';

/** Translation keys for the three KPI tiles inside the hero dashboard. */
export const HERO_KPI_KEYS = ['sales', 'orders', 'visitors'] as const;
export type HeroKpiKey = (typeof HERO_KPI_KEYS)[number];

/** Translation keys for the three trust-row items under the hero CTAs. */
export const HERO_TRUST_KEYS = ['noCard', 'freeForever', 'liveIn60'] as const;
export type HeroTrustKey = (typeof HERO_TRUST_KEYS)[number];

export const HERO_CTAS = {
  primary: { href: '/signup' },
  secondary: { href: '#' },
} as const;

/** Figma heights (px) at the 420px visual frame. Normalised to percent at render time. */
export const HERO_CHART_BARS: readonly ChartBar[] = [
  { online: 30, cod: 40 },
  { online: 34, cod: 56 },
  { online: 40, cod: 48 },
  { online: 44, cod: 70 },
  { online: 52, cod: 62 },
  { online: 58, cod: 84 },
  { online: 66, cod: 96 },
  { online: 60, cod: 78 },
  { online: 72, cod: 104 },
  { online: 80, cod: 120 },
] as const;
