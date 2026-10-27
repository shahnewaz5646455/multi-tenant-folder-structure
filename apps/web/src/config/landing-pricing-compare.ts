import type { CompareGroup } from '@/types/marketing.types';

/** Plan column labels for the compare table (in display order).
 * Must match the plan.name values used in PRICING_PLANS so the row-values
 * objects can be keyed consistently. */
export const COMPARE_PLAN_COLUMNS = ['Free', 'Starter', 'Pro', 'Growth', 'Enterprise'] as const;

export type ComparePlanColumn = (typeof COMPARE_PLAN_COLUMNS)[number];

/** The plan highlighted (orange header + tinted column cells). */
export const COMPARE_FEATURED_COLUMN: ComparePlanColumn = 'Pro';

export const COMPARE_HEADER_LABEL = 'Compare all features';

export const COMPARE_GROUPS: readonly CompareGroup[] = [
  {
    title: 'Selling',
    rows: [
      {
        label: 'Products',
        values: {
          Free: '10',
          Starter: '250',
          Pro: 'Unlimited',
          Growth: 'Unlimited',
          Enterprise: 'Unlimited',
        },
      },
      {
        label: 'Orders per month',
        values: {
          Free: '50',
          Starter: '500',
          Pro: '2,000',
          Growth: '10,000',
          Enterprise: 'Unlimited',
        },
      },
      {
        label: 'Per-order fee (physical)',
        values: {
          Free: '2%',
          Starter: '0.5%',
          Pro: '0.3%',
          Growth: '0.2%',
          Enterprise: 'Custom',
        },
      },
      {
        label: 'Resell products',
        values: { Free: true, Starter: true, Pro: true, Growth: true, Enterprise: true },
      },
    ],
  },
  {
    title: 'Store & branding',
    rows: [
      {
        label: 'Custom domain',
        values: { Free: false, Starter: true, Pro: true, Growth: true, Enterprise: true },
      },
      {
        label: 'Remove “Powered by Ecom Manager”',
        values: { Free: false, Starter: false, Pro: true, Growth: true, Enterprise: true },
      },
    ],
  },
  {
    title: 'Operations',
    rows: [
      {
        label: 'Staff accounts',
        values: {
          Free: '1',
          Starter: '3',
          Pro: '10',
          Growth: '25',
          Enterprise: 'Unlimited',
        },
      },
      {
        label: 'Warehouses',
        values: {
          Free: '1',
          Starter: '2',
          Pro: '5',
          Growth: '10',
          Enterprise: 'Unlimited',
        },
      },
      {
        label: 'POS',
        values: { Free: false, Starter: false, Pro: true, Growth: true, Enterprise: true },
      },
    ],
  },
  {
    title: 'Marketing & growth',
    rows: [
      {
        label: 'AI actions per month',
        values: {
          Free: '50',
          Starter: '500',
          Pro: '2,000',
          Growth: '10,000',
          Enterprise: 'Custom',
        },
      },
      {
        label: 'Facebook Conversions API',
        values: { Free: false, Starter: true, Pro: true, Growth: true, Enterprise: true },
      },
    ],
  },
  {
    title: 'Payments & delivery',
    rows: [
      {
        label: 'SecurePay',
        values: { Free: false, Starter: true, Pro: true, Growth: true, Enterprise: true },
      },
      {
        label: 'Courier integrations',
        values: {
          Free: '1',
          Starter: 'All',
          Pro: 'All',
          Growth: 'All',
          Enterprise: 'All',
        },
      },
    ],
  },
] as const;
