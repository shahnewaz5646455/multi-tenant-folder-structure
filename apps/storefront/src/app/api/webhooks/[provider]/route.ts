// Blueprint, section C: provider webhooks (payment, courier). Verified at the
// backend; this route is a thin forwarder.
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ provider: string }> },
): Promise<NextResponse> {
  await params;
  // TODO: forward body + headers to backend, return backend's response.
  return NextResponse.json({ ok: true });
}
