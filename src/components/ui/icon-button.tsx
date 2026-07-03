import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "ghost" | "solid" | "danger";
type Size = "sm" | "md";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Obligatorio: describe la acción para lectores de pantalla. */
  label: string;
  icon: ReactNode;
  variant?: Variant;
  size?: Size;
}

const VARIANTS: Record<Variant, string> = {
  ghost: "text-text-muted hover:bg-hover hover:text-text-primary",
  solid: "bg-elevated border border-border-strong text-text-primary hover:bg-hover",
  danger: "text-text-muted hover:bg-error-soft hover:text-error",
};

const SIZES: Record<Size, string> = {
  sm: "h-8 w-8 [&>svg]:h-4 [&>svg]:w-4",
  md: "h-9 w-9 [&>svg]:h-5 [&>svg]:w-5",
};

export function IconButton({
  label,
  icon,
  variant = "ghost",
  size = "md",
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      {...props}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex items-center justify-center rounded-lg transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
        "disabled:cursor-not-allowed disabled:opacity-50",
        VARIANTS[variant],
        SIZES[size],
        className
      )}
    >
      {icon}
    </button>
  );
}
