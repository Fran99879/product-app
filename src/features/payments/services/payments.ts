import { api } from "@/lib/api/client";

/** Estado de conexión de Mercado Pago del vendedor logueado. */
export async function getMpConnection(): Promise<{ connected: boolean }> {
  const res = await api.get("/payments/connection");
  return res.data;
}

/** Guarda el Access Token de Mercado Pago del vendedor. */
export async function connectMp(accessToken: string): Promise<{ connected: boolean }> {
  const res = await api.put("/payments/connection", { accessToken });
  return res.data;
}

/** Desconecta Mercado Pago del vendedor. */
export async function disconnectMp(): Promise<{ connected: boolean }> {
  const res = await api.delete("/payments/connection");
  return res.data;
}

interface PreferenceResponse {
  preferenceId: string;
  initPoint: string;
  sandboxInitPoint?: string;
}

/** Crea la preferencia de pago de una orden y devuelve la URL de checkout de MP. */
export async function createPreference(orderId: string): Promise<PreferenceResponse> {
  const res = await api.post(`/payments/orders/${orderId}/preference`);
  return res.data;
}

/** Confirma el pago al volver de MP (o consulta el estado actual de la orden). */
export async function confirmPayment(
  orderId: string,
  paymentId?: string
): Promise<{ status: string; paymentStatus?: string }> {
  const res = await api.post(`/payments/orders/${orderId}/confirm`, {
    paymentId,
  });
  return res.data;
}
