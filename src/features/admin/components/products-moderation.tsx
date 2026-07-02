"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProductsService } from "@/features/products/services/get-products";
import { useDeleteProduct } from "@/features/seller/hooks/use-delete-product";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/store/auth-store";

export function ProductsModeration() {
  const { token, isHydrated } = useAuthStore();
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-products", page],
    queryFn: () => getProductsService({ page, limit: 10, sort: "recent" }),
    enabled: isHydrated && !!token,
  });
  const deleteProduct = useDeleteProduct();
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  if (isLoading) return <Skeleton className="h-64 w-full" />;

  if (error || !data) {
    return (
      <p className="text-sm text-red-500">No pudimos cargar los productos.</p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-2xl border shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-muted-foreground">
              <th className="p-3 font-medium">Producto</th>
              <th className="p-3 font-medium">Categoría</th>
              <th className="p-3 text-right font-medium">Precio</th>
              <th className="p-3 text-right font-medium">Stock</th>
              <th className="p-3 text-right font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((product) => {
              const isDeleting =
                deleteProduct.isPending &&
                deleteProduct.variables === product.id;
              const isConfirming = confirmingId === product.id;

              return (
                <tr key={product.id} className="border-b last:border-0">
                  <td className="p-3">
                    <span className="font-medium">{product.name}</span>{" "}
                    <span className="text-muted-foreground">
                      {product.brand}
                    </span>
                  </td>
                  <td className="p-3">{product.category}</td>
                  <td className="p-3 text-right">
                    ${product.price.toLocaleString("es-AR")}
                  </td>
                  <td className="p-3 text-right">{product.quantity}</td>
                  <td className="p-3 text-right">
                    {isConfirming ? (
                      <span className="inline-flex gap-2">
                        <button
                          type="button"
                          disabled={isDeleting}
                          onClick={() =>
                            deleteProduct.mutate(product.id, {
                              onSettled: () => setConfirmingId(null),
                            })
                          }
                          className="rounded-md bg-red-600 px-3 py-1 text-xs font-medium text-white disabled:opacity-50"
                        >
                          {isDeleting ? "Eliminando..." : "Confirmar"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmingId(null)}
                          className="rounded-md border px-3 py-1 text-xs font-medium"
                        >
                          No
                        </button>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmingId(product.id)}
                        className="rounded-md border px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                      >
                        Eliminar
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {data.totalPages > 1 && (
        <div className="flex items-center gap-3 text-sm">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-md border px-3 py-1 disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="text-muted-foreground">
            Página {data.page} de {data.totalPages} · {data.total} productos
          </span>
          <button
            type="button"
            disabled={page >= data.totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-md border px-3 py-1 disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}
