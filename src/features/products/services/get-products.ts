import { api } from "@/lib/api/client";
import {
  productResponseSchema,
  type ProductResponse,
} from "@/features/seller/schemas/create-product.schema";

export type SortOption = "recent" | "price-asc" | "price-desc" | "rate-desc";

export interface ProductQueryParams {
  search?: string;
  category?: string;
  sort?: SortOption;
  page?: number;
  limit?: number;
  /** Incluir productos inactivos (solo para moderación admin). */
  includeInactive?: boolean;
}

export interface PaginatedProducts {
  data: ProductResponse[];
  total: number;
  page: number;
  totalPages: number;
}

export async function getProductsService(
  params: ProductQueryParams = {}
): Promise<PaginatedProducts> {
  // Solo mandamos params con valor: evita `?search=` vacíos o `category=all`.
  const query: Record<string, string | number> = {};
  if (params.search) query.search = params.search;
  if (params.category) query.category = params.category;
  if (params.sort) query.sort = params.sort;
  if (params.page) query.page = params.page;
  if (params.limit) query.limit = params.limit;
  if (params.includeInactive) query.includeInactive = "true";

  const res = await api.get("/products", { params: query });

  const items: unknown[] = res.data.data;
  return {
    data: items.map((product) => productResponseSchema.parse(product)),
    total: res.data.total,
    page: res.data.page,
    totalPages: res.data.totalPages,
  };
}
