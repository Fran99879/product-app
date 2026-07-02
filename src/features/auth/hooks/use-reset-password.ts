"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { resetPasswordService } from "../services/reset-password";
import { getErrorMessage } from "@/lib/utils/get-error-message";

export function useResetPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: resetPasswordService,
    onSuccess: () => {
      toast.success("Contraseña actualizada. Ya podés iniciar sesión.");
      router.push("/login");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
