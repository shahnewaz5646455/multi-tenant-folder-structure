'use client';

import { useEffect, useState, type JSX } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@ecm/ui/cn';
import type { NavItem } from '@/types/nav.types';

export type MobileNavProps = {
  items: readonly NavItem[];
};

export function MobileNav({ items }: MobileNavProps): JSX.Element {
  const [open, setOpen] = useState(false);

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

  return (
    <>
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
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
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={cn(
          'fixed right-0 top-0 z-50 flex h-dvh w-[min(320px,85vw)] flex-col gap-1 bg-background p-4 shadow-sm transition-transform lg:hidden',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
        aria-label="Mobile navigation"
        aria-hidden={!open}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="mb-4 ml-auto inline-flex size-11 items-center justify-center rounded-md text-icon hover:bg-muted"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
        <nav>
          <ul className="flex flex-col">
            {items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center rounded-md px-3 text-base font-medium text-foreground hover:bg-muted"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="mt-2 border-t border-border pt-2">
              <a
                href="/login"
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center rounded-md px-3 text-base font-medium text-foreground hover:bg-muted"
              >
                Log in
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
