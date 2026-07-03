"use client";

import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoadingState } from "@/components/ui/states";

export function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { isAuthenticated, isHydrated } = useAuthStore();
  
  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isHydrated, router]);

  if (!isHydrated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoadingState message="Cargando..." />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return <>{children}</>;
}