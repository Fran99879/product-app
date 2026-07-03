"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { CATEGORY_LABELS } from "../constants/categories";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  quantity: number;
  category?: string;
  model?: string;
}

export function ProductCard({ product }: { product: Product }) {
  const category = (product.category as keyof typeof CATEGORY_LABELS) || undefined;
  const categoryLabel = category ? CATEGORY_LABELS[category] : null;

  const [imgSrc, setImgSrc] = useState(product.image || "/placeholder.png");
  const [imgOk, setImgOk] = useState(Boolean(product.image));

  const outOfStock = product.quantity <= 0;
  const lowStock = product.quantity > 0 && product.quantity <= 10;

  return (
    <Link href={`/product/${product.id}`} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border-subtle bg-elevated shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[var(--shadow-elevated)]">
        {/* Imagen */}
        <div className="relative aspect-square w-full overflow-hidden bg-surface">
          {imgOk ? (
            <Image
              src={imgSrc}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => {
                setImgSrc("/placeholder.png");
                setImgOk(false);
              }}
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-text-muted">
              <PhotoIcon className="h-10 w-10" />
              <span className="text-xs">Sin imagen</span>
            </div>
          )}
          {outOfStock && (
            <div className="absolute left-3 top-3">
              <Badge tone="error">Sin stock</Badge>
            </div>
          )}
        </div>

        {/* Contenido */}
        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-center justify-between gap-2">
            <span className="truncate text-xs font-medium uppercase tracking-wide text-brand">
              {categoryLabel ?? product.brand}
            </span>
            {categoryLabel && (
              <span className="shrink-0 text-xs text-text-muted">
                {product.brand}
              </span>
            )}
          </div>

          <h3 className="mt-1 line-clamp-2 flex-1 text-sm font-semibold text-text-primary">
            {product.name}
          </h3>

          {product.model && (
            <p className="mt-0.5 text-xs text-text-muted">{product.model}</p>
          )}

          <div className="mt-3 flex items-end justify-between gap-2">
            <span className="text-lg font-bold text-text-primary">
              $
              {product.price.toLocaleString("es-AR", {
                minimumFractionDigits: 2,
              })}
            </span>
            {lowStock ? (
              <Badge tone="warning">¡Últimas {product.quantity}!</Badge>
            ) : !outOfStock ? (
              <span className="text-xs text-text-muted">
                Stock: {product.quantity}
              </span>
            ) : null}
          </div>
        </div>
      </article>
    </Link>
  );
}
