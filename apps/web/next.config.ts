import type { NextConfig } from 'next';

const config: NextConfig = {
  transpilePackages: ['@ecm/format', '@ecm/i18n', '@ecm/ui'],
};

export default config;
