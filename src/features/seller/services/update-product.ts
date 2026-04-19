import { api } from "@/lib/api/client";
import { CreateProductSchema } from "../schemas/create-product.schema";

export async function updateProductService(
  id: string,
  payload: CreateProductSchema
) {
  const response = await api.put(`/product/${id}`, payload);
  return response.data;
}