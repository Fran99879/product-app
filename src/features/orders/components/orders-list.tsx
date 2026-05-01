"use client";

import { useOrders } from "../hooks/use-orders";
import { Spinner } from "@/components/ui/spinner";
import { OrderStatusBadge } from "@/components/ui/badge";

interface OrderItem {
  product: {
    id: string;
    owner: string;
  };
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  total: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

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
                  Producto: {item.product.id.slice(-6)}
                </span>

                <span>
                  {item.quantity} x ${item.price}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t pt-4">
            <p className="font-bold">Total: ${order.total}</p>
            <p className="text-sm text-gray-500">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}