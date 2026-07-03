"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  resetPasswordSchema,
  type ResetPasswordSchema,
} from "../schemas/reset-password.schema";
import { useResetPassword } from "../hooks/use-reset-password";
import { PasswordInput } from "./password-input";
import { Button } from "@/components/ui/button";

export function ResetPasswordForm({ token }: { token: string }) {
  const { mutate, isPending } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  });

  // Sin token en la URL no tiene sentido el form.
  if (!token) {
    return (
      <div className="space-y-4 text-center">
        <p className="rounded-lg border border-error/30 bg-error-soft px-3 py-2 text-sm text-error">
          Enlace inválido: falta el token de restablecimiento.
        </p>
        <Link
          href="/forgot-password"
          className="inline-block text-sm font-medium text-brand hover:underline"
        >
          Pedir un enlace nuevo
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit((data) =>
        mutate({ token, password: data.password })
      )}
      className="space-y-4"
      noValidate
    >
      <div>
        <label className="mb-1.5 block text-sm font-medium text-text-secondary">
          Nueva contraseña
        </label>
        <PasswordInput
          {...register("password")}
          placeholder="••••••••"
          autoComplete="new-password"
          invalid={!!errors.password}
        />
        {errors.password && (
          <p className="mt-1 text-xs text-error">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-text-secondary">
          Repetir contraseña
        </label>
        <PasswordInput
          {...register("confirmPassword")}
          placeholder="••••••••"
          autoComplete="new-password"
          invalid={!!errors.confirmPassword}
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-xs text-error">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button type="submit" fullWidth loading={isPending}>
        {isPending ? "Guardando…" : "Cambiar contraseña"}
      </Button>
    </form>
  );
}
