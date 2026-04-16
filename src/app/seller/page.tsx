import { ProtectedRoute } from "@/components/shared/protected-route";
import { SellerProducts } from "@/features/seller/components/seller-products";

export default function SellerPage() {
  return (
    <ProtectedRoute>
      <main className="mx-auto max-w-6xl p-6">
        <h1 className="mb-6 text-3xl font-bold">
          Panel seller
        </h1>

        <SellerProducts />
      </main>
    </ProtectedRoute>
  );
}