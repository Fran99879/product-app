"use client";

import {
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";
import {
  useSessions,
  useRevokeSession,
  useRevokeOtherSessions,
} from "../hooks/use-sessions";
import type { Session } from "../services/sessions";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { confirmDelete } from "@/lib/alerts";

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
  const Icon = isMobile(session.userAgent)
    ? DevicePhoneMobileIcon
    : ComputerDesktopIcon;

  const handleRevoke = async () => {
    const ok = await confirmDelete({
      title: "¿Cerrar esta sesión?",
      message: "El dispositivo deberá volver a iniciar sesión.",
      confirmText: "Sí, revocar",
    });
    if (ok) revoke.mutate(session.id);
  };

  return (
    <li className="flex items-center gap-3 py-3">
      <Icon className="h-5 w-5 shrink-0 text-text-muted" />
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-2 text-sm font-medium text-text-primary">
          <span className="truncate">{describeDevice(session.userAgent)}</span>
          {session.current && <Badge tone="success">Actual</Badge>}
        </p>
        <p className="text-xs text-text-muted">
          Iniciada el {formatDate(session.createdAt)}
        </p>
      </div>
      {!session.current && (
        <Button
          size="sm"
          variant="ghost"
          className="text-error hover:bg-error-soft"
          onClick={handleRevoke}
          loading={revoke.isPending}
        >
          {revoke.isPending ? "Cerrando..." : "Revocar"}
        </Button>
      )}
    </li>
  );
}

export function SessionsCard() {
  const { data, isLoading } = useSessions();
  const revokeOthers = useRevokeOtherSessions();

  if (isLoading) {
    return <Skeleton className="h-40 w-full rounded-2xl" />;
  }

  if (!data) return null;

  const hasOthers = data.some((s) => !s.current);

  const handleRevokeOthers = async () => {
    const ok = await confirmDelete({
      title: "¿Cerrar las demás sesiones?",
      message: "Todos los otros dispositivos deberán volver a iniciar sesión.",
      confirmText: "Cerrar las demás",
    });
    if (ok) revokeOthers.mutate();
  };

  return (
    <Card>
      <h2 className="text-lg font-semibold text-text-primary">
        Sesiones activas
      </h2>
      <p className="mt-1 text-sm text-text-secondary">
        Dispositivos con la sesión iniciada en tu cuenta.
      </p>

      <ul className="mt-2 divide-y divide-border-subtle">
        {data.map((session) => (
          <SessionRow key={session.id} session={session} />
        ))}
      </ul>

      {hasOthers && (
        <Button
          variant="secondary"
          fullWidth
          className="mt-4 text-error"
          onClick={handleRevokeOthers}
          loading={revokeOthers.isPending}
        >
          {revokeOthers.isPending ? "Cerrando..." : "Cerrar las demás sesiones"}
        </Button>
      )}
    </Card>
  );
}
