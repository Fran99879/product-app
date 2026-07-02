"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getUsersService, updateUserRoleService } from "../services/users";
import { getErrorMessage } from "@/lib/utils/get-error-message";
import { useAuthStore } from "@/store/auth-store";

export function useUsers() {
  const { token, isHydrated } = useAuthStore();
  return useQuery({
    queryKey: ["admin-users"],
    queryFn: getUsersService,
    enabled: isHydrated && !!token,
  });
}

export function useUpdateUserRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserRoleService,
    onSuccess: (updated) => {
      toast.success(`Rol de ${updated.username} actualizado a ${updated.role}.`);
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
