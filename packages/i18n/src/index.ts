// Blueprint, section B "i18n": next-intl, bn + en. bn-BD for Bangla numerals.
// Blueprint D "Anti-patterns": no hard-coded strings, even "temporary" ones.
export const LOCALES = ['en', 'bn'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';
export const TIMEZONE = 'Asia/Dhaka';

export function isLocale(x: string): x is Locale {
  return (LOCALES as readonly string[]).includes(x);
}

export async function loadMessages(locale: Locale): Promise<Record<string, string>> {
  const common = await import(`../messages/${locale}/common.json`);
  return common.default;
}
