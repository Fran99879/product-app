"use client";

import { useState, type ComponentProps } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/cn";

interface PasswordInputProps extends ComponentProps<"input"> {
  invalid?: boolean;
}

export function PasswordInput({ invalid, className, ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        {...props}
        type={visible ? "text" : "password"}
        aria-invalid={invalid || undefined}
        className={cn(
          "w-full rounded-xl border bg-surface px-3.5 py-2.5 pr-11 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
          invalid ? "border-error" : "border-border-strong",
          className
        )}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
        className="absolute inset-y-0 right-0 flex items-center px-3 text-text-muted transition-colors hover:text-text-primary"
      >
        {visible ? (
          <EyeSlashIcon className="h-5 w-5" />
        ) : (
          <EyeIcon className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}
