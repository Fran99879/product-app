import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";

export const metadata = {
  title: "Restablecer contraseña",
};

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="mb-6 text-2xl font-bold">¿Olvidaste tu contraseña?</h1>
        <ForgotPasswordForm />
      </div>
    </main>
  );
}
