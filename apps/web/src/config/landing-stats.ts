/** Keys for the compact 4-tile stat selection shown on mobile (per Figma). */
export const MOBILE_STAT_KEYS = [
  'ordersToday',
  'salesToday',
  'activeShops',
  'verifiedReviews',
] as const;
export type MobileStatKey = (typeof MOBILE_STAT_KEYS)[number];

/** Keys for the 8 stat tiles shown on desktop beside the SalesSplitCard. */
export const DESKTOP_STAT_KEYS = [
  'ordersToday',
  'ordersThisWeek',
  'newShopsToday',
  'activeShops',
  'totalShops',
  'totalOrders',
  'verifiedReviews',
  'avgRating',
] as const;
export type DesktopStatKey = (typeof DESKTOP_STAT_KEYS)[number];

/** Which desktop stat gets the star icon treatment. */
export const DESKTOP_RATING_STAT_KEY = 'avgRating' as const;

/** Share-bar percents for the SalesSplitCard. Must sum to 100. */
export const SALES_SPLIT_PERCENTS = { online: 40, cod: 60 } as const;
