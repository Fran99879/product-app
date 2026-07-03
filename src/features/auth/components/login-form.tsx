"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { loginSchema, type LoginSchema } from "../schemas/login.schema";
import { useLogin } from "../hooks/use-login";
import { PasswordInput } from "./password-input";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <Input
        {...register("email")}
        type="email"
        label="Email"
        placeholder="tu@email.com"
        autoComplete="email"
        error={errors.email?.message}
      />

      <div>
        <label className="mb-1.5 block text-sm font-medium text-text-secondary">
          Contraseña
        </label>
        <PasswordInput
          {...register("password")}
          placeholder="••••••••"
          autoComplete="current-password"
          invalid={!!errors.password}
        />
        {errors.password && (
          <p className="mt-1 text-xs text-error">{errors.password.message}</p>
        )}
        <Link
          href="/forgot-password"
          className="mt-2 inline-block text-sm text-brand hover:underline"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-error/30 bg-error-soft px-3 py-2 text-sm text-error">
          <ExclamationCircleIcon className="h-5 w-5 shrink-0" />
          Credenciales inválidas
        </div>
      )}

      <Button type="submit" fullWidth loading={isPending}>
        {isPending ? "Ingresando…" : "Iniciar sesión"}
      </Button>
    </form>
  );
}
