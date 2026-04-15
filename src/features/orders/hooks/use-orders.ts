"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrdersService } from "../services/get-orders";

export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getOrdersService,
  });
}