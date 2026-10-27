import type { ThemeEntry } from '@/types/marketing.types';

export type TemplateCategory = {
  /** Key under `home.templates.categories.<key>`. */
  key: string;
  href: string;
};

export const TEMPLATES_CATEGORIES: readonly TemplateCategory[] = [
  { key: 'all', href: '/templates' },
  { key: 'lifestyle', href: '/templates?cat=lifestyle' },
  { key: 'electronics', href: '/templates?cat=electronics' },
  { key: 'cosmetics', href: '/templates?cat=cosmetics' },
  { key: 'books', href: '/templates?cat=books' },
  { key: 'organic', href: '/templates?cat=organic' },
  { key: 'sports-toys', href: '/templates?cat=sports-toys' },
] as const;

/** `textKey` points at `home.templates.featured.<textKey>.{name,niche}`. Keeps
 * tone (visual) and previewHref (routing) as code-only concerns. */
export type FeaturedTemplate = {
  textKey: string;
  tone: ThemeEntry['tone'];
  previewHref: string;
};

export const TEMPLATES_FEATURED: readonly FeaturedTemplate[] = [
  { textKey: 'fashionStreet', tone: 'orange', previewHref: '/templates/fashion-street' },
  { textKey: 'gadgetHub', tone: 'blue', previewHref: '/templates/gadget-hub' },
  { textKey: 'glowBeauty', tone: 'red', previewHref: '/templates/glow-beauty' },
  { textKey: 'dailyBazar', tone: 'green', previewHref: '/templates/daily-bazar' },
] as const;

export const TEMPLATES_SEE_ALL_HREF = '#';
export const TEMPLATES_ACTIVE_CATEGORY_KEY = 'all';
