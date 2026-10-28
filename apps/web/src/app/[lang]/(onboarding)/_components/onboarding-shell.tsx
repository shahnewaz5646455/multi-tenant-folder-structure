import type { JSX, ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Logo } from '@/components/layout/logo';
import type { OnboardingStepId } from '@/types/onboarding.types';
import { OnboardingProgress, OnboardingStepper, buildSteps } from './onboarding-stepper';

type Props = {
  currentStep: OnboardingStepId;
  children: ReactNode;
};

/* Top-bar shell used by every (onboarding) page: Logo · stepper · help text.
 * On <sm the full stepper collapses to a condensed progress line; the help
 * phone number drops to a muted icon-only link so the title has room. */
export function OnboardingShell({ currentStep, children }: Props): JSX.Element {
  const t = useTranslations('onboarding.shell');
  const steps = buildSteps(currentStep);
  const helpText = t('needHelp');
  const phone = helpText.replace(/^[^0-9+]*/u, '');

  return (
    <div className="flex min-h-screen flex-col">
      <header className="w-full border-b border-border bg-background">
        <div className="mx-auto flex w-full max-w-[1440px] items-center gap-4 px-4 py-3 sm:px-6 lg:px-10">
          <Logo variant="full" />
          <div className="hidden flex-1 justify-center lg:flex">
            <OnboardingStepper steps={steps} />
          </div>
          <div className="ml-auto hidden shrink-0 lg:block">
            <a
              href={`tel:${phone}`}
              className="text-xs leading-4 text-muted-foreground transition-colors hover:text-foreground"
            >
              {helpText}
            </a>
          </div>
        </div>
        <div className="border-t border-border px-4 py-3 sm:px-6 lg:hidden">
          <OnboardingProgress steps={steps} />
        </div>
      </header>

      <div className="flex flex-1 flex-col items-center px-4 pb-10 pt-6 sm:px-6 sm:pt-10 lg:pt-12">
        {children}
      </div>
    </div>
  );
}
