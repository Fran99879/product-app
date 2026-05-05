// app/seller/orders/page.tsx
"use client";

import { useSellerOrders } from "@/features/orders/hooks/use-seller-orders";
import { OrderStatusBadge } from "@/components/ui/badge";

export default function SellerOrdersPage() {
    const { data, isLoading } = useSellerOrders();

    if (isLoading) return <p>Cargando órdenes...</p>;

    if (!data?.length) return <p>No tenés órdenes todavía</p>;

    return (
        <div className="space-y-4">
            {data.map((order: any) => (
                <div key={order.id} className="border p-4 rounded-xl">
                    <p className="font-semibold">
                        Comprador: {order.buyer.username}
                    </p>

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
                </div>
            ))}
        </div>
    );
}