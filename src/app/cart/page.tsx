"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useCreateOrder } from "@/features/orders/hooks/use-create-order";

function formatMoney(n: number) {
  return `$${n.toLocaleString("es-AR", { minimumFractionDigits: 2 })}`;
}

interface ConfirmedOrder {
  id: string;
  total: number;
}

export default function CartPage() {
  const { items, removeItem, clearCart } = useCartStore();
  const { mutate, isPending } = useCreateOrder();
  const [confirmed, setConfirmed] = useState<ConfirmedOrder | null>(null);

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    mutate(
      {
        items: items.map((item) => ({
          product: item.id,
          quantity: item.quantity,
        })),
      },
      {
        onSuccess: (order) => {
          clearCart();
          setConfirmed({ id: order.id, total: order.total });
        },
      }
    );
  };

  // Confirmación visual post-compra: mejor que redirigir en seco a /orders.
  if (confirmed) {
    return (
      <main className="mx-auto max-w-4xl p-6">
        <div className="mx-auto max-w-md rounded-2xl border p-8 text-center shadow-sm">
          <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-green-500" />
          <h1 className="mb-2 text-2xl font-bold">¡Compra confirmada!</h1>
          <p className="mb-1 text-sm text-muted-foreground">
            Tu orden <span className="font-mono font-medium">#{confirmed.id.slice(-6)}</span> quedó
            registrada como <span className="font-medium">pendiente de pago</span>.
          </p>
          <p className="mb-6 text-lg font-semibold">{formatMoney(confirmed.total)}</p>
          <div className="flex flex-col gap-2">
            <Link
              href="/orders"
              className="rounded-xl bg-black px-6 py-3 text-sm font-medium text-white"
            >
              Ver mis órdenes
            </Link>
            <Link
              href="/"
              className="rounded-xl border px-6 py-3 text-sm font-medium"
            >
              Seguir comprando
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Mi carrito</h1>

      {items.length === 0 ? (
        <div className="rounded-2xl border p-10 text-center">
          <p className="mb-4 text-muted-foreground">Tu carrito está vacío.</p>
          <Link
            href="/"
            className="rounded-xl bg-black px-6 py-3 text-sm font-medium text-white"
          >
            Explorar productos
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-xl border p-4"
              >
                <div>
                  <p className="font-semibold">
                    {item.brand} {item.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {item.quantity} × {formatMoney(item.price)}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <p className="font-medium">
                    {formatMoney(item.price * item.quantity)}
                  </p>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="rounded-lg border px-3 py-1 text-sm hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl border p-4">
            <div className="flex items-center justify-between">
              <p className="text-xl font-bold">Total: {formatMoney(total)}</p>
              <p className="text-sm text-muted-foreground">
                {items.length} {items.length === 1 ? "producto" : "productos"}
              </p>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isPending || items.length === 0}
              className="mt-4 w-full rounded-xl bg-black px-6 py-3 text-white disabled:opacity-50 sm:w-auto"
            >
              {isPending ? "Procesando compra..." : "Finalizar compra"}
            </button>
          </div>
        </>
      )}
    </main>
  );
}
