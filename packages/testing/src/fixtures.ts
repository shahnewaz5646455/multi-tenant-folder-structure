export const fixtures = {
  user: {
    userId: 'usr_1',
    email: 'owner@example.com',
    phone: '01711111111',
    stores: [{ storeId: 'store_1', role: 'Owner' }],
  },
  tenant: {
    tenantId: 'tenant_1',
    domain: 'demo',
    status: 'active' as const,
    locale: 'en' as const,
    theme: {
      brand500: 'oklch(55% 0.17 265)',
      brand600: 'oklch(48% 0.17 265)',
      brand700: 'oklch(42% 0.15 265)',
    },
  },
};
