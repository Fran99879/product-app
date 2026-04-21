import { api } from "@/lib/api/client";

export async function deleteProductService(id: string) {
  const response = await api.delete(`/products/${id}`);
  return response.data;
}