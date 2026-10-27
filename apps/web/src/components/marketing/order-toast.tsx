import type { JSX } from 'react';
import { ShoppingBag } from 'lucide-react';
import { cn } from '@ecm/ui/cn';

export type OrderToastProps = {
  title: string;
  meta: string;
  className?: string;
};

export function OrderToast({ title, meta, className }: OrderToastProps): JSX.Element {
  return (
    <div
      className={cn(
        'flex items-center gap-2.5 overflow-hidden rounded-lg bg-background p-3 shadow-lg',
        className,
      )}
    >
      <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-success-bg">
        <ShoppingBag className="size-4 text-icon-primary" aria-hidden="true" />
      </span>
      <span className="flex min-w-0 flex-col text-xs leading-4">
        <span className="truncate font-medium text-foreground">{title}</span>
        <span className="truncate text-muted-foreground">{meta}</span>
      </span>
    </div>
  );
}
