import { api } from "@/lib/api/client";

export async function getOrdersService() {
  const response = await api.get("/orders/my");
  return response.data;
}