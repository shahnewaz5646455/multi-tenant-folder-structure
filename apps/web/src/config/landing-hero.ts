import type { ChartBar, KpiTile } from '@/types/marketing.types';

export const HERO_COPY = {
  badge: 'New · AI writer & fraud check built in',
  headline: 'Launch your online shop in minutes — sell everywhere in Bangladesh',
  subhead:
    'Website, orders, courier booking, bKash & COD payments, POS and AI tools in one place. Built for Facebook sellers and growing brands.',
  primaryCta: { href: '#', label: 'Start for free' },
  secondaryCta: { href: '#', label: 'View demo store' },
  trust: [
    'No credit card required',
    'Free plan forever',
    'Store live in 60 seconds',
  ],
} as const;

export const HERO_KPIS: readonly KpiTile[] = [
  { label: 'Sales', value: '৳ 48,350' },
  { label: 'Orders', value: '32' },
  { label: 'Visitors', value: '1,284' },
] as const;

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

export const HERO_TOAST = {
  title: 'New order #1049',
  meta: '৳ 2,450 · COD · Pathao booked',
} as const;
