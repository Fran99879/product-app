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
        <div className="grid gap-8 md:grid-cols-2 items-start">

            <img
                src={data.image}
                alt={data.name}
                className="w-full aspect-square rounded-2xl object-cover bg-secondary"
                onError={(e) => { e.currentTarget.src = "/placeholder.png" }}
            />

            <div className="flex flex-col">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                    {data.brand}
                </p>
                <h1 className="text-2xl font-medium leading-snug">
                    {data.name}
                </h1>

                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    {data.description}
                </p>

                <div className="my-5 h-px bg-border" />

                <div className="flex items-center justify-between">
                    <span className="text-2xl font-medium">
                        ${data.price.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
                    </span>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium
        ${data.quantity <= 3
                            ? "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
                            : "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                        }`}
                    >
                        <span className={`w-1.5 h-1.5 rounded-full ${data.quantity <= 3 ? "bg-red-500" : "bg-green-500"}`} />
                        Stock: {data.quantity}
                    </span>
                </div>

                <button
                    onClick={() => addItem({
                        id: data.id,
                        name: data.name,
                        brand: data.brand,
                        image: data.image,
                        price: data.price,
                        quantity: 1,
                    })}
                    className="mt-6 w-full rounded-xl bg-foreground text-background py-3 text-sm font-medium transition-opacity hover:opacity-85 disabled:opacity-40"
                    disabled={data.quantity === 0}
                >
                    {data.quantity === 0 ? "Sin stock" : "Agregar al carrito"}
                </button>
            </div>

        </div>
    );
}