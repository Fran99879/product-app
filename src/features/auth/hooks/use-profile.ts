"use client";

import { useQuery } from "@tanstack/react-query";
import { getProfileService } from "../services/profile";
import { useAuthStore } from "@/store/auth-store";

export function useProfile() {
  const { token, isHydrated} = useAuthStore();
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfileService,
    enabled: isHydrated && !!token,
  });
}