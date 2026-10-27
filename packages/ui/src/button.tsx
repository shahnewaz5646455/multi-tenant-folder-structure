import type { ButtonHTMLAttributes, JSX } from 'react';
import { cn } from './cn';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
};

const variants = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700',
  secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200',
  ghost: 'bg-transparent text-neutral-900 hover:bg-neutral-100',
};

const sizes = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
};

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  type = 'button',
  ...props
}: ButtonProps): JSX.Element {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={cn('inline-flex items-center justify-center rounded-md font-medium transition-colors', variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
