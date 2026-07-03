import { cn } from "@/lib/cn";

type Size = "sm" | "md" | "lg";

const SIZES: Record<Size, string> = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-9 w-9 border-[3px]",
};

export function Spinner({
  size = "md",
  className,
}: {
  size?: Size;
  className?: string;
}) {
  return (
    <span
      role="status"
      aria-label="Cargando"
      className={cn(
        "inline-block animate-spin rounded-full border-current border-b-transparent",
        SIZES[size],
        className
      )}
    />
  );
}
