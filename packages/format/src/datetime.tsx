// Blueprint: Asia/Dhaka, Bangla numerals when locale=bn.
import type { JSX } from 'react';

export type DateTimeProps = {
  value: Date | string;
  locale?: 'en' | 'bn';
  dateStyle?: Intl.DateTimeFormatOptions['dateStyle'];
  timeStyle?: Intl.DateTimeFormatOptions['timeStyle'];
  className?: string;
};

export function formatDateTime(
  value: Date | string,
  locale: 'en' | 'bn' = 'en',
  options: Pick<Intl.DateTimeFormatOptions, 'dateStyle' | 'timeStyle'> = { dateStyle: 'medium', timeStyle: 'short' },
): string {
  const date = typeof value === 'string' ? new Date(value) : value;
  const tag = locale === 'bn' ? 'bn-BD' : 'en-BD';
  return new Intl.DateTimeFormat(tag, { timeZone: 'Asia/Dhaka', ...options }).format(date);
}

export function DateTime({ value, locale = 'en', dateStyle, timeStyle, className }: DateTimeProps): JSX.Element {
  return <time className={className}>{formatDateTime(value, locale, { dateStyle, timeStyle })}</time>;
}
