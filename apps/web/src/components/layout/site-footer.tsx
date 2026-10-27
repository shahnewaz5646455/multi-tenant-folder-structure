import type { JSX } from 'react';
import { Globe, MessageCircle, ExternalLink } from 'lucide-react';
import { Logo } from './logo';
import { FOOTER_COLUMNS, FOOTER_OFFICES, FOOTER_TAGLINE } from '@/config/site-footer';

export function SiteFooter(): JSX.Element {
  return (
    <footer className="w-full bg-inverse text-inverse-foreground">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-4 pb-8 pt-10 sm:px-6 lg:px-16 lg:pt-16 xl:px-[120px]">
        {/* Columns */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[320px_repeat(4,1fr)] lg:gap-12">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <span className="inline-flex items-center gap-2">
              <Logo variant="mark" />
              <span className="text-base font-semibold leading-6 text-inverse-foreground">Ecom Manager</span>
            </span>
            <p className="text-sm leading-5 text-inverse-muted">{FOOTER_TAGLINE}</p>
            <div className="flex items-start gap-3 text-inverse-muted">
              <a href="/en" aria-label="Language" className="hover:text-inverse-foreground">
                <Globe className="size-5" aria-hidden="true" />
              </a>
              <a href="/support" aria-label="Chat with support" className="hover:text-inverse-foreground">
                <MessageCircle className="size-5" aria-hidden="true" />
              </a>
              <a href="/status" aria-label="System status" className="hover:text-inverse-foreground">
                <ExternalLink className="size-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.key} aria-label={col.title} className="flex min-w-0 flex-col gap-2.5">
              <p className="overline text-inverse-muted">{col.title}</p>
              <ul className="flex flex-col gap-2.5">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="break-words text-sm leading-5 text-inverse-foreground hover:underline"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Offices */}
        <div className="grid grid-cols-1 gap-6 border-t border-inverse-border pt-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {FOOTER_OFFICES.map((office) => (
            <div key={office.title} className="min-w-0">
              <p className="text-xs font-medium leading-4 text-inverse-foreground">{office.title}</p>
              <p className="break-words text-xs leading-4 text-inverse-muted">{office.body}</p>
            </div>
          ))}
        </div>

        {/* Copyright row */}
        <div className="flex flex-col gap-1 text-xs leading-4 text-inverse-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Ecom Manager. All rights reserved.</p>
          <p>Made in Bangladesh</p>
        </div>
      </div>
    </footer>
  );
}
