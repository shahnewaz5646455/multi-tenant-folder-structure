import type { JSX, ReactNode } from 'react';
import { AuthLocaleSwitcher } from './auth-locale-switcher';
import { BrandPanel } from './brand-panel';

type Props = {
  children: ReactNode;
};

/* Split-screen auth layout used by every (auth) page: brand panel on the left
 * ≥ lg, content column on the right with the locale switcher pinned to its
 * top-right. The content column caps at 400px to match Figma. */
export function AuthShell({ children }: Props): JSX.Element {
  return (
    <div className="flex min-h-screen w-full items-stretch">
      <BrandPanel />
      <div className="relative flex min-h-screen min-w-0 flex-1 flex-col items-center justify-center px-4 py-10 sm:px-6">
        <div className="absolute right-4 top-6 sm:right-8 sm:top-8">
          <AuthLocaleSwitcher />
        </div>
        {/* w-[400px] matches Figma's fixed content column art direction. */}
        <div className="flex w-full max-w-[400px] flex-col gap-4">{children}</div>
      </div>
    </div>
  );
}
