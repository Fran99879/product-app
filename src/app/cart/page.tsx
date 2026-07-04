"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { ShoppingCartIcon, TrashIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { useCartStore } from "@/store/cart-store";
import { useLocationStore } from "@/store/location-store";
import { createOrderService } from "@/features/orders/services/create-order";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { EmptyState } from "@/components/ui/states";
import { showToast, showError } from "@/lib/alerts";

function formatMoney(n: number) {
  return `$${n.toLocaleString("es-AR", { minimumFractionDigits: 2 })}`;
}

export default function CartPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { items, removeItem, clearCart } = useCartStore();
  const location = useLocationStore((s) => s.location);
  const [submitting, setSubmitting] = useState(false);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Cuántos vendedores distintos hay en el carrito (para avisar que se generan
  // pedidos separados: una orden por vendedor).
  const sellerCount = new Set(items.map((i) => i.owner ?? "desconocido")).size;

  const handleRemove = (id: string, name: string) => {
    removeItem(id);
    showToast("info", `Quitaste ${name} del carrito`);
  };

  const handleCheckout = async () => {
    setSubmitting(true);
    try {
      // Un carrito puede tener productos de varios vendedores. Mercado Pago
      // cobra a UNA cuenta por pago → separamos en una orden por vendedor.
      const groups = new Map<string, typeof items>();
      for (const item of items) {
        const key = item.owner ?? "desconocido";
        groups.set(key, [...(groups.get(key) ?? []), item]);
      }

      for (const group of groups.values()) {
        await createOrderService({
          items: group.map((i) => ({ product: i.id, quantity: i.quantity })),
          shippingAddress: location || undefined,
        });
      }

      clearCart();
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });

      const many = groups.size > 1;
      showToast(
        "success",
        many
          ? `Creamos ${groups.size} pedidos. Pagalos con Mercado Pago.`
          : "Pedido creado. Pagalo con Mercado Pago."
      );
      router.push("/orders");
    } catch {
      showError(
        "Puede que el stock haya cambiado. Revisá tu carrito e intentá nuevamente."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageContainer>
      <PageHeader
        title="Mi carrito"
        description={
          items.length > 0
            ? `${items.length} ${items.length === 1 ? "producto" : "productos"} en tu carrito`
            : undefined
        }
        icon={<ShoppingCartIcon />}
      />

      <div className="mt-8">
        {items.length === 0 ? (
          <EmptyState
            icon={<ShoppingCartIcon />}
            title="Tu carrito está vacío"
            description="Explorá el catálogo y agregá productos para comenzar tu compra."
            action={
              <Link href="/">
                <Button>Explorar productos</Button>
              </Link>
            }
          />
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Lista */}
            <div className="space-y-3 lg:col-span-2">
              {items.map((item) => (
                <Card
                  key={item.id}
                  padded={false}
                  className="flex items-center justify-between gap-4 p-4"
                >
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-text-primary">
                      {item.brand} {item.name}
                    </p>
                    <p className="mt-0.5 text-sm text-text-secondary">
                      {item.quantity} × {formatMoney(item.price)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="font-semibold text-text-primary">
                      {formatMoney(item.price * item.quantity)}
                    </p>
                    <IconButton
                      variant="danger"
                      label={`Eliminar ${item.name}`}
                      icon={<TrashIcon />}
                      onClick={() => handleRemove(item.id, item.name)}
                    />
                  </div>
                </Card>
              ))}
            </div>

            {/* Resumen */}
            <div className="lg:col-span-1">
              <Card className="lg:sticky lg:top-20">
                <h2 className="text-base font-semibold text-text-primary">
                  Resumen de compra
                </h2>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-text-secondary">
                    <span>Subtotal</span>
                    <span>{formatMoney(total)}</span>
                  </div>
                  <div className="flex justify-between text-text-secondary">
                    <span>Envío</span>
                    <span>A calcular</span>
                  </div>
                </div>
                <div className="my-4 h-px bg-border-subtle" />
                <div className="mb-4 flex items-start gap-2 rounded-lg bg-surface px-3 py-2 text-sm">
                  <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  {location ? (
                    <div>
                      <p className="text-xs text-text-muted">Enviar a</p>
                      <p className="text-text-primary">{location}</p>
                    </div>
                  ) : (
                    <p className="text-text-muted">
                      Sin ubicación. Agregá tu dirección de entrega desde el
                      menú de arriba para que el vendedor sepa dónde enviar.
                    </p>
                  )}
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-text-secondary">Total</span>
                  <span className="text-xl font-bold text-text-primary">
                    {formatMoney(total)}
                  </span>
                </div>
                {sellerCount > 1 && (
                  <p className="mt-3 rounded-lg bg-info-soft px-3 py-2 text-xs text-info">
                    Tu carrito tiene productos de {sellerCount} vendedores: se
                    generará un pedido por cada uno para pagarlos por separado.
                  </p>
                )}
                <Button
                  fullWidth
                  className="mt-5"
                  loading={submitting}
                  onClick={handleCheckout}
                >
                  {submitting ? "Creando pedido…" : "Confirmar pedido"}
                </Button>
              </Card>
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
