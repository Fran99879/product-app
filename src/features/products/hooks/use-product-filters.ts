"use client";

import { useEffect, useMemo, useState } from "react";
import type { Category } from "../constants/categories";
import type {
  ProductQueryParams,
  SortOption,
} from "../services/get-products";

export type { SortOption };
export type CategoryFilter = Category | "all";

export const PAGE_SIZE = 9;

/**
 * Estado de UI de búsqueda/filtros/sorting/paginación.
 *
 * A diferencia de la versión anterior (que filtraba client-side sobre toda la
 * lista), acá solo se maneja el estado y se construye el objeto `queryParams`
 * que consume `useProducts` para pedirle al backend la página ya filtrada
 * (F11.2 · 2.3). La búsqueda se debounce-a para no disparar un request por tecla.
 */
export function useProductFilters() {
  const [search, setSearchRaw] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategoryRaw] = useState<CategoryFilter>("all");
  const [sort, setSortRaw] = useState<SortOption>("recent");
  const [page, setPage] = useState(1);

  // Debounce del texto de búsqueda (300ms).
  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(id);
  }, [search]);

  // Al cambiar categoría u orden volvemos a la página 1.
  const setSearch = (value: string) => setSearchRaw(value);
  const setCategory = (value: CategoryFilter) => {
    setCategoryRaw(value);
    setPage(1);
  };
  const setSort = (value: SortOption) => {
    setSortRaw(value);
    setPage(1);
  };

  const queryParams = useMemo<ProductQueryParams>(
    () => ({
      search: debouncedSearch || undefined,
      category: category === "all" ? undefined : category,
      sort,
      page,
      limit: PAGE_SIZE,
    }),
    [debouncedSearch, category, sort, page]
  );

  const hasActiveFilters = debouncedSearch !== "" || category !== "all";

  return {
    search,
    setSearch,
    category,
    setCategory,
    sort,
    setSort,
    page,
    setPage,
    queryParams,
    hasActiveFilters,
  };
}
