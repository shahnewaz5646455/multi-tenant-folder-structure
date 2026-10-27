'use client';

import {
  useRef,
  useState,
  type ChangeEvent,
  type ClipboardEvent,
  type JSX,
  type KeyboardEvent,
} from 'react';
import { cn } from '@ecm/ui/cn';

type OtpBoxState = 'empty' | 'filled' | 'focused' | 'error';

type OtpBoxProps = {
  value: string;
  state: OtpBoxState;
  inputRef: (el: HTMLInputElement | null) => void;
  onChange: (next: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onPaste: (e: ClipboardEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  ariaLabel: string;
};

function OtpBox({
  value,
  state,
  inputRef,
  onChange,
  onKeyDown,
  onPaste,
  onFocus,
  onBlur,
  ariaLabel,
}: OtpBoxProps): JSX.Element {
  const base = 'relative h-14 w-12 rounded-md text-center text-xl font-semibold leading-7 text-foreground outline-none';
  const styles: Record<OtpBoxState, string> = {
    empty: 'border border-border bg-background',
    filled: 'border border-border bg-background',
    focused: 'border-2 border-ring bg-background',
    error: 'border-2 border-critical bg-critical-bg',
  };
  return (
    <input
      ref={inputRef}
      type="text"
      inputMode="numeric"
      autoComplete="one-time-code"
      maxLength={1}
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      onPaste={onPaste}
      onFocus={onFocus}
      onBlur={onBlur}
      aria-label={ariaLabel}
      className={cn(base, styles[state])}
    />
  );
}

export type OtpInputProps = {
  length?: number;
  onComplete?: (code: string) => void;
  error?: boolean;
  className?: string;
};

export function OtpInput({ length = 6, onComplete, error = false, className }: OtpInputProps): JSX.Element {
  const [digits, setDigits] = useState<string[]>(() => Array<string>(length).fill(''));
  const [focusIndex, setFocusIndex] = useState<number | null>(null);
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  const update = (next: string[]): void => {
    setDigits(next);
    if (onComplete && next.every((d) => d !== '')) onComplete(next.join(''));
  };

  const handleChange = (index: number, raw: string): void => {
    const char = raw.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[index] = char;
    update(next);
    if (char && index < length - 1) refs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      e.preventDefault();
      const next = [...digits];
      next[index - 1] = '';
      update(next);
      refs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      refs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      refs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (index: number, e: ClipboardEvent<HTMLInputElement>): void => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length - index);
    if (!pasted) return;
    e.preventDefault();
    const next = [...digits];
    for (let i = 0; i < pasted.length; i++) next[index + i] = pasted[i] ?? '';
    update(next);
    const landing = Math.min(index + pasted.length, length - 1);
    refs.current[landing]?.focus();
  };

  const stateFor = (index: number): OtpBoxState => {
    if (error) return 'error';
    if (focusIndex === index) return 'focused';
    if (digits[index]) return 'filled';
    return 'empty';
  };

  return (
    <div className={cn('flex w-fit items-center gap-2', className)} role="group" aria-label="One-time code">
      {digits.map((d, i) => (
        <OtpBox
          key={i}
          value={d}
          state={stateFor(i)}
          inputRef={(el) => {
            refs.current[i] = el;
          }}
          onChange={(next) => handleChange(i, next)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={(e) => handlePaste(i, e)}
          onFocus={() => setFocusIndex(i)}
          onBlur={() => setFocusIndex((v) => (v === i ? null : v))}
          ariaLabel={`Digit ${i + 1} of ${length}`}
        />
      ))}
    </div>
  );
}
