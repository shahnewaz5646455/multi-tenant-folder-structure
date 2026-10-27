import type { ThemeCategory, ThemeEntry } from '@/types/marketing.types';

export const TEMPLATES_HEADING = {
  overline: 'TEMPLATES',
  title: 'Beautiful stores for every niche',
  subtitle: 'Preview any template as a real demo store — no sign-up needed.',
} as const;

export const TEMPLATES_CATEGORIES: readonly ThemeCategory[] = [
  { key: 'all', label: 'All', href: '/templates' },
  { key: 'lifestyle', label: 'Lifestyle', href: '/templates?cat=lifestyle' },
  { key: 'electronics', label: 'Electronics', href: '/templates?cat=electronics' },
  { key: 'cosmetics', label: 'Cosmetics', href: '/templates?cat=cosmetics' },
  { key: 'books', label: 'Books', href: '/templates?cat=books' },
  { key: 'organic', label: 'Organic', href: '/templates?cat=organic' },
  { key: 'sports-toys', label: 'Sports & toys', href: '/templates?cat=sports-toys' },
] as const;

export const TEMPLATES_FEATURED: readonly ThemeEntry[] = [
  { name: 'Fashion Street', niche: 'Lifestyle · 8 templates', tone: 'orange', previewHref: '/templates/fashion-street' },
  { name: 'Gadget Hub', niche: 'Electronics · 9 templates', tone: 'blue', previewHref: '/templates/gadget-hub' },
  { name: 'Glow Beauty', niche: 'Cosmetics · 6 templates', tone: 'red', previewHref: '/templates/glow-beauty' },
  { name: 'Daily Bazar', niche: 'Organic & grocery · 7 templates', tone: 'green', previewHref: '/templates/daily-bazar' },
] as const;

export const TEMPLATES_SEE_ALL = {
  label: 'See all 52 templates',
  href: '#',
} as const;
