"use client";

import { useProducts } from "../hooks/use-products";
import { useProductFilters } from "../hooks/use-product-filters";
import { ProductFilters } from "./product-filters";
import { ProductsGrid } from "./products-grid";
import { ProductPagination } from "./product-pagination";

export function ProductCatalog() {
  const { data, isLoading } = useProducts();
  const products = data ?? [];

  const {
    search,
    setSearch,
    category,
    setCategory,
    sort,
    setSort,
    page,
    setPage,
    totalPages,
    totalResults,
    paginated,
    hasActiveFilters,
  } = useProductFilters(products);

  return (
    <div>
      {!isLoading && products.length > 0 && (
        <ProductFilters
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
          sort={sort}
          onSortChange={setSort}
          totalResults={totalResults}
        />
      )}

      <ProductsGrid
        products={paginated}
        isLoading={isLoading}
        emptyTitle={
          hasActiveFilters
            ? "Sin resultados"
            : "No hay productos"
        }
        emptyHint={
          hasActiveFilters
            ? "Probá con otra búsqueda o filtro"
            : "Probá creando uno nuevo"
        }
      />

      <ProductPagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
