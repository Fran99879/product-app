"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  loginSchema,
  type LoginSchema,
} from "../schemas/login.schema";
import { useLogin } from "../hooks/use-login";
import { PasswordInput } from "./password-input";

export function LoginForm() {
  const { mutate, isPending, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchema) => {
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-2xl border p-6 shadow-sm"
    >
      <div>
        <label className="mb-1 block text-sm font-medium">
          Email
        </label>
        <input
          {...register("email")}
          type="email"
          className="w-full rounded-lg border px-3 py-2"
          placeholder="tu@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Contraseña
        </label>
        <PasswordInput
          {...register("password")}
          placeholder="******"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
        <Link
          href="/forgot-password"
          className="mt-1 inline-block text-sm text-blue-600 hover:underline"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </div>

      {error && (
        <p className="text-sm text-red-500">
          Credenciales inválidas
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {isPending ? "Ingresando..." : "Iniciar sesión"}
      </button>
    </form>
  );
}