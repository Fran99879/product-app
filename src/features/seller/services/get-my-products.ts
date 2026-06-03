import { api } from "@/lib/api/client";
import { productResponseSchema } from "../schemas/create-product.schema";

export async function getMyProductsService() {
  const response = await api.get("/products/my-products");
  return response.data.map((product: unknown) => {
    const parsed = productResponseSchema.parse(product);
    // Mantener compatibilidad con código que espera 'id'
    return parsed;
  });
}