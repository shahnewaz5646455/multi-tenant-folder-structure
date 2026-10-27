import type { JSX } from 'react';
import { useTranslations } from 'next-intl';
import type { Plan } from '@/types/marketing.types';
import { SectionHeading } from '@/components/marketing/section-heading';
import { BILLING_CYCLE_KEYS, DEFAULT_BILLING_CYCLE, PRICING_PLANS } from '@/config/landing-pricing';
import type { BillingCycle } from '@/types/marketing.types';
import { BillingCycleToggle } from './billing-cycle-toggle';
import { PriceCard } from './price-card';

export function PlansSection(): JSX.Element {
  const t = useTranslations('pricing');

  const cycles: BillingCycle[] = BILLING_CYCLE_KEYS.map((key) => {
    const label = t(`cycles.${key}.label`);
    // next-intl throws on missing keys, so probe optional "badge" with has().
    const badge = t.has(`cycles.${key}.badge`) ? t(`cycles.${key}.badge`) : undefined;
    return { key, label, badge };
  });

  return (
    <section className="w-full bg-background-canvas">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-6 px-4 py-14 sm:px-6 lg:px-16 lg:py-18 xl:px-[120px]">
        <SectionHeading
          overline={t('overline')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <BillingCycleToggle
          cycles={cycles}
          defaultCycle={DEFAULT_BILLING_CYCLE}
          ariaLabel={t('billingAria')}
        />

        <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {PRICING_PLANS.map((config) => {
            const priceSuffix = t(`plans.${config.key}.priceSuffix`);
            const plan: Plan = {
              name: t(`plans.${config.key}.name`),
              price: t(`plans.${config.key}.price`),
              priceSuffix: priceSuffix === '' ? undefined : priceSuffix,
              billingNote: t(`plans.${config.key}.billingNote`),
              billingNoteTone: config.billingNoteTone,
              pitch: t(`plans.${config.key}.pitch`),
              cta: {
                label: t(`plans.${config.key}.ctaLabel`),
                href: config.ctaHref,
                variant: config.ctaVariant,
              },
              features: t.raw(`plans.${config.key}.features`) as readonly string[],
              featured: config.featured,
              badge: config.featured ? t(`plans.${config.key}.badge`) : undefined,
            };
            return (
              <li key={config.key} className="flex">
                <PriceCard plan={plan} className="w-full" />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
