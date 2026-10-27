import { Download, Package, Repeat } from 'lucide-react';
import type { FeeTile } from '@/types/marketing.types';

export const PRICING_FEES_HEADING = {
  title: 'Per-order fees',
  subtitle: 'Charged only when you get an order, deducted from your payout.',
} as const;

export const PRICING_FEES: readonly FeeTile[] = [
  {
    icon: Package,
    label: 'Physical products',
    value: '0.2% – 2%',
    hint: 'depends on your plan',
  },
  {
    icon: Download,
    label: 'Digital products',
    value: '1%',
    hint: 'e-books, courses, files',
  },
  {
    icon: Repeat,
    label: 'Resell products',
    value: '৳ 10',
    hint: 'per order, any plan',
  },
] as const;
