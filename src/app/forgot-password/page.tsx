import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";
import { AuthShell } from "@/components/layout/auth-shell";

export const metadata = {
  title: "Restablecer contraseña",
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="¿Olvidaste tu contraseña?"
      subtitle="Te enviaremos un enlace para restablecerla"
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
