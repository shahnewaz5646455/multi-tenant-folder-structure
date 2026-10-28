'use client';

import { MessageCircle, RefreshCw } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useRef, useState, type FormEvent, type JSX } from 'react';
import { OtpInput } from '@/components/shared/form/otp-input';
import { Link } from '@/i18n/navigation';

const OTP_LENGTH = 6;
const RESEND_SECONDS = 42;

export type Channel = 'mobile' | 'email';

type Props = {
  channel: Channel;
  contact: string;
};

function formatTimer(seconds: number, locale: string): string {
  const mm = Math.floor(seconds / 60);
  const ss = seconds % 60;
  // Intl.NumberFormat emits locale-aware digits (০-৯ in bn).
  const nf = new Intl.NumberFormat(locale, { minimumIntegerDigits: 2, useGrouping: false });
  return `${nf.format(mm)}:${nf.format(ss)}`;
}

export function OtpVerifyScreen({ channel, contact }: Props): JSX.Element {
  const t = useTranslations('auth.verify');
  const tErrors = useTranslations('auth.errors');
  const locale = useLocale();

  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [resendIn, setResendIn] = useState(RESEND_SECONDS);
  const [resending, setResending] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setResendIn((v) => (v > 0 ? v - 1 : 0));
    }, 1000);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (code.length !== OTP_LENGTH) {
      setError(tErrors('otpIncomplete'));
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      // Blueprint, section B: real submit calls a Server Action that verifies
      // the code and redirects to onboarding. Wired when the API is ready.
      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
    } finally {
      setSubmitting(false);
    }
  }

  async function handleResend(): Promise<void> {
    if (resendIn > 0 || resending) return;
    setResending(true);
    try {
      // Server Action: request a new OTP.
      await new Promise((resolve) => {
        setTimeout(resolve, 400);
      });
      setResendIn(RESEND_SECONDS);
    } finally {
      setResending(false);
    }
  }

  function handleCodeChange(next: string): void {
    setCode(next);
    if (error) setError(null);
  }

  const sentCopy = channel === 'mobile'
    ? t('sentBySms', { contact })
    : t('sentByEmail', { contact });
  const wrongContactLabel = channel === 'mobile'
    ? t('wrongContact.mobile')
    : t('wrongContact.email');
  const helpCopy = channel === 'mobile' ? t('help') : t('helpEmail');

  const canSubmit = code.length === OTP_LENGTH && !submitting;

  return (
    <form noValidate onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
      <span className="flex size-12 items-center justify-center rounded-lg bg-success-bg text-success" aria-hidden>
        <MessageCircle className="size-6" strokeWidth={1.8} />
      </span>

      <header className="flex flex-col gap-1.5">
        <h1 className="heading-xl text-foreground">{t('title')}</h1>
        <p className="text-sm leading-5 text-muted-foreground">{sentCopy}</p>
      </header>

      <Link href="/signup" className="text-sm font-medium leading-5 text-link hover:underline w-fit">
        {wrongContactLabel}
      </Link>

      <OtpInput
        label={t('otpLabel')}
        length={OTP_LENGTH}
        value={code}
        onChange={handleCodeChange}
        onComplete={() => setError(null)}
        invalid={Boolean(error)}
        disabled={submitting}
        autoFocus
      />

      {error ? (
        <p role="alert" className="text-xs leading-4 text-critical">
          {error}
        </p>
      ) : null}

      <button
        type="button"
        onClick={handleResend}
        disabled={resendIn > 0 || resending}
        className="group inline-flex w-fit items-center gap-1.5 text-sm leading-5 text-muted-foreground transition-colors disabled:cursor-default enabled:hover:text-link"
      >
        <RefreshCw
          className={`size-3.5 ${resending ? 'animate-spin' : ''}`}
          aria-hidden
        />
        {resendIn > 0
          ? t('resendIn', { time: formatTimer(resendIn, locale) })
          : resending
            ? t('resendSending')
            : t('resendCta')}
      </button>

      <button
        type="submit"
        disabled={!canSubmit}
        className="inline-flex h-12 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:bg-border disabled:text-disabled disabled:hover:bg-border"
      >
        {t('submit')}
      </button>

      <p className="text-xs leading-4 text-muted-foreground">{helpCopy}</p>
    </form>
  );
}
