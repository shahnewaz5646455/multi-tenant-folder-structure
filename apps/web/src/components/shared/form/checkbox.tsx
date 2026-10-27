'use client';

import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@ecm/ui/cn';

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> & {
  label: ReactNode;
  description?: ReactNode;
  errorId?: string;
};

/* Visually styled checkbox that keeps a real `<input type="checkbox">` so
 * native form submission + browser keyboard semantics work with no wrapper.
 * The input is absolutely positioned over the painted box so the OS still
 * handles focus and activation. */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { className, label, description, id, errorId, ...props },
  ref,
) {
  const uid = useId();
  const inputId = id ?? uid;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const describedBy = [errorId, descriptionId].filter(Boolean).join(' ') || undefined;

  return (
    <label
      htmlFor={inputId}
      className={cn('group flex cursor-pointer items-start gap-2 text-sm text-foreground', className)}
    >
      <span className="relative mt-0.5 inline-flex size-4 shrink-0 items-center justify-center">
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          aria-describedby={describedBy}
          className="peer absolute inset-0 size-full cursor-pointer appearance-none rounded border border-border-strong bg-background checked:border-primary checked:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-critical"
          {...props}
        />
        {/* The input is absolute inset-0 so it covers this span; without a
         * stacking context the checkmark paints behind the input fill. */}
        <svg
          aria-hidden
          viewBox="0 0 12 12"
          className="pointer-events-none relative z-10 size-3 text-primary-foreground opacity-0 peer-checked:opacity-100"
        >
          <path
            d="M2.5 6.2 4.8 8.5l4.7-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="flex flex-col gap-0.5 leading-5">
        <span>{label}</span>
        {description ? (
          <span id={descriptionId} className="text-xs text-muted-foreground">
            {description}
          </span>
        ) : null}
      </span>
    </label>
  );
});
