import { api } from "@/lib/api/client";
import { productResponseSchema } from "@/features/seller/schemas/create-product.schema";

export async function getProductByIdService(id: string) {
  const response = await api.get(`/products/${id}`);
  const parsed = productResponseSchema.parse(response.data);
  // Mantener compatibilidad con código que espera 'id'
  return parsed;
}