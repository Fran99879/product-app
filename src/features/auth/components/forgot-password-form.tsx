"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import {
  forgotPasswordSchema,
  type ForgotPasswordSchema,
} from "../schemas/forgot-password.schema";
import { useForgotPassword } from "../hooks/use-forgot-password";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
      <div className="space-y-4 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-success-soft text-success">
          <EnvelopeIcon className="h-8 w-8" />
        </div>
        <p className="text-sm text-text-secondary">
          Si el email está registrado, te enviamos un enlace para restablecer tu
          contraseña. Revisá tu bandeja de entrada (y spam).
        </p>
        <Link
          href="/login"
          className="inline-block text-sm font-medium text-brand hover:underline"
        >
          Volver a iniciar sesión
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit((data) => mutate(data))}
      className="space-y-4"
      noValidate
    >
      <p className="text-sm text-text-secondary">
        Ingresá tu email y te enviaremos un enlace para restablecer la
        contraseña.
      </p>

      <Input
        {...register("email")}
        type="email"
        label="Email"
        placeholder="tu@email.com"
        autoComplete="email"
        error={errors.email?.message}
      />

      <Button type="submit" fullWidth loading={isPending}>
        {isPending ? "Enviando…" : "Enviar enlace"}
      </Button>

      <Link
        href="/login"
        className="block text-center text-sm text-brand hover:underline"
      >
        Volver a iniciar sesión
      </Link>
    </form>
  );
}
