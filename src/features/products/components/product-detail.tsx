"use client";

import { useProduct } from "../hooks/use-products";

export function ProductDetail({ id }: { id: string }) {
  const { data, isLoading } = useProduct(id);

  if (isLoading) {
    return <div>Cargando producto...</div>;
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <img
        src={data.image}
        alt={data.name}
        className="w-full rounded-2xl object-cover"
      />

      <div>
        <h1 className="text-3xl font-bold">
          {data.brand} {data.name}
        </h1>

        <p className="mt-4 text-gray-600">
          {data.description}
        </p>

        <p className="mt-6 text-lg">
          Stock: {data.quantity}
        </p>

        <p className="mt-4 text-3xl font-bold">
          ${data.price}
        </p>

        <button className="mt-6 rounded-xl bg-black px-6 py-3 text-white">
          Comprar
        </button>
      </div>
    </div>
  );
}