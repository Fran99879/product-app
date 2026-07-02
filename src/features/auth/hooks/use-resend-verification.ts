"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { resendVerificationService } from "../services/resend-verification";
import { getErrorMessage } from "@/lib/utils/get-error-message";

export function useResendVerification() {
  return useMutation({
    mutationFn: resendVerificationService,
    onSuccess: () => {
      toast.success("Te reenviamos el email de verificación.");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
