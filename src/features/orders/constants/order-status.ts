export type OrderStatus =
  | "pending"
  | "paid"
  | "shipped"
  | "delivered"
  | "cancelled";

/**
 * Transiciones válidas por estado. Debe reflejar el backend
 * (`product-api/src/types/order.ts` → ORDER_STATUS_TRANSITIONS). El backend
 * sigue siendo la fuente de verdad; esto solo decide qué botones mostrar.
 */
export const ORDER_STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  pending: ["paid", "cancelled"],
  paid: ["shipped", "cancelled"],
  shipped: ["delivered"],
  delivered: [],
  cancelled: [],
};

/** Texto del botón para pasar a cada estado (verbo de acción). */
export const STATUS_ACTION_LABELS: Record<OrderStatus, string> = {
  pending: "Marcar como pendiente",
  paid: "Marcar como pagado",
  shipped: "Marcar como enviado",
  delivered: "Marcar como entregado",
  cancelled: "Cancelar",
};

/** Los estados "cancelled"/"delivered" son finales: no ofrecen acciones. */
export function nextStatuses(current: OrderStatus): OrderStatus[] {
  return ORDER_STATUS_TRANSITIONS[current] ?? [];
}
