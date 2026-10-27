import type { JSX } from 'react';
import { GO_LIVE_FOOTNOTE, GO_LIVE_HEADING, GO_LIVE_STEPS } from '@/config/landing-go-live';

export function GoLiveSection(): JSX.Element {
  return (
    <section className="w-full bg-background">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-10 px-4 py-14 sm:px-6 lg:px-16 lg:py-20 xl:px-[120px]">
        <div className="flex max-w-[620px] flex-col items-center gap-3 text-center">
          <p className="text-success">{GO_LIVE_HEADING.overline}</p>
          <h2 className="display-lg text-foreground">{GO_LIVE_HEADING.title}</h2>
        </div>

        <ol className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {GO_LIVE_STEPS.map((step, i) => (
            <li key={step.title} className="flex min-w-0 flex-col items-start gap-3">
              <span
                className="inline-flex size-10 items-center justify-center rounded-full bg-primary text-base font-semibold leading-6 text-primary-foreground"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <h3 className="text-base font-semibold leading-6 text-foreground">{step.title}</h3>
              <p className="text-sm leading-5 text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>

        <p className="max-w-[640px] text-center text-xs leading-4 text-muted-foreground">
          {GO_LIVE_FOOTNOTE}
        </p>
      </div>
    </section>
  );
}
