'use client';

import { useEffect, useState, type JSX } from 'react';
import { ChevronRight, LogIn, Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@ecm/ui/cn';
import type { NavItem } from '@/types/nav.types';
import { Link } from '@/i18n/navigation';
import { LocaleSwitcher } from './locale-switcher';
import { Logo } from './logo';

export type MobileNavProps = {
  items: readonly NavItem[];
};

export function MobileNav({ items }: MobileNavProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const t = useTranslations('nav');
  const tAction = useTranslations('common.action');

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = (): void => setOpen(false);

  return (
    <>
      <button
        type="button"
        aria-label={open ? tAction('closeMenu') : tAction('openMenu')}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-11 items-center justify-center rounded-md text-icon hover:bg-muted"
      >
        {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
      </button>

      <div
        className={cn(
          'fixed inset-0 z-40 bg-foreground/40 transition-opacity lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={close}
        aria-hidden="true"
      />
      <aside
        className={cn(
          'fixed right-0 top-0 z-50 flex h-dvh w-[min(340px,88vw)] flex-col bg-background shadow-lg transition-transform lg:hidden',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
        aria-label={t('mobile')}
        aria-hidden={!open}
      >
        {/* Drawer header: logo + close */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <Link href="/" aria-label={t('home')} onClick={close}>
            <Logo variant="full" />
          </Link>
          <button
            type="button"
            aria-label={tAction('closeMenu')}
            onClick={close}
            className="inline-flex size-10 items-center justify-center rounded-md text-icon hover:bg-muted"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        {/* Primary nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label={t('primary')}>
          <ul className="flex flex-col gap-1">
            {items.map((item) => (
              <li key={item.labelKey}>
                <Link
                  href={item.href}
                  onClick={close}
                  className="group flex min-h-11 items-center justify-between gap-3 rounded-md px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <span>{t(`items.${item.labelKey}`)}</span>
                  <ChevronRight
                    className="size-4 text-icon-muted transition-transform group-hover:translate-x-0.5 group-hover:text-icon"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Language switcher, below the nav list */}
          <div className="mt-4 border-t border-border pt-4">
            <LocaleSwitcher variant="mobile" />
          </div>
        </nav>

        {/* Sticky footer: auth CTAs */}
        <div className="flex flex-col gap-3 border-t border-border bg-background-subdued px-4 py-4">
          <Link
            href="/login"
            onClick={close}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-border-strong bg-background text-sm font-medium text-foreground hover:bg-muted"
          >
            <LogIn className="size-4" aria-hidden="true" />
            {t('logIn')}
          </Link>
          <Link
            href="/signup"
            onClick={close}
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground hover:bg-brand-700"
          >
            {t('createYourStore')}
          </Link>
        </div>
      </aside>
    </>
  );
}
