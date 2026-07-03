"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TrashIcon } from "@heroicons/react/24/outline";
import { getProductsService } from "@/features/products/services/get-products";
import { useDeleteProduct } from "@/features/seller/hooks/use-delete-product";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { ErrorState } from "@/components/ui/states";
import { confirmDelete } from "@/lib/alerts";
import { formatMoney } from "@/lib/format";
import { useAuthStore } from "@/store/auth-store";

export function ProductsModeration() {
  const { token, isHydrated } = useAuthStore();
  const [page, setPage] = useState(1);
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["admin-products", page],
    queryFn: () => getProductsService({ page, limit: 10, sort: "recent" }),
    enabled: isHydrated && !!token,
  });
  const deleteProduct = useDeleteProduct();

  if (isLoading) return <Skeleton className="h-64 w-full rounded-2xl" />;

  if (error || !data) {
    return (
      <ErrorState
        title="No pudimos cargar los productos"
        onRetry={() => refetch()}
      />
    );
  }

  const handleDelete = async (id: string, name: string) => {
    const ok = await confirmDelete({
      title: "¿Eliminar producto?",
      message: `"${name}" se eliminará de la plataforma. Esta acción no se puede deshacer.`,
    });
    if (ok) deleteProduct.mutate(id);
  };

  return (
    <div className="space-y-4">
      <Card padded={false} className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-subtle text-left text-xs uppercase tracking-wide text-text-muted">
                <th className="px-4 py-3 font-medium">Producto</th>
                <th className="px-4 py-3 font-medium">Categoría</th>
                <th className="px-4 py-3 text-right font-medium">Precio</th>
                <th className="px-4 py-3 text-right font-medium">Stock</th>
                <th className="px-4 py-3 text-right font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {data.data.map((product) => {
                const isDeleting =
                  deleteProduct.isPending &&
                  deleteProduct.variables === product.id;

                return (
                  <tr
                    key={product.id}
                    className="transition-colors hover:bg-hover/50"
                  >
                    <td className="px-4 py-3">
                      <span className="font-medium text-text-primary">
                        {product.name}
                      </span>{" "}
                      <span className="text-text-muted">{product.brand}</span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge tone="neutral">{product.category}</Badge>
                    </td>
                    <td className="px-4 py-3 text-right text-text-primary">
                      {formatMoney(product.price)}
                    </td>
                    <td className="px-4 py-3 text-right text-text-secondary">
                      {product.quantity}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end">
                        <IconButton
                          size="sm"
                          variant="danger"
                          label={`Eliminar ${product.name}`}
                          icon={<TrashIcon />}
                          disabled={isDeleting}
                          onClick={() => handleDelete(product.id, product.name)}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {data.totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 text-sm">
          <Button
            size="sm"
            variant="secondary"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Anterior
          </Button>
          <span className="text-text-muted">
            Página {data.page} de {data.totalPages} · {data.total} productos
          </span>
          <Button
            size="sm"
            variant="secondary"
            disabled={page >= data.totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Siguiente
          </Button>
        </div>
      )}
    </div>
  );
}
