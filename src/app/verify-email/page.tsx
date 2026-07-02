import { VerifyEmailStatus } from "@/features/auth/components/verify-email-status";

export const metadata = {
  title: "Verificar email",
};

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="mb-6 text-2xl font-bold">Verificación de email</h1>
        <VerifyEmailStatus token={token ?? ""} />
      </div>
    </main>
  );
}
