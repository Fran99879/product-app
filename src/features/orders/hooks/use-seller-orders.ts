"use client";

import { useQuery } from "@tanstack/react-query";
import { getSellerOrdersService } from "../services/get-seller-orders";
import { useAuthStore } from "@/store/auth-store";

export function useSellerOrders() {
  const { token, isHydrated } = useAuthStore();

  return useQuery({
    queryKey: ["seller-orders"],
    queryFn: getSellerOrdersService,
    enabled: isHydrated && !!token,
  });
}