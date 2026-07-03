import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { ProtectedRoute } from "@/components/shared/protected-route";
import { AdminPanel } from "@/features/admin/components/admin-panel";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/ui/page-header";

export const metadata = {
  title: "Administración",
};

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <PageContainer>
        <PageHeader
          title="Panel de administración"
          description="Usuarios, productos y métricas de la plataforma"
          icon={<ShieldCheckIcon />}
        />
        <div className="mt-8">
          <AdminPanel />
        </div>
      </PageContainer>
    </ProtectedRoute>
  );
}
