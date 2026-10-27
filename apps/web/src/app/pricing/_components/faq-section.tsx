import type { JSX } from 'react';
import { FaqAccordion } from '@/components/marketing/faq-accordion';
import { PRICING_FAQ, PRICING_FAQ_HEADING } from '@/config/landing-pricing-faq';

export function FaqSection(): JSX.Element {
  return (
    <section className="w-full bg-background-canvas">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-6 px-4 py-14 sm:px-6 lg:px-16 lg:py-18 xl:px-[120px]">
        <h2 className="display-lg text-center text-foreground">
          {PRICING_FAQ_HEADING.title}
        </h2>
        <FaqAccordion
          entries={PRICING_FAQ}
          defaultOpenIndex={0}
          className="w-full max-w-[800px]"
        />
      </div>
    </section>
  );
}
