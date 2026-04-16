import { api } from "@/lib/api/client";

interface CreateOrderPayload {
  items: {
    product: string;
    quantity: number;
  }[];
}

export async function createOrderService(
  payload: CreateOrderPayload
) {
  const response = await api.post("/orders", payload);
  return response.data;
}