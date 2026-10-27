import type { HTMLAttributes, JSX } from 'react';
import { cn } from './cn';

export type BadgeTone = 'accent-orange' | 'success' | 'info' | 'critical' | 'neutral';

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
  dot?: boolean;
};

const toneStyles: Record<BadgeTone, string> = {
  'accent-orange': 'bg-accent-orange text-primary-foreground',
  success: 'bg-success-bg text-success-strong',
  info: 'bg-info-bg text-info',
  critical: 'bg-critical-bg text-critical',
  neutral: 'bg-muted text-foreground',
};

const dotStyles: Record<BadgeTone, string> = {
  'accent-orange': 'bg-primary-foreground',
  success: 'bg-success',
  info: 'bg-info',
  critical: 'bg-critical',
  neutral: 'bg-foreground',
};

export function Badge({
  tone = 'neutral',
  dot = false,
  className,
  children,
  ...props
}: BadgeProps): JSX.Element {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-light leading-4',
        toneStyles[tone],
        className,
      )}
      {...props}
    >
      {dot ? <span className={cn('inline-block size-2 rounded-full', dotStyles[tone])} aria-hidden="true" /> : null}
      {children}
    </span>
  );
}
