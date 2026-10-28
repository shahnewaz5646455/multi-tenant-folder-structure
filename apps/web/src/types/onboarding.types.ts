export const ONBOARDING_STEP_IDS = ['account', 'store', 'ready'] as const;
export type OnboardingStepId = (typeof ONBOARDING_STEP_IDS)[number];

export type OnboardingStepStatus = 'done' | 'current' | 'upcoming';

export type OnboardingStep = {
  id: OnboardingStepId;
  status: OnboardingStepStatus;
};

export const BUSINESS_CATEGORIES = [
  'fashion',
  'electronics',
  'grocery',
  'cosmetics',
  'books',
  'sports',
  'digital',
  'other',
] as const;
export type BusinessCategory = (typeof BUSINESS_CATEGORIES)[number];

export const SALES_CHANNELS = ['social', 'physical', 'both', 'starting'] as const;
export type SalesChannel = (typeof SALES_CHANNELS)[number];

export const STORE_LANGUAGES = ['en-bn', 'bn', 'en'] as const;
export type StoreLanguage = (typeof STORE_LANGUAGES)[number];

export const STORE_COUNTRIES = ['BD'] as const;
export type StoreCountry = (typeof STORE_COUNTRIES)[number];

export type OnboardingStoreFormValues = {
  name: string;
  slug: string;
  country: StoreCountry;
  language: StoreLanguage;
  category: BusinessCategory | null;
  channel: SalesChannel;
};
