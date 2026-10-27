import type { JSX } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@ecm/ui/cn';
import { SectionHeading } from '@/components/marketing/section-heading';
import { ThemeCard } from '@/components/marketing/theme-card';
import {
  TEMPLATES_ACTIVE_CATEGORY_KEY,
  TEMPLATES_CATEGORIES,
  TEMPLATES_FEATURED,
  TEMPLATES_SEE_ALL_HREF,
} from '@/config/landing-templates';

export function TemplatesSection(): JSX.Element {
  const t = useTranslations('home.templates');

  return (
    <section className="w-full bg-background-canvas">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-10 px-4 py-14 sm:px-6 lg:px-16 lg:py-20 xl:px-[120px]">
        <SectionHeading
          overline={t('overline')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        {/* Category tabs — scroll horizontally on mobile; links today, filter later. */}
        <nav aria-label={t('ariaCategories')} className="w-full">
          <ul className="-mx-4 flex items-start gap-0 overflow-x-auto px-4 scrollbar-none sm:mx-0 sm:justify-center sm:px-0">
            {TEMPLATES_CATEGORIES.map((cat) => {
              const active = cat.key === TEMPLATES_ACTIVE_CATEGORY_KEY;
              return (
                <li key={cat.key} className="shrink-0">
                  <a
                    href={cat.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'inline-flex h-9 items-center rounded-t-md px-3 py-2 text-sm font-medium whitespace-nowrap',
                      active
                        ? 'border-b-2 border-primary text-foreground'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {t(`categories.${cat.key}`)}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TEMPLATES_FEATURED.map((tpl) => (
            <ThemeCard
              key={tpl.textKey}
              name={t(`featured.${tpl.textKey}.name`)}
              niche={t(`featured.${tpl.textKey}.niche`)}
              tone={tpl.tone}
              previewHref={tpl.previewHref}
              previewLabel={t('previewButton')}
            />
          ))}
        </div>

        <a
          href={TEMPLATES_SEE_ALL_HREF}
          className="inline-flex h-9 items-center justify-center rounded-md border border-border-strong bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
        >
          {t('seeAll')}
        </a>
      </div>
    </section>
  );
}
