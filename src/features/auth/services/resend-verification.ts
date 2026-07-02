import { api } from "@/lib/api/client";

export async function resendVerificationService() {
  const response = await api.post("/user/resend-verification");
  return response.data;
}
