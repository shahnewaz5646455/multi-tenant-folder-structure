import type { JSX } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@ecm/ui/cn';
import { Avatar } from './avatar';

export type TestimonialCardProps = {
  quote: string;
  name: string;
  meta: string;
  initials: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  className?: string;
};

export function TestimonialCard({
  quote,
  name,
  meta,
  initials,
  rating = 5,
  className,
}: TestimonialCardProps): JSX.Element {
  return (
    <figure
      className={cn(
        'flex flex-col gap-4 rounded-lg border border-border bg-background p-6 shadow-sm',
        className,
      )}
    >
      <div className="flex items-start gap-0.5" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn('size-4', i < rating ? 'fill-accent-orange text-accent-orange' : 'text-muted-foreground')}
            aria-hidden="true"
          />
        ))}
      </div>
      <blockquote className="text-base leading-6 text-foreground">{quote}</blockquote>
      <figcaption className="flex items-center gap-3">
        <Avatar initials={initials} size="md" />
        <span className="flex min-w-0 flex-col">
          <span className="text-sm font-medium leading-5 text-foreground">{name}</span>
          <span className="truncate text-xs leading-4 text-muted-foreground">{meta}</span>
        </span>
      </figcaption>
    </figure>
  );
}
