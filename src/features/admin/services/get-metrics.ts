import { api } from "@/lib/api/client";

export interface RouteMetric {
  route: string;
  count: number;
  errors5xx: number;
  avgMs: number;
  p95Ms: number;
  maxMs: number;
}

export interface MetricsSnapshot {
  startedAt: string;
  uptimeSeconds: number;
  totalRequests: number;
  totalErrors5xx: number;
  routes: RouteMetric[];
}

export async function getMetricsService(): Promise<MetricsSnapshot> {
  const response = await api.get("/health/metrics");
  return response.data;
}
