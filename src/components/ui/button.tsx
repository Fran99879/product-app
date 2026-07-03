import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Spinner } from "./spinner";

type Variant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger"
  | "success"
  | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-brand text-brand-fg hover:bg-brand-hover active:bg-brand-strong shadow-sm",
  secondary:
    "bg-elevated text-text-primary border border-border-strong hover:bg-hover",
  ghost:
    "bg-transparent text-text-secondary hover:bg-hover hover:text-text-primary",
  danger: "bg-error text-app hover:brightness-110 active:brightness-95 shadow-sm",
  success:
    "bg-success text-app hover:brightness-110 active:brightness-95 shadow-sm",
  outline:
    "bg-transparent text-text-primary border border-border-strong hover:bg-hover",
};

const SIZES: Record<Size, string> = {
  sm: "h-8 px-3 text-sm gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2.5",
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={loading || disabled}
      aria-busy={loading || undefined}
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-150",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
        "disabled:cursor-not-allowed disabled:opacity-50",
        VARIANTS[variant],
        SIZES[size],
        fullWidth && "w-full",
        className
      )}
    >
      {loading ? (
        <>
          <Spinner size="sm" />
          <span>{children}</span>
        </>
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </button>
  );
}
