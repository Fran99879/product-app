"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ShoppingCartIcon,
  PhotoIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { useProduct } from "../hooks/use-products";
import { useCartStore } from "@/store/cart-store";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/ui/states";
import { showToast } from "@/lib/alerts";
import { CATEGORY_LABELS } from "../constants/categories";

export function ProductDetail({ id }: { id: string }) {
  const { data, isLoading, isError, refetch } = useProduct(id);
  const addItem = useCartStore((state) => state.addItem);
  const [imgError, setImgError] = useState(false);

  if (isLoading) {
    return (
      <div className="grid gap-8 md:grid-cols-2">
        <Skeleton className="aspect-square w-full rounded-2xl" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorState
        title="No pudimos cargar el producto"
        onRetry={() => refetch()}
      />
    );
  }

  if (!data) {
    return (
      <ErrorState
        title="Producto no encontrado"
        description="El producto que buscás no existe o fue dado de baja."
      />
    );
  }

  const categoryLabel = data.category
    ? CATEGORY_LABELS[data.category as keyof typeof CATEGORY_LABELS]
    : null;

  const specsEntries = data.specs ? Object.entries(data.specs) : [];
  const outOfStock = data.quantity === 0;
  const disabled = outOfStock || !data.isActive;

  const handleAdd = () => {
    addItem({
      id: data.id,
      name: data.name,
      brand: data.brand,
      image: data.image,
      price: data.price,
      quantity: 1,
      category: data.category,
      model: data.model,
      owner: data.owner,
    });
    showToast("success", "Producto agregado al carrito");
  };

  return (
    <div className="grid items-start gap-8 md:grid-cols-2">
      {/* Imagen */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border-subtle bg-surface">
        {data.image && !imgError ? (
          <Image
            src={data.image}
            alt={data.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-text-muted">
            <PhotoIcon className="h-12 w-12" />
            <span className="text-sm">Sin imagen</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-widest text-brand">
            {categoryLabel ?? data.brand}
          </span>
          {categoryLabel && (
            <span className="text-xs text-text-muted">· {data.brand}</span>
          )}
        </div>

        <h1 className="mt-1.5 text-3xl font-bold leading-tight text-text-primary">
          {data.name}
        </h1>

        {data.model && (
          <p className="mt-1 text-sm text-text-muted">
            Modelo:{" "}
            <span className="font-medium text-text-secondary">{data.model}</span>
          </p>
        )}

        <p className="mt-4 text-sm leading-relaxed text-text-secondary">
          {data.description}
        </p>

        <div className="my-6 h-px bg-border-subtle" />

        <div className="flex items-center justify-between gap-4">
          <span className="text-3xl font-bold text-text-primary">
            $
            {data.price.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
          </span>
          {outOfStock ? (
            <Badge tone="error">Sin stock</Badge>
          ) : data.quantity <= 3 ? (
            <Badge tone="warning">¡Últimas {data.quantity} unidades!</Badge>
          ) : (
            <Badge tone="success">Stock: {data.quantity}</Badge>
          )}
        </div>

        <Button
          className="mt-6"
          size="lg"
          fullWidth
          disabled={disabled}
          onClick={handleAdd}
          leftIcon={<ShoppingCartIcon className="h-5 w-5" />}
        >
          {!data.isActive
            ? "Producto inactivo"
            : outOfStock
              ? "Sin stock"
              : "Agregar al carrito"}
        </Button>

        {!data.isActive && (
          <div className="mt-4 rounded-lg border border-warning/30 bg-warning-soft px-4 py-2 text-sm text-warning">
            Este producto no está disponible actualmente.
          </div>
        )}

        {specsEntries.length > 0 && (
          <>
            <div className="my-6 h-px bg-border-subtle" />
            <h3 className="mb-3 text-sm font-semibold text-text-primary">
              Especificaciones técnicas
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {specsEntries.map(([key, value]) => (
                <div key={key} className="text-sm">
                  <p className="text-text-muted">{key}</p>
                  <p className="font-medium text-text-primary">{value}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {data.rate > 0 && (
          <>
            <div className="my-6 h-px bg-border-subtle" />
            <div className="flex items-center gap-2">
              <StarIcon className="h-5 w-5 text-warning" />
              <span className="text-lg font-semibold text-text-primary">
                {data.rate.toFixed(1)}
              </span>
              <span className="text-sm text-text-muted">de calificación</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
