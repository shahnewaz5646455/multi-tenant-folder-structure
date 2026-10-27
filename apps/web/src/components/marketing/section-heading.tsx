import type { JSX } from 'react';
import { cn } from '@ecm/ui/cn';

export type SectionHeadingProps = {
  overline: string;
  title: string;
  subtitle?: string;
  /** Max width (Tailwind arbitrary) for text block centring. Figma uses 620/720. */
  width?: 'narrow' | 'wide';
  className?: string;
};

/**
 * Centred section intro used across marketing landing sections.
 * (Overline / Display-lg / Body-lg) — extracted after the 3rd use.
 */
export function SectionHeading({
  overline,
  title,
  subtitle,
  width = 'wide',
  className,
}: SectionHeadingProps): JSX.Element {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-3 text-center',
        width === 'narrow' ? 'max-w-[620px]' : 'max-w-[720px]',
        className,
      )}
    >
      <p className="text-success">{overline}</p>
      <h2 className="display-lg text-foreground">{title}</h2>
      {subtitle ? (
        <p className="text-base leading-6 text-muted-foreground">{subtitle}</p>
      ) : null}
    </div>
  );
}
