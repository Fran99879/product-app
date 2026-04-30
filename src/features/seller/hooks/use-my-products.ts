"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyProductsService } from "../services/get-my-products";
import { useAuthStore } from "@/store/auth-store";

export function useMyProducts() {
  const { token, isHydrated } = useAuthStore();
  return useQuery({
    queryKey: ["seller-products"],
    queryFn: getMyProductsService,
    enabled: isHydrated && !!token,
  });
}