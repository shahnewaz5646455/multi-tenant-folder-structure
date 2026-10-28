import type { JSX } from 'react';
import { cn } from '@ecm/ui/cn';

export type LogoProps = {
  variant?: 'full' | 'mark';
  /* 'on-brand' = the mark sits inside a white tile with a soft shadow and the
   * wordmark turns white, so the logo stays legible on primary/dark surfaces
   * (auth brand panel, dashboard sidebar). Figma Logo tone="On brand". */
  tone?: 'default' | 'on-brand';
  className?: string;
};

export function Logo({
  variant = 'full',
  tone = 'default',
  className,
}: LogoProps): JSX.Element {
  const isOnBrand = tone === 'on-brand';

  const mark = isOnBrand ? (
    // 36px white tile wraps the 24px mark (6px inset on each side) so the
    // green squares stay visible on the primary green background. The shadow
    // is logo-specific art direction (Figma 0px 2px 6px rgba(0,0,0,0.12)).
    <span
      className="relative block size-9 shrink-0 rounded-[9px] bg-background shadow-[0_2px_6px_0_rgb(0_0_0_/_0.12)]"
      aria-hidden="true"
    >
      <span className="absolute left-[7px] top-[7px] size-2.5 rounded-[2.5px] bg-primary" />
      <span className="absolute left-[19px] top-[7px] size-2.5 rounded-[2.5px] bg-accent-blue" />
      <span className="absolute left-[7px] top-[19px] size-2.5 rounded-[2.5px] bg-accent-orange" />
      <span className="absolute left-[19px] top-[19px] size-2.5 rounded-[2.5px] bg-primary" />
    </span>
  ) : (
    <span className="relative block size-7 shrink-0" aria-hidden="true">
      <span className="absolute left-px top-px size-3 rounded-[3px] bg-primary" />
      <span className="absolute left-[15px] top-px size-3 rounded-[3px] bg-accent-blue" />
      <span className="absolute left-px top-[15px] size-3 rounded-[3px] bg-accent-orange" />
      <span className="absolute left-[15px] top-[15px] size-3 rounded-[3px] bg-primary" />
    </span>
  );

  return (
    <span className={cn('inline-flex items-center gap-2.5', className)} aria-label="Ecom Manager">
      {mark}
      {variant === 'full' ? (
        <span
          className={cn(
            isOnBrand
              ? 'text-base font-semibold leading-6 text-primary-foreground'
              : 'text-[17px] font-bold leading-none text-foreground',
          )}
        >
          Ecom Manager
        </span>
      ) : null}
    </span>
  );
}
