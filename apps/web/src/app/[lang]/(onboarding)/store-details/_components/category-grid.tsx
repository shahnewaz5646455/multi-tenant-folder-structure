'use client';

import {
  Download,
  FileText,
  Monitor,
  MoreHorizontal,
  Package,
  ShoppingBag,
  Sparkles,
  Star,
  type LucideIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useId, type JSX } from 'react';
import { cn } from '@ecm/ui/cn';
import { BUSINESS_CATEGORIES, type BusinessCategory } from '@/types/onboarding.types';

type Props = {
  value: BusinessCategory | null;
  onChange: (next: BusinessCategory) => void;
  invalid?: boolean;
};

const ICONS: Record<BusinessCategory, LucideIcon> = {
  fashion: ShoppingBag,
  electronics: Monitor,
  grocery: Package,
  cosmetics: Sparkles,
  books: FileText,
  sports: Star,
  digital: Download,
  other: MoreHorizontal,
};

/* 8-tile picker, ARIA radiogroup. Grid is 2 cols on mobile → 4 on md so each
 * tile keeps its 44px+ touch target without hitting horizontal scroll at 360. */
export function CategoryGrid({ value, onChange, invalid }: Props): JSX.Element {
  const t = useTranslations('onboarding.storeDetails.field.category');
  const groupId = useId();

  return (
    <div
      role="radiogroup"
      aria-label={t('label')}
      aria-invalid={invalid || undefined}
      className="grid grid-cols-2 gap-3 md:grid-cols-4"
    >
      {BUSINESS_CATEGORIES.map((id) => {
        const Icon = ICONS[id];
        const selected = value === id;
        return (
          <button
            key={id}
            type="button"
            role="radio"
            name={groupId}
            aria-checked={selected}
            onClick={() => onChange(id)}
            className={cn(
              'flex min-h-[72px] flex-col items-start gap-2 rounded-md border p-3 text-left transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30',
              selected
                ? 'border-2 border-primary bg-brand-50 p-[11px]'
                : 'border-border bg-background hover:border-border-strong',
            )}
          >
            <Icon
              aria-hidden
              className={cn('size-5', selected ? 'text-primary' : 'text-icon')}
            />
            <span
              className={cn(
                'text-xs leading-4',
                selected ? 'font-medium text-foreground' : 'text-foreground',
              )}
            >
              {t(`options.${id}`)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
