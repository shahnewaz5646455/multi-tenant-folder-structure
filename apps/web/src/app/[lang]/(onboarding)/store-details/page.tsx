import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { JSX } from 'react';
import { OnboardingShell } from '../_components/onboarding-shell';
import { StoreDetailsForm } from './_components/store-details-form';

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'onboarding.storeDetails' });
  return { title: t('title'), description: t('subtitle') };
}

export default async function StoreDetailsPage({ params }: Props): Promise<JSX.Element> {
  const { lang } = await params;
  setRequestLocale(lang);
  const t = await getTranslations({ locale: lang, namespace: 'onboarding.storeDetails' });

  return (
    <OnboardingShell currentStep="store">
      <div className="flex w-full max-w-[680px] flex-col items-stretch gap-5">
        <header className="flex flex-col items-center gap-1.5 px-2 text-center">
          <h1 className="display-lg text-foreground">{t('title')}</h1>
          <p className="text-sm leading-6 text-muted-foreground sm:text-base">{t('subtitle')}</p>
        </header>
        <section className="w-full rounded-xl border border-border bg-background p-5 shadow-md sm:p-6">
          <StoreDetailsForm />
        </section>
      </div>
    </OnboardingShell>
  );
}
