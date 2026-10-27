// Blueprint, section D1 "Tenant-scoped caching": backend calls here with
// { tenantId, scope } after a merchant publishes. revalidateTag uses the ONLY
// helper (lib/tenant-cache.ts) so no cache key is ever built by hand.
import { NextResponse, type NextRequest } from 'next/server';
import { revalidateTag } from 'next/cache';
import { tags } from '@/lib/tenant-cache';

type Body = {
  tenantId: string;
  scope: 'store' | 'products' | 'pages' | 'theme' | { product: string };
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  // TODO: verify shared-secret signature from backend before trusting the body.
  const body = (await req.json()) as Body;
  const { tenantId, scope } = body;
  if (scope === 'store') revalidateTag(tags.store(tenantId));
  else if (scope === 'products') revalidateTag(tags.products(tenantId));
  else if (scope === 'pages') revalidateTag(tags.pages(tenantId));
  else if (scope === 'theme') revalidateTag(tags.theme(tenantId));
  else if (typeof scope === 'object' && 'product' in scope) revalidateTag(tags.product(tenantId, scope.product));
  return NextResponse.json({ ok: true });
}
