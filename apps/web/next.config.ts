import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const config: NextConfig = {
  transpilePackages: ['@ecm/format', '@ecm/i18n', '@ecm/ui'],
};

export default withNextIntl(config);
