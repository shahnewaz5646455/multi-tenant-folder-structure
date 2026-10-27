import type { FooterColumn, OfficeKey } from '@/types/nav.types';

export const FOOTER_COLUMNS: readonly FooterColumn[] = [
  {
    key: 'product',
    items: [
      { href: '/pricing', labelKey: 'pricing' },
      { href: '/templates', labelKey: 'templates' },
      { href: '/demo', labelKey: 'demo' },
      { href: '/pos', labelKey: 'pos' },
      { href: '/ai', labelKey: 'ai' },
    ],
  },
  {
    key: 'ecosystem',
    items: [
      { href: '/experts', labelKey: 'experts' },
      { href: '/funding', labelKey: 'funding' },
      { href: '/learn', labelKey: 'learn' },
      { href: '/affiliates', labelKey: 'affiliates' },
    ],
  },
  {
    key: 'company',
    items: [
      { href: '/about', labelKey: 'about' },
      { href: '/contact', labelKey: 'contact' },
      { href: '/careers', labelKey: 'careers' },
      { href: '/partners', labelKey: 'partners' },
    ],
  },
  {
    key: 'legal',
    items: [
      { href: '/legal/terms', labelKey: 'terms' },
      { href: '/legal/privacy', labelKey: 'privacy' },
      { href: '/legal/refund', labelKey: 'refund' },
    ],
  },
] as const;

export const FOOTER_OFFICES: readonly OfficeKey[] = ['dhaka', 'chattogram', 'support'] as const;
