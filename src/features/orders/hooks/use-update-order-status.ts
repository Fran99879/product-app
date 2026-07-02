"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateOrderStatusService } from "../services/update-order-status";
import type { OrderStatus } from "../constants/order-status";
import { getErrorMessage } from "@/lib/utils/get-error-message";

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      orderId,
      status,
    }: {
      orderId: string;
      status: OrderStatus;
    }) => updateOrderStatusService(orderId, status),
    onSuccess: () => {
      toast.success("Estado actualizado");
      queryClient.invalidateQueries({ queryKey: ["seller-orders"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
