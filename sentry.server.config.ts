import * as Sentry from "@sentry/nextjs";

// Sentry server-side (F11.5). Opcional: sin NEXT_PUBLIC_SENTRY_DSN queda
// deshabilitado — mismo patrón que el mailer/Sentry del backend.
if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NODE_ENV,
  });
}
