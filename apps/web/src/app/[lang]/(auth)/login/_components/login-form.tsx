'use client';

import { AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState, type FormEvent, type JSX } from 'react';
import { Banner } from '@/components/shared/banner';
import { Checkbox } from '@/components/shared/form/checkbox';
import { FormControl, FormField, FormLabel } from '@/components/shared/form/form-field';
import { Input } from '@/components/shared/form/input';
import { SegmentedControl } from '@/components/shared/form/segmented-control';
import { Link } from '@/i18n/navigation';

const METHODS = ['mobile', 'email'] as const;
type Method = (typeof METHODS)[number];

const BD_PHONE_RE = /^(?:\+?880|0)1[3-9]\d{8}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_ATTEMPTS = 3;

type AuthState =
  | { status: 'idle' }
  | { status: 'invalid'; triesLeft: number }
  | { status: 'locked'; minutes: number };

type Props = {
  storeName?: string;
};

export function LoginForm({ storeName }: Props): JSX.Element {
  const t = useTranslations('auth.logIn');
  const tErrors = useTranslations('auth.errors');

  const [method, setMethod] = useState<Method>('mobile');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);
  const [auth, setAuth] = useState<AuthState>({ status: 'idle' });
  const [submitting, setSubmitting] = useState(false);

  function handleMethodChange(next: Method): void {
    setMethod(next);
    setContact('');
    setContactError(null);
    setAuth({ status: 'idle' });
  }

  function validateContact(value: string): string | null {
    if (!value.trim()) return tErrors('required');
    if (method === 'mobile' && !BD_PHONE_RE.test(value.trim())) return tErrors('mobileInvalid');
    if (method === 'email' && !EMAIL_RE.test(value.trim())) return tErrors('emailInvalid');
    return null;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    const nextContactError = validateContact(contact);
    setContactError(nextContactError);
    if (nextContactError) return;
    if (password.length < 1) {
      setAuth({ status: 'idle' });
      return;
    }

    setSubmitting(true);
    try {
      // Blueprint, section B: real submit calls a Server Action that signs in
      // and redirects to the merchant dashboard. For the design surface we stub
      // a wrong-password response so the Banner + inline error are visible for
      // review. Wired to the API when it lands.
      await new Promise((resolve) => {
        setTimeout(resolve, 400);
      });
      const previous = auth.status === 'invalid' ? MAX_ATTEMPTS - auth.triesLeft : 0;
      const used = previous + 1;
      const triesLeft = Math.max(0, MAX_ATTEMPTS - used);
      setAuth(triesLeft === 0 ? { status: 'locked', minutes: 15 } : { status: 'invalid', triesLeft });
    } finally {
      setSubmitting(false);
    }
  }

  const contactLabel = method === 'mobile' ? t('field.mobile.label') : t('field.email.label');
  const contactPlaceholder = method === 'mobile' ? t('field.mobile.placeholder') : t('field.email.placeholder');
  const contactType = method === 'mobile' ? 'tel' : 'email';
  const contactInputMode = method === 'mobile' ? 'numeric' : 'email';

  const bannerVisible = auth.status !== 'idle';
  const passwordError = auth.status === 'invalid' ? (
    <span className="inline-flex items-center gap-1">
      <AlertTriangle className="size-3.5 shrink-0" aria-hidden />
      <span>
        {method === 'mobile'
          ? t('wrongPassword.fieldErrorMobile')
          : t('wrongPassword.fieldErrorEmail')}
      </span>
    </span>
  ) : undefined;

  return (
    <form noValidate onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
      <header className="flex flex-col gap-1.5">
        <h1 className="heading-xl text-foreground">{t('title')}</h1>
        <p className="text-sm leading-5 text-muted-foreground">
          {storeName ? t('subtitle', { storeName }) : t('subtitleFallback')}
        </p>
      </header>

      <SegmentedControl
        label={t('title')}
        value={method}
        onChange={handleMethodChange}
        options={[
          { value: 'mobile', label: t('method.mobile') },
          { value: 'email', label: t('method.email') },
        ]}
      />

      {bannerVisible ? (
        <Banner tone="critical" title={t('wrongPassword.title')}>
          {auth.status === 'invalid'
            ? t('wrongPassword.triesLeft', { tries: auth.triesLeft })
            : t('wrongPassword.locked', { minutes: auth.minutes })}
        </Banner>
      ) : null}

      <FormField name="contact" error={contactError ?? undefined}>
        <FormLabel>{contactLabel}</FormLabel>
        <FormControl>
          <Input
            name="contact"
            type={contactType}
            inputMode={contactInputMode}
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder={contactPlaceholder}
            autoComplete={method === 'mobile' ? 'tel' : 'email'}
          />
        </FormControl>
      </FormField>

      <FormField name="password" error={passwordError}>
        <FormLabel>{t('field.password.label')}</FormLabel>
        <FormControl>
          <div className="relative">
            <Input
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('field.password.placeholder')}
              autoComplete="current-password"
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? t('field.password.hide') : t('field.password.show')}
              className="absolute right-0 top-0 flex h-9 w-10 items-center justify-center text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
            >
              {showPassword ? <EyeOff className="size-4" aria-hidden /> : <Eye className="size-4" aria-hidden />}
            </button>
          </div>
        </FormControl>
      </FormField>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <Checkbox
          name="remember"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
          label={t('remember')}
        />
        <Link
          href="/forgot-password"
          className="text-sm font-medium leading-5 text-link hover:underline"
        >
          {t('forgot')}
        </Link>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex h-11 w-full items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {t('submit')}
      </button>

      <div className="flex items-center gap-3" role="separator" aria-hidden>
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">{t('divider')}</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <Link
        href="/signup"
        className="inline-flex h-11 w-full items-center justify-center rounded-md border border-border-strong bg-background px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
      >
        {t('signUpCta')}
      </Link>
    </form>
  );
}
