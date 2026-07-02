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
      <body className="flex min-h-screen items-center justify-center p-6">
        <div className="max-w-sm rounded-2xl border p-6 text-center shadow-sm">
          <h1 className="mb-2 text-lg font-medium">Algo salió mal</h1>
          <p className="mb-4 text-sm text-gray-500">
            Ocurrió un error inesperado. Podés intentar de nuevo.
          </p>
          <button
            type="button"
            onClick={reset}
            className="rounded-lg bg-black px-4 py-2 text-sm text-white"
          >
            Reintentar
          </button>
        </div>
      </body>
    </html>
  );
}
