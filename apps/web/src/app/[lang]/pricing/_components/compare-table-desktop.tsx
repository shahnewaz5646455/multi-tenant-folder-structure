import type { JSX } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@ecm/ui/cn';
import {
  COMPARE_FEATURED_COLUMN,
  COMPARE_GROUPS,
  COMPARE_PLAN_COLUMNS,
} from '@/config/landing-pricing-compare';
import { CompareCell } from './compare-cell';

const GRID_COLS = 'grid-cols-[minmax(0,2fr)_repeat(5,minmax(0,1fr))]';

export function CompareTableDesktop(): JSX.Element {
  const t = useTranslations('pricing.compare');
  const headerLabel = t('label');
  const includedLabel = t('cellIncluded');
  const excludedLabel = t('cellExcluded');

  return (
    <div
      className="hidden w-full overflow-hidden rounded-lg border border-border bg-background shadow-sm md:block"
      role="table"
      aria-label={headerLabel}
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
          {headerLabel}
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
              {t(`planLabels.${plan}`)}
            </p>
          );
        })}
      </div>

      {COMPARE_GROUPS.map((group) => (
        <div key={group.key} role="rowgroup">
          <div role="row" className="border-b border-border bg-background-subdued px-4 py-2">
            <p role="columnheader" className="overline text-muted-foreground">
              {t(`groups.${group.key}.title`)}
            </p>
          </div>
          {group.rowKeys.map((rowKey) => (
            <div
              key={rowKey}
              role="row"
              className={cn(
                'grid items-center border-b border-border px-4 py-2 last:border-b-0',
                GRID_COLS,
              )}
            >
              <p role="rowheader" className="min-w-0 pr-2 text-sm leading-5 text-foreground">
                {t(`groups.${group.key}.rows.${rowKey}.label`)}
              </p>
              {COMPARE_PLAN_COLUMNS.map((plan) => {
                const isFeatured = plan === COMPARE_FEATURED_COLUMN;
                const value = t(`groups.${group.key}.rows.${rowKey}.values.${plan}`);
                return (
                  <div
                    key={plan}
                    role="cell"
                    className={cn(
                      'flex min-h-6 items-center justify-center text-center',
                      isFeatured && 'bg-accent-orange-subtle',
                    )}
                  >
                    <CompareCell
                      value={value}
                      includedLabel={includedLabel}
                      excludedLabel={excludedLabel}
                    />
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
