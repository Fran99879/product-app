"use client";

import { useProducts } from "../hooks/use-products";
import { ProductCard } from "./product-card";

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
    return <div>Cargando productos...</div>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {data?.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}