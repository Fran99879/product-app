"use client";

import { useProducts } from "../hooks/use-products";
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

export function ProductsGrid() {
  const { data, isLoading } = useProducts();

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-40 w-full" />
        ))}
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p className="text-lg">No hay productos</p>
        <p className="text-sm">Probá creando uno nuevo</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {data?.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}