// Typed fetch wrapper around the backend. Attaches the tenant header, the
// server-side access token (passed by caller — this package never reads cookies),
// retries idempotent reads, and maps 4xx/5xx into ApiError (see errors.ts).
//
// Blueprint, section B "API layer": openapi-typescript + openapi-fetch; wrapper
// adds tenant header + auth + error mapping.
import createClient from 'openapi-fetch';
import type { paths } from './schema';
import { ApiError } from './errors.ts';

export type ApiClientOptions = {
  baseUrl: string;
  /** Access token resolved by the caller (BFF cookie, SA session, etc.). */
  getAccessToken?: () => string | undefined | Promise<string | undefined>;
  /** Tenant id set by proxy.ts in the storefront, by the session in merchant. */
  tenantId?: string;
  /** For storefront + merchant: forwarded for the audit log when an admin impersonates. */
  impersonationId?: string;
};

export type ApiClient = ReturnType<typeof createClient<paths>>;

export function createApiClient(opts: ApiClientOptions): ApiClient {
  const client = createClient<paths>({ baseUrl: opts.baseUrl });

  client.use({
    async onRequest({ request }) {
      const token = await opts.getAccessToken?.();
      if (token) request.headers.set('Authorization', `Bearer ${token}`);
      if (opts.tenantId) request.headers.set('X-Tenant-Id', opts.tenantId);
      if (opts.impersonationId) request.headers.set('X-Impersonation', opts.impersonationId);
      return request;
    },
    async onResponse({ response }) {
      if (!response.ok) throw await ApiError.fromResponse(response);
      return response;
    },
  });

  return client;
}
