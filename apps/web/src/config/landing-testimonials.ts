import type { Testimonial } from '@/types/marketing.types';

export const TESTIMONIALS_HEADING = {
  overline: 'MERCHANT STORIES',
  title: 'Loved by 3,240 verified merchants',
} as const;

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    quote:
      '“We moved from Facebook-only selling to our own website in one evening. Courier booking alone saves us two hours a day.”',
    name: 'Rahim Ahmed',
    meta: 'Rahim Fashion, Dhaka · 1,248 orders',
    initials: 'RA',
    rating: 5,
  },
  {
    quote:
      '“The AI fraud check stopped 40 fake COD orders last month. That’s real money saved on returns.”',
    name: 'Sharmin Akter',
    meta: 'Glow by Sharmin, Chattogram · cosmetics',
    initials: 'SA',
    rating: 5,
  },
  {
    quote:
      '“I run my shop counter and website from the same stock. The POS works even when the internet drops.”',
    name: 'Kamrul Hasan',
    meta: 'Gadget Point, Sylhet · electronics',
    initials: 'KH',
    rating: 5,
  },
] as const;
