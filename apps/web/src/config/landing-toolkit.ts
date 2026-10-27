import {
  Truck,
  Package,
  ShoppingBag,
  Sparkles,
  LayoutTemplate,
  BarChart3,
  CreditCard,
  Printer,
  Megaphone,
  FileText,
  Store,
  Repeat,
} from 'lucide-react';
import type { FeatureTileData } from '@/types/marketing.types';

export const TOOLKIT_HEADING = {
  overline: 'ALL-IN-ONE TOOLKIT',
  title: 'Everything you need to run your shop',
  subtitle:
    'Stop juggling spreadsheets, courier websites and Messenger. Ecom Manager connects them all.',
} as const;

/** Three tiles highlighted on mobile per Figma. Must match TOOLKIT_FEATURES titles. */
export const TOOLKIT_MOBILE_HIGHLIGHT_TITLES: readonly string[] = [
  'Courier booking',
  'Payments',
  'AI tools',
] as const;

export const TOOLKIT_SEE_ALL = { label: 'See all 12 tools', href: '/features' } as const;

export const TOOLKIT_FEATURES: readonly FeatureTileData[] = [
  {
    icon: Truck,
    title: 'Shipping & delivery',
    description: 'Delivery zones, charges and free-delivery rules for all 64 districts.',
  },
  {
    icon: Package,
    title: 'Inventory',
    description: 'Stock across warehouses with low-stock alerts and AI forecasts.',
  },
  {
    icon: ShoppingBag,
    title: 'Orders',
    description: 'One list for web, Facebook, POS and manual orders.',
  },
  {
    icon: Sparkles,
    title: 'AI tools',
    description: 'Write product pages, fill SEO and flag risky COD orders.',
  },
  {
    icon: LayoutTemplate,
    title: 'Website builder',
    description: 'Drag-and-drop themes made for Bangladeshi shops.',
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    description: 'Live sales, top products, districts and custom reports.',
  },
  {
    icon: CreditCard,
    title: 'Payments',
    description: 'COD, bKash, Nagad, Rocket, cards and SecurePay escrow.',
  },
  {
    icon: Printer,
    title: 'Courier booking',
    description: 'Book Pathao, RedX or Steadfast in one click and print labels.',
  },
  {
    icon: Megaphone,
    title: 'SEO & marketing',
    description: 'Pixel, Conversions API, GA4, sitemap and cart recovery.',
  },
  {
    icon: FileText,
    title: 'Invoices',
    description: 'Branded A4 invoices and thermal receipts, Bangla or English.',
  },
  {
    icon: Store,
    title: 'POS',
    description: 'Sell in your shop with the same stock, cash and bKash.',
  },
  {
    icon: Repeat,
    title: 'Resell',
    description: 'Sell supplier products without keeping stock.',
  },
] as const;
