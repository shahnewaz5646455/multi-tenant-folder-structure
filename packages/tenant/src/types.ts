export type TenantStatus = 'active' | 'paused' | 'suspended';

export type TenantTheme = {
  brand500: string;
  brand600: string;
  brand700: string;
  fontBody?: string;
};

export type Tenant = {
  tenantId: string;
  /** The /[domain] route segment the storefront rewrites host → path into. */
  domain: string;
  status: TenantStatus;
  locale: 'en' | 'bn';
  theme: TenantTheme;
};
