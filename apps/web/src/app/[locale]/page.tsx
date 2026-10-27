import type { JSX } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { CtaBandSection } from './_components/cta-band-section';
import { FaqSection } from './_components/faq-section';
import { GoLiveSection } from './_components/go-live-section';
import { HeroSection } from './_components/hero-section';
import { LiveStatsSection } from './_components/live-stats-section';
import { PartnersSection } from './_components/partners-section';
import { TemplatesSection } from './_components/templates-section';
import { TestimonialsSection } from './_components/testimonials-section';
import { ToolkitSection } from './_components/toolkit-section';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props): Promise<JSX.Element> {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <LiveStatsSection />
        <PartnersSection />
        <ToolkitSection />
        <GoLiveSection />
        <TemplatesSection />
        <TestimonialsSection />
        <FaqSection />
        <CtaBandSection />
      </main>
      <SiteFooter />
    </>
  );
}
