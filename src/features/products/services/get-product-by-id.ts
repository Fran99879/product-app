import { api } from "@/lib/api/client";

export async function getProductByIdService(id: string) {
  const response = await api.get(`/products/${id}`);
  return response.data;
}