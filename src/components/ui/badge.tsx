import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "neutral" | "brand" | "success" | "warning" | "error" | "info";

const TONES: Record<Tone, string> = {
  neutral: "bg-hover text-text-secondary border-border-strong",
  brand: "bg-brand-soft text-brand border-transparent",
  success: "bg-success-soft text-success border-transparent",
  warning: "bg-warning-soft text-warning border-transparent",
  error: "bg-error-soft text-error border-transparent",
  info: "bg-info-soft text-info border-transparent",
};

export function Badge({
  children,
  tone = "neutral",
  icon,
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        TONES[tone],
        className
      )}
    >
      {icon}
      {children}
    </span>
  );
}

/* ---------------------------------------------------------------------------
   Estado de orden — etiqueta + tono. Se acompaña de texto además del color
   (accesibilidad: no comunicar solo con color).
   --------------------------------------------------------------------------- */
const STATUS_MAP: Record<string, { label: string; tone: Tone }> = {
  pending: { label: "Pendiente", tone: "warning" },
  paid: { label: "Pagado", tone: "info" },
  shipped: { label: "Enviado", tone: "brand" },
  delivered: { label: "Entregado", tone: "success" },
  cancelled: { label: "Cancelado", tone: "error" },
};

export function OrderStatusBadge({ status }: { status: string }) {
  const config = STATUS_MAP[status];
  if (!config) return <Badge tone="neutral">Desconocido</Badge>;
  return <Badge tone={config.tone}>{config.label}</Badge>;
}
