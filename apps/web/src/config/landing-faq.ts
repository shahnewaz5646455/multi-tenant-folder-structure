/** FAQ entry keys. Each resolves under `home.faq.entries.<key>` for q/a. */
export const FAQ_ENTRY_KEYS = ['card', 'domain', 'providers', 'fees', 'bangla'] as const;
export type FaqEntryKey = (typeof FAQ_ENTRY_KEYS)[number];

export const FAQ_CTA_HREF = '/contact';
