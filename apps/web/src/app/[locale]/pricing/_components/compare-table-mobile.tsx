'use client';

import { useState, type JSX } from 'react';
import { cn } from '@ecm/ui/cn';
import {
  COMPARE_FEATURED_COLUMN,
  COMPARE_GROUPS,
  COMPARE_HEADER_LABEL,
  COMPARE_PLAN_COLUMNS,
  type ComparePlanColumn,
} from '@/config/landing-pricing-compare';
import { CompareCell } from './compare-cell';

/** Mobile view of the compare table: pick a plan, see its row values side-by-side.
 * The table hidden on md+; see CompareTableDesktop for the full matrix. */
export function CompareTableMobile(): JSX.Element {
  const [selected, setSelected] = useState<ComparePlanColumn>(COMPARE_FEATURED_COLUMN);

  return (
    <div className="w-full overflow-hidden rounded-lg border border-border bg-background shadow-sm md:hidden">
      <div className="flex flex-col gap-3 border-b border-border bg-background-subdued px-4 py-3">
        <p className="text-base font-semibold leading-6 text-foreground">
          {COMPARE_HEADER_LABEL}
        </p>
        <div
          role="radiogroup"
          aria-label="Plan to compare"
          className="-mx-4 flex gap-2 overflow-x-auto px-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {COMPARE_PLAN_COLUMNS.map((plan) => {
            const isActive = plan === selected;
            return (
              <button
                key={plan}
                type="button"
                role="radio"
                aria-checked={isActive}
                onClick={() => setSelected(plan)}
                className={cn(
                  'inline-flex h-9 shrink-0 items-center rounded-full border px-3 text-sm font-medium leading-5 transition-colors',
                  isActive
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border-strong bg-background text-foreground hover:bg-muted',
                )}
              >
                {plan}
              </button>
            );
          })}
        </div>
      </div>

      {COMPARE_GROUPS.map((group) => (
        <div key={group.title}>
          <div className="border-b border-border bg-background-subdued px-4 py-2">
            <p className="overline text-muted-foreground">{group.title}</p>
          </div>
          <ul>
            {group.rows.map((row) => (
              <li
                key={row.label}
                className="flex items-center gap-3 border-b border-border px-4 py-2.5 last:border-b-0"
              >
                <span className="min-w-0 flex-1 text-sm leading-5 text-foreground">
                  {row.label}
                </span>
                <span className="inline-flex min-h-6 shrink-0 items-center justify-center">
                  <CompareCell value={row.values[selected] ?? false} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
