import { VerifyEmailStatus } from "@/features/auth/components/verify-email-status";
import { AuthShell } from "@/components/layout/auth-shell";

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
    <AuthShell
      title="Verificación de email"
      subtitle="Estamos confirmando tu dirección de correo"
    >
      <VerifyEmailStatus token={token ?? ""} />
    </AuthShell>
  );
}
