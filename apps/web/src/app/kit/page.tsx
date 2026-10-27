import type { JSX } from 'react';
import { Truck, Package, CreditCard, Megaphone } from 'lucide-react';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { FeatureTile } from '@/components/marketing/feature-tile';
import { TestimonialCard } from '@/components/marketing/testimonial-card';
import { FaqItem } from '@/components/marketing/faq-item';
import { OtpInput } from '@/components/marketing/otp-input';
import { Logo } from '@/components/layout/logo';

export const metadata = {
  title: 'Component kit · Ecom Manager',
  robots: { index: false, follow: false },
};

export default function KitPage(): JSX.Element {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-[1200px] flex-col gap-16 px-4 py-10 sm:px-6 lg:px-16 lg:py-16">
        <Section title="Logo">
          <div className="flex flex-wrap items-center gap-8">
            <Logo variant="full" />
            <Logo variant="mark" />
          </div>
        </Section>

        <Section title="Feature tiles">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureTile
              icon={Truck}
              title="Courier booking"
              description="Book Pathao, RedX or Steadfast in one click and track every parcel."
            />
            <FeatureTile
              icon={Package}
              title="Inventory"
              tone="info"
              description="Keep stock in sync across your website, POS and marketplaces."
            />
            <FeatureTile
              icon={CreditCard}
              title="bKash & Nagad"
              tone="warning"
              description="Accept mobile wallet payments with automatic settlement."
            />
            <FeatureTile
              icon={Megaphone}
              title="Campaigns"
              description="Launch SMS, WhatsApp and Facebook campaigns from one inbox."
            />
          </div>
        </Section>

        <Section title="Testimonial">
          <div className="flex flex-wrap gap-6">
            <TestimonialCard
              className="w-full sm:w-96"
              quote={'“We moved from Facebook-only selling to our own website in one evening. Courier booking alone saves us two hours a day.”'}
              name="Rahim Ahmed"
              meta="Rahim Fashion, Dhaka · 1,248 orders"
              initials="RA"
            />
          </div>
        </Section>

        <Section title="FAQ">
          <div className="max-w-3xl">
            <FaqItem
              question="Do I need a credit card to start?"
              answer="No. The Free plan needs no card. Upgrade any time with bKash, Nagad or card — you only pay when you are ready."
            />
            <FaqItem
              question="Do I need a credit card to start?"
              answer="No. The Free plan needs no card. Upgrade any time with bKash, Nagad or card — you only pay when you are ready."
              defaultOpen
            />
          </div>
        </Section>

        <Section title="OTP input">
          <div className="flex flex-col gap-6">
            <OtpInput length={6} />
            <OtpInput length={6} error />
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }): JSX.Element {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold leading-7 text-foreground">{title}</h2>
      {children}
    </section>
  );
}
