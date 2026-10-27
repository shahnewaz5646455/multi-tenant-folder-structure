import type { JSX } from 'react';
import { Check } from 'lucide-react';
import { Badge } from '@ecm/ui/badge';
import { cn } from '@ecm/ui/cn';
import type { Plan } from '@/types/marketing.types';

export type PriceCardProps = {
  plan: Plan;
  className?: string;
};

export function PriceCard({ plan, className }: PriceCardProps): JSX.Element {
  const {
    name,
    price,
    priceSuffix,
    billingNote,
    billingNoteTone = 'default',
    pitch,
    cta,
    features,
    featured = false,
    badge,
  } = plan;

  return (
    <article
      className={cn(
        'flex min-w-0 flex-col items-start gap-3 self-stretch rounded-lg bg-background px-4 py-5',
        featured
          ? 'border-2 border-accent-orange'
          : 'border border-border',
        className,
      )}
    >
      <header className="flex w-full items-center gap-1.5">
        <h3 className="min-w-0 flex-1 text-base font-semibold leading-6 text-foreground">
          {name}
        </h3>
        {badge ? (
          <Badge tone="accent-orange" className="shrink-0 px-2 py-0.5 text-xs font-medium">
            {badge}
          </Badge>
        ) : null}
      </header>

      <p className="flex items-end gap-1 whitespace-nowrap">
        <span className="metric-lg text-foreground">{price}</span>
        {priceSuffix ? (
          <span className="text-xs leading-4 text-muted-foreground">{priceSuffix}</span>
        ) : null}
      </p>

      <p
        className={cn(
          'w-full text-xs leading-4',
          billingNoteTone === 'success' ? 'text-success' : 'text-muted-foreground',
        )}
      >
        {billingNote}
      </p>

      <p className="w-full text-xs leading-4 text-muted-foreground">{pitch}</p>

      <a
        href={cta.href}
        className={cn(
          'inline-flex h-9 w-full items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors',
          cta.variant === 'primary'
            ? 'bg-primary text-primary-foreground hover:bg-brand-700'
            : 'border border-border-strong bg-background text-foreground hover:bg-muted',
        )}
      >
        {cta.label}
      </a>

      <ul className="flex w-full flex-col gap-1.5">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-1.5">
            <Check
              className="mt-0.5 size-4 shrink-0 text-icon-primary"
              aria-hidden="true"
              strokeWidth={2.5}
            />
            <span className="min-w-0 flex-1 text-xs leading-4 text-foreground">{feature}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
