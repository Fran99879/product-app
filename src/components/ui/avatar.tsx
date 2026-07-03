import { cn } from "@/lib/cn";

/** Avatar con iniciales derivadas del nombre. */
export function Avatar({
  name,
  size = "md",
  className,
}: {
  name?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const initials = (name ?? "?").trim().slice(0, 2).toUpperCase();
  const sizes = {
    sm: "h-7 w-7 text-xs",
    md: "h-9 w-9 text-sm",
    lg: "h-12 w-12 text-base",
  };
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-brand-soft font-semibold text-brand",
        sizes[size],
        className
      )}
    >
      {initials}
    </span>
  );
}
