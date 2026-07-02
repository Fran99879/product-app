import { ProtectedRoute } from "@/components/shared/protected-route";
import { SellerDashboard } from "@/features/seller/components/seller-dashboard";

export const metadata = {
  title: "Dashboard seller",
};

export default function SellerDashboardPage() {
  return (
    <ProtectedRoute>
      <main className="mx-auto max-w-4xl p-6">
        <h1 className="mb-1 text-2xl font-semibold">Dashboard</h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Resumen de tus ventas y productos.
        </p>
        <SellerDashboard />
      </main>
    </ProtectedRoute>
  );
}
