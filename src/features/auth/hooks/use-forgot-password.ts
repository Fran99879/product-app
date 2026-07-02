"use client";

import { useMutation } from "@tanstack/react-query";
import { forgotPasswordService } from "../services/forgot-password";
import { getErrorMessage } from "@/lib/utils/get-error-message";
import { toast } from "sonner";

export function useForgotPassword() {
  return useMutation({
    mutationFn: forgotPasswordService,
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
