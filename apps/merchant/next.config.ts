import type { NextConfig } from 'next';

const config: NextConfig = {
  transpilePackages: [
    '@ecm/api-client',
    '@ecm/auth',
    '@ecm/format',
    '@ecm/i18n',
    '@ecm/page-schema',
    '@ecm/permissions',
    '@ecm/tenant',
    '@ecm/testing',
    '@ecm/tracking',
    '@ecm/ui',
    '@ecm/validation',
  ],
  // Blueprint, section B "Bundler": Turbopack is the Next.js 16 default. No custom
  // webpack config unless a plugin forces it.
  experimental: {
    typedRoutes: true,
  },
};

export default config;
