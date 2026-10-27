import type { JSX } from 'react';
import { Check, Minus } from 'lucide-react';
import type { CompareValue } from '@/types/marketing.types';

export type CompareCellProps = {
  value: CompareValue;
};

/** Renders a comparison cell's atomic value: text, included (check) or absent (minus). */
export function CompareCell({ value }: CompareCellProps): JSX.Element {
  if (value === true) {
    return (
      <>
        <Check
          className="size-[18px] text-icon-primary"
          strokeWidth={2.5}
          aria-label="Included"
        />
      </>
    );
  }
  if (value === false) {
    return (
      <Minus
        className="size-[18px] text-icon-muted"
        strokeWidth={2.5}
        aria-label="Not included"
      />
    );
  }
  return <span className="text-sm leading-5 text-foreground">{value}</span>;
}
