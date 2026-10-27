// Blueprint, section D1 "Storefront proxy.ts" — the canonical snippet.
import { NextResponse, type NextRequest } from 'next/server';
import { resolveTenant } from '@ecm/tenant/resolve';

export const config = {
  matcher: ['/((?!_next/|api/|preview/|favicon.ico|.*\\..*).*)'],
};

export async function proxy(req: NextRequest): Promise<NextResponse> {
  const host = req.headers.get('host')?.toLowerCase().replace(/:\d+$/, '');
  if (!host) return new NextResponse('Bad Request', { status: 400 });

  // Edge-cached lookup: host → { tenantId, domain, status, locale }.
  // Positive hits ~60 s and misses ~10 s so a new custom domain goes live quickly.
  const tenant = await resolveTenant(host);
  if (!tenant) return NextResponse.rewrite(new URL('/_unknown-store', req.url));

  const url = req.nextUrl.clone();
  url.pathname =
    tenant.status === 'active'
      ? `/${tenant.domain}${url.pathname}`
      : `/${tenant.domain}/maintenance`; // paused / suspended: no orders accepted

  const res = NextResponse.rewrite(url);
  // Read by server code, NEVER trusted from the client. The load balancer must
  // strip any incoming X-Tenant-Id header.
  res.headers.set('x-tenant-id', tenant.tenantId);
  return res;
}
