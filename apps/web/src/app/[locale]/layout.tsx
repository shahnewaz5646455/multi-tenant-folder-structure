import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { Hind_Siliguri, Inter } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { LOCALES, type Locale } from '@ecm/i18n';
import { routing } from '@/i18n/routing';
import '../globals.css';

/* Latin UI font. Variable-weight so we don't have to list weights. */
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

/* Bengali font. subset=bengali scopes the @font-face unicode-range to the
 * Bengali block (U+0980–09FF). We also switch the whole body stack to
 * `font-bn` when lang="bn" so UI chrome itself renders in Hind Siliguri. */
const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-hind',
});

export const metadata: Metadata = {
  title: 'Ecom Manager — The commerce platform for Bangladesh',
  description: 'Launch, sell, and scale with Ecom Manager.',
};

export function generateStaticParams(): { locale: Locale }[] {
  return LOCALES.map((locale) => ({ locale }));
}

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props): Promise<React.ReactElement> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  const bodyFont = locale === 'bn' ? 'font-bn' : 'font-sans';

  return (
    <html lang={locale} className={`${inter.variable} ${hindSiliguri.variable}`}>
      <body className={`${bodyFont} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
