import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { JSX } from 'react';
import { AuthShell } from '../_components/auth-shell';
import { OtpVerifyScreen, type Channel } from './_components/otp-verify-screen';

type Props = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ channel?: string; contact?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'auth.verify' });
  return { title: t('title') };
}

/* The verify page is step 2 of signup. In production it will be reached from
 * the signup Server Action with the channel and masked contact as search
 * params; direct hits default to mobile + a placeholder number so the design
 * can be reviewed without going through signup first. */
export default async function VerifyPage({ params, searchParams }: Props): Promise<JSX.Element> {
  const { lang } = await params;
  const { channel: rawChannel, contact: rawContact } = await searchParams;
  setRequestLocale(lang);

  const channel: Channel = rawChannel === 'email' ? 'email' : 'mobile';
  const contact = rawContact ?? (channel === 'mobile' ? '+880 1XXX-XXX100' : 'you@example.com');

  return (
    <AuthShell>
      <OtpVerifyScreen channel={channel} contact={contact} />
    </AuthShell>
  );
}
