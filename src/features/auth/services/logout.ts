import { api } from "@/lib/api/client";

/**
 * Invalida la sesión de refresh en el server (borra la cookie httpOnly + la
 * sesión en DB). Best-effort: si falla, igual limpiamos el estado local.
 */
export async function logoutService() {
  try {
    await api.post("/user/logout");
  } catch {
    // Ignorar: el logout local no debe depender de la red.
  }
}
