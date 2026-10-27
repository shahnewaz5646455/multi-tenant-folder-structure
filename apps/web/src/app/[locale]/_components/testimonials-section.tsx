import type { JSX } from 'react';
import { useTranslations } from 'next-intl';
import { SectionHeading } from '@/components/marketing/section-heading';
import { TestimonialCard } from '@/components/marketing/testimonial-card';
import { TESTIMONIALS } from '@/config/landing-testimonials';

export function TestimonialsSection(): JSX.Element {
  const t = useTranslations('home.testimonials');

  return (
    <section className="w-full bg-background">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-10 px-4 py-14 sm:px-6 lg:px-16 lg:py-20 xl:px-[120px]">
        <SectionHeading overline={t('overline')} title={t('title')} width="narrow" />

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((entry) => (
            <TestimonialCard
              key={entry.key}
              quote={t(`items.${entry.key}.quote`)}
              name={t(`items.${entry.key}.name`)}
              meta={t(`items.${entry.key}.meta`)}
              initials={entry.initials}
              rating={entry.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
