'use client';

import { useTranslations } from 'next-intl';
import { useState, type FormEvent, type JSX } from 'react';
import { FormControl, FormField, FormLabel } from '@/components/shared/form/form-field';
import { Input } from '@/components/shared/form/input';
import { SegmentedControl } from '@/components/shared/form/segmented-control';
import { Select } from '@/components/shared/form/select';
import { useRouter } from '@/i18n/navigation';
import {
  SALES_CHANNELS,
  STORE_COUNTRIES,
  STORE_LANGUAGES,
  type BusinessCategory,
  type OnboardingStoreFormValues,
  type SalesChannel,
  type StoreCountry,
  type StoreLanguage,
} from '@/types/onboarding.types';
import { CategoryGrid } from './category-grid';
import { SLUG_RE, StoreSlugField } from './store-slug-field';

type ErrorKey =
  | 'nameRequired'
  | 'slugRequired'
  | 'slugInvalid'
  | 'slugTooShort'
  | 'categoryRequired';
type FieldErrors = Partial<Record<'name' | 'slug' | 'category', ErrorKey>>;

function validate(values: OnboardingStoreFormValues): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.name.trim()) errors.name = 'nameRequired';
  const slug = values.slug.trim();
  if (!slug) errors.slug = 'slugRequired';
  else if (slug.length < 3) errors.slug = 'slugTooShort';
  else if (!SLUG_RE.test(slug)) errors.slug = 'slugInvalid';
  if (!values.category) errors.category = 'categoryRequired';
  return errors;
}

export function StoreDetailsForm(): JSX.Element {
  const t = useTranslations('onboarding.storeDetails');
  const tErrors = useTranslations('onboarding.storeDetails.errors');
  const tCountry = useTranslations('onboarding.storeDetails.field.country.options');
  const tLanguage = useTranslations('onboarding.storeDetails.field.language.options');
  const tChannel = useTranslations('onboarding.storeDetails.field.channel.options');
  const router = useRouter();

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [country, setCountry] = useState<StoreCountry>('BD');
  const [language, setLanguage] = useState<StoreLanguage>('en-bn');
  const [category, setCategory] = useState<BusinessCategory | null>(null);
  const [channel, setChannel] = useState<SalesChannel>('social');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const next = validate({ name, slug, country, language, category, channel });
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    try {
      // Blueprint, section B: real submit goes through a Server Action that
      // provisions the store, then redirects. The stub mirrors the signup
      // pattern until the API lands.
      await new Promise((resolve) => {
        setTimeout(resolve, 400);
      });
      router.push({
        pathname: '/setting-up',
        query: { storeName: name.trim(), slug: slug.trim(), category: category ?? 'other' },
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
      <FormField name="name" error={errors.name ? tErrors(errors.name) : undefined}>
        <FormLabel>{t('field.name.label')}</FormLabel>
        <FormControl>
          <Input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('field.name.placeholder')}
            autoComplete="organization"
          />
        </FormControl>
      </FormField>

      <StoreSlugField
        value={slug}
        onChange={setSlug}
        error={errors.slug ? tErrors(errors.slug) : undefined}
        disabled={submitting}
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        <FormField name="country">
          <FormLabel>{t('field.country.label')}</FormLabel>
          <FormControl>
            <Select
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value as StoreCountry)}
            >
              {STORE_COUNTRIES.map((code) => (
                <option key={code} value={code}>
                  {tCountry(code)}
                </option>
              ))}
            </Select>
          </FormControl>
        </FormField>

        <FormField name="language">
          <FormLabel>{t('field.language.label')}</FormLabel>
          <FormControl>
            <Select
              name="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value as StoreLanguage)}
            >
              {STORE_LANGUAGES.map((code) => (
                <option key={code} value={code}>
                  {tLanguage(code)}
                </option>
              ))}
            </Select>
          </FormControl>
        </FormField>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium leading-5 text-foreground">{t('field.category.label')}</p>
        <CategoryGrid value={category} onChange={setCategory} invalid={Boolean(errors.category)} />
        {errors.category ? (
          <p role="alert" className="text-xs leading-4 text-critical">
            {tErrors(errors.category)}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium leading-5 text-foreground">{t('field.channel.label')}</p>
        <SegmentedControl
          label={t('field.channel.label')}
          value={channel}
          onChange={setChannel}
          options={SALES_CHANNELS.map((id) => ({ value: id, label: tChannel(id) }))}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex h-11 w-full items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? t('submitting') : t('submit')}
      </button>
    </form>
  );
}
