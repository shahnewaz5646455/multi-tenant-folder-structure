import type { JSX } from 'react';
import { cn } from '@ecm/ui/cn';
import type { FeeTile as FeeTileData } from '@/types/marketing.types';

export type FeeTileProps = {
  tile: FeeTileData;
  className?: string;
};

export function FeeTile({ tile, className }: FeeTileProps): JSX.Element {
  const { icon: Icon, label, value, hint } = tile;
  return (
    <div
      className={cn(
        'flex min-w-0 flex-1 items-center gap-3 rounded-md bg-background-subdued p-4',
        className,
      )}
    >
      <span
        className="inline-flex size-10 shrink-0 items-center justify-center rounded-md bg-success-bg"
        aria-hidden="true"
      >
        <Icon className="size-5 text-icon-primary" />
      </span>
      <div className="flex min-w-0 flex-col">
        <span className="text-xs leading-4 text-muted-foreground">{label}</span>
        <span className="text-xl font-semibold leading-7 text-foreground">{value}</span>
        <span className="text-xs leading-4 text-muted-foreground">{hint}</span>
      </div>
    </div>
  );
}
