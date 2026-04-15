"use client";

import { useMutation } from "@tanstack/react-query";
import { registerService } from "../services/register";
import { useRouter } from "next/navigation";

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: registerService,
    onSuccess: () => {
      router.push("/login");
    },
  });
}