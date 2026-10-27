import type { JSX } from 'react';
import { FaqAccordion } from '@/components/marketing/faq-accordion';
import { FAQ_ENTRIES, FAQ_HEADING } from '@/config/landing-faq';

export function FaqSection(): JSX.Element {
  return (
    <section className="w-full bg-background-canvas">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-4 py-14 sm:px-6 lg:flex-row lg:items-start lg:gap-16 lg:px-16 lg:py-20 xl:px-[120px]">
        {/* Left column — heading + support + CTA */}
        <div className="flex min-w-0 flex-col gap-3 lg:w-[360px] lg:shrink-0">
          <p className="text-success text-center">{FAQ_HEADING.overline}</p>
          <h2 className="display-lg text-foreground">{FAQ_HEADING.title}</h2>
          <p className="text-sm leading-5 text-muted-foreground">{FAQ_HEADING.support}</p>
          <a
            href={FAQ_HEADING.cta.href}
            className="mt-1 inline-flex h-9 w-fit items-center justify-center rounded-md border border-border-strong bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
          >
            {FAQ_HEADING.cta.label}
          </a>
        </div>

        {/* Right column — single-select accordion with animated height */}
        <FaqAccordion entries={FAQ_ENTRIES} defaultOpenIndex={0} className="min-w-0 flex-1" />
      </div>
    </section>
  );
}
