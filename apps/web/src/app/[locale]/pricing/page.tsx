import type { JSX } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { CompareSection } from './_components/compare-section';
import { FaqSection } from './_components/faq-section';
import { FeesSection } from './_components/fees-section';
import { PlansSection } from './_components/plans-section';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function PricingPage({ params }: Props): Promise<JSX.Element> {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <SiteHeader />
      <main>
        <PlansSection />
        <FeesSection />
        <CompareSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </>
  );
}
