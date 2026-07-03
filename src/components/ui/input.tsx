import { forwardRef, useId } from "react";
import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/cn";

const fieldBase =
  "w-full rounded-xl border bg-surface px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted " +
  "transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand " +
  "disabled:cursor-not-allowed disabled:opacity-50";

function Field({
  label,
  error,
  hint,
  required,
  htmlFor,
  children,
}: {
  label?: ReactNode;
  error?: string;
  hint?: ReactNode;
  required?: boolean;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={htmlFor}
          className="text-sm font-medium text-text-secondary"
        >
          {label}
          {required && <span className="ml-0.5 text-error">*</span>}
        </label>
      )}
      {children}
      {error ? (
        <p className="text-xs text-error">{error}</p>
      ) : hint ? (
        <p className="text-xs text-text-muted">{hint}</p>
      ) : null}
    </div>
  );
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  error?: string;
  hint?: ReactNode;
  leftIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, required, className, leftIcon, id, ...props },
  ref
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <Field
      label={label}
      error={error}
      hint={hint}
      required={required}
      htmlFor={inputId}
    >
      <div className="relative">
        {leftIcon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted [&>svg]:h-5 [&>svg]:w-5">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={!!error || undefined}
          className={cn(
            fieldBase,
            leftIcon ? "pl-10" : null,
            error
              ? "border-error focus-visible:outline-error"
              : "border-border-strong",
            className
          )}
          {...props}
        />
      </div>
    </Field>
  );
});

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
  error?: string;
  hint?: ReactNode;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { label, error, hint, required, className, id, ...props },
    ref
  ) {
    const autoId = useId();
    const inputId = id ?? autoId;
    return (
      <Field
        label={label}
        error={error}
        hint={hint}
        required={required}
        htmlFor={inputId}
      >
        <textarea
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={!!error || undefined}
          className={cn(
            fieldBase,
            "min-h-24 resize-y",
            error
              ? "border-error focus-visible:outline-error"
              : "border-border-strong",
            className
          )}
          {...props}
        />
      </Field>
    );
  }
);

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: ReactNode;
  error?: string;
  hint?: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, hint, required, className, id, children, ...props },
  ref
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <Field
      label={label}
      error={error}
      hint={hint}
      required={required}
      htmlFor={inputId}
    >
      <select
        ref={ref}
        id={inputId}
        required={required}
        aria-invalid={!!error || undefined}
        className={cn(
          fieldBase,
          "cursor-pointer appearance-none bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat pr-9",
          error
            ? "border-error focus-visible:outline-error"
            : "border-border-strong",
          className
        )}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%237c8394' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")",
        }}
        {...props}
      >
        {children}
      </select>
    </Field>
  );
});
