"use client";

import { useProducts } from "../hooks/use-products";
import { ProductCard } from "./product-card";
import { Spinner } from "@/components/ui/spinner";

interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
  rate: number;
}

export function ProductsGrid() {
  const { data, isLoading } = useProducts();

  if (isLoading) {
  return (
    <div className="flex justify-center py-10">
      <Spinner />
    </div>
  );
}

  if (!data?.length) {
    return <div className="text-center py-10 text-gray-500">
  No hay productos
</div>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {data?.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}