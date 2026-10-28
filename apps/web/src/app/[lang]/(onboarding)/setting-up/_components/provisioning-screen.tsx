'use client';

import { CheckCircle2, Minus, RefreshCw, Sparkles, Store } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useMemo, useState, type JSX } from 'react';
import { cn } from '@ecm/ui/cn';
import type { BusinessCategory } from '@/types/onboarding.types';

type Props = {
  storeName: string;
  slug: string;
  category: BusinessCategory;
};

type StepId = 'createStore' | 'reserveDomain' | 'installTheme' | 'payments' | 'https';
type StepStatus = 'done' | 'current' | 'upcoming';

const STEPS: ReadonlyArray<{ id: StepId; seconds: number }> = [
  { id: 'createStore', seconds: 2 },
  { id: 'reserveDomain', seconds: 1 },
  { id: 'installTheme', seconds: 6 },
  { id: 'payments', seconds: 4 },
  { id: 'https', seconds: 3 },
];

const TOTAL_SECONDS = STEPS.reduce((sum, step) => sum + step.seconds, 0);

/* Theme pick is driven by the selected business category so copy stays
 * consistent with the preceding form choice. Kept here (not in a constants
 * file) because it's used by exactly one component. */
const THEME_BY_CATEGORY: Record<BusinessCategory, string> = {
  fashion: 'Fashion Street',
  electronics: 'Tech Hub',
  grocery: 'Fresh Market',
  cosmetics: 'Glow',
  books: 'Reader',
  sports: 'Play',
  digital: 'Pulse',
  other: 'Default',
};

export function ProvisioningScreen({ storeName, slug, category }: Props): JSX.Element {
  const t = useTranslations('onboarding.settingUp');
  const tSteps = useTranslations('onboarding.settingUp.steps');
  const locale = useLocale();

  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const handle = window.setInterval(() => {
      const next = Math.min(TOTAL_SECONDS, (Date.now() - start) / 1000);
      setElapsed(next);
      if (next >= TOTAL_SECONDS) window.clearInterval(handle);
    }, 250);
    return () => window.clearInterval(handle);
  }, []);

  const { percent, secondsLeft, statuses } = useMemo(() => computeState(elapsed), [elapsed]);
  const nf = new Intl.NumberFormat(locale);

  return (
    <section className="w-full max-w-[560px] rounded-xl border border-border bg-background p-6 shadow-md sm:p-8">
      <div className="flex flex-col gap-5">
        <span
          aria-hidden
          className="flex size-14 items-center justify-center rounded-full bg-success-bg text-success"
        >
          <Store className="size-6" strokeWidth={1.8} />
        </span>

        <header className="flex flex-col gap-2">
          <h1 className="heading-xl text-foreground">{t('title', { storeName })}</h1>
          <p className="text-sm leading-5 text-muted-foreground">{t('subtitle')}</p>
        </header>

        <div className="flex flex-col gap-1.5">
          <div
            role="progressbar"
            aria-label={t('progressAria')}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
            className="h-2 w-full overflow-hidden rounded-full bg-background-canvas"
          >
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-200 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="flex items-baseline justify-between gap-2 text-xs leading-4">
            <span className="font-medium text-foreground">{t('percent', { percent })}</span>
            {secondsLeft > 0 ? (
              <span className="text-muted-foreground">
                {t('timeLeft', { seconds: Math.ceil(secondsLeft) })}
              </span>
            ) : null}
          </div>
        </div>

        <ol className="flex flex-col gap-3">
          {STEPS.map((step) => {
            const status = statuses[step.id];
            const Icon = status === 'done' ? CheckCircle2 : status === 'current' ? RefreshCw : Minus;
            const note = buildNote(step.id, status, step.seconds, {
              tSteps,
              category,
              formatSeconds: (s) => nf.format(s),
            });
            return (
              <li key={step.id} className="flex items-center gap-3">
                <Icon
                  aria-hidden
                  className={cn(
                    'size-5 shrink-0',
                    status === 'done' && 'text-success',
                    status === 'current' && 'animate-spin text-accent-blue',
                    status === 'upcoming' && 'text-muted-foreground',
                  )}
                />
                <span
                  className={cn(
                    'min-w-0 flex-1 text-sm leading-5',
                    status === 'current' ? 'font-medium text-foreground' : 'text-foreground',
                    status === 'upcoming' && 'text-muted-foreground',
                  )}
                >
                  {renderStepLabel(step.id, { slug, category, tSteps })}
                </span>
                {note ? (
                  <span className="shrink-0 text-xs leading-4 text-muted-foreground">{note}</span>
                ) : null}
              </li>
            );
          })}
        </ol>

        <div className="flex items-center gap-3 rounded-md bg-accent-orange-subtle px-4 py-3">
          <Sparkles aria-hidden className="size-5 shrink-0 text-accent-orange" />
          <p className="min-w-0 flex-1 text-xs leading-4 text-foreground">{t('tip')}</p>
        </div>
      </div>
    </section>
  );
}

function computeState(elapsed: number): {
  percent: number;
  secondsLeft: number;
  statuses: Record<StepId, StepStatus>;
} {
  let cumulative = 0;
  const statuses: Record<StepId, StepStatus> = {
    createStore: 'upcoming',
    reserveDomain: 'upcoming',
    installTheme: 'upcoming',
    payments: 'upcoming',
    https: 'upcoming',
  };
  let currentFound = false;
  for (const step of STEPS) {
    const end = cumulative + step.seconds;
    if (elapsed >= end) statuses[step.id] = 'done';
    else if (!currentFound) {
      statuses[step.id] = 'current';
      currentFound = true;
    }
    cumulative = end;
  }
  const percent = Math.min(100, Math.round((elapsed / TOTAL_SECONDS) * 100));
  const secondsLeft = Math.max(0, TOTAL_SECONDS - elapsed);
  return { percent, secondsLeft, statuses };
}

function renderStepLabel(
  id: StepId,
  ctx: {
    slug: string;
    category: BusinessCategory;
    tSteps: ReturnType<typeof useTranslations>;
  },
): string {
  const { slug, category, tSteps } = ctx;
  if (id === 'reserveDomain') return tSteps('reserveDomain.label', { domain: `${slug}.ecom.bd` });
  if (id === 'installTheme') {
    return tSteps('installTheme.label', { theme: THEME_BY_CATEGORY[category] });
  }
  return tSteps(`${id}.label`);
}

function buildNote(
  id: StepId,
  status: StepStatus,
  seconds: number,
  ctx: {
    tSteps: ReturnType<typeof useTranslations>;
    category: BusinessCategory;
    formatSeconds: (seconds: number) => string;
  },
): string | null {
  if (status !== 'done') return null;
  const { tSteps, category, formatSeconds } = ctx;
  if (id === 'installTheme') {
    return tSteps('installTheme.note', {
      audience: tSteps(`installTheme.audience.${category}`),
      seconds: formatSeconds(seconds),
    });
  }
  if (id === 'payments' || id === 'https') return null;
  return tSteps(`${id}.duration`, { seconds: formatSeconds(seconds) });
}
