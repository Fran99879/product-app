"use client";

import { useOrders } from "../hooks/use-orders";
import { Spinner } from "@/components/ui/spinner";
import { OrderStatusBadge } from "@/components/ui/badge";

interface OrderItem {
  product: {
    id: string;
    name?: string;
    brand?: string;
    owner: string;
  };
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  total: number;
  status: OrderStatus;
  createdAt: string;
  items: OrderItem[];
}

export type OrderStatus =
  | "pending"
  | "paid"
  | "shipped"
  | "delivered"
  | "cancelled";

export function OrdersList() {
  const { data, isLoading } = useOrders();

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
      No hay órdenes
    </div>
  );
}

  return (
    <div className="space-y-6">
      {data?.map((order: Order) => (
        <div
          key={order.id}
          className="rounded-2xl border p-6 shadow-sm"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">
              Orden #{order.id.slice(-6)}
            </h2>

            <OrderStatusBadge status={order.status} />
          </div>

          <div className="space-y-2">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between text-sm"
              >
                <span>
                  {item.product.name
                    ? `${item.product.brand ?? ""} ${item.product.name}`.trim()
                    : `Producto ${item.product.id.slice(-6)}`}
                </span>

                <span>
                  {item.quantity} × ${item.price.toLocaleString("es-AR")}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t pt-4">
            <p className="font-bold">Total: ${order.total.toLocaleString("es-AR")}</p>
            <p className="text-sm text-gray-500">
              {new Date(order.createdAt).toLocaleDateString("es-AR")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}