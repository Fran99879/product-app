import {
  BoltIcon,
  ShieldCheckIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { ProductCatalog } from "@/features/products/components/product-catalog";
import { PageContainer } from "@/components/layout/page-container";
import { HeroActions } from "@/features/home/components/hero-actions";

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border-subtle">
        {/* Gradiente decorativo sutil */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(60% 80% at 50% -10%, rgba(124,92,255,0.25), transparent 60%), radial-gradient(40% 60% at 90% 10%, rgba(34,211,238,0.12), transparent 60%)",
          }}
        />
        <PageContainer size="wide" className="relative py-16 sm:py-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-brand-soft px-3 py-1 text-xs font-medium text-brand">
              <BoltIcon className="h-4 w-4" />
              Tecnología al mejor precio
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
              El marketplace de{" "}
              <span className="text-brand">electrónicos</span> que buscabas
            </h1>
            <p className="mt-4 text-lg text-text-secondary">
              Explorá miles de productos, compará precios y comprá con
              confianza. Vendedores verificados y envíos a todo el país.
            </p>
            <HeroActions />

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-text-secondary">
              <Benefit icon={<TruckIcon />} label="Envíos a todo el país" />
              <Benefit icon={<ShieldCheckIcon />} label="Compra protegida" />
              <Benefit icon={<BoltIcon />} label="Ofertas cada día" />
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Catálogo */}
      <PageContainer size="wide" id="catalogo" className="py-10">
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-text-primary">
          Catálogo de productos
        </h2>
        <ProductCatalog />
      </PageContainer>
    </main>
  );
}

function Benefit({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-brand">
      {icon}
      {label}
    </span>
  );
}
