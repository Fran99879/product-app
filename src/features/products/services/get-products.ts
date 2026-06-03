import { api } from "@/lib/api/client";
import { productResponseSchema } from "@/features/seller/schemas/create-product.schema";

export async function getProductsService() {
  const res = await api.get("/products");

  return res.data.map((product: unknown) => {
    const parsed = productResponseSchema.parse(product);
    // Mantener compatibilidad con código que espera 'id'
   return parsed;
  });
}