import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { JSX } from 'react';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { ContactSection } from './_components/contact-section';

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'contact.meta' });
  return { title: t('title'), description: t('description') };
}

export default async function ContactPage({ params }: Props): Promise<JSX.Element> {
  const { lang } = await params;
  setRequestLocale(lang);
  return (
    <>
      <SiteHeader />
      <main>
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
