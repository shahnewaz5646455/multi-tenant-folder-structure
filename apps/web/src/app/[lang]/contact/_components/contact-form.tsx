'use client';

import { useState, type FormEvent, type JSX } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@ecm/ui/cn';
import { FormControl, FormField, FormLabel } from '@/components/shared/form/form-field';
import { Input } from '@/components/shared/form/input';
import { Select } from '@/components/shared/form/select';
import { CONTACT_TOPIC_KEYS, type ContactTopicKey } from '@/config/landing-contact';

const BD_PHONE_RE = /^(?:\+?880|0)1[3-9]\d{8}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = {
  name?: 'nameRequired';
  mobile?: 'mobileRequired' | 'mobileInvalid';
  email?: 'emailInvalid';
  message?: 'messageRequired';
};

type FormValues = {
  name: string;
  mobile: string;
  email: string;
  topic: ContactTopicKey;
  message: string;
};

const INITIAL_VALUES: FormValues = {
  name: '',
  mobile: '',
  email: '',
  topic: 'sales',
  message: '',
};

function validate(values: FormValues): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.name.trim()) errors.name = 'nameRequired';
  const mobile = values.mobile.trim();
  if (!mobile) errors.mobile = 'mobileRequired';
  else if (!BD_PHONE_RE.test(mobile)) errors.mobile = 'mobileInvalid';
  const email = values.email.trim();
  if (email && !EMAIL_RE.test(email)) errors.email = 'emailInvalid';
  if (!values.message.trim()) errors.message = 'messageRequired';
  return errors;
}

export function ContactForm({ className }: { className?: string }): JSX.Element {
  const t = useTranslations('contact.form');
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]): void {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key as keyof FieldErrors]) {
      setErrors((e) => ({ ...e, [key]: undefined }));
    }
    if (submitted) setSubmitted(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const next = validate(values);
    setErrors(next);
    if (Object.keys(next).length) return;
    setSubmitting(true);
    try {
      // Real submit will call a Server Action that creates a sales lead and
      // notifies the Dhaka team. Wired when the API lands.
      await new Promise((resolve) => {
        setTimeout(resolve, 400);
      });
      setValues(INITIAL_VALUES);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className={cn(
        'flex flex-col gap-4 rounded-lg border border-border bg-background p-6 shadow-md',
        className,
      )}
    >
      <p className="text-xl font-semibold leading-7 text-foreground">{t('title')}</p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <FormField name="name" error={errors.name ? t(`errors.${errors.name}`) : undefined}>
          <FormLabel>{t('name.label')}</FormLabel>
          <FormControl>
            <Input
              name="name"
              value={values.name}
              onChange={(e) => update('name', e.target.value)}
              placeholder={t('name.placeholder')}
              autoComplete="name"
            />
          </FormControl>
        </FormField>

        <FormField name="mobile" error={errors.mobile ? t(`errors.${errors.mobile}`) : undefined}>
          <FormLabel>{t('mobile.label')}</FormLabel>
          <FormControl>
            <Input
              name="mobile"
              type="tel"
              inputMode="numeric"
              value={values.mobile}
              onChange={(e) => update('mobile', e.target.value)}
              placeholder={t('mobile.placeholder')}
              autoComplete="tel"
            />
          </FormControl>
        </FormField>
      </div>

      <FormField name="email" error={errors.email ? t(`errors.${errors.email}`) : undefined}>
        <FormLabel>
          {t('email.label')}
          <span className="ml-1 text-xs font-normal text-muted-foreground">
            ({t('email.optional')})
          </span>
        </FormLabel>
        <FormControl>
          <Input
            name="email"
            type="email"
            value={values.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder={t('email.placeholder')}
            autoComplete="email"
          />
        </FormControl>
      </FormField>

      <FormField name="topic">
        <FormLabel>{t('topic.label')}</FormLabel>
        <FormControl>
          <Select
            name="topic"
            value={values.topic}
            onChange={(e) => update('topic', e.target.value as ContactTopicKey)}
          >
            {CONTACT_TOPIC_KEYS.map((key) => (
              <option key={key} value={key}>
                {t(`topic.options.${key}`)}
              </option>
            ))}
          </Select>
        </FormControl>
      </FormField>

      <FormField name="message" error={errors.message ? t(`errors.${errors.message}`) : undefined}>
        <FormLabel>{t('message.label')}</FormLabel>
        <FormControl>
          <textarea
            name="message"
            rows={3}
            value={values.message}
            onChange={(e) => update('message', e.target.value)}
            placeholder={t('message.placeholder')}
            className={cn(
              'flex min-h-[88px] w-full resize-y rounded-md border border-border-strong bg-background px-3 py-2 text-sm leading-5 text-foreground placeholder:text-muted-foreground',
              'transition-colors',
              'focus:border-ring focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30',
              'aria-[invalid=true]:border-critical aria-[invalid=true]:focus-visible:border-critical aria-[invalid=true]:focus-visible:ring-critical/30',
            )}
          />
        </FormControl>
      </FormField>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex h-11 w-full items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? t('submitting') : t('submit')}
      </button>

      {submitted ? (
        <p role="status" className="text-xs leading-4 text-success">
          {t('success')}
        </p>
      ) : (
        <p className="text-xs leading-4 text-muted-foreground">{t('note')}</p>
      )}
    </form>
  );
}
