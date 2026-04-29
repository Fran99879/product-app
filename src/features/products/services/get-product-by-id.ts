import { api } from "@/lib/api/client";
import { productResponseSchema } from "@/features/seller/schemas/create-product.schema";

export async function getProductByIdService(id: string) {
  const response = await api.get(`/products/${id}`);
  return productResponseSchema.parse(response.data);
}