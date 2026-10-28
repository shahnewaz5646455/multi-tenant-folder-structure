import type { JSX } from 'react';
import { useTranslations } from 'next-intl';
import { SectionHeading } from '@/components/marketing/section-heading';
import { GO_LIVE_STEP_KEYS } from '@/config/landing-go-live';

export function GoLiveSection(): JSX.Element {
  const t = useTranslations('home.goLive');

  return (
    <section className="w-full bg-background">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-10 px-4 py-14 sm:px-6 lg:px-16 lg:py-20 xl:px-[120px]">
        <SectionHeading overline={t('overline')} title={t('title')} width="narrow" />

        <ol className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {GO_LIVE_STEP_KEYS.map((key, i) => (
            <li key={key} className="flex min-w-0 flex-col items-start gap-3">
              <span
                className="inline-flex size-10 items-center justify-center rounded-full bg-primary text-base font-semibold leading-6 text-primary-foreground"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <h3 className="text-base font-semibold leading-6 text-foreground">
                {t(`steps.${key}.title`)}
              </h3>
              <p className="text-sm leading-5 text-muted-foreground">
                {t(`steps.${key}.description`)}
              </p>
            </li>
          ))}
        </ol>

        <p className="max-w-[640px] text-center text-xs leading-4 text-muted-foreground">
          {t('footnote')}
        </p>
      </div>
    </section>
  );
}
