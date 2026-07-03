import { ChartBarIcon } from "@heroicons/react/24/outline";
import { ProtectedRoute } from "@/components/shared/protected-route";
import { SellerDashboard } from "@/features/seller/components/seller-dashboard";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/ui/page-header";

export const metadata = {
  title: "Dashboard seller",
};

export default function SellerDashboardPage() {
  return (
    <ProtectedRoute>
      <PageContainer>
        <PageHeader
          title="Dashboard"
          description="Resumen de tus ventas y productos"
          icon={<ChartBarIcon />}
        />
        <div className="mt-8">
          <SellerDashboard />
        </div>
      </PageContainer>
    </ProtectedRoute>
  );
}
