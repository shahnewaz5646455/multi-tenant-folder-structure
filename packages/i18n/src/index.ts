// Blueprint, section B "i18n": next-intl, bn + en. bn-BD for Bangla numerals.
// Blueprint D "Anti-patterns": no hard-coded strings, even "temporary" ones.
export const LOCALES = ['en', 'bn'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';
export const TIMEZONE = 'Asia/Dhaka';

export function isLocale(x: string): x is Locale {
  return (LOCALES as readonly string[]).includes(x);
}

// Namespaces are per-file so each surface can be reviewed in isolation.
// Each one lands at the top level of the returned object → `useTranslations('nav')`.
const NAMESPACES = ['common', 'nav', 'footer', 'home', 'pricing', 'contact', 'auth', 'onboarding'] as const;
export type Namespace = (typeof NAMESPACES)[number];

export type Messages = Record<Namespace, Record<string, unknown>>;

// Explicit per-(locale, namespace) imports so Turbopack / webpack can statically
// resolve every message file at build time. A single template-literal dynamic
// import (`../messages/${locale}/${ns}.json`) fails to pick up new namespaces
// added while the dev server is already running.
const LOADERS: Record<Locale, Record<Namespace, () => Promise<{ default: Record<string, unknown> }>>> = {
  en: {
    common: () => import('../messages/en/common.json'),
    nav: () => import('../messages/en/nav.json'),
    footer: () => import('../messages/en/footer.json'),
    home: () => import('../messages/en/home.json'),
    pricing: () => import('../messages/en/pricing.json'),
    contact: () => import('../messages/en/contact.json'),
    auth: () => import('../messages/en/auth.json'),
    onboarding: () => import('../messages/en/onboarding.json'),
  },
  bn: {
    common: () => import('../messages/bn/common.json'),
    nav: () => import('../messages/bn/nav.json'),
    footer: () => import('../messages/bn/footer.json'),
    home: () => import('../messages/bn/home.json'),
    pricing: () => import('../messages/bn/pricing.json'),
    contact: () => import('../messages/bn/contact.json'),
    auth: () => import('../messages/bn/auth.json'),
    onboarding: () => import('../messages/bn/onboarding.json'),
  },
};

export async function loadMessages(locale: Locale): Promise<Messages> {
  const localeLoaders = LOADERS[locale];
  const loaded = await Promise.all(
    NAMESPACES.map(async (ns) => [ns, (await localeLoaders[ns]()).default] as const),
  );
  return Object.fromEntries(loaded) as Messages;
}
