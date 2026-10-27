import type { JSX } from 'react';
import { SalesSplitCard } from '@/components/marketing/sales-split-card';
import { StatTile } from '@/components/marketing/stat-tile';
import { LIVE_INDICATOR, LIVE_STATS, MOBILE_LIVE_STATS, SALES_SPLIT } from '@/config/landing-stats';

export function LiveStatsSection(): JSX.Element {
  return (
    <section className="w-full bg-background-canvas">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-6 px-4 py-14 sm:px-6 lg:px-16 xl:px-[120px]">
        {/* Live indicator — short on mobile, full on sm+ per Figma */}
        <div className="flex items-center gap-2 text-center text-xs leading-4 text-muted-foreground">
          <span className="relative inline-flex size-2 shrink-0" aria-hidden="true">
            <span className="absolute inset-0 animate-ping rounded-full bg-success opacity-60" />
            <span className="relative inline-block size-2 rounded-full bg-success" />
          </span>
          <span className="sm:hidden">{LIVE_INDICATOR.shortText}</span>
          <span className="hidden sm:inline">{LIVE_INDICATOR.text}</span>
        </div>

        {/* Mobile: 4 compact tiles in a 2×2 grid */}
        <div className="grid w-full grid-cols-2 gap-4 lg:hidden">
          {MOBILE_LIVE_STATS.map((stat) => (
            <StatTile key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>

        {/* Desktop: SalesSplitCard + 8 stat tiles */}
        <div className="hidden w-full flex-col gap-4 lg:flex lg:flex-row lg:items-start">
          <SalesSplitCard label="Sales today" data={SALES_SPLIT} className="w-full lg:w-[360px]" />
          <div className="grid min-w-0 flex-1 grid-cols-2 gap-4 md:grid-cols-4">
            {LIVE_STATS.map((stat) => (
              <StatTile key={stat.label} value={stat.value} label={stat.label} icon={stat.icon} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
