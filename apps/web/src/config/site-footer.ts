import type { FooterColumn, OfficeInfo } from '@/types/nav.types';

export const FOOTER_COLUMNS: readonly FooterColumn[] = [
  {
    key: 'product',
    title: 'Product',
    items: [
      { href: '/pricing', label: 'Pricing' },
      { href: '/templates', label: 'Templates' },
      { href: '/demo', label: 'Demo store' },
      { href: '/pos', label: 'POS' },
      { href: '/ai', label: 'AI tools' },
    ],
  },
  {
    key: 'ecosystem',
    title: 'Ecosystem',
    items: [
      { href: '/experts', label: 'Experts' },
      { href: '/funding', label: 'Funding' },
      { href: '/learn', label: 'Learn' },
      { href: '/affiliates', label: 'Affiliates · up to 15% recurring' },
    ],
  },
  {
    key: 'company',
    title: 'Company',
    items: [
      { href: '/about', label: 'About us' },
      { href: '/contact', label: 'Contact' },
      { href: '/careers', label: 'Careers' },
      { href: '/partners', label: 'Partners' },
    ],
  },
  {
    key: 'legal',
    title: 'Legal',
    items: [
      { href: '/legal/terms', label: 'Terms & conditions' },
      { href: '/legal/privacy', label: 'Privacy policy' },
      { href: '/legal/refund', label: 'Return & refund policy' },
    ],
  },
] as const;

export const FOOTER_OFFICES: readonly OfficeInfo[] = [
  { title: 'Dhaka (HQ)', body: 'Level 7, House 42, Road 11, Banani, Dhaka 1213' },
  { title: 'Chattogram', body: 'GEC Circle, Chattogram 4000' },
  { title: 'Support', body: 'support@ecommanager.com.bd · 09XXX-XXXXXX · 9 AM – 10 PM' },
] as const;

export const FOOTER_TAGLINE =
  'Everything a Bangladeshi seller needs to sell online and in-store — website, orders, courier, payments and AI.';
