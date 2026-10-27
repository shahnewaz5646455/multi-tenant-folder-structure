export type TestimonialEntry = {
  /** Key under `home.testimonials.items.<key>` for quote/name/meta. */
  key: string;
  /** Avatar initials — latin, not translated. */
  initials: string;
  rating: 1 | 2 | 3 | 4 | 5;
};

export const TESTIMONIALS: readonly TestimonialEntry[] = [
  { key: 'rahim', initials: 'RA', rating: 5 },
  { key: 'sharmin', initials: 'SA', rating: 5 },
  { key: 'kamrul', initials: 'KH', rating: 5 },
] as const;
