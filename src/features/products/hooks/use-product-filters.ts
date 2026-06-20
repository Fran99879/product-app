"use client";

import { useMemo, useState } from "react";
import type { Category } from "../constants/categories";

export type SortOption = "recent" | "price-asc" | "price-desc" | "rate-desc";
export type CategoryFilter = Category | "all";

export const PAGE_SIZE = 9;

interface FilterableProduct {
  name: string;
  brand: string;
  model?: string;
  description: string;
  category?: string;
  price: number;
  rate: number;
  createdAt?: string;
}

function matchesSearch(product: FilterableProduct, term: string): boolean {
  if (!term) return true;
  const haystack = [
    product.name,
    product.brand,
    product.model ?? "",
    product.description,
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(term);
}

/**
 * Búsqueda + filtros + sorting + paginación, todo client-side sobre la lista
 * que ya devuelve `GET /products`. Cuando el backend soporte query params
 * (F11.2 backend) esto se reemplaza por params en `getProductsService`.
 */
export function useProductFilters<T extends FilterableProduct>(products: T[]) {
  const [search, setSearchRaw] = useState("");
  const [category, setCategoryRaw] = useState<CategoryFilter>("all");
  const [sort, setSortRaw] = useState<SortOption>("recent");
  const [page, setPage] = useState(1);

  // Al cambiar cualquier filtro, volvemos a la página 1.
  const setSearch = (value: string) => {
    setSearchRaw(value);
    setPage(1);
  };
  const setCategory = (value: CategoryFilter) => {
    setCategoryRaw(value);
    setPage(1);
  };
  const setSort = (value: SortOption) => {
    setSortRaw(value);
    setPage(1);
  };

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();

    const result = products.filter(
      (p) =>
        matchesSearch(p, term) &&
        (category === "all" || p.category === category)
    );

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rate-desc":
        result.sort((a, b) => b.rate - a.rate);
        break;
      case "recent":
        result.sort((a, b) =>
          (b.createdAt ?? "").localeCompare(a.createdAt ?? "")
        );
        break;
    }

    return result;
  }, [products, search, category, sort]);

  const totalResults = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const hasActiveFilters = search.trim() !== "" || category !== "all";

  return {
    search,
    setSearch,
    category,
    setCategory,
    sort,
    setSort,
    page: currentPage,
    setPage,
    totalPages,
    totalResults,
    paginated,
    hasActiveFilters,
  };
}
