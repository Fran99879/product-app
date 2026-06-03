"use client";

import { useMyProducts } from "../hooks/use-my-products";
import { CreateProductForm } from "./create-product-form";
import { useDeleteProduct } from "../hooks/use-delete-product";
import { useState } from "react";
import { CreateProductSchema } from "../schemas/create-product.schema";
import { Spinner } from "@/components/ui/spinner";
import { Card } from "@/components/ui/card";
import { CATEGORY_LABELS } from "@/features/products/constants/categories";

export function SellerProducts() {
  const { data, isLoading } = useMyProducts();
  const { mutate: deleteProduct, isPending } = useDeleteProduct();
  const [editing, setEditing] = useState<CreateProductSchema | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <CreateProductForm
        initialData={editing || undefined}
        productId={editingId || undefined}
        onSuccess={() => {
          setEditing(null);
          setEditingId(null);
        }}
      />

      {!data?.length ? (
        <Card className="p-8 text-center">
          <p className="text-lg">No hay productos</p>
          <p className="text-sm text-muted-foreground">
            Creá tu primer producto usando el formulario de arriba
          </p>
        </Card>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="p-3 text-left">Nombre</th>
                <th className="p-3 text-left">Categoría</th>
                <th className="p-3 text-left">Modelo</th>
                <th className="p-3 text-right">Precio</th>
                <th className="p-3 text-right">Stock</th>
                <th className="p-3 text-center">Estado</th>
                <th className="p-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {data?.map((product: any) => {
                const categoryLabel =
                  CATEGORY_LABELS[
                  product.category as keyof typeof CATEGORY_LABELS
                  ] || product.category;

                return (
                  <tr key={product.id} className="hover:bg-muted/30">
                    <td className="p-3">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {product.brand}
                        </p>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="text-xs bg-secondary px-2 py-1 rounded">
                        {categoryLabel}
                      </span>
                    </td>
                    <td className="p-3 text-xs">{product.model}</td>
                    <td className="p-3 text-right font-medium">
                      ${product.price.toLocaleString("es-AR")}
                    </td>
                    <td className="p-3 text-right">
                      <span
                        className={`inline-flex px-2 py-1 rounded text-xs font-medium ${product.quantity <= 3
                            ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                            : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                          }`}
                      >
                        {product.quantity}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span
                        className={`inline-flex px-2 py-1 rounded text-xs font-medium ${product.isActive
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                          }`}
                      >
                        {product.isActive ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="p-3 text-center space-x-2">
                      <button
                        onClick={() => {
                          setEditing(product);
                          setEditingId(product.id);
                        }}
                        className="rounded-lg border px-3 py-1 text-sm hover:bg-muted"
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
                        className="rounded-lg border border-red-200 px-3 py-1 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50 dark:border-red-800 dark:hover:bg-red-900/30"
                      >
                        {isPending ? "..." : "Eliminar"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
