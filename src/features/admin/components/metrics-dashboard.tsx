"use client";

import {
  ArrowPathIcon,
  SignalIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  MapIcon,
} from "@heroicons/react/24/outline";
import { useMetrics } from "../hooks/use-metrics";
import { useProfile } from "@/features/auth/hooks/use-profile";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/ui/states";

function formatUptime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m ${seconds % 60}s`;
}

export function MetricsDashboard() {
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data, isLoading, error, refetch, isFetching } = useMetrics();

  if (profileLoading || isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-full rounded-2xl" />
          ))}
        </div>
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    );
  }

  // El backend igual devuelve 403; esto es solo para dar un mensaje claro.
  if (profile && profile.role !== "admin") {
    return (
      <p className="text-sm text-text-muted">
        Esta sección es solo para administradores.
      </p>
    );
  }

  if (error || !data) {
    return (
      <ErrorState
        title="No pudimos cargar las métricas"
        description="Verificá que tengas permisos de administrador."
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard
          label="Requests totales"
          value={data.totalRequests}
          icon={<SignalIcon />}
          tone="brand"
        />
        <StatCard
          label="Errores 5xx"
          value={data.totalErrors5xx}
          icon={<ExclamationTriangleIcon />}
          tone={data.totalErrors5xx > 0 ? "error" : "success"}
        />
        <StatCard
          label="Uptime"
          value={formatUptime(data.uptimeSeconds)}
          icon={<ClockIcon />}
          tone="info"
        />
        <StatCard
          label="Rutas activas"
          value={data.routes.length}
          icon={<MapIcon />}
          tone="warning"
        />
      </div>

      <Card padded={false} className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-subtle text-left text-xs uppercase tracking-wide text-text-muted">
                <th className="px-4 py-3 font-medium">Ruta</th>
                <th className="px-4 py-3 text-right font-medium">Requests</th>
                <th className="px-4 py-3 text-right font-medium">5xx</th>
                <th className="px-4 py-3 text-right font-medium">Prom (ms)</th>
                <th className="px-4 py-3 text-right font-medium">p95 (ms)</th>
                <th className="px-4 py-3 text-right font-medium">Máx (ms)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {data.routes.map((r) => (
                <tr key={r.route} className="transition-colors hover:bg-hover/50">
                  <td className="px-4 py-3 font-mono text-xs text-text-secondary">
                    {r.route}
                  </td>
                  <td className="px-4 py-3 text-right text-text-primary">
                    {r.count}
                  </td>
                  <td
                    className={`px-4 py-3 text-right ${
                      r.errors5xx > 0
                        ? "font-medium text-error"
                        : "text-text-secondary"
                    }`}
                  >
                    {r.errors5xx}
                  </td>
                  <td className="px-4 py-3 text-right text-text-secondary">
                    {r.avgMs}
                  </td>
                  <td className="px-4 py-3 text-right text-text-secondary">
                    {r.p95Ms}
                  </td>
                  <td className="px-4 py-3 text-right text-text-secondary">
                    {r.maxMs}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => refetch()}
          loading={isFetching}
          leftIcon={<ArrowPathIcon className="h-4 w-4" />}
        >
          {isFetching ? "Actualizando..." : "Actualizar"}
        </Button>
        <span className="text-xs text-text-muted">
          Se actualiza solo cada 30s. Datos desde{" "}
          {new Date(data.startedAt).toLocaleString("es-AR")}.
        </span>
      </div>
    </div>
  );
}
