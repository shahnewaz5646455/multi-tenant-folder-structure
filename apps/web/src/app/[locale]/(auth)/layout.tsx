import type { JSX, ReactNode } from 'react';

/* Auth pages render their own full-screen layouts (split brand panel + form)
 * so this layout only drops the site chrome inherited from [locale]/layout
 * via a semantic <main> landmark. */
export default function AuthLayout({ children }: { children: ReactNode }): JSX.Element {
  return <main className="min-h-screen bg-background">{children}</main>;
}
