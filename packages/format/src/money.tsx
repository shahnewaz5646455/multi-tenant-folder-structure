// Blueprint, section D "Anti-patterns": no hard-coded strings or
// toLocaleString scattered in components — use <Money/> only.
//
// Amounts are integer paisa. 1 BDT = 100 paisa.
import type { JSX } from 'react';

export type MoneyProps = {
  paisa: number;
  locale?: 'en' | 'bn';
  className?: string;
};

export function formatMoney(paisa: number, locale: 'en' | 'bn' = 'en'): string {
  const amount = paisa / 100;
  // bn-BD renders Bangla numerals; en-BD keeps Latin digits with the ৳ symbol.
  const tag = locale === 'bn' ? 'bn-BD' : 'en-BD';
  return new Intl.NumberFormat(tag, {
    style: 'currency',
    currency: 'BDT',
    maximumFractionDigits: 2,
  }).format(amount);
}

export function Money({ paisa, locale = 'en', className }: MoneyProps): JSX.Element {
  return <span className={className}>{formatMoney(paisa, locale)}</span>;
}
