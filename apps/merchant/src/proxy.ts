// Blueprint, section D3 "RBAC and route protection", layer 1: proxy only checks
// the session cookie exists. Everything else — store access, permission, plan —
// is checked server-side in layouts and ServerActions.
//
// In Next.js 16 the file is named proxy.ts (middleware.ts was the older name).
import { NextResponse, type NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/login', '/register', '/forgot-password', '/otp'];

export const config = {
  matcher: ['/((?!_next/|api/|favicon.ico|.*\\..*).*)'],
};

export function proxy(req: NextRequest): NextResponse {
  const { pathname } = req.nextUrl;
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) return NextResponse.next();

  const session = req.cookies.get('__Host-ecm.access');
  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
