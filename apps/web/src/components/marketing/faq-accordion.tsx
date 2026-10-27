'use client';

import { useEffect, useLayoutEffect, useRef, useState, type JSX } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@ecm/ui/cn';
import type { FaqEntry } from '@/types/marketing.types';

export type FaqAccordionProps = {
  entries: readonly FaqEntry[];
  /** Index of the entry open by default. Omit for all collapsed. */
  defaultOpenIndex?: number;
  className?: string;
};

/**
 * Single-select accordion: opening one row closes any other.
 * Uses Radix for state + keyboard nav; Tailwind keyframes drive the
 * height animation via Radix's --radix-accordion-content-height CSS var.
 *
 * Height stability: the container is pinned to its tallest ever measured
 * height (via a ResizeObserver). Switching to a shorter answer therefore
 * leaves blank space inside the accordion rather than letting the footer
 * jump upward.
 */
export function FaqAccordion({
  entries,
  defaultOpenIndex = 0,
  className,
}: FaqAccordionProps): JSX.Element {
  const [value, setValue] = useState<string>(
    defaultOpenIndex >= 0 && defaultOpenIndex < entries.length ? `item-${defaultOpenIndex}` : '',
  );
  const [animated, setAnimated] = useState(false);
  const [minHeight, setMinHeight] = useState<number | undefined>(undefined);
  const rootRef = useRef<HTMLDivElement>(null);
  const maxSeenRef = useRef(0);

  // Enable animations only after mount so the default-open row is
  // instantly visible rather than animating itself open on first paint.
  useEffect(() => {
    const id = requestAnimationFrame(() => setAnimated(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Track the tallest size the accordion has ever reached and lock the
  // container min-height to it, so opening a shorter answer doesn't let
  // the page below shrink.
  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(() => {
      const h = el.offsetHeight;
      if (h > maxSeenRef.current) {
        maxSeenRef.current = h;
        setMinHeight(h);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Accordion.Root
      ref={rootRef}
      type="single"
      collapsible
      value={value}
      onValueChange={setValue}
      className={cn('flex w-full flex-col', className)}
      style={minHeight ? { minHeight } : undefined}
    >
      {entries.map((entry, i) => (
        <Accordion.Item
          key={entry.question}
          value={`item-${i}`}
          className="border-b border-border"
        >
          <Accordion.Header className="flex">
            <Accordion.Trigger
              className={cn(
                'group flex min-h-11 w-full items-center gap-4 py-5 text-left outline-none',
                'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background-canvas',
              )}
            >
              <span className="min-w-0 flex-1 text-sm font-semibold leading-5 text-foreground">
                {entry.question}
              </span>
              <span className="relative size-5 shrink-0 text-icon" aria-hidden="true">
                <Plus
                  className={cn(
                    'absolute inset-0 size-5 transition-all duration-200 ease-out',
                    'group-data-[state=open]:scale-75 group-data-[state=open]:opacity-0',
                  )}
                />
                <Minus
                  className={cn(
                    'absolute inset-0 size-5 scale-75 opacity-0 transition-all duration-200 ease-out',
                    'group-data-[state=open]:scale-100 group-data-[state=open]:opacity-100',
                  )}
                />
              </span>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content
            className={cn(
              'overflow-hidden',
              animated && 'data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up',
            )}
          >
            <p className="pb-5 text-sm leading-5 text-muted-foreground">{entry.answer}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
