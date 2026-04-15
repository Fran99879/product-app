"use client";

import { useMutation } from "@tanstack/react-query";
import { loginService } from "../services/login";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";

export function useLogin() {
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  return useMutation({
    mutationFn: loginService,
    onSuccess: (data) => {
      login(data.token, data.user);

      switch (data.user.role) {
        case "admin":
          router.push("/admin");
          break;
        case "seller":
          router.push("/seller");
          break;
        default:
          router.push("/profile");
      }
    },
  });
}