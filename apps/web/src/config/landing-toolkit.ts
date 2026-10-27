import {
  BarChart3,
  CreditCard,
  FileText,
  LayoutTemplate,
  Megaphone,
  Package,
  Printer,
  Repeat,
  ShoppingBag,
  Sparkles,
  Store,
  Truck,
  type LucideIcon,
} from 'lucide-react';

export const TOOLKIT_SEE_ALL_HREF = '#';

export type ToolkitFeature = {
  /** Key under `home.toolkit.features.<key>` for title + description. */
  key: string;
  icon: LucideIcon;
};

export const TOOLKIT_FEATURES: readonly ToolkitFeature[] = [
  { key: 'shipping', icon: Truck },
  { key: 'inventory', icon: Package },
  { key: 'orders', icon: ShoppingBag },
  { key: 'ai', icon: Sparkles },
  { key: 'website', icon: LayoutTemplate },
  { key: 'analytics', icon: BarChart3 },
  { key: 'payments', icon: CreditCard },
  { key: 'courier', icon: Printer },
  { key: 'marketing', icon: Megaphone },
  { key: 'invoices', icon: FileText },
  { key: 'pos', icon: Store },
  { key: 'resell', icon: Repeat },
] as const;

/** Three tiles highlighted on mobile per Figma. Must match TOOLKIT_FEATURES keys. */
export const TOOLKIT_MOBILE_HIGHLIGHT_KEYS: readonly string[] = ['courier', 'payments', 'ai'] as const;
