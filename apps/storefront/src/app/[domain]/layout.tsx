// Blueprint, section C "Storefront app": loads tenant, injects CSS variables,
// header, footer. Server Component.
import type { ReactNode } from 'react';
import { resolveTenant } from '@ecm/tenant/resolve';
import { tenantThemeToCssVars } from '@ecm/tenant/theme';
import { notFound } from 'next/navigation';

export default async function DomainLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ domain: string }>;
}): Promise<React.ReactElement> {
  const { domain } = await params;
  // proxy.ts has already resolved by host; a direct hit on /[domain] is unusual
  // but we re-resolve to pick up status and theme.
  const tenant = await resolveTenant(domain);
  if (!tenant) notFound();

  const styleVars = tenantThemeToCssVars(tenant.theme);
  return (
    <div style={styleVars as React.CSSProperties}>
      {/* TODO: header, footer. Hand-built blocks only — @ecm/ui wholesale import is banned (D2). */}
      {children}
    </div>
  );
}
