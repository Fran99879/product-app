"use client";

import { useMyProducts } from "../hooks/use-my-products";
import { CreateProductForm } from "./create-product-form";
import { useDeleteProduct } from "../hooks/use-delete-product";

export function SellerProducts() {
  const { data, isLoading } = useMyProducts();
  const {mutate: deleteProduct} = useDeleteProduct();
  const [editing, setEditing] = useState<any | null>(null);

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
          <button
            onClick={() => setEditing(product)}
            className="rounded-lg border px-3 py-1"
          >
            Editar
          </button>
          <button
            onClick={() => {
              if (confirm("¿Eliminar producto?")) {
                deleteProduct(product.id);
              }
            }}
            className="rounded-lg border px-3 py-1 text-red-500"
          >
            Eliminar
          </button>
        </div>

      ))}
    </div>
  );
}

function useState<T>(arg0: null): [any, any] {
  throw new Error("Function not implemented.");
}
