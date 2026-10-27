import type { JSX } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@ecm/ui/cn';
import type { IconTone } from '@/types/marketing.types';

export type FeatureTileProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  tone?: IconTone;
  className?: string;
};

const toneStyles: Record<IconTone, { box: string; icon: string }> = {
  success: { box: 'bg-success-bg', icon: 'text-icon-primary' },
  info: { box: 'bg-info-bg', icon: 'text-info' },
  warning: { box: 'bg-critical-bg', icon: 'text-critical' },
};

export function FeatureTile({
  icon: Icon,
  title,
  description,
  tone = 'success',
  className,
}: FeatureTileProps): JSX.Element {
  const styles = toneStyles[tone];
  return (
    <article
      className={cn(
        'flex flex-col items-start gap-3 rounded-lg border border-border bg-background p-5',
        className,
      )}
    >
      <span
        className={cn('inline-flex size-11 items-center justify-center rounded-md', styles.box)}
        aria-hidden="true"
      >
        <Icon className={cn('size-[22px]', styles.icon)} />
      </span>
      <h3 className="text-sm font-semibold leading-5 text-foreground">{title}</h3>
      <p className="text-sm leading-5 text-muted-foreground">{description}</p>
    </article>
  );
}
