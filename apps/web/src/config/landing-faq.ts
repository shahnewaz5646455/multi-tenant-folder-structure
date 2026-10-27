import type { FaqEntry } from '@/types/marketing.types';

export const FAQ_HEADING = {
  overline: 'FAQ',
  title: 'Questions sellers ask us',
  support: 'Still unsure? Talk to us on WhatsApp or call 09XXX-XXXXXX, 9 AM – 10 PM.',
  cta: { label: 'Contact sales', href: '/contact' },
} as const;

export const FAQ_ENTRIES: readonly FaqEntry[] = [
  {
    question: 'Do I need a credit card to start?',
    answer:
      'No. The Free plan needs no card. Upgrade any time with bKash, Nagad or card — you only pay when you are ready.',
  },
  {
    question: 'Can I use my own domain like rahimfashion.com?',
    answer: 'Yes, on Starter and above. Connect it in a few minutes; HTTPS is free and automatic.',
  },
  {
    question: 'Which couriers and payment methods are supported?',
    answer:
      'Pathao, RedX, Steadfast, Paperfly and more. Payments: COD, bKash, Nagad, Rocket, cards via SSLCOMMERZ, and SecurePay.',
  },
  {
    question: 'Is there a fee per order?',
    answer: 'Each plan has a small per-order fee by product type. See Pricing for the exact rates.',
  },
  {
    question: 'Can I sell in Bangla?',
    answer: 'Yes. Your store, invoices and SMS can be in Bangla, English or both.',
  },
] as const;
