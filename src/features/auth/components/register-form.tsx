"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import {
  registerSchema,
  type RegisterSchema,
} from "../schemas/register.schema";
import { useRegister } from "../hooks/use-register";
import { PasswordInput } from "./password-input";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <Input
        {...register("username")}
        label="Nombre de usuario"
        placeholder="tu_usuario"
        autoComplete="username"
        error={errors.username?.message}
      />

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
          autoComplete="new-password"
          invalid={!!errors.password}
        />
        {errors.password && (
          <p className="mt-1 text-xs text-error">{errors.password.message}</p>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-error/30 bg-error-soft px-3 py-2 text-sm text-error">
          <ExclamationCircleIcon className="h-5 w-5 shrink-0" />
          No se pudo crear la cuenta
        </div>
      )}

      <Button type="submit" fullWidth loading={isPending}>
        {isPending ? "Creando cuenta…" : "Registrarme"}
      </Button>
    </form>
  );
}
