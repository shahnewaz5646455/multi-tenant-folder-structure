import type { JSX } from 'react';
import { Badge } from '@ecm/ui/badge';
import { BarChart } from './bar-chart';
import type { ChartBar, KpiTile } from '@/types/marketing.types';

export type DashboardPreviewProps = {
  kpis: readonly KpiTile[];
  bars: readonly ChartBar[];
};

export function DashboardPreview({ kpis, bars }: DashboardPreviewProps): JSX.Element {
  return (
    <div className="flex h-full w-full flex-col gap-3 overflow-hidden rounded-xl bg-background p-5 shadow-lg">
      <div className="flex items-center">
        <h3 className="text-base font-semibold leading-6 text-foreground">Today</h3>
        <div className="flex-1" />
        <Badge className='px-1 text-xs' tone="success">Live</Badge>
      </div>

      <div className="flex gap-3">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="flex min-w-0 flex-1 flex-col gap-0.5 rounded-md bg-background-subdued p-3">
            <p className="text-xs font-medium leading-4 text-muted-foreground">{kpi.label}</p>
            <p className="text-xl font-semibold leading-7 text-foreground">{kpi.value}</p>
          </div>
        ))}
      </div>

      <BarChart bars={bars} className="min-h-0 flex-1" />
    </div>
  );
}
