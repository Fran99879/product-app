"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getSessionsService,
  revokeOtherSessionsService,
  revokeSessionService,
} from "../services/sessions";
import { getErrorMessage } from "@/lib/utils/get-error-message";
import { useAuthStore } from "@/store/auth-store";

export function useSessions() {
  const { token, isHydrated } = useAuthStore();
  return useQuery({
    queryKey: ["sessions"],
    queryFn: getSessionsService,
    enabled: isHydrated && !!token,
  });
}

export function useRevokeSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: revokeSessionService,
    onSuccess: () => {
      toast.success("Sesión cerrada.");
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useRevokeOtherSessions() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: revokeOtherSessionsService,
    onSuccess: () => {
      toast.success("Cerramos las demás sesiones.");
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
