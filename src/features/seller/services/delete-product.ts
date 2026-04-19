import { api } from "@/lib/api/client";

export async function deleteProductService(id: string) {
  const response = await api.delete(`/product/${id}`);
  return response.data;
}