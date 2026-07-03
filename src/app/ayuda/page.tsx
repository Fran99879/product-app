import Link from "next/link";
import type { Metadata } from "next";
import {
  ShoppingBagIcon,
  TruckIcon,
  CreditCardIcon,
  ArrowUturnLeftIcon,
  UserCircleIcon,
  BuildingStorefrontIcon,
  ShieldCheckIcon,
  QuestionMarkCircleIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { PageContainer } from "@/components/layout/page-container";

export const metadata: Metadata = {
  title: "Centro de ayuda",
  description:
    "Encontrá respuestas sobre compras, envíos, pagos, devoluciones y tu cuenta en ElectroStore.",
};

const TOPICS = [
  {
    icon: ShoppingBagIcon,
    title: "Comprar",
    desc: "Cómo buscar productos, agregarlos al carrito y finalizar tu compra.",
  },
  {
    icon: TruckIcon,
    title: "Envíos",
    desc: "Tiempos de entrega, seguimiento y zonas de cobertura.",
  },
  {
    icon: CreditCardIcon,
    title: "Pagos",
    desc: "Medios de pago disponibles y cómo pagar de forma segura.",
  },
  {
    icon: ArrowUturnLeftIcon,
    title: "Devoluciones",
    desc: "Cómo devolver un producto y solicitar el reembolso.",
  },
  {
    icon: UserCircleIcon,
    title: "Mi cuenta",
    desc: "Datos personales, verificación de email y seguridad.",
  },
  {
    icon: BuildingStorefrontIcon,
    title: "Vender",
    desc: "Publicá tus productos y gestioná tus ventas como vendedor.",
  },
];

const FAQS = [
  {
    q: "¿Cómo hago una compra?",
    a: "Buscá el producto que querés, tocá “Agregar al carrito” y desde el carrito confirmá tu pedido. Vas a ver un resumen antes de finalizar.",
  },
  {
    q: "¿Cuáles son los medios de pago?",
    a: "Estamos integrando Mercado Pago para que puedas pagar con tarjeta, dinero en cuenta o efectivo. Mientras tanto, las órdenes se registran como pendientes de pago.",
  },
  {
    q: "¿Cómo sigo el estado de mi pedido?",
    a: "Ingresá a “Mis pedidos” desde el menú. Cada orden muestra su estado: pendiente, pagado, enviado, entregado o cancelado.",
  },
  {
    q: "¿Puedo vender en ElectroStore?",
    a: "Sí. Si tenés una cuenta de vendedor podés publicar, editar y administrar tus productos desde el Panel Seller.",
  },
  {
    q: "¿Qué hago si un producto no tiene stock?",
    a: "El producto va a mostrar el estado “Sin stock” y no vas a poder agregarlo al carrito hasta que el vendedor reponga unidades.",
  },
];

export default function AyudaPage() {
  return (
    <main>
      {/* Hero de ayuda */}
      <section className="relative overflow-hidden border-b border-border-subtle">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(60% 80% at 50% -20%, rgba(96,165,250,0.2), transparent 60%)",
          }}
        />
        <PageContainer size="wide" className="relative py-14 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-info-soft text-info">
            <QuestionMarkCircleIcon className="h-7 w-7" />
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Centro de ayuda
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-text-secondary">
            ¿En qué podemos ayudarte? Elegí un tema o mirá las preguntas más
            frecuentes.
          </p>
        </PageContainer>
      </section>

      <PageContainer size="wide" className="py-10">
        {/* Temas */}
        <h2 className="mb-4 text-lg font-semibold text-text-primary">
          Temas frecuentes
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex items-start gap-3 rounded-2xl border border-border-subtle bg-elevated p-5 shadow-[var(--shadow-card)] transition-colors hover:border-border-strong"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-semibold text-text-primary">{title}</h3>
                <p className="mt-1 text-sm text-text-secondary">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <h2 className="mb-4 mt-12 text-lg font-semibold text-text-primary">
          Preguntas frecuentes
        </h2>
        <div className="divide-y divide-border-subtle overflow-hidden rounded-2xl border border-border-subtle bg-elevated">
          {FAQS.map(({ q, a }) => (
            <details key={q} className="group px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-text-primary">
                {q}
                <ChevronRightIcon className="h-5 w-5 shrink-0 text-text-muted transition-transform group-open:rotate-90" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {a}
              </p>
            </details>
          ))}
        </div>

        {/* Contacto / seguridad */}
        <div className="mt-8 flex flex-col items-start gap-4 rounded-2xl border border-border-subtle bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-success-soft text-success">
              <ShieldCheckIcon className="h-6 w-6" />
            </span>
            <div>
              <h3 className="font-semibold text-text-primary">
                ¿No encontraste lo que buscabas?
              </h3>
              <p className="mt-1 text-sm text-text-secondary">
                Volvé al catálogo o revisá tus pedidos para más detalles.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              href="/"
              className="rounded-xl border border-border-strong bg-elevated px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-hover"
            >
              Ir al catálogo
            </Link>
            <Link
              href="/orders"
              className="rounded-xl bg-brand px-4 py-2 text-sm font-medium text-brand-fg transition-colors hover:bg-brand-hover"
            >
              Mis pedidos
            </Link>
          </div>
        </div>
      </PageContainer>
    </main>
  );
}
