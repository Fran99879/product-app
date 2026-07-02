"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  getProductsService,
  type ProductQueryParams,
} from "../services/get-products";
import { getProductByIdService } from "../services/get-product-by-id";

export function useProducts(params: ProductQueryParams = {}) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProductsService(params),
    // Mantener la página anterior visible mientras carga la nueva.
    placeholderData: keepPreviousData,
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductByIdService(id),
    enabled: !!id,
  });
}