import type { JSX } from 'react';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { CompareSection } from './_components/compare-section';
import { FeesSection } from './_components/fees-section';
import { PlansSection } from './_components/plans-section';

export default function PricingPage(): JSX.Element {
  return (
    <>
      <SiteHeader />
      <main>
        <PlansSection />
        <FeesSection />
        <CompareSection />
      </main>
      <SiteFooter />
    </>
  );
}
