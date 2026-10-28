import type { JSX } from 'react';
import { Check, Minus } from 'lucide-react';

export type CompareCellProps = {
  value: string;
  includedLabel: string;
  excludedLabel: string;
};

/** Renders a comparison cell's atomic value. Sentinels: "✓" = included, "✗" = absent. */
export function CompareCell({ value, includedLabel, excludedLabel }: CompareCellProps): JSX.Element {
  if (value === '✓') {
    return (
      <Check className="size-[18px] text-icon-primary" strokeWidth={2.5} aria-label={includedLabel} />
    );
  }
  if (value === '✗') {
    return (
      <Minus className="size-[18px] text-icon-muted" strokeWidth={2.5} aria-label={excludedLabel} />
    );
  }
  return <span className="text-sm leading-5 text-foreground">{value}</span>;
}
