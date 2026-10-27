import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@ecm/ui/cn';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, type = 'text', ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      // eslint-disable-next-line react/jsx-props-no-spreading
      type={type}
      className={cn(
        'flex h-9 w-full rounded-md border border-border-strong bg-background px-3 py-2 text-sm leading-5 text-foreground placeholder:text-muted-foreground',
        'transition-colors',
        'focus:border-ring focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30',
        'disabled:cursor-not-allowed disabled:bg-muted disabled:text-disabled',
        'aria-[invalid=true]:border-critical aria-[invalid=true]:focus-visible:border-critical aria-[invalid=true]:focus-visible:ring-critical/30',
        className,
      )}
      {...props}
    />
  );
});
