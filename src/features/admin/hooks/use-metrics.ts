"use client";

import { useQuery } from "@tanstack/react-query";
import { getMetricsService } from "../services/get-metrics";
import { useAuthStore } from "@/store/auth-store";

export function useMetrics() {
  const { token, isHydrated } = useAuthStore();
  return useQuery({
    queryKey: ["admin-metrics"],
    queryFn: getMetricsService,
    enabled: isHydrated && !!token,
    refetchInterval: 30_000,
  });
}
