'use client';

import {
  useId,
  useRef,
  useState,
  type ClipboardEvent,
  type JSX,
  type KeyboardEvent,
} from 'react';
import { cn } from '@ecm/ui/cn';

const DIGIT_RE = /^\d$/;
const DIGITS_RE = /\d/g;

export type OtpInputProps = {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  autoFocus?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  label: string;
  className?: string;
  name?: string;
};

/* Six-cell numeric OTP input with native keyboard affordances:
 * - inputMode="numeric" + autocomplete="one-time-code" so iOS/Android show
 *   the numeric keypad and offer SMS auto-fill.
 * - Backspace moves left; arrow keys navigate; typing a digit auto-advances.
 * - Paste on any cell fills every remaining cell. Non-digits are stripped.
 *
 * The value is a plain string (`"482934"`) — easier to serialize into a
 * Server Action payload and reason about than an array of chars. */
export function OtpInput({
  length = 6,
  value,
  onChange,
  onComplete,
  autoFocus,
  disabled,
  invalid,
  label,
  className,
  name = 'otp',
}: OtpInputProps): JSX.Element {
  const groupId = useId();
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const cells = Array.from({ length }, (_, i) => value[i] ?? '');

  function emitChange(next: string): void {
    const sanitized = next.replace(/\D/g, '').slice(0, length);
    onChange(sanitized);
    if (sanitized.length === length) onComplete?.(sanitized);
  }

  function focusCell(index: number): void {
    const clamped = Math.max(0, Math.min(length - 1, index));
    const el = inputsRef.current[clamped];
    if (el) {
      el.focus();
      el.select();
    }
  }

  function handleInput(index: number, raw: string): void {
    const digits = raw.replace(/\D/g, '');
    if (!digits) return;

    if (digits.length > 1) {
      // Multi-char input (SMS auto-fill or paste through the field itself).
      const chars = value.split('');
      let cursor = index;
      for (const ch of digits) {
        if (cursor >= length) break;
        chars[cursor] = ch;
        cursor += 1;
      }
      emitChange(chars.join(''));
      focusCell(Math.min(length - 1, index + digits.length));
      return;
    }

    const chars = value.split('');
    chars[index] = digits;
    emitChange(chars.join(''));
    if (index < length - 1) focusCell(index + 1);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>, index: number): void {
    const key = event.key;
    if (key === 'Backspace') {
      event.preventDefault();
      const chars = value.split('');
      if (chars[index]) {
        chars[index] = '';
        emitChange(chars.join(''));
      } else if (index > 0) {
        chars[index - 1] = '';
        emitChange(chars.join(''));
        focusCell(index - 1);
      }
      return;
    }
    if (key === 'ArrowLeft') {
      event.preventDefault();
      focusCell(index - 1);
      return;
    }
    if (key === 'ArrowRight') {
      event.preventDefault();
      focusCell(index + 1);
      return;
    }
    if (key === 'Home') {
      event.preventDefault();
      focusCell(0);
      return;
    }
    if (key === 'End') {
      event.preventDefault();
      focusCell(length - 1);
      return;
    }
    // Allow digits + Tab + Shift + modifier combos; swallow the rest so a
    // random letter doesn't briefly land in the cell before being filtered.
    if (!event.metaKey && !event.ctrlKey && !event.altKey && key.length === 1 && !DIGIT_RE.test(key)) {
      event.preventDefault();
    }
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement>, index: number): void {
    event.preventDefault();
    const text = event.clipboardData.getData('text');
    const digits = text.match(DIGITS_RE)?.join('') ?? '';
    if (!digits) return;
    const chars = value.split('');
    let cursor = index;
    for (const ch of digits) {
      if (cursor >= length) break;
      chars[cursor] = ch;
      cursor += 1;
    }
    emitChange(chars.join(''));
    focusCell(Math.min(length - 1, index + digits.length));
  }

  return (
    <div
      role="group"
      aria-label={label}
      className={cn('flex w-full items-stretch gap-2', className)}
      id={groupId}
    >
      {cells.map((digit, index) => {
        const isFocused = focusedIndex === index;
        return (
          <input
            key={index}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            // SMS auto-fill cue on iOS/Android — only valid on the first cell.
            autoComplete={index === 0 ? 'one-time-code' : 'off'}
            maxLength={length - index}
            disabled={disabled}
            aria-invalid={invalid || undefined}
            aria-label={`${label} — digit ${index + 1}`}
            name={`${name}-${index}`}
            value={digit}
            autoFocus={autoFocus && index === 0}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex((current) => (current === index ? null : current))}
            onChange={(event) => handleInput(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            onPaste={(event) => handlePaste(event, index)}
            className={cn(
              'h-15 min-w-0 flex-1 rounded-md border bg-background text-center text-xl font-semibold leading-7 text-foreground caret-ring tabular-nums transition-colors',
              'focus-visible:outline-none',
              digit && !isFocused ? 'border-border' : 'border-border',
              isFocused
                ? 'border-2 border-ring'
                : invalid
                  ? 'border-2 border-critical'
                  : 'border border-border',
              'disabled:cursor-not-allowed disabled:bg-muted disabled:text-disabled',
              // Each cell caps at Figma's 56px; shrinks via flex-1 on narrow screens.
              'max-w-[56px]',
            )}
          />
        );
      })}
    </div>
  );
}
