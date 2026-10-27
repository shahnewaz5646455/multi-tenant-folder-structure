import type { BillingCycle, Plan } from '@/types/marketing.types';

export const PRICING_HEADING = {
  overline: 'PRICING',
  title: 'Simple pricing that grows with your shop',
  subtitle:
    'Start free. Upgrade when you need more orders, staff or your own domain. All prices in BDT, VAT included.',
} as const;

export const BILLING_CYCLES: readonly BillingCycle[] = [
  { key: 'monthly', label: 'Monthly' },
  { key: 'half-yearly', label: '6 months', badge: 'save 10%' },
  { key: 'yearly', label: 'Yearly', badge: 'save 25%' },
] as const;

export const DEFAULT_BILLING_CYCLE: BillingCycle['key'] = 'yearly';

export const PRICING_PLANS: readonly Plan[] = [
  {
    name: 'Free',
    price: '৳ 0',
    priceSuffix: '/month',
    billingNote: 'Free forever · no card needed',
    pitch: 'For trying things out.',
    cta: { label: 'Start for free', href: '#', variant: 'secondary' },
    features: [
      '10 products',
      '50 orders / month',
      'Owner only',
      '2% fee per order',
      'ecom.bd subdomain',
    ],
  },
  {
    name: 'Starter',
    price: '৳ 1,118',
    priceSuffix: '/month',
    billingNote: 'Billed ৳ 13,410 yearly · save ৳ 4,470',
    billingNoteTone: 'success',
    pitch: 'For new Facebook & web sellers.',
    cta: { label: 'Start 14-day trial', href: '#', variant: 'secondary' },
    features: [
      '250 products',
      '500 orders / month',
      '3 staff · 2 warehouses',
      '0.5% fee per order',
      'Custom domain',
    ],
  },
  {
    name: 'Pro',
    price: '৳ 2,243',
    priceSuffix: '/month',
    billingNote: 'Billed ৳ 26,910 yearly · save ৳ 8,970',
    billingNoteTone: 'success',
    pitch: 'For growing brands with a shop.',
    cta: { label: 'Start 14-day trial', href: '#', variant: 'primary' },
    featured: true,
    badge: 'Most popular',
    features: [
      'Unlimited products',
      '2,000 orders / month',
      '10 staff · 5 warehouses',
      '0.3% fee per order',
      'POS + live chat support',
    ],
  },
  {
    name: 'Growth',
    price: '৳ 4,493',
    priceSuffix: '/month',
    billingNote: 'Billed ৳ 53,910 yearly · save ৳ 17,970',
    billingNoteTone: 'success',
    pitch: 'For high-volume campaigns.',
    cta: { label: 'Start 14-day trial', href: '#', variant: 'secondary' },
    features: [
      'Unlimited products',
      '10,000 orders / month',
      '25 staff · 10 warehouses',
      '0.2% fee per order',
      'Turbo server for sales',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    billingNote: 'Talk to our team',
    pitch: 'For brands and chains.',
    cta: { label: 'Contact sales', href: '#', variant: 'secondary' },
    features: [
      'Unlimited everything',
      'Custom per-order fees',
      'Dedicated account manager',
      '99.9% uptime SLA',
      'Custom integrations',
    ],
  },
] as const;
