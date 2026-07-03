"use client";

import { ProductCard } from "./product-card";
import { ProductCardSkeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/states";

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

const GRID =
  "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

export function ProductsGrid({
  products,
  isLoading = false,
  emptyTitle = "No hay productos",
  emptyHint = "Probá creando uno nuevo",
}: ProductsGridProps) {
  if (isLoading) {
    return (
      <div className={GRID}>
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!products?.length) {
    return <EmptyState title={emptyTitle} description={emptyHint} />;
  }

  return (
    <div className={GRID}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
