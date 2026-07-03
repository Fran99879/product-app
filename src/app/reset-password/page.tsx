import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";
import { AuthShell } from "@/components/layout/auth-shell";

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
    <AuthShell
      title="Nueva contraseña"
      subtitle="Elegí una contraseña segura para tu cuenta"
    >
      <ResetPasswordForm token={token ?? ""} />
    </AuthShell>
  );
}
