// Blueprint, section B "Styling": tenant brand colours and fonts swap at
// runtime through the same CSS variables set in @ecm/tailwind-config.
import type { TenantTheme } from './types.ts';

export function tenantThemeToCssVars(theme: TenantTheme): Record<string, string> {
  const vars: Record<string, string> = {
    '--color-brand-500': theme.brand500,
    '--color-brand-600': theme.brand600,
    '--color-brand-700': theme.brand700,
  };
  if (theme.fontBody) vars['--font-sans'] = theme.fontBody;
  return vars;
}
