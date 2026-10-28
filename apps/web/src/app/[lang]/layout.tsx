import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { Hind_Siliguri, Inter, Noto_Sans_Bengali } from 'next/font/google';
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

/* Primary Bengali font. Noto Sans Bengali has visually balanced Bengali
 * numerals (০-৯) at display sizes — Hind Siliguri's digits are too thin and
 * stunt the hero prices. We keep Hind Siliguri as a secondary fallback. */
const notoBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-noto-bn',
});

/* Secondary Bengali font (fallback). subset=bengali scopes the @font-face
 * unicode-range to the Bengali block (U+0980–09FF). */
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

export function generateStaticParams(): { lang: Locale }[] {
  return LOCALES.map((locale) => ({ lang: locale }));
}

type Props = {
  children: ReactNode;
  params: Promise<{ lang: string }>;
};

export default async function LocaleLayout({ children, params }: Props): Promise<React.ReactElement> {
  const { lang } = await params;
  if (!hasLocale(routing.locales, lang)) notFound();
  setRequestLocale(lang);
  const messages = await getMessages();

  const bodyFont = lang === 'bn' ? 'font-bn' : 'font-sans';

  return (
    <html lang={lang} className={`${inter.variable} ${notoBengali.variable} ${hindSiliguri.variable}`}>
      <body className={`${bodyFont} antialiased`}>
        <NextIntlClientProvider locale={lang} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
