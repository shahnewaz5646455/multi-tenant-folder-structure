import type { JSX } from 'react';
import { cn } from '@ecm/ui/cn';
import type { Provider } from '@/types/marketing.types';

export type ProviderLogoProps = {
  provider: Provider;
  className?: string;
};

/**
 * Placeholder tile — a brand-hex square with initials. Replaces with a real
 * SVG logo once asset is provided. Hex is one-off art direction, not a
 * theme token, so inline style is deliberate here.
 */
export function ProviderLogo({ provider, className }: ProviderLogoProps): JSX.Element {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <span
        className="inline-flex size-8 items-center justify-center rounded-md"
        style={{ backgroundColor: provider.tileHex }}
        aria-hidden="true"
      >
        <span
          className={cn(
            'font-bold text-white',
            provider.initials.length >= 3 ? 'text-[11px]' : 'text-[13px]',
          )}
        >
          {provider.initials}
        </span>
      </span>
      <span className="text-sm font-medium leading-5 text-muted-foreground">{provider.name}</span>
    </span>
  );
}
