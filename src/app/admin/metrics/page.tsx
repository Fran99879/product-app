import { ChartBarIcon } from "@heroicons/react/24/outline";
import { ProtectedRoute } from "@/components/shared/protected-route";
import { MetricsDashboard } from "@/features/admin/components/metrics-dashboard";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/ui/page-header";

export const metadata = {
  title: "Métricas",
};

export default function AdminMetricsPage() {
  return (
    <ProtectedRoute>
      <PageContainer>
        <PageHeader
          title="Métricas de la API"
          description="Tráfico, errores y latencias por ruta (en memoria desde el último deploy)"
          icon={<ChartBarIcon />}
        />
        <div className="mt-8">
          <MetricsDashboard />
        </div>
      </PageContainer>
    </ProtectedRoute>
  );
}
