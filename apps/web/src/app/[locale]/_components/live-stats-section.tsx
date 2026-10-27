import type { JSX } from 'react';
import { Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { SalesSplitCard } from '@/components/marketing/sales-split-card';
import { StatTile } from '@/components/marketing/stat-tile';
import {
  DESKTOP_RATING_STAT_KEY,
  DESKTOP_STAT_KEYS,
  MOBILE_STAT_KEYS,
  SALES_SPLIT_PERCENTS,
} from '@/config/landing-stats';

export function LiveStatsSection(): JSX.Element {
  const t = useTranslations('home.liveStats');

  const salesSplitData = {
    total: t('salesSplit.total'),
    online: { value: t('salesSplit.onlineValue'), percent: SALES_SPLIT_PERCENTS.online },
    cod: { value: t('salesSplit.codValue'), percent: SALES_SPLIT_PERCENTS.cod },
  };

  return (
    <section className="w-full bg-background-canvas">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-6 px-4 py-14 sm:px-6 lg:px-16 xl:px-[120px]">
        {/* Live indicator — short on mobile, full on sm+ per Figma */}
        <div className="flex items-center gap-2 text-center text-xs leading-4 text-muted-foreground">
          <span className="relative inline-flex size-2 shrink-0" aria-hidden="true">
            <span className="absolute inset-0 animate-ping rounded-full bg-success opacity-60" />
            <span className="relative inline-block size-2 rounded-full bg-success" />
          </span>
          <span className="sm:hidden">{t('indicator.short')}</span>
          <span className="hidden sm:inline">{t('indicator.full')}</span>
        </div>

        {/* Mobile: 4 compact tiles in a 2×2 grid */}
        <div className="grid w-full grid-cols-2 gap-4 lg:hidden">
          {MOBILE_STAT_KEYS.map((key) => (
            <StatTile key={key} value={t(`mobile.${key}.value`)} label={t(`mobile.${key}.label`)} />
          ))}
        </div>

        {/* Desktop: SalesSplitCard + 8 stat tiles */}
        <div className="hidden w-full flex-col gap-4 lg:flex lg:flex-row lg:items-start">
          <SalesSplitCard
            label={t('salesSplit.label')}
            data={salesSplitData}
            onlineLabel={t('salesSplit.onlineLabel')}
            codLabel={t('salesSplit.codLabel')}
            className="w-full lg:w-[360px]"
          />
          <div className="grid min-w-0 flex-1 grid-cols-2 gap-4 md:grid-cols-4">
            {DESKTOP_STAT_KEYS.map((key) => (
              <StatTile
                key={key}
                value={t(`desktop.${key}.value`)}
                label={t(`desktop.${key}.label`)}
                icon={key === DESKTOP_RATING_STAT_KEY ? Star : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
