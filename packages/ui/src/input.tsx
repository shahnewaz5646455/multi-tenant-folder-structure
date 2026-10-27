import type { InputHTMLAttributes, JSX } from 'react';
import { cn } from './cn.ts';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps): JSX.Element {
  return (
    <input
      className={cn(
        'h-10 w-full rounded-md border border-neutral-200 bg-white px-3 text-sm shadow-sm',
        'focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30',
        className,
      )}
      {...props}
    />
  );
}
