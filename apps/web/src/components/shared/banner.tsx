import { AlertTriangle, CheckCircle2, Info, ShieldAlert } from 'lucide-react';
import type { ComponentType, HTMLAttributes, JSX, ReactNode, SVGProps } from 'react';
import { cn } from '@ecm/ui/cn';

export type BannerTone = 'info' | 'warning' | 'critical' | 'success';

type Tone = {
  surface: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  iconClass: string;
};

/* Centralised tone registry — add a tone here and every Banner in the app
 * gets the new surface + icon in one go. Icons are Lucide for parity with the
 * rest of the design system. */
const TONES = {
  info: { surface: 'bg-info-bg text-foreground', icon: Info, iconClass: 'text-info' },
  warning: {
    surface: 'bg-accent-orange-subtle text-foreground',
    icon: AlertTriangle,
    iconClass: 'text-accent-orange',
  },
  critical: {
    surface: 'bg-critical-bg text-foreground',
    icon: ShieldAlert,
    iconClass: 'text-critical',
  },
  success: {
    surface: 'bg-success-bg text-foreground',
    icon: CheckCircle2,
    iconClass: 'text-success',
  },
} satisfies Record<BannerTone, Tone>;

export type BannerProps = HTMLAttributes<HTMLDivElement> & {
  tone?: BannerTone;
  title?: ReactNode;
  children?: ReactNode;
};

/* Static page-level alert. For dismissible or action-bearing banners add an
 * `onDismiss` / `action` prop later — current usages (login error, verify
 * resend confirmation) are read-only, so YAGNI applies for now. */
export function Banner({
  tone = 'info',
  title,
  children,
  className,
  role,
  ...props
}: BannerProps): JSX.Element {
  const { surface, icon: Icon, iconClass } = TONES[tone];
  const landmarkRole = role ?? (tone === 'critical' ? 'alert' : 'status');

  return (
    <div
      role={landmarkRole}
      className={cn('flex w-full items-start gap-3 rounded-lg p-4 text-sm leading-5', surface, className)}
      {...props}
    >
      <Icon className={cn('mt-0.5 size-5 shrink-0', iconClass)} aria-hidden />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        {title ? <p className="font-semibold">{title}</p> : null}
        {children ? <p className="text-sm leading-5">{children}</p> : null}
      </div>
    </div>
  );
}
