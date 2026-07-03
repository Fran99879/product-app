import Link from "next/link";
import { LoginForm } from "@/features/auth/components/login-form";
import { AuthShell } from "@/components/layout/auth-shell";

export default function LoginPage() {
  return (
    <AuthShell
      title="Iniciar sesión"
      subtitle="Ingresá para continuar con tu compra"
      footer={
        <>
          ¿No tenés cuenta?{" "}
          <Link href="/register" className="font-medium text-brand hover:underline">
            Creá una
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}
