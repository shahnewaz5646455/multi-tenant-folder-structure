import type { JSX } from 'react';
import { SectionHeading } from '@/components/marketing/section-heading';
import {
  BILLING_CYCLES,
  DEFAULT_BILLING_CYCLE,
  PRICING_HEADING,
  PRICING_PLANS,
} from '@/config/landing-pricing';
import { BillingCycleToggle } from './billing-cycle-toggle';
import { PriceCard } from './price-card';

export function PlansSection(): JSX.Element {
  return (
    <section className="w-full bg-background-canvas">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-6 px-4 py-14 sm:px-6 lg:px-16 lg:py-18 xl:px-[120px]">
        <SectionHeading
          overline={PRICING_HEADING.overline}
          title={PRICING_HEADING.title}
          subtitle={PRICING_HEADING.subtitle}
        />

        <BillingCycleToggle cycles={BILLING_CYCLES} defaultCycle={DEFAULT_BILLING_CYCLE} />

        <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {PRICING_PLANS.map((plan) => (
            <li key={plan.name} className="flex">
              <PriceCard plan={plan} className="w-full" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
