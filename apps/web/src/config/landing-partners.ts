import type { Provider } from '@/types/marketing.types';

export const PARTNERS_HEADING =
  'Works with the couriers and payment methods your customers already use';

/**
 * Placeholder provider tiles — brand hex values are intentional (per Figma
 * "brand hex, not tokens"). Replace with real SVG logos when assets arrive.
 */
export const PARTNERS: readonly Provider[] = [
  { name: 'bKash', initials: 'bK', tileHex: '#e2136e' },
  { name: 'Nagad', initials: 'N', tileHex: '#f6921e' },
  { name: 'Rocket', initials: 'R', tileHex: '#8c3494' },
  { name: 'SSLCOMMERZ', initials: 'SSL', tileHex: '#1a4f9c' },
  { name: 'Pathao', initials: 'P', tileHex: '#e8212a' },
  { name: 'RedX', initials: 'RX', tileHex: '#c8102e' },
  { name: 'Steadfast', initials: 'SF', tileHex: '#16a34a' },
  { name: 'Paperfly', initials: 'PF', tileHex: '#2563eb' },
] as const;
