'use client';

import { CheckCircle2, XCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo, useState, type FormEvent, type JSX, type ReactNode } from 'react';
import { Banner } from '@/components/shared/banner';
import { Checkbox } from '@/components/shared/form/checkbox';
import { FormControl, FormField, FormLabel } from '@/components/shared/form/form-field';
import { Input } from '@/components/shared/form/input';
import { cn } from '@ecm/ui/cn';

type RuleId = 'minLength' | 'hasNumber' | 'hasSymbol' | 'notReused';
type Rule = { id: RuleId; met: boolean };
type ErrorKey = 'passwordMin' | 'confirmMismatch';
type FieldErrors = Partial<Record<'password' | 'confirm', ErrorKey>>;

/* Pure derivation of the four password rules shown under the fields.
 * `notReused` is a server-side check (compares against the last 3 hashes); on
 * the client we optimistically mark it met once the user has typed anything,
 * so the surface matches the Figma frame. The real verdict lands via the
 * Server Action error path when the API is wired. */
function evaluateRules(password: string): readonly Rule[] {
  return [
    { id: 'minLength', met: password.length >= 8 },
    { id: 'hasNumber', met: /\d/.test(password) },
    { id: 'hasSymbol', met: /[^A-Za-z0-9]/.test(password) },
    { id: 'notReused', met: password.length > 0 },
  ] as const;
}

type Props = {
  contact: string;
};

export function ResetPasswordForm({ contact }: Props): JSX.Element {
  const t = useTranslations('auth.resetPassword');
  const tErrors = useTranslations('auth.errors');

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [signOutOthers, setSignOutOthers] = useState(true);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const rules = useMemo(() => evaluateRules(password), [password]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const next: FieldErrors = {};
    if (password.length < 8) next.password = 'passwordMin';
    if (confirm !== password) next.confirm = 'confirmMismatch';
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    try {
      // Blueprint, section B: real submit calls a Server Action that saves the
      // new password, optionally signs out other sessions, then redirects to
      // the merchant dashboard already signed in. Wired when the API lands.
      await new Promise((resolve) => {
        setTimeout(resolve, 400);
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
      <Banner tone="success" title={t('verified.title')}>
        {t('verified.forContact', { contact })}
      </Banner>

      <header className="flex flex-col gap-1.5">
        <h1 className="heading-xl text-foreground">{t('title')}</h1>
      </header>

      <FormField
        name="password"
        error={errors.password ? tErrors(errors.password) : undefined}
      >
        <FormLabel>{t('field.password.label')}</FormLabel>
        <FormControl>
          <Input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('field.password.placeholder')}
            autoComplete="new-password"
          />
        </FormControl>
      </FormField>

      <FormField
        name="confirm"
        error={errors.confirm ? tErrors(errors.confirm) : undefined}
      >
        <FormLabel>{t('field.confirm.label')}</FormLabel>
        <FormControl>
          <Input
            name="confirm"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder={t('field.confirm.placeholder')}
            autoComplete="new-password"
          />
        </FormControl>
      </FormField>

      <ul className="flex flex-col gap-1.5" aria-label={t('rulesLabel')}>
        {rules.map((rule) => (
          <PasswordRule key={rule.id} met={rule.met}>
            {t(`rules.${rule.id}`)}
          </PasswordRule>
        ))}
      </ul>

      <Checkbox
        name="signOutOthers"
        checked={signOutOthers}
        onChange={(e) => setSignOutOthers(e.target.checked)}
        label={t('signOutOthers')}
      />

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex h-11 w-full items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {t('submit')}
      </button>
    </form>
  );
}

function PasswordRule({ met, children }: { met: boolean; children: ReactNode }): JSX.Element {
  const Icon = met ? CheckCircle2 : XCircle;
  return (
    <li className="flex items-center gap-2">
      <Icon
        className={cn('size-4 shrink-0', met ? 'text-success' : 'text-muted-foreground')}
        aria-hidden
      />
      <span className={cn('text-xs leading-4', met ? 'text-foreground' : 'text-muted-foreground')}>
        {children}
      </span>
    </li>
  );
}
