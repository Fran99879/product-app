"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function ProductPagination({
  page,
  totalPages,
  onPageChange,
}: ProductPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav
      className="mt-8 flex items-center justify-center gap-2"
      aria-label="Paginación de productos"
    >
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Página anterior"
        className="flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-sm disabled:opacity-40 enabled:hover:bg-secondary"
      >
        <ChevronLeft size={16} />
        Anterior
      </button>

      <span className="px-2 text-sm text-muted-foreground">
        Página {page} de {totalPages}
      </span>

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Página siguiente"
        className="flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-sm disabled:opacity-40 enabled:hover:bg-secondary"
      >
        Siguiente
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}
