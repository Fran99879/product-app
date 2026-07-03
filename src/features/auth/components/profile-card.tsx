"use client";

import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useProfile } from "../hooks/use-profile";
import { useResendVerification } from "../hooks/use-resend-verification";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const roleTone: Record<string, "info" | "error" | "success"> = {
  seller: "info",
  admin: "error",
  user: "success",
};

export function ProfileCard() {
  const { data, isLoading } = useProfile();
  const resend = useResendVerification();

  if (isLoading) {
    return (
      <Card>
        <div className="flex items-center gap-4">
          <Skeleton className="h-14 w-14 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
        <Skeleton className="mt-6 h-24 w-full" />
      </Card>
    );
  }

  // Sin datos (ej: sesión vencida / usuario inexistente → 404).
  if (!data) {
    return (
      <Card>
        <p className="text-sm text-text-secondary">
          No pudimos cargar tu perfil. Tu sesión pudo haber vencido.
        </p>
        <Link
          href="/login"
          className="mt-3 inline-block text-sm font-medium text-brand hover:underline"
        >
          Iniciar sesión de nuevo
        </Link>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center gap-4">
        <Avatar name={data.username} size="lg" />
        <div>
          <h2 className="text-lg font-semibold text-text-primary">
            {data.username}
          </h2>
          <Badge tone={roleTone[data.role] ?? "neutral"} className="mt-1">
            {data.role}
          </Badge>
        </div>
      </div>

      <div className="my-5 h-px bg-border-subtle" />

      <dl className="space-y-3 text-sm">
        <div className="flex items-center justify-between gap-3">
          <dt className="text-text-muted">Usuario</dt>
          <dd className="truncate font-medium text-text-primary">
            {data.username}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="text-text-muted">Email</dt>
          <dd className="truncate font-medium text-text-primary">
            {data.email}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="text-text-muted">Verificación</dt>
          <dd>
            {data.emailVerified ? (
              <Badge tone="success" icon={<CheckCircleIcon className="h-3.5 w-3.5" />}>
                Verificado
              </Badge>
            ) : (
              <Badge tone="warning">Sin verificar</Badge>
            )}
          </dd>
        </div>
      </dl>

      {!data.emailVerified && (
        <div className="mt-5 rounded-lg border border-warning/30 bg-warning-soft p-3 text-xs text-warning">
          <p className="mb-2">
            Verificá tu email para activar todas las funciones de la cuenta.
          </p>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => resend.mutate()}
            loading={resend.isPending}
          >
            {resend.isPending ? "Enviando..." : "Reenviar verificación"}
          </Button>
        </div>
      )}
    </Card>
  );
}
