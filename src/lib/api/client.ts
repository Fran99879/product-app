import axios from "axios";
import { useAuthStore } from "@/store/auth-store";
import { env } from "@/lib/env";

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== "undefined") {
      // Un 401 en login/register es "credenciales inválidas", no sesión
      // vencida: lo maneja el form, no redirigimos.
      const url: string = error.config?.url ?? "";
      const isAuthRequest =
        url.includes("/user/login") || url.includes("/user/register");

      if (error.response?.status === 401 && !isAuthRequest) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);