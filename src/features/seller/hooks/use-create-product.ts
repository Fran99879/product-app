"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProductService } from "../services/create-product";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils/get-error-message";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
  mutationFn: createProductService,
  onSuccess: () => {
    toast.success("Producto creado");

    queryClient.invalidateQueries({ queryKey: ["seller-products"] });
    queryClient.invalidateQueries({ queryKey: ["products"] });
  },
  onError: (error) => {
    toast.error(getErrorMessage(error) || "Error al crear producto");
  },
});
}
