import type { JSX, ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Logo } from '@/components/layout/logo';
import { Link } from '@/i18n/navigation';
import { AuthLocaleSwitcher } from './auth-locale-switcher';
import { BrandPanel } from './brand-panel';

type Props = {
  children: ReactNode;
};

/* Split-screen auth layout used by every (auth) page: brand panel on the left
 * ≥ lg, content column on the right with the locale switcher pinned to its
 * top-right. The content column caps at 400px to match Figma.
 *
 * Below lg the brand panel is hidden, so the content column grows its own top
 * bar: the Logo (linking home) on the left and the locale switcher on the
 * right — otherwise the mark would disappear entirely on mobile. */
export function AuthShell({ children }: Props): JSX.Element {
  const t = useTranslations('nav');

  return (
    <div className="flex min-h-screen w-full items-stretch">
      <BrandPanel />
      <div className="relative flex min-h-screen min-w-0 flex-1 flex-col px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex items-center justify-between lg:hidden">
          <Link href="/" aria-label={t('home')} className="shrink-0">
            <Logo variant="full" />
          </Link>
          <AuthLocaleSwitcher />
        </div>
        <div className="absolute right-4 top-6 hidden sm:right-8 sm:top-8 lg:block">
          <AuthLocaleSwitcher />
        </div>
        <div className="flex flex-1 items-center justify-center py-8 lg:py-0">
          {/* w-[400px] matches Figma's fixed content column art direction. */}
          <div className="flex w-full max-w-[400px] flex-col gap-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
