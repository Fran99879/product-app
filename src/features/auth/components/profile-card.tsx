"use client";

import Link from "next/link";
import { useProfile } from "../hooks/use-profile";
import { useResendVerification } from "../hooks/use-resend-verification";
import { Skeleton } from "@/components/ui/skeleton";

export function ProfileCard() {
  const { data, isLoading } = useProfile();
  const resend = useResendVerification();

if (isLoading) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-40 w-full" />
      ))}
    </div>
  );
}

// Sin datos (ej: sesión vencida / usuario inexistente → 404). Evita el crash
// por acceder a data.username y da una salida clara.
if (!data) {
  return (
    <div className="rounded-2xl border p-6 shadow-sm max-w-sm">
      <p className="text-sm text-muted-foreground">
        No pudimos cargar tu perfil. Tu sesión pudo haber vencido.
      </p>
      <Link href="/login" className="mt-3 inline-block text-sm text-blue-600 hover:underline">
        Iniciar sesión de nuevo
      </Link>
    </div>
  );
}
const roleBadge: Record<string, string> = {
  seller: "bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-200",
  admin:  "bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200",
  user:  "bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200",
}

  return (
 <div className="rounded-2xl border border-border-tertiary bg-background-primary p-6 shadow-sm max-w-sm">
  <div className="flex items-center gap-4 mb-6">
    <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-800 dark:text-blue-100 font-medium text-lg shrink-0">
      {data.username?.slice(0, 2).toUpperCase()}
    </div>
    <div>
      <h1 className="text-lg font-medium leading-tight">{data.username}</h1>
      <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-800 dark:text-blue-200 text-xs font-medium">
        {data.role}
      </span>
    </div>
  </div>

  <div className="border-t border-border-tertiary mb-4" />

  <div className="space-y-3">
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground w-16 shrink-0">Usuario</span>
      <span className="text-sm font-medium truncate">{data.username}</span>
    </div>

    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground w-16 shrink-0">Email</span>
      <span className="text-sm font-medium truncate">{data.email}</span>
    </div>

    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground w-16 shrink-0">Rol</span>
      <span className={`inline-flex items-center mt-1 px-2 py-0.5 rounded-md text-xs font-medium ${roleBadge[data.role] ?? "bg-gray-50 text-gray-800"}`}>
  {data.role}
</span>
    </div>

    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground w-16 shrink-0">Email</span>
      {data.emailVerified ? (
        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200 text-xs font-medium">
          ✓ Verificado
        </span>
      ) : (
        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-yellow-50 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200 text-xs font-medium">
          Sin verificar
        </span>
      )}
    </div>
  </div>

  {!data.emailVerified && (
    <div className="mt-4 rounded-lg bg-yellow-50 dark:bg-yellow-950/40 p-3 text-xs text-yellow-800 dark:text-yellow-200">
      <p className="mb-2">Verificá tu email para activar todas las funciones de la cuenta.</p>
      <button
        type="button"
        onClick={() => resend.mutate()}
        disabled={resend.isPending}
        className="rounded-md bg-yellow-800 px-3 py-1.5 text-white font-medium disabled:opacity-50 dark:bg-yellow-700"
      >
        {resend.isPending ? "Enviando..." : "Reenviar verificación"}
      </button>
    </div>
  )}
</div>
  );
}