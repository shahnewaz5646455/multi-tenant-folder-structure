import type { JSX } from 'react';
import { cn } from '@ecm/ui/cn';
import type { SalesSplit } from '@/types/marketing.types';

export type SalesSplitCardProps = {
  label: string;
  data: SalesSplit;
  className?: string;
};

export function SalesSplitCard({ label, data, className }: SalesSplitCardProps): JSX.Element {
  return (
    <div
      className={cn(
        'flex min-w-0 flex-col gap-2 rounded-lg border border-border bg-background px-5 py-4',
        className,
      )}
    >
      <p className="text-sm font-medium leading-5 text-muted-foreground">{label}</p>
      <p className="display-lg text-foreground">{data.total}</p>

      <div className="flex h-2 w-full items-start gap-0.5" aria-hidden="true">
        <div className="h-2 rounded-l bg-chart-online" style={{ width: `${data.online.percent}%` }} />
        <div className="h-2 flex-1 rounded-r bg-chart-cod" />
      </div>

      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs leading-4 text-muted-foreground">
        <li className="flex items-center gap-1.5">
          <span className="inline-block size-2 rounded-full bg-chart-online" aria-hidden="true" />
          Online {data.online.value} ({data.online.percent}%)
        </li>
        <li className="flex items-center gap-1.5">
          <span className="inline-block size-2 rounded-full bg-chart-cod" aria-hidden="true" />
          COD {data.cod.value} ({data.cod.percent}%)
        </li>
      </ul>
    </div>
  );
}
