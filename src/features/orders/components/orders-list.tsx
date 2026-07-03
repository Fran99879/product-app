"use client";

import Link from "next/link";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { useOrders } from "../hooks/use-orders";
import { OrderStatusBadge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState, ErrorState } from "@/components/ui/states";
import { PayOrderButton } from "@/features/payments/components/pay-order-button";
import { formatMoney } from "@/lib/format";

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
  const { data, isLoading, isError, refetch } = useOrders();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <Skeleton className="h-5 w-32" />
            <Skeleton className="mt-4 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-2/3" />
          </Card>
        ))}
      </div>
    );
  }

  if (isError) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  if (!data?.length) {
    return (
      <EmptyState
        icon={<ClipboardDocumentListIcon />}
        title="No tenés pedidos todavía"
        description="Explorá productos y realizá tu primera compra."
        action={
          <Link href="/">
            <Button>Explorar productos</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      {data.map((order: Order) => (
        <Card key={order.id}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-semibold text-text-primary">
                Orden #{order.id.slice(-6)}
              </h2>
              <p className="mt-0.5 text-xs text-text-muted">
                {new Date(order.createdAt).toLocaleDateString("es-AR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <OrderStatusBadge status={order.status} />
          </div>

          <div className="mt-4 space-y-2">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between gap-4 text-sm text-text-secondary"
              >
                <span className="truncate">
                  {item.product.name
                    ? `${item.product.brand ?? ""} ${item.product.name}`.trim()
                    : `Producto ${item.product.id.slice(-6)}`}
                </span>
                <span className="shrink-0">
                  {item.quantity} × {formatMoney(item.price)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border-subtle pt-4">
            <div>
              <span className="text-sm text-text-muted">Total</span>
              <span className="ml-2 text-lg font-bold text-text-primary">
                {formatMoney(order.total)}
              </span>
            </div>
            {order.status === "pending" && <PayOrderButton orderId={order.id} />}
          </div>
        </Card>
      ))}
    </div>
  );
}
