import { api } from "@/lib/api/client";

export async function getSellerOrdersService() {
  const response = await api.get("/orders/seller");
  return response.data;
}