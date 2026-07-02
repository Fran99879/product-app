"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  resetPasswordSchema,
  type ResetPasswordSchema,
} from "../schemas/reset-password.schema";
import { useResetPassword } from "../hooks/use-reset-password";

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
      <div className="space-y-4 rounded-2xl border p-6 shadow-sm">
        <p className="text-sm text-red-500">
          Enlace inválido: falta el token de restablecimiento.
        </p>
        <Link
          href="/forgot-password"
          className="text-sm text-blue-600 hover:underline"
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
      className="space-y-4 rounded-2xl border p-6 shadow-sm"
    >
      <div>
        <label className="mb-1 block text-sm font-medium">
          Nueva contraseña
        </label>
        <input
          {...register("password")}
          type="password"
          className="w-full rounded-lg border px-3 py-2"
          placeholder="******"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Repetir contraseña
        </label>
        <input
          {...register("confirmPassword")}
          type="password"
          className="w-full rounded-lg border px-3 py-2"
          placeholder="******"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {isPending ? "Guardando..." : "Cambiar contraseña"}
      </button>
    </form>
  );
}
