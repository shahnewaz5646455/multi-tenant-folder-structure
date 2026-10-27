import type { JSX } from 'react';
import { cn } from '@ecm/ui/cn';

export type LogoProps = {
  variant?: 'full' | 'mark';
  className?: string;
};

export function Logo({ variant = 'full', className }: LogoProps): JSX.Element {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)} aria-label="Ecom Manager">
      <span className="relative block size-7 shrink-0" aria-hidden="true">
        <span className="absolute left-px top-px size-3 rounded-[3px] bg-primary" />
        <span className="absolute left-[15px] top-px size-3 rounded-[3px] bg-accent-blue" />
        <span className="absolute left-px top-[15px] size-3 rounded-[3px] bg-accent-orange" />
        <span className="absolute left-[15px] top-[15px] size-3 rounded-[3px] bg-primary" />
      </span>
      {variant === 'full' ? (
        <span className="text-[17px] font-bold leading-none text-foreground">Ecom Manager</span>
      ) : null}
    </span>
  );
}
