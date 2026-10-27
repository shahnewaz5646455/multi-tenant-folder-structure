'use client';

import {
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useId,
  useMemo,
  type HTMLAttributes,
  type LabelHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react';
import { cn } from '@ecm/ui/cn';

type FormFieldContextValue = {
  id: string;
  descriptionId: string;
  messageId: string;
  name?: string;
  invalid: boolean;
  hasDescription: boolean;
};

const FormFieldContext = createContext<FormFieldContextValue | null>(null);

function useFormField(component: string): FormFieldContextValue {
  const ctx = useContext(FormFieldContext);
  if (!ctx) throw new Error(`<${component}> must be used inside <FormField>`);
  return ctx;
}

export type FormFieldProps = {
  name?: string;
  /* Accepts ReactNode so callers can embed an inline icon (`<AlertTriangle />`)
   * alongside the message. Any truthy value marks the field invalid. */
  error?: ReactNode;
  description?: ReactNode;
  className?: string;
  children: ReactNode;
};

/* Compound form field.
 *
 *   <FormField name="email" error={state.errors?.email} description="…">
 *     <FormLabel>Email</FormLabel>
 *     <FormControl>
 *       <Input name="email" />
 *     </FormControl>
 *   </FormField>
 *
 * FormField owns the id, aria-describedby and aria-invalid wiring so each
 * child doesn't have to. Error is rendered in place of description when set,
 * so the layout doesn't jump. */
export function FormField({ name, error, description, className, children }: FormFieldProps): ReactElement {
  const uid = useId();
  const base = name ? `${name}-${uid}` : uid;
  const value = useMemo<FormFieldContextValue>(
    () => ({
      id: `field-${base}`,
      descriptionId: `field-${base}-description`,
      messageId: `field-${base}-message`,
      name,
      invalid: Boolean(error),
      hasDescription: Boolean(description),
    }),
    [base, name, error, description],
  );

  return (
    <FormFieldContext.Provider value={value}>
      <div className={cn('flex w-full flex-col gap-1', className)}>
        {children}
        {description && !error ? <FormDescription>{description}</FormDescription> : null}
        {error ? <FormMessage>{error}</FormMessage> : null}
      </div>
    </FormFieldContext.Provider>
  );
}

export type FormLabelProps = LabelHTMLAttributes<HTMLLabelElement> & { optional?: boolean };

export function FormLabel({ className, children, optional, ...props }: FormLabelProps): ReactElement {
  const { id } = useFormField('FormLabel');
  return (
    <label
      htmlFor={id}
      className={cn('text-sm font-medium leading-5 text-foreground', className)}
      {...props}
    >
      {children}
      {optional ? <span className="ml-1 text-xs font-normal text-muted-foreground">(optional)</span> : null}
    </label>
  );
}

export type FormControlProps = { children: ReactElement<Record<string, unknown>> };

/* Clones the single child input and wires id, aria-describedby, aria-invalid.
 * Keeps callsites terse: `<FormControl><Input name="…" /></FormControl>`. */
export function FormControl({ children }: FormControlProps): ReactElement {
  const { id, descriptionId, messageId, invalid, hasDescription } = useFormField('FormControl');
  if (!isValidElement(children)) {
    throw new Error('<FormControl> expects a single React element child');
  }
  const describedBy = [invalid ? messageId : null, hasDescription && !invalid ? descriptionId : null]
    .filter(Boolean)
    .join(' ');

  return cloneElement(children, {
    id,
    'aria-invalid': invalid || undefined,
    'aria-describedby': describedBy || undefined,
  });
}

export function FormDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>): ReactElement {
  const { descriptionId } = useFormField('FormDescription');
  return (
    <p
      id={descriptionId}
      className={cn('text-xs leading-4 text-muted-foreground', className)}
      {...props}
    />
  );
}

export function FormMessage({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement>): ReactElement | null {
  const { messageId } = useFormField('FormMessage');
  if (!children) return null;
  return (
    <p
      id={messageId}
      role="alert"
      className={cn('text-xs leading-4 text-critical', className)}
      {...props}
    >
      {children}
    </p>
  );
}
