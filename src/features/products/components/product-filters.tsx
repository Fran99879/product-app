"use client";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
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

const selectClass =
  "cursor-pointer rounded-xl border border-border-strong bg-surface px-3 py-2.5 text-sm text-text-primary outline-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

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
          <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por nombre, marca o modelo…"
            aria-label="Buscar productos"
            className="w-full rounded-xl border border-border-strong bg-surface py-2.5 pl-10 pr-9 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Limpiar búsqueda"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-text-muted transition-colors hover:bg-hover hover:text-text-primary"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Categoría */}
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value as CategoryFilter)}
          aria-label="Filtrar por categoría"
          className={selectClass}
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
          aria-label="Ordenar"
          className={selectClass}
        >
          {(Object.keys(SORT_LABELS) as SortOption[]).map((s) => (
            <option key={s} value={s}>
              {SORT_LABELS[s]}
            </option>
          ))}
        </select>
      </div>

      <p className="text-xs text-text-muted">
        {totalResults} {totalResults === 1 ? "producto" : "productos"}
      </p>
    </div>
  );
}
