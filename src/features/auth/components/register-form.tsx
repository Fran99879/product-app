"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterSchema,
} from "../schemas/register.schema";
import { useRegister } from "../hooks/use-register";

export function RegisterForm() {
  const { mutate, isPending, error } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterSchema) => {
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-2xl border p-6 shadow-sm"
    >
      <div>
        <label className="mb-1 block text-sm font-medium">
          Username
        </label>
        <input
          {...register("username")}
          className="w-full rounded-lg border px-3 py-2"
        />
        {errors.username && (
          <p className="text-sm text-red-500">
            {errors.username.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Email
        </label>
        <input
          {...register("email")}
          type="email"
          className="w-full rounded-lg border px-3 py-2"
        />
        {errors.email && (
          <p className="text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Contraseña
        </label>
        <input
          {...register("password")}
          type="password"
          className="w-full rounded-lg border px-3 py-2"
        />
        {errors.password && (
          <p className="text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-500">
          No se pudo crear la cuenta
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-black py-2 text-white"
      >
        {isPending ? "Creando cuenta..." : "Registrarme"}
      </button>
    </form>
  );
}