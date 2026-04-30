"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProductService } from "../services/update-product";
import { toast } from "sonner";
import { CreateProductSchema } from "../schemas/create-product.schema";

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: CreateProductSchema;
    }) => updateProductService(id, data),
    onSuccess: (_, variables) => {
      const { id } = variables;

      toast.success("Producto actualizado");
      queryClient.invalidateQueries({ queryKey: ["seller-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", id] });
    },
  });
}