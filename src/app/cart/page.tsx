"use client";

import { useCartStore } from "@/store/cart-store";
import { useCreateOrder } from "@/features/orders/hooks/use-create-order";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();

  const { items, removeItem, clearCart } = useCartStore();
  const { mutate, isPending } = useCreateOrder();

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
        onSuccess: () => {
          clearCart();
          router.push("/orders");
        },
      }
    );
  };

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Mi carrito
      </h1>

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
              <p>Cantidad: {item.quantity}</p>
            </div>

            <div className="flex items-center gap-4">
              <p>${item.price}</p>

              <button
                onClick={() => removeItem(item.id)}
                className="rounded-lg border px-3 py-1"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border p-4">
        <p className="text-xl font-bold">Total: ${total}</p>
        <button
          onClick={handleCheckout}
          disabled={isPending || items.length === 0}
          className="mt-4 rounded-xl bg-black px-6 py-3 text-white disabled:opacity-50"
        >
          {isPending
            ? "Procesando compra..."
            : "Finalizar compra"}
        </button>
      </div>
    </main>
  );
}