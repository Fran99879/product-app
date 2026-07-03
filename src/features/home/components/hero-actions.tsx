"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";

/**
 * Botones del hero conscientes de la sesión: "Crear cuenta" solo se muestra a
 * visitantes; un usuario logueado ve un acceso a "Mis pedidos" en su lugar.
 */
export function HeroActions() {
  const { isAuthenticated, isHydrated } = useAuthStore();

  return (
    <div className="mt-7 flex flex-wrap gap-3">
      <Link
        href="#catalogo"
        className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-brand-fg transition-colors hover:bg-brand-hover"
      >
        Explorar catálogo
      </Link>

      {/* Hasta hidratar no sabemos el estado de sesión: no renderizamos el CTA
          para evitar el flash de "Crear cuenta" a usuarios logueados. */}
      {isHydrated && !isAuthenticated && (
        <Link
          href="/register"
          className="rounded-xl border border-border-strong bg-elevated px-5 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:bg-hover"
        >
          Crear cuenta
        </Link>
      )}

      {isHydrated && isAuthenticated && (
        <Link
          href="/orders"
          className="rounded-xl border border-border-strong bg-elevated px-5 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:bg-hover"
        >
          Mis pedidos
        </Link>
      )}
    </div>
  );
}
