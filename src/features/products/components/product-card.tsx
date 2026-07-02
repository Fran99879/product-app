"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { CATEGORY_LABELS } from "../constants/categories";

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
  const productId = product.id;
  const category = (product.category as keyof typeof CATEGORY_LABELS) || undefined;
  const categoryLabel = category ? CATEGORY_LABELS[category] : null;

  const [imgSrc, setImgSrc] = useState(product.image || "/placeholder.png");

  return (
    <Link href={`/product/${productId}`}>
      <div className="rounded-2xl border border-border overflow-hidden transition-colors hover:border-border/80 bg-background h-full flex flex-col">
        <div className="relative h-40 w-full bg-secondary">
          <Image
            src={imgSrc}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover"
            onError={() => setImgSrc("/placeholder.png")}
          />
        </div>

        <div className="px-4 pt-3 pb-4 flex flex-col flex-1">
          {/* Category and Brand */}
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <p className="text-xs uppercase tracking-wide text-muted-foreground truncate">
              {categoryLabel || product.brand}
            </p>
            {categoryLabel && (
              <p className="text-xs text-muted-foreground opacity-60">
                {product.brand}
              </p>
            )}
          </div>

          {/* Product Name */}
          <h2 className="text-sm font-medium leading-snug line-clamp-2 flex-1">
            {product.name}
          </h2>

          {/* Model (si existe) */}
          {product.model && (
            <p className="text-xs text-muted-foreground mt-1">
              {product.model}
            </p>
          )}

          {/* Price and Stock */}
          <div className="mt-3 flex items-center justify-between gap-2">
            <span className="text-lg font-medium">
              ${product.price.toLocaleString("es-AR", {
                minimumFractionDigits: 2,
              })}
            </span>
            <span
              className={`text-xs shrink-0 ${product.quantity <= 10
                  ? "text-red-700 dark:text-red-400"
                  : "text-muted-foreground"
                }`}
            >
              {product.quantity <= 10
                ? `⚠️ ¡Últimas unidades! (${product.quantity})`
                : `Stock: ${product.quantity}`}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}