"use client";

import { Search, X } from "lucide-react";
import { CATEGORIES, CATEGORY_LABELS } from "../constants/categories";
import type {
  CategoryFilter,
  SortOption,
} from "../hooks/use-product-filters";

const SORT_LABELS: Record<SortOption, string> = {
  recent: "Más recientes",
  "price-asc": "Precio: menor a mayor",
  "price-desc": "Precio: mayor a menor",
  "rate-desc": "Mejor valorados",
};

interface ProductFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: CategoryFilter;
  onCategoryChange: (value: CategoryFilter) => void;
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
  totalResults: number;
}

export function ProductFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  sort,
  onSortChange,
  totalResults,
}: ProductFiltersProps) {
  return (
    <div className="mb-6 space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        {/* Búsqueda */}
        <div className="relative flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por nombre, marca o modelo..."
            className="w-full rounded-xl border border-border bg-background py-2 pl-9 pr-9 text-sm outline-none focus:border-foreground/40"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Limpiar búsqueda"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-secondary"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Categoría */}
        <select
          value={category}
          onChange={(e) =>
            onCategoryChange(e.target.value as CategoryFilter)
          }
          className="rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-foreground/40"
        >
          <option value="all">Todas las categorías</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {CATEGORY_LABELS[c]}
            </option>
          ))}
        </select>

        {/* Orden */}
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-foreground/40"
        >
          {(Object.keys(SORT_LABELS) as SortOption[]).map((s) => (
            <option key={s} value={s}>
              {SORT_LABELS[s]}
            </option>
          ))}
        </select>
      </div>

      <p className="text-xs text-muted-foreground">
        {totalResults}{" "}
        {totalResults === 1 ? "producto" : "productos"}
      </p>
    </div>
  );
}
