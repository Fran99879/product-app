import * as Sentry from "@sentry/nextjs";

// Sentry client-side (errores de React/browser). Opcional: sin
// NEXT_PUBLIC_SENTRY_DSN queda deshabilitado.
if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NODE_ENV,
  });
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
