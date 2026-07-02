import { ProtectedRoute } from "@/components/shared/protected-route";
import { AdminPanel } from "@/features/admin/components/admin-panel";

export const metadata = {
  title: "Administración",
};

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <main className="mx-auto max-w-4xl p-6">
        <h1 className="mb-1 text-2xl font-semibold">Panel de administración</h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Usuarios, productos y métricas de la plataforma.
        </p>
        <AdminPanel />
      </main>
    </ProtectedRoute>
  );
}
