"use client";

import Link from "next/link";
import { useSellerOrders } from "@/features/orders/hooks/use-seller-orders";
import { useMyProducts } from "../hooks/use-my-products";
import { OrderStatusBadge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
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

function StatCard({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <div className="rounded-2xl border p-4 shadow-sm">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function SellerDashboard() {
  const { data: orders, isLoading: ordersLoading } = useSellerOrders();
  const { data: products, isLoading: productsLoading } = useMyProducts();

  if (ordersLoading || productsLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
        <Skeleton className="h-64 w-full" />
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
          hint="Órdenes pagadas, enviadas o entregadas"
        />
        <StatCard label="Órdenes" value={sellerOrders.length} hint={`${soldOrders.length} concretadas`} />
        <StatCard label="Productos vendidos" value={unitsSold} hint="Unidades" />
        <StatCard
          label="Productos activos"
          value={activeProducts}
          hint={`de ${(products ?? []).length} publicados`}
        />
      </div>

      <div className="rounded-2xl border p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-medium">Últimas órdenes</h2>
          <Link href="/seller/orders" className="text-sm text-blue-600 hover:underline">
            Ver todas →
          </Link>
        </div>

        {latest.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Todavía no tenés órdenes. Cuando alguien compre tus productos van a aparecer acá.
          </p>
        ) : (
          <ul className="divide-y">
            {latest.map((order) => (
              <li key={order.id} className="flex items-center gap-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {order.items
                      .map((i) => `${i.quantity}× ${i.product.name ?? i.product.id.slice(-6)}`)
                      .join(", ")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {order.buyer?.username} · {new Date(order.createdAt).toLocaleDateString("es-AR")}
                  </p>
                </div>
                <span className="shrink-0 text-sm font-semibold">{formatMoney(order.total)}</span>
                <OrderStatusBadge status={order.status} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
