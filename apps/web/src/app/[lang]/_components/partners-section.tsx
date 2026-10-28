import type { JSX } from 'react';
import { useTranslations } from 'next-intl';
import { ProviderLogo } from '@/components/marketing/provider-logo';
import { PARTNERS } from '@/config/landing-partners';

export function PartnersSection(): JSX.Element {
  const t = useTranslations('home.partners');
  return (
    <section className="w-full bg-background">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-5 px-4 py-12 sm:px-6 lg:px-16 xl:px-[120px]">
        <p className="text-center text-sm leading-5 text-muted-foreground">{t('heading')}</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
          {PARTNERS.map((p) => (
            <li key={p.name}>
              <ProviderLogo provider={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
