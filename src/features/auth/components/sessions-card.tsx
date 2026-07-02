"use client";

import { Monitor, Smartphone } from "lucide-react";
import { useSessions, useRevokeSession, useRevokeOtherSessions } from "../hooks/use-sessions";
import type { Session } from "../services/sessions";
import { Skeleton } from "@/components/ui/skeleton";

// Nombre legible a partir del user-agent, sin traer una lib de parsing
// para cuatro casos conocidos.
function describeDevice(userAgent: string | null) {
  if (!userAgent) return "Dispositivo desconocido";

  const browser = /Edg\//.test(userAgent)
    ? "Edge"
    : /OPR\//.test(userAgent)
      ? "Opera"
      : /Firefox\//.test(userAgent)
        ? "Firefox"
        : /Chrome\//.test(userAgent)
          ? "Chrome"
          : /Safari\//.test(userAgent)
            ? "Safari"
            : "Navegador";

  const os = /Windows/.test(userAgent)
    ? "Windows"
    : /Android/.test(userAgent)
      ? "Android"
      : /iPhone|iPad/.test(userAgent)
        ? "iOS"
        : /Mac OS X/.test(userAgent)
          ? "macOS"
          : /Linux/.test(userAgent)
            ? "Linux"
            : null;

  return os ? `${browser} · ${os}` : browser;
}

function isMobile(userAgent: string | null) {
  return !!userAgent && /Android|iPhone|iPad|Mobile/.test(userAgent);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function SessionRow({ session }: { session: Session }) {
  const revoke = useRevokeSession();
  const Icon = isMobile(session.userAgent) ? Smartphone : Monitor;

  return (
    <li className="flex items-center gap-3 py-3">
      <Icon className="h-5 w-5 shrink-0 text-muted-foreground" />
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-2 text-sm font-medium">
          <span className="truncate">{describeDevice(session.userAgent)}</span>
          {session.current && (
            <span className="shrink-0 rounded-md bg-green-50 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-950 dark:text-green-200">
              Actual
            </span>
          )}
        </p>
        <p className="text-xs text-muted-foreground">
          Iniciada el {formatDate(session.createdAt)}
        </p>
      </div>
      {!session.current && (
        <button
          type="button"
          onClick={() => revoke.mutate(session.id)}
          disabled={revoke.isPending}
          className="shrink-0 rounded-md border px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50 dark:hover:bg-red-950"
        >
          {revoke.isPending ? "Cerrando..." : "Revocar"}
        </button>
      )}
    </li>
  );
}

export function SessionsCard() {
  const { data, isLoading } = useSessions();
  const revokeOthers = useRevokeOtherSessions();

  if (isLoading) {
    return <Skeleton className="h-40 w-full max-w-sm" />;
  }

  if (!data) return null;

  const hasOthers = data.some((s) => !s.current);

  return (
    <div className="max-w-sm rounded-2xl border border-border-tertiary bg-background-primary p-6 shadow-sm">
      <h2 className="mb-1 text-lg font-medium">Sesiones activas</h2>
      <p className="mb-4 text-sm text-muted-foreground">
        Dispositivos con la sesión iniciada en tu cuenta.
      </p>

      <ul className="divide-y divide-border-tertiary">
        {data.map((session) => (
          <SessionRow key={session.id} session={session} />
        ))}
      </ul>

      {hasOthers && (
        <button
          type="button"
          onClick={() => revokeOthers.mutate()}
          disabled={revokeOthers.isPending}
          className="mt-4 w-full rounded-lg border px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50 dark:hover:bg-red-950"
        >
          {revokeOthers.isPending
            ? "Cerrando..."
            : "Cerrar las demás sesiones"}
        </button>
      )}
    </div>
  );
}
