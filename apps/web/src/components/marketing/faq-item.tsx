'use client';

import { useId, useState, type JSX } from 'react';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@ecm/ui/cn';

export type FaqItemProps = {
  question: string;
  answer: string;
  defaultOpen?: boolean;
  className?: string;
};

export function FaqItem({ question, answer, defaultOpen = false, className }: FaqItemProps): JSX.Element {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  return (
    <div className={cn('flex w-full flex-col gap-2 border-b border-border py-5', className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-11 w-full items-center gap-4 text-left"
      >
        <span className="min-w-0 flex-1 text-sm font-semibold leading-5 text-foreground">{question}</span>
        {open ? (
          <Minus className="size-5 shrink-0 text-icon" aria-hidden="true" />
        ) : (
          <Plus className="size-5 shrink-0 text-icon" aria-hidden="true" />
        )}
      </button>
      {open ? (
        <p id={panelId} className="text-sm leading-5 text-muted-foreground">
          {answer}
        </p>
      ) : null}
    </div>
  );
}
