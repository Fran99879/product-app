"use client";

import { useMyProducts } from "../hooks/use-my-products";
import { CreateProductForm } from "./create-product-form";
import { useDeleteProduct } from "../hooks/use-delete-product";
import { useState } from "react";
import { Product } from "@/types/product";
import { Spinner } from "@/components/ui/spinner";
import { Card } from "@/components/ui/card";


export function SellerProducts() {
  const { data, isLoading } = useMyProducts();
  const { mutate: deleteProduct, isPending } = useDeleteProduct();
  const [editing, setEditing] = useState<Product | null>(null);

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Spinner />
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        No hay productos
      </div>
    );
  }

  return (

    <div className="space-y-4">
      <CreateProductForm
        initialData={editing || undefined}
        productId={editing?.id}
        onSuccess={() => setEditing(null)}
      />
      {data?.map((product: Product) => (
        <Card key={product.id}>
          <p className="font-semibold">
            {product.brand} {product.name}
          </p>
          <p>Stock: {product.quantity}</p>
          <p>${product.price}</p>
          <button
            onClick={() => setEditing(product)}
            className="rounded-lg border px-3 py-1"
          >
            Editar
          </button>
          <button
            disabled={isPending}
            onClick={() => {
              if (confirm("¿Eliminar producto?")) {
                deleteProduct(product.id);
              }
            }}
            className="rounded-lg border px-3 py-1 text-red-500 disabled:opacity-50"
          >
            {isPending ? "Eliminando..." : "Eliminar"}
          </button>
        </Card>


      ))}
    </div>
  );
}
