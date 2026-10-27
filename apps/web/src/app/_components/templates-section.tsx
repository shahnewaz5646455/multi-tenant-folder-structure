import type { JSX } from 'react';
import { cn } from '@ecm/ui/cn';
import { SectionHeading } from '@/components/marketing/section-heading';
import { ThemeCard } from '@/components/marketing/theme-card';
import {
  TEMPLATES_CATEGORIES,
  TEMPLATES_FEATURED,
  TEMPLATES_HEADING,
  TEMPLATES_SEE_ALL,
} from '@/config/landing-templates';

const ACTIVE_CATEGORY_KEY = 'all';

export function TemplatesSection(): JSX.Element {
  return (
    <section className="w-full bg-background-canvas">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-10 px-4 py-14 sm:px-6 lg:px-16 lg:py-20 xl:px-[120px]">
        <SectionHeading
          overline={TEMPLATES_HEADING.overline}
          title={TEMPLATES_HEADING.title}
          subtitle={TEMPLATES_HEADING.subtitle}
        />

        {/* Category tabs — scroll horizontally on mobile; links today, filter later. */}
        <nav aria-label="Template categories" className="w-full">
          <ul className="-mx-4 flex items-start gap-0 overflow-x-auto px-4 scrollbar-none sm:mx-0 sm:justify-center sm:px-0">
            {TEMPLATES_CATEGORIES.map((cat) => {
              const active = cat.key === ACTIVE_CATEGORY_KEY;
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
                    {cat.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TEMPLATES_FEATURED.map((t) => (
            <ThemeCard
              key={t.name}
              name={t.name}
              niche={t.niche}
              tone={t.tone}
              previewHref={t.previewHref}
            />
          ))}
        </div>

        <a
          href={TEMPLATES_SEE_ALL.href}
          className="inline-flex h-9 items-center justify-center rounded-md border border-border-strong bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
        >
          {TEMPLATES_SEE_ALL.label}
        </a>
      </div>
    </section>
  );
}
