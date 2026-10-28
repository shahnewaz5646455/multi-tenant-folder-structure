import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { JSX } from 'react';
import { AuthShell } from '../_components/auth-shell';
import { SignUpForm } from './_components/sign-up-form';

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'auth.signUp' });
  return { title: t('title'), description: t('subtitle') };
}

export default async function SignUpPage({ params }: Props): Promise<JSX.Element> {
  const { lang } = await params;
  setRequestLocale(lang);
  return (
    <AuthShell>
      <SignUpForm />
    </AuthShell>
  );
}
