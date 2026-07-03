"use client";

import Link from "next/link";
import {
  BanknotesIcon,
  ShoppingBagIcon,
  CubeIcon,
  ArchiveBoxIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { useSellerOrders } from "@/features/orders/hooks/use-seller-orders";
import { useMyProducts } from "../hooks/use-my-products";
import { OrderStatusBadge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import type { OrderStatus } from "@/features/orders/constants/order-status";

interface SellerOrderItem {
  product: { id: string; name?: string; brand?: string };
  quantity: number;
  price: number;
}

interface SellerOrder {
  id: string;
  buyer: { username: string };
  items: SellerOrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
}

// Estados que cuentan como venta concretada (pending puede caerse, cancelled no vale).
const SOLD_STATUSES: OrderStatus[] = ["paid", "shipped", "delivered"];

function formatMoney(n: number) {
  return `$${n.toLocaleString("es-AR", { minimumFractionDigits: 2 })}`;
}

export function SellerDashboard() {
  const { data: orders, isLoading: ordersLoading } = useSellerOrders();
  const { data: products, isLoading: productsLoading } = useMyProducts();

  if (ordersLoading || productsLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-full rounded-2xl" />
          ))}
        </div>
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    );
  }

  const sellerOrders: SellerOrder[] = orders ?? [];
  const soldOrders = sellerOrders.filter((o) => SOLD_STATUSES.includes(o.status));

  const revenue = soldOrders.reduce((acc, o) => acc + o.total, 0);
  const unitsSold = soldOrders.reduce(
    (acc, o) => acc + o.items.reduce((a, i) => a + i.quantity, 0),
    0
  );
  const activeProducts = (products ?? []).filter(
    (p: { isActive: boolean; quantity: number }) => p.isActive && p.quantity > 0
  ).length;

  const latest = sellerOrders.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard
          label="Ventas totales"
          value={formatMoney(revenue)}
          hint="Pagadas, enviadas o entregadas"
          icon={<BanknotesIcon />}
          tone="success"
        />
        <StatCard
          label="Órdenes"
          value={sellerOrders.length}
          hint={`${soldOrders.length} concretadas`}
          icon={<ShoppingBagIcon />}
          tone="brand"
        />
        <StatCard
          label="Unidades vendidas"
          value={unitsSold}
          hint="Total de productos"
          icon={<CubeIcon />}
          tone="info"
        />
        <StatCard
          label="Productos activos"
          value={activeProducts}
          hint={`de ${(products ?? []).length} publicados`}
          icon={<ArchiveBoxIcon />}
          tone="warning"
        />
      </div>

      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text-primary">
            Últimas órdenes
          </h2>
          <Link
            href="/seller/orders"
            className="inline-flex items-center gap-1 text-sm text-brand hover:underline"
          >
            Ver todas
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        {latest.length === 0 ? (
          <p className="py-6 text-center text-sm text-text-muted">
            Todavía no tenés órdenes. Cuando alguien compre tus productos van a
            aparecer acá.
          </p>
        ) : (
          <ul className="divide-y divide-border-subtle">
            {latest.map((order) => (
              <li key={order.id} className="flex items-center gap-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-text-primary">
                    {order.items
                      .map(
                        (i) =>
                          `${i.quantity}× ${i.product.name ?? i.product.id.slice(-6)}`
                      )
                      .join(", ")}
                  </p>
                  <p className="text-xs text-text-muted">
                    {order.buyer?.username} ·{" "}
                    {new Date(order.createdAt).toLocaleDateString("es-AR")}
                  </p>
                </div>
                <span className="shrink-0 text-sm font-semibold text-text-primary">
                  {formatMoney(order.total)}
                </span>
                <OrderStatusBadge status={order.status} />
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
