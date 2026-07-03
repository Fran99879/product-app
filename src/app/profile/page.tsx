import { UserCircleIcon } from "@heroicons/react/24/outline";
import { ProtectedRoute } from "@/components/shared/protected-route";
import { ProfileCard } from "@/features/auth/components/profile-card";
import { SessionsCard } from "@/features/auth/components/sessions-card";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/ui/page-header";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <PageContainer>
        <PageHeader
          title="Mi perfil"
          description="Datos de tu cuenta y sesiones activas"
          icon={<UserCircleIcon />}
        />
        <div className="mt-8 grid items-start gap-6 lg:grid-cols-2">
          <ProfileCard />
          <SessionsCard />
        </div>
      </PageContainer>
    </ProtectedRoute>
  );
}
