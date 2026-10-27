import { PLAN_KEYS, type PlanKey } from './landing-pricing';

/** Plan column keys for the compare table, in display order. */
export const COMPARE_PLAN_COLUMNS: readonly PlanKey[] = PLAN_KEYS;
export type ComparePlanColumn = PlanKey;

/** The plan highlighted (orange header + tinted column cells). */
export const COMPARE_FEATURED_COLUMN: ComparePlanColumn = 'pro';

export type CompareGroupConfig = {
  /** Key under `pricing.compare.groups.<key>` for title. */
  key: string;
  /** Row keys under `pricing.compare.groups.<key>.rows.<rowKey>`. */
  rowKeys: readonly string[];
};

export const COMPARE_GROUPS: readonly CompareGroupConfig[] = [
  { key: 'selling', rowKeys: ['products', 'ordersPerMonth', 'feePhysical', 'resell'] },
  { key: 'store', rowKeys: ['customDomain', 'removeBranding'] },
  { key: 'operations', rowKeys: ['staff', 'warehouses', 'pos'] },
  { key: 'marketing', rowKeys: ['aiActions', 'fbCapi'] },
  { key: 'payments', rowKeys: ['securePay', 'courierIntegrations'] },
] as const;
