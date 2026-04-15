import { RegisterForm } from "@/features/auth/components/register-form";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="mb-6 text-2xl font-bold">
          Crear cuenta
        </h1>

        <RegisterForm />
      </div>
    </main>
  );
}