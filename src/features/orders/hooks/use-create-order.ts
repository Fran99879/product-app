"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrderService } from "../services/create-order";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils/get-error-message";

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrderService,
    onSuccess: () => {
      toast.success("Orden creada");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });

      queryClient.invalidateQueries({
        queryKey: ["product"],
      });
    },
    onError: (error) => {
    toast.error(getErrorMessage(error));
  },
  });
}