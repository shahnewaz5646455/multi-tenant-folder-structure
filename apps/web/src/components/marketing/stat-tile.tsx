import type { JSX } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@ecm/ui/cn';

export type StatTileProps = {
  value: string;
  label: string;
  icon?: LucideIcon;
  className?: string;
};

export function StatTile({ value, label, icon: Icon, className }: StatTileProps): JSX.Element {
  return (
    <div
      className={cn(
        'flex min-w-0 flex-col gap-0.5 rounded-lg border border-border bg-background px-4 py-3',
        className,
      )}
    >
      <span className="flex items-center gap-1">
        <span className="heading-xl truncate text-foreground">{value}</span>
        {Icon ? <Icon className="size-[18px] fill-accent-orange text-accent-orange" aria-hidden="true" /> : null}
      </span>
      <span className="truncate text-xs leading-4 text-muted-foreground">{label}</span>
    </div>
  );
}
