import { ProtectedRoute } from "@/components/shared/protected-route";
import { ProfileCard } from "@/features/auth/components/profile-card";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <main className="mx-auto max-w-4xl p-6">
        <ProfileCard />
      </main>
    </ProtectedRoute>
  );
}