// app/seller/orders/page.tsx
"use client";

import {
  ClipboardDocumentListIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { useSellerOrders } from "@/features/orders/hooks/use-seller-orders";
import { useUpdateOrderStatus } from "@/features/orders/hooks/use-update-order-status";
import { ProtectedRoute } from "@/components/shared/protected-route";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { OrderStatusBadge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState, ErrorState } from "@/components/ui/states";
import { confirmDelete } from "@/lib/alerts";
import { formatMoney } from "@/lib/format";
import {
  nextStatuses,
  STATUS_ACTION_LABELS,
  type OrderStatus,
} from "@/features/orders/constants/order-status";

interface SellerOrderItem {
  product: { id: string; name?: string; brand?: string };
  quantity: number;
  price: number;
}
interface SellerOrder {
  id: string;
  status: OrderStatus;
  total: number;
  buyer: { username: string };
  items: SellerOrderItem[];
  shippingAddress?: string;
}

export default function SellerOrdersPage() {
  return (
    <ProtectedRoute>
      <PageContainer>
        <PageHeader
          title="Pedidos recibidos"
          description="Gestioná el estado de las órdenes de tus compradores"
          icon={<ClipboardDocumentListIcon />}
        />
        <div className="mt-8">
          <SellerOrdersContent />
        </div>
      </PageContainer>
    </ProtectedRoute>
  );
}

function SellerOrdersContent() {
  const { data, isLoading, isError, refetch } = useSellerOrders();
  const updateStatus = useUpdateOrderStatus();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <Skeleton className="h-5 w-40" />
            <Skeleton className="mt-4 h-4 w-2/3" />
          </Card>
        ))}
      </div>
    );
  }

  if (isError) return <ErrorState onRetry={() => refetch()} />;

  if (!data?.length) {
    return (
      <EmptyState
        icon={<ClipboardDocumentListIcon />}
        title="No tenés pedidos todavía"
        description="Cuando un comprador realice una orden con tus productos, aparecerá acá."
      />
    );
  }

  const handleUpdate = async (
    orderId: string,
    next: OrderStatus
  ) => {
    if (next === "cancelled") {
      const ok = await confirmDelete({
        title: "¿Cancelar esta orden?",
        message: "Esta acción no se puede deshacer.",
        confirmText: "Sí, cancelar orden",
        cancelText: "Volver",
      });
      if (!ok) return;
    }
    updateStatus.mutate({ orderId, status: next });
  };

  return (
    <div className="space-y-4">
      {(data as SellerOrder[]).map((order) => {
        const actions = nextStatuses(order.status);
        const isUpdating =
          updateStatus.isPending &&
          updateStatus.variables?.orderId === order.id;

        return (
          <Card key={order.id}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Avatar name={order.buyer.username} size="sm" />
                <div>
                  <p className="font-semibold text-text-primary">
                    {order.buyer.username}
                  </p>
                  <p className="text-xs text-text-muted">
                    Orden #{order.id.slice(-6)}
                  </p>
                </div>
              </div>
              <OrderStatusBadge status={order.status} />
            </div>

            <div className="mt-4 space-y-1.5">
              {order.items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between gap-4 text-sm text-text-secondary"
                >
                  <span className="truncate">
                    {item.quantity}×{" "}
                    {item.product.name
                      ? `${item.product.brand ?? ""} ${item.product.name}`.trim()
                      : `Producto ${item.product.id.slice(-6)}`}
                  </span>
                  <span className="shrink-0">
                    {formatMoney(item.price)}
                  </span>
                </div>
              ))}
            </div>

            {order.shippingAddress && (
              <div className="mt-4 flex items-start gap-2 rounded-lg bg-brand-soft/40 px-3 py-2 text-sm">
                <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <div>
                  <p className="text-xs font-medium text-brand">Enviar a</p>
                  <p className="text-text-primary">{order.shippingAddress}</p>
                </div>
              </div>
            )}

            <div className="mt-4 flex items-center justify-between border-t border-border-subtle pt-4">
              <span className="text-sm text-text-muted">Total</span>
              <span className="text-lg font-bold text-text-primary">
                {formatMoney(order.total)}
              </span>
            </div>

            {actions.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {actions.map((next) => (
                  <Button
                    key={next}
                    size="sm"
                    variant={next === "cancelled" ? "danger" : "primary"}
                    disabled={isUpdating}
                    onClick={() => handleUpdate(order.id, next)}
                  >
                    {STATUS_ACTION_LABELS[next]}
                  </Button>
                ))}
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}
