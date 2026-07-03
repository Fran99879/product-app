import Link from "next/link";
import type { ReactNode } from "react";
import { BuildingStorefrontIcon } from "@heroicons/react/24/solid";

/** Contenedor centrado y sobrio para las pantallas de autenticación. */
export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <main className="relative flex min-h-[calc(100vh-57px)] items-center justify-center overflow-hidden px-4 py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 0%, rgba(124,92,255,0.18), transparent 70%)",
        }}
      />
      <div className="relative w-full max-w-md">
        <div className="mb-6 flex flex-col items-center text-center">
          <Link
            href="/"
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-brand-fg shadow-sm"
          >
            <BuildingStorefrontIcon className="h-6 w-6" />
          </Link>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-text-primary">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-sm text-text-secondary">{subtitle}</p>
          )}
        </div>

        <div className="rounded-2xl border border-border-subtle bg-elevated p-6 shadow-[var(--shadow-card)]">
          {children}
        </div>

        {footer && (
          <p className="mt-6 text-center text-sm text-text-secondary">
            {footer}
          </p>
        )}
      </div>
    </main>
  );
}
