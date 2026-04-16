"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrderService } from "../services/create-order";

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrderService,
    onSuccess: () => {
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
  });
}