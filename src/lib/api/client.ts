import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/store/auth-store";
import { env } from "@/lib/env";

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // Necesario para enviar/recibir la cookie httpOnly del refresh token.
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Endpoints de auth donde un 401 NO significa "access token vencido" (son
// credenciales inválidas o el propio refresh): no intentamos refrescar.
const NO_REFRESH_URLS = [
  "/user/login",
  "/user/register",
  "/user/refresh",
  "/user/forgot-password",
  "/user/reset-password",
  "/user/verify-email",
];

// Un único refresh en vuelo compartido entre requests que fallan a la vez.
let refreshPromise: Promise<string> | null = null;

async function refreshAccessToken(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = axios
      .post(
        `${env.NEXT_PUBLIC_API_URL}/user/refresh`,
        {},
        { withCredentials: true }
      )
      .then((res) => {
        // Actualiza el store con el nuevo access token + user.
        useAuthStore.getState().login(res.data.token, res.data.user);
        return res.data.token as string;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    const url = original?.url ?? "";
    const isRefreshable =
      error.response?.status === 401 &&
      original &&
      !original._retry &&
      !NO_REFRESH_URLS.some((u) => url.includes(u));

    if (isRefreshable) {
      original._retry = true;
      try {
        const newToken = await refreshAccessToken();
        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      } catch {
        // El refresh falló → sesión realmente vencida.
        if (typeof window !== "undefined") {
          useAuthStore.getState().logout();
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
