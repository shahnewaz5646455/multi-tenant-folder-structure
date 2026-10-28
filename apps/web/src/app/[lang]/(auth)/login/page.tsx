import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { JSX } from 'react';
import { AuthShell } from '../_components/auth-shell';
import { LoginForm } from './_components/login-form';

type Props = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ store?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'auth.logIn' });
  return { title: t('title') };
}

/* The `?store=` param lets the signup → login redirect pre-fill the subtitle
 * ("Log in to manage Rahim Fashion.") so returning merchants see which store
 * they're signing into. Direct hits with no param show the generic subtitle. */
export default async function LoginPage({ params, searchParams }: Props): Promise<JSX.Element> {
  const { lang } = await params;
  const { store } = await searchParams;
  setRequestLocale(lang);

  return (
    <AuthShell>
      <LoginForm storeName={store} />
    </AuthShell>
  );
}
