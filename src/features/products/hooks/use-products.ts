"use client";

import { useQuery } from "@tanstack/react-query";
import { getProductsService } from "../services/get-products";
import { getProductByIdService } from "../services/get-product-by-id";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProductsService,
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductByIdService(id),
    enabled: !!id,
  });
}