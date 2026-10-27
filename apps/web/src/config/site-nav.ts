import type { NavItem } from '@/types/nav.types';

export const SITE_NAV: readonly NavItem[] = [
  { href: '/pricing', labelKey: 'pricing' },
  { href: '#', labelKey: 'templates' },
  { href: '#', labelKey: 'experts' },
  { href: '#', labelKey: 'funding' },
  { href: '#', labelKey: 'learn' },
  { href: '#', labelKey: 'affiliates' },
  { href: '#', labelKey: 'aboutUs' },
] as const;
