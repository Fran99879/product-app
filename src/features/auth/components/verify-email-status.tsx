"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { verifyEmailService } from "../services/verify-email";
import { Spinner } from "@/components/ui/spinner";

type Status = "verifying" | "success" | "error";

export function VerifyEmailStatus({ token }: { token: string }) {
  const [status, setStatus] = useState<Status>(token ? "verifying" : "error");
  // Evita el doble disparo del efecto en StrictMode (dev).
  const ran = useRef(false);

  useEffect(() => {
    if (!token || ran.current) return;
    ran.current = true;

    verifyEmailService({ token })
      .then(() => setStatus("success"))
      .catch(() => setStatus("error"));
  }, [token]);

  if (status === "verifying") {
    return (
      <div className="flex flex-col items-center gap-3 py-4 text-center">
        <Spinner size="lg" className="text-brand" />
        <p className="text-sm text-text-secondary">Verificando tu email…</p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="space-y-4 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-success-soft text-success">
          <CheckCircleIcon className="h-8 w-8" />
        </div>
        <p className="text-sm text-text-secondary">
          ¡Tu email fue verificado! Ya podés usar todas las funciones de tu
          cuenta.
        </p>
        <Link
          href="/profile"
          className="inline-block text-sm font-medium text-brand hover:underline"
        >
          Ir a mi perfil
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-error-soft text-error">
        <XCircleIcon className="h-8 w-8" />
      </div>
      <p className="text-sm text-text-secondary">
        No pudimos verificar tu email: el enlace es inválido o expiró.
      </p>
      <Link
        href="/profile"
        className="inline-block text-sm font-medium text-brand hover:underline"
      >
        Ir a mi perfil para reenviar la verificación
      </Link>
    </div>
  );
}
