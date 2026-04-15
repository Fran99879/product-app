import { ProtectedRoute } from "@/components/shared/protected-route";
import { OrdersList } from "@/features/orders/components/orders-list";

export default function OrdersPage() {
  return (
    <ProtectedRoute>
      <main className="mx-auto max-w-4xl p-6">
        <h1 className="mb-6 text-3xl font-bold">
          Mis órdenes
        </h1>

        <OrdersList />
      </main>
    </ProtectedRoute>
  );
}