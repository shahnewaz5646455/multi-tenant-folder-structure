import type { JSX } from 'react';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { HeroSection } from './_components/hero-section';
import { LiveStatsSection } from './_components/live-stats-section';
import { PartnersSection } from './_components/partners-section';
import { ToolkitSection } from './_components/toolkit-section';
import { GoLiveSection } from './_components/go-live-section';
import { TemplatesSection } from './_components/templates-section';
import { TestimonialsSection } from './_components/testimonials-section';
import { FaqSection } from './_components/faq-section';
import { CtaBandSection } from './_components/cta-band-section';

export default function HomePage(): JSX.Element {
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
