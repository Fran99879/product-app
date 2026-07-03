import Link from "next/link";
import { RegisterForm } from "@/features/auth/components/register-form";
import { AuthShell } from "@/components/layout/auth-shell";

export default function RegisterPage() {
  return (
    <AuthShell
      title="Crear cuenta"
      subtitle="Sumate y empezá a comprar en minutos"
      footer={
        <>
          ¿Ya tenés cuenta?{" "}
          <Link href="/login" className="font-medium text-brand hover:underline">
            Iniciá sesión
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}
