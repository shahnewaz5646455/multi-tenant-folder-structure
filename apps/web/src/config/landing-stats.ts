import { Star } from 'lucide-react';
import type { SalesSplit, Stat } from '@/types/marketing.types';

export const LIVE_INDICATOR = {
  text: 'Live on Ecom Manager · updated 10:45 AM · refreshes every 15 minutes',
  shortText: 'Live · updated 10:45 AM',
} as const;

/** Compact 4-tile stat selection shown on mobile only (per mobile Figma). */
export const MOBILE_LIVE_STATS: readonly Stat[] = [
  { value: '18,420', label: 'Orders today' },
  { value: '৳ 2.14 Cr', label: 'Sales today' },
  { value: '8,920', label: 'Active shops' },
  { value: '3,240', label: 'Verified reviews' },
] as const;

export const SALES_SPLIT: SalesSplit = {
  total: '৳ 2,14,60,000',
  online: { value: '৳ 86.4 L', percent: 40 },
  cod: { value: '৳ 1.28 Cr', percent: 60 },
};

export const LIVE_STATS: readonly Stat[] = [
  { value: '18,420', label: 'Orders today' },
  { value: '1,12,860', label: 'Orders this week' },
  { value: '146', label: 'New shops today' },
  { value: '8,920', label: 'Active shops' },
  { value: '24,310', label: 'Total shops' },
  { value: '48,62,000', label: 'Total orders' },
  { value: '3,240', label: 'Verified reviews' },
  { value: '4.8', label: 'Average merchant rating', icon: Star },
] as const;
