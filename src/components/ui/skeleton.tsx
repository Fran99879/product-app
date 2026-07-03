import { cn } from "@/lib/cn";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-hover/70",
        className
      )}
    />
  );
}

/** Skeleton con forma de tarjeta de producto. */
export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border-subtle bg-elevated p-4">
      <Skeleton className="aspect-square w-full rounded-xl" />
      <Skeleton className="mt-4 h-4 w-3/4" />
      <Skeleton className="mt-2 h-4 w-1/2" />
      <Skeleton className="mt-4 h-6 w-1/3" />
    </div>
  );
}

/** Filas de skeleton para tablas. */
export function TableRowSkeleton({ cols = 4 }: { cols?: number }) {
  return (
    <div className="flex items-center gap-4 border-b border-border-subtle px-4 py-3">
      {Array.from({ length: cols }).map((_, i) => (
        <Skeleton key={i} className="h-4 flex-1" />
      ))}
    </div>
  );
}
