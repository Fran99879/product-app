"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { verifyEmailService } from "../services/verify-email";

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
      <div className="rounded-2xl border p-6 shadow-sm">
        <p className="text-sm text-gray-500">Verificando tu email…</p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="space-y-4 rounded-2xl border p-6 shadow-sm">
        <p className="text-sm">✅ ¡Tu email fue verificado! Ya podés usar todas las funciones de tu cuenta.</p>
        <Link href="/profile" className="text-sm text-blue-600 hover:underline">
          Ir a mi perfil
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-2xl border p-6 shadow-sm">
      <p className="text-sm text-red-500">
        No pudimos verificar tu email: el enlace es inválido o expiró.
      </p>
      <Link href="/profile" className="text-sm text-blue-600 hover:underline">
        Ir a mi perfil para reenviar la verificación
      </Link>
    </div>
  );
}
