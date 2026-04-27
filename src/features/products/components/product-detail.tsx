"use client";

import { useProduct } from "../hooks/use-products";
import { useCartStore } from "@/store/cart-store";
import { Spinner } from "@/components/ui/spinner";

export function ProductDetail({ id }: { id: string }) {
    const { data, isLoading } = useProduct(id);
    const addItem = useCartStore((state) => state.addItem);

    if (isLoading) {
  return (
    <div className="flex justify-center py-10">
      <Spinner />
    </div>
  );
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

                <button
                    onClick={() =>
                        addItem({
                            id: data.id,
                            name: data.name,
                            brand: data.brand,
                            image: data.image,
                            price: data.price,
                            quantity: 1,
                        })
                    }
                    className="mt-6 rounded-xl bg-black px-6 py-3 text-white"
                >
                    Agregar al carrito
                </button>
            </div>
        </div>
    );
}