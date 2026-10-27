import type { JSX } from 'react';
import { SectionHeading } from '@/components/marketing/section-heading';
import { TestimonialCard } from '@/components/marketing/testimonial-card';
import { TESTIMONIALS, TESTIMONIALS_HEADING } from '@/config/landing-testimonials';

export function TestimonialsSection(): JSX.Element {
  return (
    <section className="w-full bg-background">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-10 px-4 py-14 sm:px-6 lg:px-16 lg:py-20 xl:px-[120px]">
        <SectionHeading
          overline={TESTIMONIALS_HEADING.overline}
          title={TESTIMONIALS_HEADING.title}
          width="narrow"
        />

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard
              key={t.name}
              quote={t.quote}
              name={t.name}
              meta={t.meta}
              initials={t.initials}
              rating={t.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
