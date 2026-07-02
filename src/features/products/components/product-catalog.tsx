"use client";

import { useProducts } from "../hooks/use-products";
import { useProductFilters } from "../hooks/use-product-filters";
import { ProductFilters } from "./product-filters";
import { ProductsGrid } from "./products-grid";
import { ProductPagination } from "./product-pagination";

export function ProductCatalog() {
  const {
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
  } = useProductFilters();

  const { data, isLoading } = useProducts(queryParams);

  const products = data?.data ?? [];
  const totalResults = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 1;

  // Mostrar los filtros cuando hay productos o cuando hay un filtro activo
  // (aunque no haya resultados), para que el usuario pueda limpiarlo.
  const showFilters = hasActiveFilters || products.length > 0;

  return (
    <div>
      {!isLoading && showFilters && (
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
        products={products}
        isLoading={isLoading}
        emptyTitle={hasActiveFilters ? "Sin resultados" : "No hay productos"}
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
