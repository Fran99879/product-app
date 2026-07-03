import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Contenedor responsive estándar para el área de contenido. */
export function PageContainer({
  children,
  className,
  size = "default",
  id,
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "wide" | "narrow";
  id?: string;
}) {
  const widths = {
    narrow: "max-w-2xl",
    default: "max-w-6xl",
    wide: "max-w-7xl",
  };
  return (
    <div
      id={id}
      className={cn(
        "mx-auto w-full px-4 py-8 sm:px-6 lg:px-8",
        widths[size],
        className
      )}
    >
      {children}
    </div>
  );
}
