'use client';

import { useState, type JSX } from 'react';
import { cn } from '@ecm/ui/cn';
import type { BillingCycle } from '@/types/marketing.types';

export type BillingCycleToggleProps = {
  cycles: readonly BillingCycle[];
  defaultCycle: BillingCycle['key'];
  className?: string;
};

export function BillingCycleToggle({
  cycles,
  defaultCycle,
  className,
}: BillingCycleToggleProps): JSX.Element {
  const [active, setActive] = useState<BillingCycle['key']>(defaultCycle);

  return (
    <div
      role="radiogroup"
      aria-label="Billing cycle"
      className={cn(
        'grid w-full max-w-sm grid-cols-3 gap-0.5 rounded-xl bg-background-canvas p-[3px] sm:inline-flex sm:w-auto sm:max-w-none',
        className,
      )}
    >
      {cycles.map((cycle) => {
        const isActive = cycle.key === active;
        return (
          <button
            key={cycle.key}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => setActive(cycle.key)}
            className={cn(
              'inline-flex min-h-9 flex-col items-center justify-center rounded-md px-2 py-1 text-center text-xs font-medium leading-4 transition-colors sm:h-7 sm:min-h-0 sm:flex-row sm:gap-1 sm:px-3 sm:py-0',
              isActive
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            <span>{cycle.label}</span>
            {cycle.badge ? (
              <>
                <span aria-hidden="true" className="hidden sm:inline">·</span>
                <span className="text-[11px] font-normal leading-4 opacity-80 sm:text-xs sm:font-medium sm:opacity-100">
                  {cycle.badge}
                </span>
              </>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
