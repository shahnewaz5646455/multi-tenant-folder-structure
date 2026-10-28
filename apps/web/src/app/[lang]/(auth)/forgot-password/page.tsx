import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { JSX } from 'react';
import { AuthShell } from '../_components/auth-shell';
import { ForgotPasswordForm } from './_components/forgot-password-form';

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'auth.forgotPassword' });
  return { title: t('title'), description: t('subtitle') };
}

export default async function ForgotPasswordPage({ params }: Props): Promise<JSX.Element> {
  const { lang } = await params;
  setRequestLocale(lang);
  return (
    <AuthShell>
      <ForgotPasswordForm />
    </AuthShell>
  );
}
