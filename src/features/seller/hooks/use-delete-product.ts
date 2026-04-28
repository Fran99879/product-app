"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductService } from "../services/delete-product";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils/get-error-message";

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProductService,
    onSuccess: () => {
      toast.success("Producto eliminado");
      queryClient.invalidateQueries({ queryKey: ["seller-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
    toast.error(getErrorMessage(error));
    }
  });
}