"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyProductsService } from "../services/get-my-products";

export function useMyProducts() {
  return useQuery({
    queryKey: ["seller-products"],
    queryFn: getMyProductsService,
  });
}