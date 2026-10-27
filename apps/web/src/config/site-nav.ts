import type { NavItem } from '@/types/nav.types';

export const SITE_NAV: readonly NavItem[] = [
  { href: '/pricing', label: 'Pricing' },
  { href: '/templates', label: 'Templates' },
  { href: '/experts', label: 'Experts' },
  { href: '/funding', label: 'Funding' },
  { href: '/learn', label: 'Learn' },
  { href: '/affiliates', label: 'Affiliates' },
  { href: '/about', label: 'About us' },
] as const;
