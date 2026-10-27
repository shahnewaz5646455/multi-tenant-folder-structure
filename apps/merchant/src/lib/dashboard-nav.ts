// Blueprint, section D3: menu config declares its permission.
// The sidebar filters on both permission AND feature flag so adding a page
// cannot forget its guard in the menu.
import type { Permission } from '@ecm/permissions';

export type NavItem = {
  href: string;
  label: string;
  permission: Permission;
  feature?: string;
};

export const DASHBOARD_NAV: readonly NavItem[] = [
  { href: '/[storeId]', label: 'Home', permission: 'orders.read' },
  { href: '/[storeId]/orders', label: 'Orders', permission: 'orders.read' },
  { href: '/[storeId]/products', label: 'Products', permission: 'products.read' },
  { href: '/[storeId]/categories', label: 'Categories', permission: 'products.read' },
  { href: '/[storeId]/customers', label: 'Customers', permission: 'orders.read' },
  { href: '/[storeId]/inventory', label: 'Inventory', permission: 'inventory.adjust' },
  { href: '/[storeId]/shipping', label: 'Shipping', permission: 'shipping.book' },
  { href: '/[storeId]/payments', label: 'Payments', permission: 'payments.configure' },
  { href: '/[storeId]/promo-codes', label: 'Promo codes', permission: 'products.write' },
  { href: '/[storeId]/analytics', label: 'Analytics', permission: 'orders.read' },
  { href: '/[storeId]/store-design', label: 'Store design', permission: 'store.design', feature: 'themeBuilder' },
  { href: '/[storeId]/resell', label: 'Resell', permission: 'products.write', feature: 'reseller' },
  { href: '/[storeId]/settings', label: 'Settings', permission: 'staff.manage' },
];
