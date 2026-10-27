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
const NAMESPACES = ['common', 'nav', 'footer'] as const;
export type Namespace = (typeof NAMESPACES)[number];

export type Messages = Record<Namespace, Record<string, unknown>>;

export async function loadMessages(locale: Locale): Promise<Messages> {
  const loaded = await Promise.all(
    NAMESPACES.map(
      async (ns) =>
        [ns, (await import(`../messages/${locale}/${ns}.json`)).default as Record<string, unknown>] as const,
    ),
  );
  return Object.fromEntries(loaded) as Messages;
}
