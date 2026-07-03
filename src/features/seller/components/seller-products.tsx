"use client";

import { useState } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";
import { useMyProducts } from "../hooks/use-my-products";
import { CreateProductForm } from "./create-product-form";
import { useDeleteProduct } from "../hooks/use-delete-product";
import { CreateProductSchema } from "../schemas/create-product.schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconButton } from "@/components/ui/icon-button";
import { EmptyState } from "@/components/ui/states";
import { confirmDelete } from "@/lib/alerts";
import { formatMoney } from "@/lib/format";
import { CATEGORY_LABELS } from "@/features/products/constants/categories";

export function SellerProducts() {
  const { data, isLoading } = useMyProducts();
  const { mutate: deleteProduct, isPending } = useDeleteProduct();
  const [editing, setEditing] = useState<CreateProductSchema | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleDelete = async (id: string, name: string) => {
    const ok = await confirmDelete({
      title: "¿Eliminar producto?",
      message: `"${name}" se quitará del catálogo. Esta acción no se puede deshacer.`,
    });
    if (ok) deleteProduct(id);
  };

  return (
    <div className="space-y-6">
      <CreateProductForm
        initialData={editing || undefined}
        productId={editingId || undefined}
        onSuccess={() => {
          setEditing(null);
          setEditingId(null);
        }}
      />

      {isLoading ? (
        <Card padded={false}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 border-b border-border-subtle px-4 py-3 last:border-0"
            >
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </Card>
      ) : !data?.length ? (
        <EmptyState
          icon={<CubeIcon />}
          title="No tenés productos"
          description="Creá tu primer producto usando el formulario de arriba."
        />
      ) : (
        <Card padded={false} className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border-subtle text-left text-xs uppercase tracking-wide text-text-muted">
                  <th className="px-4 py-3 font-medium">Producto</th>
                  <th className="px-4 py-3 font-medium">Categoría</th>
                  <th className="px-4 py-3 text-right font-medium">Precio</th>
                  <th className="px-4 py-3 text-center font-medium">Stock</th>
                  <th className="px-4 py-3 text-center font-medium">Estado</th>
                  <th className="px-4 py-3 text-right font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {data?.map((product: any) => {
                  const categoryLabel =
                    CATEGORY_LABELS[
                      product.category as keyof typeof CATEGORY_LABELS
                    ] || product.category;

                  return (
                    <tr
                      key={product.id}
                      className="transition-colors hover:bg-hover/50"
                    >
                      <td className="px-4 py-3">
                        <p className="font-medium text-text-primary">
                          {product.name}
                        </p>
                        <p className="text-xs text-text-muted">
                          {product.brand}
                          {product.model ? ` · ${product.model}` : ""}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <Badge tone="neutral">{categoryLabel}</Badge>
                      </td>
                      <td className="px-4 py-3 text-right font-medium text-text-primary">
                        {formatMoney(product.price)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Badge tone={product.quantity <= 3 ? "error" : "success"}>
                          {product.quantity}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Badge tone={product.isActive ? "info" : "neutral"}>
                          {product.isActive ? "Activo" : "Inactivo"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-1">
                          <IconButton
                            size="sm"
                            label="Editar producto"
                            icon={<PencilSquareIcon />}
                            onClick={() => {
                              setEditing(product);
                              setEditingId(product.id);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                          />
                          <IconButton
                            size="sm"
                            variant="danger"
                            label="Eliminar producto"
                            icon={<TrashIcon />}
                            disabled={isPending}
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
      )}
    </div>
  );
}
