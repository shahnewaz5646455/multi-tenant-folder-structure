import type { FaqEntry } from '@/types/marketing.types';

export const PRICING_FAQ_HEADING = {
  title: 'Pricing questions',
} as const;

export const PRICING_FAQ: readonly FaqEntry[] = [
  {
    question: 'What happens when the trial ends?',
    answer:
      'You move to the Free plan automatically. Nothing is deleted; products over the Free limit are hidden until you upgrade.',
  },
  {
    question: 'Can I change plans later?',
    answer:
      'Yes. Upgrades apply immediately with credit for unused days. Downgrades take effect at the end of your billing period.',
  },
  {
    question: 'How do I pay?',
    answer:
      'bKash, Nagad, Rocket or card. Auto-pay is optional; we send a reminder 3 days before renewal.',
  },
  {
    question: 'Are courier charges included?',
    answer:
      'No. Courier charges are billed by the courier. We show the cost before you book.',
  },
] as const;
