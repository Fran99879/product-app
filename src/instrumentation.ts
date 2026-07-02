import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("../sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("../sentry.edge.config");
  }
}

// Errores de request en RSC/route handlers. Si Sentry está deshabilitado
// (sin DSN) el SDK lo trata como no-op.
export const onRequestError = Sentry.captureRequestError;
