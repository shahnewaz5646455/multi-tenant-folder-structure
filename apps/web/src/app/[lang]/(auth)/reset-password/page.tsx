import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { JSX } from 'react';
import { AuthShell } from '../_components/auth-shell';
import { ResetPasswordForm } from './_components/reset-password-form';

type Props = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ contact?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'auth.resetPassword' });
  return { title: t('title') };
}

/* Step 3 of the password-reset flow (/forgot-password → /verify → /reset-password).
 * The `?contact=` param is set by the verify step so the success banner can
 * echo back which account the user just verified. Direct hits fall back to a
 * placeholder so the design surface can be reviewed without walking the flow. */
export default async function ResetPasswordPage({ params, searchParams }: Props): Promise<JSX.Element> {
  const { lang } = await params;
  const { contact } = await searchParams;
  setRequestLocale(lang);

  return (
    <AuthShell>
      <ResetPasswordForm contact={contact ?? '+880 1XXX-XXX100'} />
    </AuthShell>
  );
}
