"use client";

import { useCartStore } from "@/store/cart-store";

export default function CartPage() {
  const { items, removeItem } = useCartStore();

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

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

        <button className="mt-4 rounded-xl bg-black px-6 py-3 text-white">
          Finalizar compra
        </button>
      </div>
    </main>
  );
}