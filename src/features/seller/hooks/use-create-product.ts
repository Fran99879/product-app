"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProductService } from "../services/create-product";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProductService,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["seller-products"],
      });

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
}