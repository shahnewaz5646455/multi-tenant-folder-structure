'use client';

import type { JSX } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@ecm/ui/cn';
import { LOCALES, type Locale } from '@ecm/i18n';
import { Link, usePathname } from '@/i18n/navigation';

type Variant = 'desktop' | 'mobile';

export type LocaleSwitcherProps = {
  variant?: Variant;
  className?: string;
};

const LOCALE_LABEL_KEY: Record<Locale, 'englishShort' | 'banglaShort'> = {
  en: 'englishShort',
  bn: 'banglaShort',
};

export function LocaleSwitcher({ variant = 'desktop', className }: LocaleSwitcherProps): JSX.Element {
  const active = useLocale() as Locale;
  const pathname = usePathname();
  const t = useTranslations('common.locale');

  const sizeClasses =
    variant === 'desktop'
      ? 'h-8 px-2.5 text-xs'
      : 'h-10 px-3 text-sm';

  return (
    <div
      role="group"
      aria-label={t('switcherAria')}
      className={cn(
        'inline-flex items-center rounded-md border border-border bg-background p-0.5',
        className,
      )}
    >
      {LOCALES.map((locale) => {
        const isActive = locale === active;
        const label = t(LOCALE_LABEL_KEY[locale]);
        return (
          <Link
            key={locale}
            href={pathname}
            locale={locale}
            aria-current={isActive ? 'true' : undefined}
            lang={locale}
            className={cn(
              'inline-flex items-center justify-center rounded font-medium transition-colors',
              sizeClasses,
              isActive
                ? 'bg-muted text-foreground'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
