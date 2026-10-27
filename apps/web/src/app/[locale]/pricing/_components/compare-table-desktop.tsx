import type { JSX } from 'react';
import { cn } from '@ecm/ui/cn';
import {
  COMPARE_FEATURED_COLUMN,
  COMPARE_GROUPS,
  COMPARE_HEADER_LABEL,
  COMPARE_PLAN_COLUMNS,
} from '@/config/landing-pricing-compare';
import { CompareCell } from './compare-cell';

const GRID_COLS = 'grid-cols-[minmax(0,2fr)_repeat(5,minmax(0,1fr))]';

export function CompareTableDesktop(): JSX.Element {
  return (
    <div
      className="hidden w-full overflow-hidden rounded-lg border border-border bg-background shadow-sm md:block"
      role="table"
      aria-label={COMPARE_HEADER_LABEL}
    >
      {/* Head row */}
      <div
        role="row"
        className={cn(
          'grid items-center border-b border-border bg-background-subdued px-4 py-3',
          GRID_COLS,
        )}
      >
        <p role="columnheader" className="min-w-0 text-base font-semibold leading-6 text-foreground">
          {COMPARE_HEADER_LABEL}
        </p>
        {COMPARE_PLAN_COLUMNS.map((plan) => {
          const isFeatured = plan === COMPARE_FEATURED_COLUMN;
          return (
            <p
              key={plan}
              role="columnheader"
              className={cn(
                'text-center text-sm font-semibold leading-5',
                isFeatured ? 'text-accent-orange' : 'text-foreground',
              )}
            >
              {plan}
            </p>
          );
        })}
      </div>

      {COMPARE_GROUPS.map((group) => (
        <div key={group.title} role="rowgroup">
          <div
            role="row"
            className="border-b border-border bg-background-subdued px-4 py-2"
          >
            <p role="columnheader" className="overline text-muted-foreground">
              {group.title}
            </p>
          </div>
          {group.rows.map((row) => (
            <div
              key={row.label}
              role="row"
              className={cn(
                'grid items-center border-b border-border px-4 py-2 last:border-b-0',
                GRID_COLS,
              )}
            >
              <p role="rowheader" className="min-w-0 pr-2 text-sm leading-5 text-foreground">
                {row.label}
              </p>
              {COMPARE_PLAN_COLUMNS.map((plan) => {
                const isFeatured = plan === COMPARE_FEATURED_COLUMN;
                return (
                  <div
                    key={plan}
                    role="cell"
                    className={cn(
                      'flex min-h-6 items-center justify-center text-center',
                      isFeatured && 'bg-accent-orange-subtle',
                    )}
                  >
                    <CompareCell value={row.values[plan] ?? false} />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
