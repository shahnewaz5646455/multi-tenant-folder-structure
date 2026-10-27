import type { JSX } from 'react';
import { cn } from '@ecm/ui/cn';
import type { ChartBar } from '@/types/marketing.types';

export type BarChartProps = {
  bars: readonly ChartBar[];
  className?: string;
};

/**
 * Decorative stacked bar chart for the hero dashboard mock.
 * Each column is a full-height flex item so percent heights inside resolve
 * correctly; bars align to the bottom via `justify-end`.
 * aria-hidden — decoration, not data.
 */
export function BarChart({ bars, className }: BarChartProps): JSX.Element {
  const max = bars.reduce((m, b) => Math.max(m, b.online + b.cod), 0);
  return (
    <div className={cn('flex h-full w-full items-stretch gap-2.5 pt-2', className)} aria-hidden="true">
      {bars.map((bar, i) => {
        const onlinePct = (bar.online / max) * 100;
        const codPct = (bar.cod / max) * 100;
        return (
          <div key={i} className="flex min-w-0 flex-1 flex-col justify-end gap-0.5">
            <div className="w-full rounded-t-[3px] bg-chart-online" style={{ height: `${onlinePct}%` }} />
            <div className="w-full bg-chart-cod" style={{ height: `${codPct}%` }} />
          </div>
        );
      })}
    </div>
  );
}
