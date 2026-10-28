import type { JSX, ReactNode } from 'react';

/* Onboarding pages render their own full-screen shell (top bar + canvas card)
 * so this layout only drops the site chrome inherited from [lang]/layout via
 * a semantic <main> landmark on the canvas background. */
export default function OnboardingLayout({ children }: { children: ReactNode }): JSX.Element {
  return <main className="min-h-screen bg-background-canvas">{children}</main>;
}
