import { api } from "@/lib/api/client";

export async function getProductsService() {
  const response = await api.get("/products");
  return response.data;
}