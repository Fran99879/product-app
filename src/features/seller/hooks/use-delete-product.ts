"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductService } from "../services/delete-product";

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProductService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seller-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}