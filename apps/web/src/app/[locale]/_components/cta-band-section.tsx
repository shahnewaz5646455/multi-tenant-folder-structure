import type { JSX } from 'react';
import { CTA_BAND } from '@/config/landing-cta';

export function CtaBandSection(): JSX.Element {
  return (
    <section className="w-full bg-primary">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-5 px-4 py-14 text-center sm:px-6 lg:px-16 lg:py-18 xl:px-[120px]">
        <h2 className="display-lg text-2xl text-primary-foreground">{CTA_BAND.title}</h2>
        {/* Subtitle hidden on mobile per Figma */}
        <p className="hidden text-base leading-6 text-primary-foreground sm:block">
          {CTA_BAND.subtitle}
        </p>

        <div className="mt-1 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
          <a
            href={CTA_BAND.primary.href}
            className="inline-flex h-11 items-center justify-center rounded-md border border-border-strong bg-background px-5 py-3 text-sm font-medium text-foreground hover:bg-muted"
          >
            {CTA_BAND.primary.label}
          </a>
          {/* Secondary CTA hidden on mobile per Figma */}
          <a
            href={CTA_BAND.secondary.href}
            className="hidden h-11 items-center justify-center rounded-md px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-brand-700 sm:inline-flex"
          >
            {CTA_BAND.secondary.label}
          </a>
        </div>
      </div>
    </section>
  );
}
