"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  forgotPasswordSchema,
  type ForgotPasswordSchema,
} from "../schemas/forgot-password.schema";
import { useForgotPassword } from "../hooks/use-forgot-password";

export function ForgotPasswordForm() {
  const { mutate, isPending, isSuccess } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  // Estado genérico tras enviar: no revela si el email existe (anti-enumeración).
  if (isSuccess) {
    return (
      <div className="space-y-4 rounded-2xl border p-6 shadow-sm">
        <p className="text-sm">
          Si el email está registrado, te enviamos un enlace para restablecer tu
          contraseña. Revisá tu bandeja de entrada (y spam).
        </p>
        <Link href="/login" className="text-sm text-blue-600 hover:underline">
          Volver a iniciar sesión
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit((data) => mutate(data))}
      className="space-y-4 rounded-2xl border p-6 shadow-sm"
    >
      <p className="text-sm text-gray-500">
        Ingresá tu email y te enviaremos un enlace para restablecer la contraseña.
      </p>

      <div>
        <label className="mb-1 block text-sm font-medium">Email</label>
        <input
          {...register("email")}
          type="email"
          className="w-full rounded-lg border px-3 py-2"
          placeholder="tu@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {isPending ? "Enviando..." : "Enviar enlace"}
      </button>

      <Link
        href="/login"
        className="block text-center text-sm text-blue-600 hover:underline"
      >
        Volver a iniciar sesión
      </Link>
    </form>
  );
}
