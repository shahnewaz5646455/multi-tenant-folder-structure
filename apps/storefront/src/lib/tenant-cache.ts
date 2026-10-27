// Blueprint, section D1 "Tenant-scoped caching" — the canonical snippet.
// Every cache tag in the storefront goes through here. No developer ever writes
// a cache tag by hand. A cross-tenant cache leak is the one bug a multi-tenant
// storefront cannot survive (SRS 6.4 tenant isolation).

export const tags = {
  store: (t: string): string => `t:${t}:store`,
  products: (t: string): string => `t:${t}:products`,
  product: (t: string, id: string): string => `t:${t}:product:${id}`,
  pages: (t: string): string => `t:${t}:pages`,
  theme: (t: string): string => `t:${t}:theme`,
};
