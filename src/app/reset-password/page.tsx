import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";

export const metadata = {
  title: "Nueva contraseña",
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="mb-6 text-2xl font-bold">Elegí una nueva contraseña</h1>
        <ResetPasswordForm token={token ?? ""} />
      </div>
    </main>
  );
}
