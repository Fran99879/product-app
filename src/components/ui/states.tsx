import type { ReactNode } from "react";
import {
  InboxIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/cn";
import { Button } from "./button";
import { Spinner } from "./spinner";

/**
 * Estado vacío — icono, título, explicación y acción sugerida (Fase 9 §13.2).
 */
export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}: {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-border-strong bg-elevated/50 px-6 py-16 text-center",
        className
      )}
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft text-brand [&>svg]:h-8 [&>svg]:w-8">
        {icon ?? <InboxIcon />}
      </span>
      <h3 className="mt-4 text-lg font-semibold text-text-primary">{title}</h3>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-text-secondary">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

/**
 * Estado de error — mensaje claro y botón reintentar. No expone errores técnicos.
 */
export function ErrorState({
  title = "No pudimos cargar la información",
  description = "Ocurrió un problema. Revisá tu conexión e intentá nuevamente.",
  onRetry,
  className,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-error/30 bg-error-soft px-6 py-16 text-center",
        className
      )}
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-error-soft text-error [&>svg]:h-8 [&>svg]:w-8">
        <ExclamationTriangleIcon />
      </span>
      <h3 className="mt-4 text-lg font-semibold text-text-primary">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-text-secondary">{description}</p>
      {onRetry && (
        <Button
          variant="secondary"
          className="mt-6"
          onClick={onRetry}
          leftIcon={<ArrowPathIcon className="h-4 w-4" />}
        >
          Reintentar
        </Button>
      )}
    </div>
  );
}

/** Estado de carga simple centrado (para cuando no aplica skeleton). */
export function LoadingState({
  message = "Cargando…",
  className,
}: {
  message?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-16 text-text-muted",
        className
      )}
    >
      <Spinner size="lg" className="text-brand" />
      <p className="text-sm">{message}</p>
    </div>
  );
}
