import type { JSX } from 'react';
import { Globe } from 'lucide-react';
import { Logo } from './logo';
import { MobileNav } from './mobile-nav';
import { SITE_NAV } from '@/config/site-nav';

export function SiteHeader(): JSX.Element {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-border bg-background">
      {/* Mobile row — ≤ lg */}
      <div className="flex h-15 items-center gap-2 px-4 lg:hidden">
        <Logo variant="full" />
        <div className="flex-1" />
        <a
          href="#"
          className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-brand-700"
        >
          Start free
        </a>
        <MobileNav items={SITE_NAV} />
      </div>

      {/* Desktop row — ≥ lg */}
      <div className="mx-auto hidden h-18 max-w-[1440px] items-center gap-7 px-6 lg:flex lg:px-16 xl:px-[120px]">
        <a href="/" aria-label="Ecom Manager home" className="shrink-0">
          <Logo variant="full" />
        </a>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-6 text-sm font-medium text-foreground">
            {SITE_NAV.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="hover:text-primary">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex-1" />
        <button
          type="button"
          className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
          aria-label="Change language"
        >
          <Globe className="size-4" aria-hidden="true" />
          EN · বাংলা
        </button>
        <a
          href="#"
          className="inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium text-foreground hover:bg-muted"
        >
          Log in
        </a>
        <a
          href="#"
          className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-brand-700"
        >
          Create your store
        </a>
      </div>
    </header>
  );
}
