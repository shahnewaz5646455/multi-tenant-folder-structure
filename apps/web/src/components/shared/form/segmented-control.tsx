'use client';

import { useId, type KeyboardEvent, type ReactElement } from 'react';
import { cn } from '@ecm/ui/cn';

export type SegmentedOption<T extends string> = {
  value: T;
  label: string;
};

export type SegmentedControlProps<T extends string> = {
  value: T;
  onChange: (value: T) => void;
  options: readonly SegmentedOption<T>[];
  label: string;
  className?: string;
  name?: string;
};

/* ARIA radiogroup disguised as a tab bar — same role an iOS segmented control
 * plays. Arrow keys move the selection; the active segment is focusable, the
 * others are not (`tabIndex={-1}`), so Tab leaves the group in one hop. */
export function SegmentedControl<T extends string>({
  value,
  onChange,
  options,
  label,
  className,
  name,
}: SegmentedControlProps<T>): ReactElement {
  const groupId = useId();
  const groupName = name ?? `segmented-${groupId}`;

  function handleKey(event: KeyboardEvent<HTMLButtonElement>, index: number): void {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const delta = event.key === 'ArrowRight' ? 1 : -1;
    const next = (index + delta + options.length) % options.length;
    const nextOption = options[next];
    if (nextOption) onChange(nextOption.value);
  }

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn(
        'inline-flex w-full items-stretch gap-0.5 rounded-md bg-background-canvas p-[3px]',
        className,
      )}
    >
      {options.map((option, index) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            name={groupName}
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(option.value)}
            onKeyDown={(event) => handleKey(event, index)}
            className={cn(
              'inline-flex h-7 flex-1 items-center justify-center rounded-md px-3 text-xs font-medium transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30',
              selected
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
