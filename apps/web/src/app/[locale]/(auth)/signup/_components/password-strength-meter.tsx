'use client';

import { useTranslations } from 'next-intl';
import { useMemo, type JSX } from 'react';
import { cn } from '@ecm/ui/cn';

const STRENGTH_LEVELS = ['weak', 'fair', 'good', 'strong'] as const;
export type Strength = (typeof STRENGTH_LEVELS)[number];

export function scorePassword(password: string): { score: 0 | 1 | 2 | 3 | 4; level: Strength | null } {
  if (!password) return { score: 0, level: null };
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  const clamped = Math.max(1, Math.min(4, score)) as 1 | 2 | 3 | 4;
  return { score: clamped, level: STRENGTH_LEVELS[clamped - 1] ?? null };
}

type Props = { password: string };

export function PasswordStrengthMeter({ password }: Props): JSX.Element | null {
  const t = useTranslations('auth.signUp.strength');
  const { score, level } = useMemo(() => scorePassword(password), [password]);

  if (!password) return null;

  const tone =
    level === 'weak' ? 'critical' : level === 'fair' ? 'warn' : 'ok';
  const textClass =
    tone === 'critical' ? 'text-critical' : tone === 'warn' ? 'text-accent-orange' : 'text-success';
  const barClass =
    tone === 'critical' ? 'bg-critical' : tone === 'warn' ? 'bg-accent-orange' : 'bg-success';

  return (
    <div className="flex w-full flex-col gap-1.5" aria-live="polite">
      <div className="flex w-full gap-1" role="progressbar" aria-valuemin={0} aria-valuemax={4} aria-valuenow={score}>
        {[1, 2, 3, 4].map((segment) => (
          <span
            key={segment}
            className={cn('h-1 flex-1 rounded-sm transition-colors', segment <= score ? barClass : 'bg-border')}
          />
        ))}
      </div>
      {level ? <p className={cn('text-xs leading-4', textClass)}>{t(level)}</p> : null}
    </div>
  );
}
