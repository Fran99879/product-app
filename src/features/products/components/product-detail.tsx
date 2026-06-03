"use client";

import { useProduct } from "../hooks/use-products";
import { useCartStore } from "@/store/cart-store";
import { Skeleton } from "@/components/ui/skeleton";
import { CATEGORY_LABELS } from "../constants/categories";

export function ProductDetail({ id }: { id: string }) {
  const { data, isLoading } = useProduct(id);
  const addItem = useCartStore((state) => state.addItem);

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-40 w-full" />
        ))}
      </div>
    );
  }

  if (!data) {
    return <div className="text-center py-10">Producto no encontrado</div>;
  }

  const categoryLabel = data.category
    ? CATEGORY_LABELS[data.category as keyof typeof CATEGORY_LABELS]
    : null;

  const specsEntries = data.specs ? Object.entries(data.specs) : [];

  return (
    <div className="grid gap-8 md:grid-cols-2 items-start">
      {/* Image */}
      <img
        src={data.image}
        alt={data.name}
        className="w-full aspect-square rounded-2xl object-cover bg-secondary"
        onError={(e) => {
          e.currentTarget.src = "/placeholder.png";
        }}
      />

      <div className="flex flex-col">
        {/* Category and Brand */}
        <div className="flex items-center gap-2 mb-1">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            {categoryLabel || data.brand}
          </p>
          {categoryLabel && (
            <span className="text-xs text-muted-foreground opacity-60">
              · {data.brand}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-2xl font-medium leading-snug">{data.name}</h1>

        {/* Model */}
        {data.model && (
          <p className="text-sm text-muted-foreground mt-1">
            Modelo: <span className="font-medium text-foreground">{data.model}</span>
          </p>
        )}

        {/* Description */}
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
          {data.description}
        </p>

        {/* Separator */}
        <div className="my-5 h-px bg-border" />

        {/* Price and Stock */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-medium">
            ${data.price.toLocaleString("es-AR", {
              minimumFractionDigits: 2,
            })}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${
              data.quantity <= 3
                ? "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
                : "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                data.quantity <= 3 ? "bg-red-500" : "bg-green-500"
              }`}
            />
            Stock: {data.quantity}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() =>
            addItem({
              id: data.id,
              name: data.name,
              brand: data.brand,
              image: data.image,
              price: data.price,
              quantity: 1,
              category: data.category,
              model: data.model,
            })
          }
          className="mt-6 w-full rounded-xl bg-foreground text-background py-3 text-sm font-medium transition-opacity hover:opacity-85 disabled:opacity-40"
          disabled={data.quantity === 0 || !data.isActive}
        >
          {!data.isActive
            ? "Producto inactivo"
            : data.quantity === 0
              ? "Sin stock"
              : "Agregar al carrito"}
        </button>

        {/* Status Badge */}
        {!data.isActive && (
          <div className="mt-4 px-4 py-2 rounded-lg bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 text-sm">
            Este producto no está disponible actualmente
          </div>
        )}

        {/* Specs Section */}
        {specsEntries.length > 0 && (
          <>
            <div className="my-5 h-px bg-border" />
            <div>
              <h3 className="text-sm font-semibold mb-3">
                Especificaciones Técnicas
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {specsEntries.map(([key, value]) => (
                  <div key={key} className="text-sm">
                    <p className="text-muted-foreground">{key}</p>
                    <p className="font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Rating (si existe) */}
        {data.rate > 0 && (
          <>
            <div className="my-5 h-px bg-border" />
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Calificación:</span>
              <span className="text-lg font-semibold">{data.rate.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground">★</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}