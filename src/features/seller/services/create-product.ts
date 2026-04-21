import { api } from "@/lib/api/client";
import { CreateProductSchema } from "../schemas/create-product.schema";

export async function createProductService(
  payload: CreateProductSchema
) {
  const response = await api.post("/products", payload);
  return response.data;
}