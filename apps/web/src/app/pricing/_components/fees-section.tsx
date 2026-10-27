import type { JSX } from 'react';
import { PRICING_FEES, PRICING_FEES_HEADING } from '@/config/landing-pricing-fees';
import { FeeTile } from './fee-tile';

export function FeesSection(): JSX.Element {
  return (
    <section className="w-full bg-background-canvas">
      <div className="mx-auto w-full max-w-[1440px] px-4 pb-6 pt-6 sm:px-6 lg:px-16 lg:pt-14 xl:px-[120px]">
        <div className="flex w-full flex-col items-start gap-6 rounded-lg border border-border bg-background px-5 py-5 sm:px-6 lg:flex-row lg:items-center">
          <div className="flex w-full flex-col gap-1 lg:w-[280px] lg:shrink-0">
            <h2 className="text-xl font-semibold leading-7 text-foreground">
              {PRICING_FEES_HEADING.title}
            </h2>
            <p className="text-sm leading-5 text-muted-foreground">
              {PRICING_FEES_HEADING.subtitle}
            </p>
          </div>
          <ul className="grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-3">
            {PRICING_FEES.map((tile) => (
              <li key={tile.label} className="flex">
                <FeeTile tile={tile} className="w-full" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
