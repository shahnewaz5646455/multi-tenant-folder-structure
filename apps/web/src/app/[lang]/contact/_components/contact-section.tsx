import type { JSX } from 'react';
import { useTranslations } from 'next-intl';
import { CONTACT_METHODS } from '@/config/landing-contact';
import { ContactForm } from './contact-form';

export function ContactSection(): JSX.Element {
  const t = useTranslations('contact');

  return (
    <section className="w-full bg-background-canvas">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-4 py-14 sm:px-6 lg:flex-row lg:items-start lg:gap-16 lg:px-16 lg:py-20 xl:px-[120px]">
        {/* Info column */}
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <p className="overline text-success">{t('overline')}</p>
          <h2 className="display-lg text-foreground lg:display-xl">{t('title')}</h2>
          <p className="text-base leading-6 text-muted-foreground">{t('subtitle')}</p>

          <ul className="flex flex-col gap-4">
            {CONTACT_METHODS.map(({ key, icon: Icon }) => (
              <li key={key} className="flex items-start gap-3.5">
                <span
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-md bg-success-bg"
                  aria-hidden="true"
                >
                  <Icon className="size-5 text-icon-primary" />
                </span>
                <div className="flex min-w-0 flex-col gap-0.5 text-sm leading-5">
                  <p className="font-medium text-foreground">{t(`methods.${key}.label`)}</p>
                  <p className="break-words text-muted-foreground">
                    {t(`methods.${key}.value`)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Form card — fixed 560 on desktop per Figma; full-width below lg */}
        <ContactForm className="w-full lg:w-[560px] lg:shrink-0" />
      </div>
    </section>
  );
}
