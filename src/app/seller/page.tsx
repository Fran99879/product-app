import Link from "next/link";
import { ProtectedRoute } from "@/components/shared/protected-route";
import { SellerProducts } from "@/features/seller/components/seller-products";

export default function SellerPage() {
  return (
    <ProtectedRoute>
      <main className="mx-auto max-w-6xl p-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-bold">Panel seller</h1>
          <div className="flex gap-2">
            <Link
              href="/seller/dashboard"
              className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-900"
            >
              📊 Dashboard
            </Link>
            <Link
              href="/seller/orders"
              className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-900"
            >
              📦 Órdenes
            </Link>
          </div>
        </div>

        <SellerProducts />
      </main>
    </ProtectedRoute>
  );
}