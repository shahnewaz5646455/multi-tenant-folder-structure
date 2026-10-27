'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState, type FormEvent, type JSX } from 'react';
import { Checkbox } from '@/components/shared/form/checkbox';
import { FormControl, FormField, FormLabel } from '@/components/shared/form/form-field';
import { Input } from '@/components/shared/form/input';
import { SegmentedControl } from '@/components/shared/form/segmented-control';
import { Link } from '@/i18n/navigation';
import { PasswordStrengthMeter } from './password-strength-meter';

const METHODS = ['mobile', 'email'] as const;
type Method = (typeof METHODS)[number];
type ErrorKey =
  | 'required'
  | 'nameMin'
  | 'mobileInvalid'
  | 'emailInvalid'
  | 'passwordMin'
  | 'mustAgree';
type FieldErrors = Partial<Record<'name' | 'contact' | 'password' | 'agreed', ErrorKey>>;

const BD_PHONE_RE = /^(?:\+?880|0)1[3-9]\d{8}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: {
  method: Method;
  name: string;
  contact: string;
  password: string;
  agreed: boolean;
}): FieldErrors {
  const errors: FieldErrors = {};
  if (values.name.trim().length < 2) errors.name = 'nameMin';
  if (!values.contact.trim()) errors.contact = 'required';
  else if (values.method === 'mobile' && !BD_PHONE_RE.test(values.contact.trim())) {
    errors.contact = 'mobileInvalid';
  } else if (values.method === 'email' && !EMAIL_RE.test(values.contact.trim())) {
    errors.contact = 'emailInvalid';
  }
  if (values.password.length < 8) errors.password = 'passwordMin';
  if (!values.agreed) errors.agreed = 'mustAgree';
  return errors;
}

export function SignUpForm(): JSX.Element {
  const t = useTranslations('auth.signUp');
  const tErrors = useTranslations('auth.errors');

  const [method, setMethod] = useState<Method>('mobile');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  function handleMethodChange(next: Method): void {
    setMethod(next);
    setContact('');
    setErrors((prev) => ({ ...prev, contact: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const next = validate({ method, name, contact, password, agreed });
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setSubmitting(true);
    try {
      // Blueprint, section B: real submit goes through a Server Action that
      // sends OTP and redirects to the verification step. Wired when API lands.
      await new Promise((resolve) => {
        setTimeout(resolve, 400);
      });
    } finally {
      setSubmitting(false);
    }
  }

  const contactLabel = method === 'mobile' ? t('field.mobile.label') : t('field.email.label');
  const contactPlaceholder = method === 'mobile' ? t('field.mobile.placeholder') : t('field.email.placeholder');
  const contactHelp = method === 'mobile' ? t('field.mobile.help') : t('field.email.help');
  const contactAutoComplete = method === 'mobile' ? 'tel' : 'email';
  const contactType = method === 'mobile' ? 'tel' : 'email';
  const contactInputMode = method === 'mobile' ? 'numeric' : 'email';

  return (
    <form noValidate onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
      <header className="flex flex-col gap-1.5">
        <h1 className="heading-xl text-foreground">{t('title')}</h1>
        <p className="text-sm leading-5 text-muted-foreground">{t('subtitle')}</p>
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

        <FormField
          name="name"
          error={errors.name ? tErrors(errors.name) : undefined}
        >
          <FormLabel>{t('field.name.label')}</FormLabel>
          <FormControl>
            <Input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('field.name.placeholder')}
              autoComplete="name"
            />
          </FormControl>
        </FormField>

        <FormField
          name="contact"
          error={errors.contact ? tErrors(errors.contact) : undefined}
          description={contactHelp}
        >
          <FormLabel>{contactLabel}</FormLabel>
          <FormControl>
            <Input
              name="contact"
              type={contactType}
              inputMode={contactInputMode}
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder={contactPlaceholder}
              autoComplete={contactAutoComplete}
            />
          </FormControl>
        </FormField>

        <div className="flex flex-col gap-1.5">
          <FormField
            name="password"
            error={errors.password ? tErrors(errors.password) : undefined}
          >
            <FormLabel>{t('field.password.label')}</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('field.password.placeholder')}
                  autoComplete="new-password"
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
          <PasswordStrengthMeter password={password} />
        </div>

        <div className="flex flex-col gap-1">
          <Checkbox
            name="agreed"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            aria-invalid={errors.agreed ? true : undefined}
            errorId={errors.agreed ? 'agreed-error' : undefined}
            label={t.rich('agree.label', {
              terms: (chunks) => <TermsLink>{chunks}</TermsLink>,
              privacy: (chunks) => <PrivacyLink>{chunks}</PrivacyLink>,
            })}
          />
          {errors.agreed ? (
            <p id="agreed-error" role="alert" className="text-xs leading-4 text-critical">
              {tErrors(errors.agreed)}
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex h-11 w-full items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {t('submit')}
        </button>

      <p className="flex justify-center gap-1 text-sm leading-5">
        <span className="text-muted-foreground">{t('alreadyMember')}</span>
        <Link href="/login" className="font-medium text-link hover:underline">
          {t('login')}
        </Link>
      </p>
    </form>
  );
}

function TermsLink({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <Link href="/legal/terms" className="font-medium text-link hover:underline">
      {children}
    </Link>
  );
}

function PrivacyLink({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <Link href="/legal/privacy" className="font-medium text-link hover:underline">
      {children}
    </Link>
  );
}
