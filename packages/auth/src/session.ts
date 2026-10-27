// Blueprint, section B "Auth": the Next.js server is a BFF; tokens live in
// httpOnly, Secure, SameSite=Lax, host-only cookies. The browser NEVER sees them.
import 'server-only';
import { cookies } from 'next/headers';
import type { StoreSession } from '@ecm/permissions';

export type UserSession = {
  userId: string;
  email: string;
  phone?: string;
  stores: { storeId: string; role: string }[];
};

const ACCESS_COOKIE = '__Host-ecm.access';
const REFRESH_COOKIE = '__Host-ecm.refresh';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: 'lax' as const,
  path: '/',
};

export async function setSessionCookies(access: string, refresh: string, accessMaxAge: number): Promise<void> {
  const store = await cookies();
  store.set(ACCESS_COOKIE, access, { ...COOKIE_OPTIONS, maxAge: accessMaxAge });
  store.set(REFRESH_COOKIE, refresh, { ...COOKIE_OPTIONS, maxAge: 60 * 60 * 24 * 30 });
}

export async function clearSessionCookies(): Promise<void> {
  const store = await cookies();
  store.delete(ACCESS_COOKIE);
  store.delete(REFRESH_COOKIE);
}

export async function getAccessToken(): Promise<string | undefined> {
  return (await cookies()).get(ACCESS_COOKIE)?.value;
}

// TODO: wire to backend. Returns the user session or undefined if no cookie.
export async function getUserSession(): Promise<UserSession | undefined> {
  const token = await getAccessToken();
  if (!token) return undefined;
  // Blueprint: cached per request with React cache() so sibling layouts/pages
  // reuse one call. Fetch /me from backend here.
  return undefined;
}

// Blueprint D3: refresh permissions on store switch and every 5 minutes.
export async function getStoreSession(_storeId: string): Promise<StoreSession | undefined> {
  const token = await getAccessToken();
  if (!token) return undefined;
  // Fetch /me/stores/:storeId — backend resolves role → permissions server-side.
  return undefined;
}
