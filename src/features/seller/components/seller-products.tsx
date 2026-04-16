"use client";

import { useMyProducts } from "../hooks/use-my-products";
import { CreateProductForm } from "./create-product-form";

export function SellerProducts() {
  const { data, isLoading } = useMyProducts();

  if (isLoading) {
    return <div>Cargando productos...</div>;
  }

  return (
    
    <div className="space-y-4">
      <CreateProductForm />
      {data?.map((product: any) => (
        <div
          key={product.id}
          className="rounded-2xl border p-4"
        >
          <p className="font-semibold">
            {product.brand} {product.name}
          </p>
          <p>Stock: {product.quantity}</p>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}