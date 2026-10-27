// Blueprint, section B "Auth": BFF session. The browser never calls the backend
// directly from the merchant panel — the Next.js server owns the refresh token,
// and only the access token is sent downstream.
import { NextResponse } from 'next/server';

export async function POST(): Promise<NextResponse> {
  // TODO: read refresh cookie, call backend /auth/refresh, rotate both cookies.
  return NextResponse.json({ ok: true });
}
