// app/seller/orders/page.tsx
"use client";

import { useSellerOrders } from "@/features/orders/hooks/use-seller-orders";
import { useUpdateOrderStatus } from "@/features/orders/hooks/use-update-order-status";
import { OrderStatusBadge } from "@/components/ui/badge";
import {
  nextStatuses,
  STATUS_ACTION_LABELS,
  type OrderStatus,
} from "@/features/orders/constants/order-status";

export default function SellerOrdersPage() {
  const { data, isLoading } = useSellerOrders();
  const updateStatus = useUpdateOrderStatus();

  if (isLoading) return <p>Cargando órdenes...</p>;

  if (!data?.length) return <p>No tenés órdenes todavía</p>;

  return (
    <div className="space-y-4">
      {data.map((order: any) => {
        const actions = nextStatuses(order.status as OrderStatus);
        const isUpdating =
          updateStatus.isPending &&
          updateStatus.variables?.orderId === order.id;

        return (
          <div key={order.id} className="border p-4 rounded-xl">
            <p className="font-semibold">Comprador: {order.buyer.username}</p>

            <p>Total: ${order.total}</p>

            <p>
              Estado: <OrderStatusBadge status={order.status} />
            </p>

            <div className="mt-2">
              {order.items.map((item: any) => (
                <div key={item.product.id}>
                  Producto ID: {item.product.id} | Cantidad: {item.quantity}
                </div>
              ))}
            </div>

            {actions.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {actions.map((next) => {
                  const isCancel = next === "cancelled";
                  return (
                    <button
                      key={next}
                      type="button"
                      disabled={isUpdating}
                      onClick={() =>
                        updateStatus.mutate({ orderId: order.id, status: next })
                      }
                      className={`rounded-md px-3 py-1.5 text-sm font-medium disabled:opacity-50 ${
                        isCancel
                          ? "bg-red-50 text-red-700 hover:bg-red-100"
                          : "bg-gray-900 text-white hover:bg-gray-800"
                      }`}
                    >
                      {STATUS_ACTION_LABELS[next]}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
