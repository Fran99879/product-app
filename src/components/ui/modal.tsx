"use client";

import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/cn";

/**
 * Modal accesible: cierra con Escape, click en backdrop y botón X.
 * Bloquea el scroll del body mientras está abierto.
 */
export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
}: {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg";
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  const sizes = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl" };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-[fade-in_0.2s_ease-out]"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative w-full rounded-2xl border border-border-subtle bg-elevated shadow-[var(--shadow-elevated)]",
          "animate-[slide-up_0.2s_ease-out]",
          sizes[size]
        )}
      >
        {(title || description) && (
          <div className="flex items-start justify-between gap-4 border-b border-border-subtle p-5">
            <div>
              {title && (
                <h2 className="text-lg font-semibold text-text-primary">
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-1 text-sm text-text-secondary">{description}</p>
              )}
            </div>
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="rounded-lg p-1 text-text-muted transition-colors hover:bg-hover hover:text-text-primary"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        )}
        <div className="p-5">{children}</div>
        {footer && (
          <div className="flex justify-end gap-2 border-t border-border-subtle p-5">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
