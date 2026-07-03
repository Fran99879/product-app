"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

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
      className="mt-8 flex items-center justify-center gap-3"
      aria-label="Paginación de productos"
    >
      <Button
        variant="secondary"
        size="sm"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Página anterior"
        leftIcon={<ChevronLeftIcon className="h-4 w-4" />}
      >
        Anterior
      </Button>

      <span className="text-sm text-text-muted">
        Página {page} de {totalPages}
      </span>

      <Button
        variant="secondary"
        size="sm"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Página siguiente"
        rightIcon={<ChevronRightIcon className="h-4 w-4" />}
      >
        Siguiente
      </Button>
    </nav>
  );
}
