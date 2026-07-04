import { api } from "@/lib/api/client";

interface CreateOrderPayload {
  items: {
    product: string;
    quantity: number;
  }[];
  /** Dirección/ubicación de entrega para coordinar el envío. */
  shippingAddress?: string;
}

export async function createOrderService(
  payload: CreateOrderPayload
) {
  const response = await api.post("/orders", payload);
  return response.data;
}