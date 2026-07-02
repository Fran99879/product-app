import { api } from "@/lib/api/client";

export async function verifyEmailService(data: { token: string }) {
  const response = await api.post("/user/verify-email", data);
  return response.data;
}
