import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Encabezado estándar de página: título (H1), descripción y acción primaria.
 * Cumple la jerarquía visual obligatoria de la Fase 9 (§4.2).
 */
export function PageHeader({
  title,
  description,
  action,
  icon,
  className,
}: {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <div className="flex items-start gap-3">
        {icon && (
          <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand [&>svg]:h-6 [&>svg]:w-6">
            {icon}
          </span>
        )}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-sm text-text-secondary">{description}</p>
          )}
        </div>
      </div>
      {action && <div className="flex shrink-0 items-center gap-2">{action}</div>}
    </div>
  );
}

/** Título de sección (H2) más pequeño para bloques dentro de una página. */
export function SectionHeader({
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
    <div
      className={cn("flex items-center justify-between gap-4", className)}
    >
      <div>
        <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
        {description && (
          <p className="mt-0.5 text-sm text-text-muted">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
