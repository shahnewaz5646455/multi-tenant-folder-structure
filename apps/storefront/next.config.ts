import type { NextConfig } from 'next';

const config: NextConfig = {
  transpilePackages: [
    '@ecm/api-client',
    '@ecm/format',
    '@ecm/i18n',
    '@ecm/page-schema',
    '@ecm/tenant',
    '@ecm/tracking',
    '@ecm/validation',
  ],
  // Blueprint, section D2 storefront rule 5: images via a CDN loader, not the
  // built-in optimiser, so 100k stores do not hit per-image optimisation quotas.
  images: {
    loader: 'custom',
    loaderFile: './src/lib/image-loader.ts',
  },
};

export default config;
