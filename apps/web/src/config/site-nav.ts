import type { NavItem } from '@/types/nav.types';

export const SITE_NAV: readonly NavItem[] = [
  { href: '/pricing', label: 'Pricing' },
  { href: '#', label: 'Templates' },
  { href: '#', label: 'Experts' },
  { href: '#', label: 'Funding' },
  { href: '#', label: 'Learn' },
  { href: '#', label: 'Affiliates' },
  { href: '#', label: 'About us' },
] as const;
