"use client";

import { ProductCard } from "./product-card";
import { Skeleton } from "@/components/ui/skeleton";

interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
  rate: number;
  category?: string;
  model?: string;
  isActive?: boolean;
}

interface ProductsGridProps {
  products?: Product[];
  isLoading?: boolean;
  /** Mensaje cuando no hay productos para mostrar. */
  emptyTitle?: string;
  emptyHint?: string;
}

export function ProductsGrid({
  products,
  isLoading = false,
  emptyTitle = "No hay productos",
  emptyHint = "Probá creando uno nuevo",
}: ProductsGridProps) {
  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-40 w-full" />
        ))}
      </div>
    );
  }

  if (!products?.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p className="text-lg">{emptyTitle}</p>
        <p className="text-sm">{emptyHint}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
