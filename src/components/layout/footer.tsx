import Link from "next/link";
import { BuildingStorefrontIcon } from "@heroicons/react/24/solid";

const LINKS: Array<{ label: string; href: string }> = [
  { label: "Acerca de", href: "/ayuda" },
  { label: "Accesibilidad", href: "/ayuda" },
  { label: "Centro de ayuda", href: "/ayuda" },
  { label: "Privacidad y condiciones", href: "/ayuda" },
  { label: "Opciones de publicidad", href: "/ayuda" },
  { label: "Publicidad", href: "/ayuda" },
  { label: "Servicios empresariales", href: "/ayuda" },
  { label: "Vender en ElectroStore", href: "/seller" },
];

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-app">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav
          aria-label="Pie de página"
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          {LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-sm text-text-muted transition-colors hover:text-text-primary hover:underline"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="mt-6 flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand text-brand-fg">
              <BuildingStorefrontIcon className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-text-secondary">
              ElectroStore
            </span>
          </div>
          <p className="text-xs text-text-muted">
            ElectroStore © {new Date().getFullYear()} — Marketplace de
            electrónicos
          </p>
        </div>
      </div>
    </footer>
  );
}
