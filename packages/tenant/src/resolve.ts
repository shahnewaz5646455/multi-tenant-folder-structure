// Blueprint, section D1 "Multi-tenancy and host routing".
// Edge-cached lookup. Positive hits ~60 s, misses ~10 s so new custom domains
// go live quickly.
//
// IMPORTANT: the only trusted tenant source is this function + the load balancer's
// stripping of X-Tenant-Id. Never trust x-tenant-id sent by the client.
import type { Tenant } from './types.ts';

const POSITIVE_TTL_MS = 60_000;
const NEGATIVE_TTL_MS = 10_000;

type CacheEntry = { tenant: Tenant | null; expiresAt: number };
const cache = new Map<string, CacheEntry>();

export async function resolveTenant(host: string): Promise<Tenant | null> {
  const now = Date.now();
  const hit = cache.get(host);
  if (hit && hit.expiresAt > now) return hit.tenant;

  // TODO: call backend GET /tenants/by-host?host=<host>. Until it's wired,
  // return null so proxy.ts rewrites to /_unknown-store.
  const tenant: Tenant | null = null;

  cache.set(host, {
    tenant,
    expiresAt: now + (tenant ? POSITIVE_TTL_MS : NEGATIVE_TTL_MS),
  });
  return tenant;
}
