import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Activa elevación/borde en hover (para tarjetas clickeables). */
  hover?: boolean;
  /** Padding interno por defecto. Poné false para controlarlo vos. */
  padded?: boolean;
}

export function Card({
  children,
  className,
  hover = false,
  padded = true,
  ...props
}: CardProps) {
  return (
    <div
      {...props}
      className={cn(
        "rounded-2xl border border-border-subtle bg-elevated shadow-[var(--shadow-card)]",
        padded && "p-5",
        hover &&
          "transition-all duration-200 hover:border-border-strong hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  description,
  action,
  className,
}: {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      <div>
        <h3 className="text-base font-semibold text-text-primary">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-text-secondary">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
