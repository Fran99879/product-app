"use client";

import { useMetrics } from "../hooks/use-metrics";
import { useProfile } from "@/features/auth/hooks/use-profile";
import { Skeleton } from "@/components/ui/skeleton";

function formatUptime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m ${seconds % 60}s`;
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border p-4 shadow-sm">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}

export function MetricsDashboard() {
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data, isLoading, error, refetch, isFetching } = useMetrics();

  if (profileLoading || isLoading) {
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

  // El backend igual devuelve 403; esto es solo para dar un mensaje claro.
  if (profile && profile.role !== "admin") {
    return (
      <p className="text-sm text-muted-foreground">
        Esta sección es solo para administradores.
      </p>
    );
  }

  if (error || !data) {
    return (
      <p className="text-sm text-red-500">
        No pudimos cargar las métricas. ¿Tenés permisos de admin?
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Requests totales" value={data.totalRequests} />
        <StatCard label="Errores 5xx" value={data.totalErrors5xx} />
        <StatCard label="Uptime" value={formatUptime(data.uptimeSeconds)} />
        <StatCard label="Rutas activas" value={data.routes.length} />
      </div>

      <div className="overflow-x-auto rounded-2xl border shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-muted-foreground">
              <th className="p-3 font-medium">Ruta</th>
              <th className="p-3 text-right font-medium">Requests</th>
              <th className="p-3 text-right font-medium">5xx</th>
              <th className="p-3 text-right font-medium">Prom (ms)</th>
              <th className="p-3 text-right font-medium">p95 (ms)</th>
              <th className="p-3 text-right font-medium">Máx (ms)</th>
            </tr>
          </thead>
          <tbody>
            {data.routes.map((r) => (
              <tr key={r.route} className="border-b last:border-0">
                <td className="p-3 font-mono text-xs">{r.route}</td>
                <td className="p-3 text-right">{r.count}</td>
                <td className={`p-3 text-right ${r.errors5xx > 0 ? "font-medium text-red-600" : ""}`}>
                  {r.errors5xx}
                </td>
                <td className="p-3 text-right">{r.avgMs}</td>
                <td className="p-3 text-right">{r.p95Ms}</td>
                <td className="p-3 text-right">{r.maxMs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="rounded-lg border px-4 py-2 text-sm font-medium disabled:opacity-50"
        >
          {isFetching ? "Actualizando..." : "Actualizar"}
        </button>
        <span className="text-xs text-muted-foreground">
          Se actualiza solo cada 30s. Datos desde {new Date(data.startedAt).toLocaleString("es-AR")}.
        </span>
      </div>
    </div>
  );
}
