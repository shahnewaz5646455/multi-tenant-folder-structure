import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { JSX } from 'react';
import { OnboardingShell } from '../_components/onboarding-shell';
import { ProvisioningScreen } from './_components/provisioning-screen';
import { BUSINESS_CATEGORIES, type BusinessCategory } from '@/types/onboarding.types';

type Props = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ storeName?: string; slug?: string; category?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'onboarding.settingUp' });
  return { title: t('title', { storeName: '' }).trim() };
}

/* Final onboarding step. The preceding form passes storeName/slug/category via
 * query so a direct hit on the URL still renders with a sensible placeholder. */
export default async function SettingUpPage({ params, searchParams }: Props): Promise<JSX.Element> {
  const { lang } = await params;
  const sp = await searchParams;
  setRequestLocale(lang);

  const storeName = sp.storeName?.trim() || 'Rahim Fashion';
  const slug = sp.slug?.trim() || 'rahimfashion';
  const category = isCategory(sp.category) ? sp.category : 'fashion';

  return (
    <OnboardingShell currentStep="ready">
      <ProvisioningScreen storeName={storeName} slug={slug} category={category} />
    </OnboardingShell>
  );
}

function isCategory(value: unknown): value is BusinessCategory {
  return typeof value === 'string' && (BUSINESS_CATEGORIES as readonly string[]).includes(value);
}
