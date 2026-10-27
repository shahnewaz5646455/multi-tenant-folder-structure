'use client';

import { Globe } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import type { JSX } from 'react';
import { LOCALES, type Locale } from '@ecm/i18n';
import { cn } from '@ecm/ui/cn';
import { Link, usePathname } from '@/i18n/navigation';

/* Each language is shown by its endonym — "English", "বাংলা" — not translated
 * into the active UI locale. That's how Figma shows it and the standard way
 * language switchers list languages so a non-reader of the active locale can
 * still find their language. */
const ENDONYMS: Record<Locale, string> = {
  en: 'English',
  bn: 'বাংলা',
};

export function AuthLocaleSwitcher(): JSX.Element {
  const active = useLocale() as Locale;
  const pathname = usePathname();
  const t = useTranslations('common.locale');

  return (
    <nav
      aria-label={t('switcherAria')}
      className="flex items-center gap-1 text-xs font-medium text-muted-foreground"
    >
      <Globe className="size-4" aria-hidden />
      {LOCALES.map((locale, index) => {
        const isActive = locale === active;
        return (
          <span key={locale} className="flex items-center">
            {index > 0 ? (
              <span aria-hidden className="mx-1">
                ·
              </span>
            ) : null}
            <Link
              href={pathname}
              locale={locale}
              aria-current={isActive ? 'true' : undefined}
              lang={locale}
              className={cn(
                'rounded px-0.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30',
                isActive ? 'text-foreground' : 'hover:text-foreground',
              )}
            >
              {ENDONYMS[locale]}
            </Link>
          </span>
        );
      })}
    </nav>
  );
}
