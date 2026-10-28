'use client';

import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState, type FormEvent, type JSX } from 'react';
import { FormControl, FormField, FormLabel } from '@/components/shared/form/form-field';
import { Input } from '@/components/shared/form/input';
import { Link } from '@/i18n/navigation';

const BD_PHONE_RE = /^(?:\+?880|0)1[3-9]\d{8}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactError = 'required' | 'contactInvalid';

function validateContact(value: string): ContactError | null {
  const trimmed = value.trim();
  if (!trimmed) return 'required';
  if (BD_PHONE_RE.test(trimmed) || EMAIL_RE.test(trimmed)) return null;
  return 'contactInvalid';
}

export function ForgotPasswordForm(): JSX.Element {
  const t = useTranslations('auth.forgotPassword');
  const tErrors = useTranslations('auth.errors');

  const [contact, setContact] = useState('');
  const [error, setError] = useState<ContactError | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const next = validateContact(contact);
    setError(next);
    if (next) return;
    setSubmitting(true);
    try {
      // Blueprint, section B: real submit calls a Server Action that sends a
      // reset code (SMS or email) then redirects to /verify. Wired when the
      // API lands.
      await new Promise((resolve) => {
        setTimeout(resolve, 400);
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
      <Link
        href="/login"
        className="inline-flex w-fit items-center gap-1 text-sm font-medium leading-5 text-link hover:underline"
      >
        <ArrowLeft className="size-4" aria-hidden />
        {t('backToLogin')}
      </Link>

      <header className="flex flex-col gap-1.5">
        <h1 className="heading-xl text-foreground">{t('title')}</h1>
        <p className="text-sm leading-5 text-muted-foreground">{t('subtitle')}</p>
      </header>

      <FormField name="contact" error={error ? tErrors(error) : undefined}>
        <FormLabel>{t('field.contact.label')}</FormLabel>
        <FormControl>
          <Input
            name="contact"
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder={t('field.contact.placeholder')}
            autoComplete="username"
          />
        </FormControl>
      </FormField>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex h-11 w-full items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {t('submit')}
      </button>

      <p className="flex items-start gap-2 rounded-md bg-background-subdued px-3 py-2 text-xs leading-4 text-muted-foreground">
        <ShieldCheck className="size-4 shrink-0" aria-hidden />
        <span>{t('security')}</span>
      </p>
    </form>
  );
}
