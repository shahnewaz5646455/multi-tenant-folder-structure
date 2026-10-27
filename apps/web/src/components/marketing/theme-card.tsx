import type { JSX } from 'react';
import { cn } from '@ecm/ui/cn';

export type ThemeTone = 'orange' | 'blue' | 'red' | 'green';

export type ThemeCardProps = {
  name: string;
  niche: string;
  tone: ThemeTone;
  previewHref: string;
  className?: string;
};

const toneBg: Record<ThemeTone, string> = {
  orange: 'bg-accent-orange-subtle',
  blue: 'bg-accent-blue-subtle',
  red: 'bg-critical-bg',
  green: 'bg-success-bg',
};

/**
 * Theme gallery card for the Templates section. All 4 cards share markup;
 * only name, niche label, and hero band tone differ.
 */
export function ThemeCard({
  name,
  niche,
  tone,
  previewHref,
  className,
}: ThemeCardProps): JSX.Element {
  return (
    <article
      className={cn(
        'flex min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-background shadow-sm',
        className,
      )}
    >
      <StorePreview tone={tone} />

      <div className="flex flex-col gap-3 p-4">
        <div className="flex min-w-0 flex-col gap-0.5">
          <h3 className="truncate text-sm font-semibold leading-5 text-foreground">{name}</h3>
          <p className="truncate text-xs leading-4 text-muted-foreground">{niche}</p>
        </div>
        <a
          href={previewHref}
          className="inline-flex h-7 w-full items-center justify-center rounded-md border border-border-strong bg-background px-3 py-1 text-xs font-medium text-foreground hover:bg-muted"
        >
          Preview demo store
        </a>
      </div>
    </article>
  );
}

/** Token-drawn miniature storefront used inside each ThemeCard. */
function StorePreview({ tone }: { tone: ThemeTone }): JSX.Element {
  return (
    <div className="flex h-44 w-full flex-col gap-1.5 bg-background-subdued p-3">
      {/* nav strip */}
      <div className="flex w-full items-center gap-1.5">
        <span className="h-2 w-7 shrink-0 rounded-sm bg-foreground" aria-hidden="true" />
        <span className="flex-1" />
        {Array.from({ length: 3 }).map((_, i) => (
          <span
            key={i}
            className="h-1 w-[18px] shrink-0 rounded-full bg-border-strong"
            aria-hidden="true"
          />
        ))}
      </div>

      {/* hero band — the only part that changes per tone */}
      <div
        className={cn(
          'flex h-[68px] w-full flex-col items-start justify-center gap-1 rounded-sm px-3 py-2',
          toneBg[tone],
        )}
      >
        <span className="h-2 w-[110px] rounded-full bg-foreground" aria-hidden="true" />
        <span className="h-[5px] w-[70px] rounded-full bg-muted-foreground" aria-hidden="true" />
        <span className="h-3 w-10 rounded-sm bg-primary" aria-hidden="true" />
      </div>

      {/* product tiles */}
      <div className="flex min-h-0 flex-1 w-full items-stretch gap-1.5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex min-w-0 flex-1 flex-col gap-[3px]">
            <div className="min-h-0 flex-1 w-full rounded-sm border border-border bg-background" />
            <span className="h-1 w-[30px] rounded-full bg-border-strong" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}
