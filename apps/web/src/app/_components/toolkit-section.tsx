import type { JSX } from 'react';
import { ArrowRight } from 'lucide-react';
import { FeatureTile } from '@/components/marketing/feature-tile';
import { SectionHeading } from '@/components/marketing/section-heading';
import {
  TOOLKIT_FEATURES,
  TOOLKIT_HEADING,
  TOOLKIT_MOBILE_HIGHLIGHT_TITLES,
  TOOLKIT_SEE_ALL,
} from '@/config/landing-toolkit';

export function ToolkitSection(): JSX.Element {
  const mobileHighlights = TOOLKIT_FEATURES.filter((f) =>
    TOOLKIT_MOBILE_HIGHLIGHT_TITLES.includes(f.title),
  );

  return (
    <section className="w-full bg-background-canvas">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-10 px-4 py-14 sm:px-6 lg:px-16 lg:py-20 xl:px-[120px]">
        <SectionHeading
          overline={TOOLKIT_HEADING.overline}
          title={TOOLKIT_HEADING.title}
          width="narrow"
        />

        {/* Mobile: 3 highlighted tiles + See-all link */}
        <div className="flex w-full flex-col gap-4 sm:hidden">
          {mobileHighlights.map((f) => (
            <FeatureTile key={f.title} icon={f.icon} title={f.title} description={f.description} />
          ))}
          <a
            href={TOOLKIT_SEE_ALL.href}
            className="inline-flex items-center gap-1 self-start text-sm font-medium text-link hover:underline"
          >
            {TOOLKIT_SEE_ALL.label}
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>

        {/* Tablet / desktop: full 12-tile grid */}
        <div className="hidden w-full grid-cols-2 gap-4 sm:grid lg:grid-cols-4">
          {TOOLKIT_FEATURES.map((f) => (
            <FeatureTile key={f.title} icon={f.icon} title={f.title} description={f.description} />
          ))}
        </div>
      </div>
    </section>
  );
}
