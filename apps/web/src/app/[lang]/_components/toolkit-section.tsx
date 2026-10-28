import type { JSX } from 'react';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FeatureTile } from '@/components/marketing/feature-tile';
import { SectionHeading } from '@/components/marketing/section-heading';
import {
  TOOLKIT_FEATURES,
  TOOLKIT_MOBILE_HIGHLIGHT_KEYS,
  TOOLKIT_SEE_ALL_HREF,
} from '@/config/landing-toolkit';

export function ToolkitSection(): JSX.Element {
  const t = useTranslations('home.toolkit');
  const mobileHighlights = TOOLKIT_FEATURES.filter((f) =>
    TOOLKIT_MOBILE_HIGHLIGHT_KEYS.includes(f.key),
  );

  return (
    <section className="w-full bg-background-canvas">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-10 px-4 py-14 sm:px-6 lg:px-16 lg:py-20 xl:px-[120px]">
        <SectionHeading overline={t('overline')} title={t('title')} width="narrow" />

        {/* Mobile: 3 highlighted tiles + See-all link */}
        <div className="flex w-full flex-col gap-4 sm:hidden">
          {mobileHighlights.map((f) => (
            <FeatureTile
              key={f.key}
              icon={f.icon}
              title={t(`features.${f.key}.title`)}
              description={t(`features.${f.key}.description`)}
            />
          ))}
          <a
            href={TOOLKIT_SEE_ALL_HREF}
            className="inline-flex items-center gap-1 self-start text-sm font-medium text-link hover:underline"
          >
            {t('seeAll')}
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>

        {/* Tablet / desktop: full 12-tile grid */}
        <div className="hidden w-full grid-cols-2 gap-4 sm:grid lg:grid-cols-4">
          {TOOLKIT_FEATURES.map((f) => (
            <FeatureTile
              key={f.key}
              icon={f.icon}
              title={t(`features.${f.key}.title`)}
              description={t(`features.${f.key}.description`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
