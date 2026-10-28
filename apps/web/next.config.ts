import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const config: NextConfig = {
  transpilePackages: ['@ecm/format', '@ecm/i18n', '@ecm/ui'],
  /* Next 15+ refuses to bootstrap its dev runtime (hydration, HMR, devtools)
   * for requests whose Host header isn't localhost unless listed here, which
   * silently breaks `useState`-driven UI (segmented tabs, accordions, etc.)
   * when testing from a WSL bridge or LAN IP. Add new testing hosts here. */
  allowedDevOrigins: ['172.26.144.1', '*.trycloudflare.com'],
};

export default withNextIntl(config);
