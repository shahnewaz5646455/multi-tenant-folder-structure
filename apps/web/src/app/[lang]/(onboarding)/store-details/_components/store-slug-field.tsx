'use client';

import { AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useId, useState, type JSX } from 'react';
import { cn } from '@ecm/ui/cn';

type Props = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
};

const SLUG_RE = /^[a-z0-9-]+$/;
const TAKEN_SAMPLES = new Set(['admin', 'app', 'rahim', 'test', 'store', 'ecom']);
type Availability = 'idle' | 'checking' | 'available' | 'taken';

/* Slug input + locked ".ecom.bd" suffix with an availability line that debounces
 * a stub check (replaced by the real API when it lands). The outer wrapper owns
 * the focus ring so the inset suffix cell inherits it visually. */
export function StoreSlugField({ value, onChange, error, disabled }: Props): JSX.Element {
  const t = useTranslations('onboarding.storeDetails.field.slug');
  const [availability, setAvailability] = useState<Availability>('idle');
  const fieldId = useId();
  const inputId = `${fieldId}-input`;
  const messageId = `${fieldId}-message`;

  useEffect(() => {
    const trimmed = value.trim().toLowerCase();
    if (trimmed.length < 3 || !SLUG_RE.test(trimmed)) {
      setAvailability('idle');
      return;
    }
    setAvailability('checking');
    const handle = window.setTimeout(() => {
      setAvailability(TAKEN_SAMPLES.has(trimmed) ? 'taken' : 'available');
    }, 350);
    return () => window.clearTimeout(handle);
  }, [value]);

  const invalid = Boolean(error) || availability === 'taken';

  return (
    <div className="flex w-full flex-col gap-1.5">
      {/* FormLabel needs FormField context; we own ids here, so a plain label. */}
      <label htmlFor={inputId} className="text-sm font-medium leading-5 text-foreground">
        {t('label')}
      </label>
      <div
        className={cn(
          'flex w-full items-stretch overflow-hidden rounded-md border bg-background transition-colors',
          'focus-within:ring-2',
          invalid
            ? 'border-critical focus-within:border-critical focus-within:ring-critical/30'
            : 'border-border-strong focus-within:border-ring focus-within:ring-ring/30',
          disabled && 'cursor-not-allowed bg-muted',
        )}
      >
        <input
          id={inputId}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value.toLowerCase())}
          disabled={disabled}
          placeholder={t('placeholder')}
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          aria-invalid={invalid || undefined}
          aria-describedby={messageId}
          className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm leading-5 text-foreground placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:text-disabled"
        />
        <span
          aria-hidden
          className="flex shrink-0 items-center border-l border-border bg-background-subdued px-3 py-2 text-sm leading-5 text-muted-foreground"
        >
          {t('suffix')}
        </span>
      </div>
      <p id={messageId} className="min-h-4 text-xs leading-4" role="status">
        <SlugStatus error={error} availability={availability} slug={value.trim()} />
      </p>
    </div>
  );
}

function SlugStatus({
  error,
  availability,
  slug,
}: {
  error?: string;
  availability: Availability;
  slug: string;
}): JSX.Element | null {
  const t = useTranslations('onboarding.storeDetails.field.slug');
  if (error) {
    return (
      <span className="inline-flex items-center gap-1.5 text-critical">
        <AlertTriangle className="size-3.5 shrink-0" aria-hidden />
        {error}
      </span>
    );
  }
  if (availability === 'checking') {
    return (
      <span className="inline-flex items-center gap-1.5 text-muted-foreground">
        <Loader2 className="size-3.5 shrink-0 animate-spin" aria-hidden />
        {t('checking')}
      </span>
    );
  }
  if (availability === 'available') {
    return (
      <span className="inline-flex items-center gap-1.5 text-success">
        <CheckCircle2 className="size-3.5 shrink-0" aria-hidden />
        {t('available', { slug })}
      </span>
    );
  }
  if (availability === 'taken') {
    return (
      <span className="inline-flex items-center gap-1.5 text-critical">
        <AlertTriangle className="size-3.5 shrink-0" aria-hidden />
        {t('unavailable', { slug })}
      </span>
    );
  }
  return null;
}

export { SLUG_RE };
