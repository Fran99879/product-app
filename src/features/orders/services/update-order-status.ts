import { api } from "@/lib/api/client";
import type { OrderStatus } from "../constants/order-status";

/**
 * Cambia el estado de una orden. `cancelled` va al endpoint dedicado de cancelar
 * (repone stock si estaba pendiente); el resto usa el endpoint de status.
 * Solo seller/admin dueños de la orden (validado en el backend).
 */
export async function updateOrderStatusService(
  orderId: string,
  status: OrderStatus
) {
  const url =
    status === "cancelled"
      ? `/orders/${orderId}/cancel`
      : `/orders/${orderId}/status`;

  const response = await api.patch(
    url,
    status === "cancelled" ? undefined : { status }
  );
  return response.data;
}
