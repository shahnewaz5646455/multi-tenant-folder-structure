export type GoLiveStep = {
  title: string;
  description: string;
};

export const GO_LIVE_HEADING = {
  overline: 'GO LIVE IN 3 STEPS',
  title: 'From sign-up to first order in one evening',
} as const;

export const GO_LIVE_STEPS: readonly GoLiveStep[] = [
  {
    title: 'Create your account',
    description: 'Sign up with your phone number. Verify with an SMS code — no card needed.',
  },
  {
    title: 'Set up your store',
    description:
      'Pick a theme, add your logo and colours. Your link rahimfashion.ecom.bd is live instantly.',
  },
  {
    title: 'Add products & sell',
    description:
      'Add products or resell supplier items, turn on bKash & COD, and share your link.',
  },
] as const;

export const GO_LIVE_FOOTNOTE =
  'Mobile app for merchants is coming later — App Store and Google Play links will appear here.';
