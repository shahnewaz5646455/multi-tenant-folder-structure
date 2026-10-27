import type { JSX } from 'react';
import { cn } from '@ecm/ui/cn';

export type AvatarProps = {
  initials: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const sizes = {
  sm: 'size-6 text-[10px]',
  md: 'size-8 text-xs',
  lg: 'size-10 text-sm',
};

export function Avatar({ initials, size = 'md', className }: AvatarProps): JSX.Element {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full bg-info-bg font-medium text-info',
        sizes[size],
        className,
      )}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}
