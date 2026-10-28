import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { JSX } from 'react';
import { cn } from '@ecm/ui/cn';
import { ONBOARDING_STEP_IDS, type OnboardingStep, type OnboardingStepId } from '@/types/onboarding.types';

type Props = {
  steps: readonly OnboardingStep[];
  className?: string;
};

/* Full stepper used on sm+ screens — three circles joined by rules. The
 * mobile-condensed version lives in <OnboardingProgress>. Hide line-left on
 * the first step and line-right on the last so the rail starts and ends with
 * the circle, not the viewport edge. */
export function OnboardingStepper({ steps, className }: Props): JSX.Element {
  const t = useTranslations('onboarding.shell.steps');
  const tShell = useTranslations('onboarding.shell');

  return (
    <ol
      className={cn('flex w-full max-w-[420px] items-start', className)}
      aria-label={tShell('progressAria')}
    >
      {steps.map((step, index) => (
        <li key={step.id} className="flex min-w-0 flex-1 flex-col items-center gap-2">
          <div className="flex w-full items-center">
            <StepRail active={step.status === 'done'} hidden={index === 0} />
            <StepCircle status={step.status} />
            <StepRail
              active={step.status === 'done'}
              hidden={index === steps.length - 1}
            />
          </div>
          <p
            className={cn(
              'text-xs leading-4 text-foreground',
              step.status === 'current' ? 'font-medium' : 'font-normal',
            )}
          >
            {t(`${step.id}.label`)}
          </p>
          <p className="text-xs leading-4 text-muted-foreground">
            {t(`${step.id}.${hintKey(step.status)}`)}
          </p>
        </li>
      ))}
    </ol>
  );
}

/* Compact mobile variant: "Step 2 of 3 · Your store" + a thin progress bar. */
export function OnboardingProgress({ steps }: Props): JSX.Element {
  const tShell = useTranslations('onboarding.shell');
  const tSteps = useTranslations('onboarding.shell.steps');
  const currentIndex = steps.findIndex((s) => s.status === 'current');
  const resolved = currentIndex === -1 ? steps.length - 1 : currentIndex;
  const percent = Math.round(((resolved + 1) / steps.length) * 100);
  const currentStep = steps[resolved];

  return (
    <div className="flex flex-col gap-2" aria-label={tShell('progressAria')}>
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-xs font-medium leading-4 text-foreground">
          {tShell('stepLabel', { current: resolved + 1, total: steps.length })}
        </p>
        {currentStep ? (
          <p className="truncate text-xs leading-4 text-muted-foreground">
            {tSteps(`${currentStep.id}.label`)}
          </p>
        ) : null}
      </div>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        className="h-1.5 w-full overflow-hidden rounded-full bg-background-canvas"
      >
        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

function hintKey(status: OnboardingStep['status']): 'done' | 'now' | 'upcoming' {
  if (status === 'done') return 'done';
  if (status === 'current') return 'now';
  return 'upcoming';
}

function StepRail({ active, hidden }: { active: boolean; hidden: boolean }): JSX.Element {
  return (
    <span
      aria-hidden
      className={cn(
        'h-0.5 min-w-0 flex-1',
        hidden ? 'invisible' : active ? 'bg-primary' : 'bg-border',
      )}
    />
  );
}

function StepCircle({ status }: { status: OnboardingStep['status'] }): JSX.Element {
  if (status === 'done') {
    return (
      <span
        aria-hidden
        className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
      >
        <Check className="size-3.5" strokeWidth={2.5} />
      </span>
    );
  }
  if (status === 'current') {
    return (
      <span
        aria-hidden
        className="flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background"
      >
        <span className="size-2 rounded-full bg-primary" />
      </span>
    );
  }
  return (
    <span
      aria-hidden
      className="size-6 shrink-0 rounded-full border-2 border-border-strong bg-background"
    />
  );
}

export function buildSteps(current: OnboardingStepId): readonly OnboardingStep[] {
  const currentIndex = ONBOARDING_STEP_IDS.indexOf(current);
  return ONBOARDING_STEP_IDS.map((id, index) => ({
    id,
    status: index < currentIndex ? 'done' : index === currentIndex ? 'current' : 'upcoming',
  }));
}
