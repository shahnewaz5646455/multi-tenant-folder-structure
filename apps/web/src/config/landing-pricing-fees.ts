import { Download, Package, Repeat, type LucideIcon } from 'lucide-react';

export type FeeTileConfig = {
  /** Key under `pricing.fees.items.<key>` for label / value / hint. */
  key: string;
  icon: LucideIcon;
};

export const PRICING_FEES: readonly FeeTileConfig[] = [
  { key: 'physical', icon: Package },
  { key: 'digital', icon: Download },
  { key: 'resell', icon: Repeat },
] as const;
