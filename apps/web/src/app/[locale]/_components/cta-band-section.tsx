import type { JSX } from 'react';
import { useTranslations } from 'next-intl';
import { CTA_BAND_HREFS } from '@/config/landing-cta';

export function CtaBandSection(): JSX.Element {
  const t = useTranslations('home.ctaBand');

  return (
    <section className="w-full bg-primary">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-5 px-4 py-14 text-center sm:px-6 lg:px-16 lg:py-18 xl:px-[120px]">
        <h2 className="display-lg text-2xl text-primary-foreground">{t('title')}</h2>
        {/* Subtitle hidden on mobile per Figma */}
        <p className="hidden text-base leading-6 text-primary-foreground sm:block">
          {t('subtitle')}
        </p>

        <div className="mt-1 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
          <a
            href={CTA_BAND_HREFS.primary}
            className="inline-flex h-11 items-center justify-center rounded-md border border-border-strong bg-background px-5 py-3 text-sm font-medium text-foreground hover:bg-muted"
          >
            {t('primary')}
          </a>
          {/* Secondary CTA hidden on mobile per Figma */}
          <a
            href={CTA_BAND_HREFS.secondary}
            className="hidden h-11 items-center justify-center rounded-md px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-brand-700 sm:inline-flex"
          >
            {t('secondary')}
          </a>
        </div>
      </div>
    </section>
  );
}
