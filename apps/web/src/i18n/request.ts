import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { TIMEZONE, loadMessages } from '@ecm/i18n';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  const messages = await loadMessages(locale);
  return {
    locale,
    messages,
    timeZone: TIMEZONE,
  };
});
