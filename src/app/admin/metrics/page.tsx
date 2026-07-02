import { ProtectedRoute } from "@/components/shared/protected-route";
import { MetricsDashboard } from "@/features/admin/components/metrics-dashboard";

export const metadata = {
  title: "Métricas",
};

export default function AdminMetricsPage() {
  return (
    <ProtectedRoute>
      <main className="mx-auto max-w-4xl p-6">
        <h1 className="mb-1 text-2xl font-semibold">Métricas de la API</h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Tráfico, errores y latencias por ruta (en memoria desde el último deploy).
        </p>
        <MetricsDashboard />
      </main>
    </ProtectedRoute>
  );
}
