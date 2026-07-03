import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Tarjeta de métrica para dashboards. */
export function StatCard({
  label,
  value,
  hint,
  icon,
  tone = "brand",
  className,
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon?: ReactNode;
  tone?: "brand" | "success" | "warning" | "error" | "info";
  className?: string;
}) {
  const tones = {
    brand: "bg-brand-soft text-brand",
    success: "bg-success-soft text-success",
    warning: "bg-warning-soft text-warning",
    error: "bg-error-soft text-error",
    info: "bg-info-soft text-info",
  };
  return (
    <div
      className={cn(
        "rounded-2xl border border-border-subtle bg-elevated p-5 shadow-[var(--shadow-card)]",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-text-muted">{label}</p>
        {icon && (
          <span
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-xl [&>svg]:h-5 [&>svg]:w-5",
              tones[tone]
            )}
          >
            {icon}
          </span>
        )}
      </div>
      <p className="mt-2 text-2xl font-bold text-text-primary">{value}</p>
      {hint && <p className="mt-1 text-xs text-text-muted">{hint}</p>}
    </div>
  );
}
