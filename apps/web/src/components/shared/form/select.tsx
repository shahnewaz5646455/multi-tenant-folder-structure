import { ChevronDown } from 'lucide-react';
import { forwardRef, type SelectHTMLAttributes } from 'react';
import { cn } from '@ecm/ui/cn';

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

/* Styled native <select>. Native keyboard, native mobile wheel, zero deps.
 * The chevron is a positioned overlay (aria-hidden) because browsers won't
 * style the built-in one — appearance-none hides it and the span draws ours. */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, children, ...props },
  ref,
) {
  return (
    <span className="relative block w-full">
      <select
        ref={ref}
        className={cn(
          'flex h-9 w-full appearance-none rounded-md border border-border-strong bg-background px-3 pr-9 text-sm leading-5 text-foreground',
          'transition-colors',
          'focus:border-ring focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30',
          'disabled:cursor-not-allowed disabled:bg-muted disabled:text-disabled',
          'aria-[invalid=true]:border-critical aria-[invalid=true]:focus-visible:border-critical aria-[invalid=true]:focus-visible:ring-critical/30',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
      />
    </span>
  );
});
