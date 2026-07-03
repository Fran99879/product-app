"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

// Error boundary raíz del App Router: captura errores de render que ningún
// error.tsx atrapó y los reporta a Sentry (no-op sin DSN). Debe renderizar
// <html>/<body> propios porque reemplaza al layout raíz.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="es">
      <body
        style={{ backgroundColor: "#0a0b0f", color: "#f4f5f7" }}
        className="flex min-h-screen items-center justify-center p-6"
      >
        <div
          className="max-w-sm rounded-2xl border p-8 text-center"
          style={{ backgroundColor: "#191c26", borderColor: "#232735" }}
        >
          <h1 className="mb-2 text-lg font-semibold">Algo salió mal</h1>
          <p className="mb-6 text-sm" style={{ color: "#b3b8c5" }}>
            Ocurrió un error inesperado. Podés intentar de nuevo.
          </p>
          <button
            type="button"
            onClick={reset}
            className="rounded-xl px-5 py-2.5 text-sm font-medium"
            style={{ backgroundColor: "#7c5cff", color: "#ffffff" }}
          >
            Reintentar
          </button>
        </div>
      </body>
    </html>
  );
}
