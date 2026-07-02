import { env } from "@/lib/env";
import {
  productResponseSchema,
  type ProductResponse,
} from "@/features/seller/schemas/create-product.schema";

/**
 * Fetch server-side de un producto por id (para `generateMetadata`, JSON-LD, etc.).
 * Usa `fetch` nativo en vez del cliente axios: ese depende del store de auth del
 * browser y de sus interceptores. `GET /products/:id` es público. Devuelve `null`
 * si no existe o la respuesta no valida.
 */
export async function getProductByIdServer(
  id: string
): Promise<ProductResponse | null> {
  try {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/products/${id}`, {
      // Cache corto: el SEO no necesita ser tiempo real, y evita golpear la API
      // en cada crawl. Ajustable.
      next: { revalidate: 300 },
    });

    if (!res.ok) return null;

    const parsed = productResponseSchema.safeParse(await res.json());
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}
