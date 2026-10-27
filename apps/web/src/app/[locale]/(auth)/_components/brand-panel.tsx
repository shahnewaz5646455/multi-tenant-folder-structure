import type { JSX } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Logo } from '@/components/layout/logo';

export function BrandPanel(): JSX.Element {
  const t = useTranslations('auth.brand');
  const features = [
    t('features.liveFast'),
    t('features.payments'),
    t('features.courier'),
  ];

  // w-[560px] matches Figma's fixed brand-panel art direction width.
  return (
    <aside className="hidden min-h-screen w-[560px] shrink-0 flex-col gap-8 overflow-hidden bg-primary px-16 py-14 text-primary-foreground lg:flex">
      <Logo
        variant="full"
        className="[&>span:last-child]:text-base [&>span:last-child]:font-semibold [&>span:last-child]:text-primary-foreground"
      />

      <div className="flex-1" />

      <h1 className="display-lg">{t('headline')}</h1>

      <ul className="flex flex-col gap-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2.5">
            <CheckCircle2 className="size-[18px] shrink-0" aria-hidden />
            <span className="text-base leading-6">{feature}</span>
          </li>
        ))}
      </ul>

      <blockquote className="flex flex-col gap-2 rounded-lg bg-white/10 px-5 py-4">
        <p className="text-base leading-6">&ldquo;{t('testimonial.quote')}&rdquo;</p>
        <footer className="text-xs leading-4 opacity-90">{t('testimonial.attribution')}</footer>
      </blockquote>
    </aside>
  );
}
