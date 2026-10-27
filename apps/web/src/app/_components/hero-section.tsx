import type { JSX } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Badge } from '@ecm/ui/badge';
import { cn } from '@ecm/ui/cn';
import { DashboardPreview } from '@/components/marketing/dashboard-preview';
import { OrderToast } from '@/components/marketing/order-toast';
import { HERO_COPY, HERO_KPIS, HERO_CHART_BARS, HERO_TOAST } from '@/config/landing-hero';

export function HeroSection(): JSX.Element {
  return (
    <section className="w-full bg-background">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-10 px-4 py-14 sm:px-6 lg:flex-row lg:items-start lg:gap-14 lg:px-16 lg:py-18 xl:px-[120px]">
        {/* Copy column */}
        <div className="flex min-w-0 flex-1 flex-col items-start gap-6">
          <Badge className='px-1' tone="accent-orange">{HERO_COPY.badge}</Badge>

          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl sm:leading-[1.1] lg:display-xl">
            {HERO_COPY.headline}
          </h1>

          <p className="text-base leading-6 text-muted-foreground">{HERO_COPY.subhead}</p>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href={HERO_COPY.primaryCta.href}
              className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-brand-700"
            >
              {HERO_COPY.primaryCta.label}
            </a>
            <a
              href={HERO_COPY.secondaryCta.href}
              className="inline-flex h-11 items-center justify-center rounded-md border border-border-strong bg-background px-5 py-3 text-sm font-medium text-foreground hover:bg-muted"
            >
              {HERO_COPY.secondaryCta.label}
            </a>
          </div>

          <ul className="flex flex-col gap-2 text-xs leading-4 text-muted-foreground sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-2">
            {HERO_COPY.trust.map((item, i) => (
              <li
                key={item}
                className={cn(
                  'flex items-center gap-1.5',
                  // Mobile Figma shows only 2 trust items; drop the middle one at <sm
                  i === 1 && 'hidden sm:flex',
                )}
              >
                <CheckCircle2 className="size-4 text-icon-primary" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Visual column — hidden on mobile per Figma; shown from lg: at 560×420 */}
        <div className="relative hidden w-full shrink-0 lg:block lg:w-[560px]">
          <div className="flex h-[460px] w-full flex-col gap-4 rounded-xl bg-success-bg p-6 sm:h-[500px] lg:h-[420px] lg:gap-0">
            <div className="min-h-0 flex-1">
              <DashboardPreview kpis={HERO_KPIS} bars={HERO_CHART_BARS} />
            </div>
            {/* Mobile placement: static below dashboard, inside the frame */}
            <OrderToast title={HERO_TOAST.title} meta={HERO_TOAST.meta} className="lg:hidden" />
          </div>
          {/* Desktop placement: overlaps the bottom-left of the frame (Figma -40, 330/420 ≈ 78%) */}
          <OrderToast
            title={HERO_TOAST.title}
            meta={HERO_TOAST.meta}
            className="absolute -left-10 top-[78%] hidden lg:flex"
          />
        </div>
      </div>
    </section>
  );
}
