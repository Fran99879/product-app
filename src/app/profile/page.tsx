import { ProtectedRoute } from "@/components/shared/protected-route";
import { ProfileCard } from "@/features/auth/components/profile-card";
import { SessionsCard } from "@/features/auth/components/sessions-card";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <main className="mx-auto flex max-w-4xl flex-wrap items-start gap-6 p-6">
        <ProfileCard />
        <SessionsCard />
      </main>
    </ProtectedRoute>
  );
}