import { api } from "@/lib/api/client";

export async function getMyProductsService() {
  const response = await api.get("/products/my-products");
  return response.data;
}