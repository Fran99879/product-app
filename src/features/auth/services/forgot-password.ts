import { api } from "@/lib/api/client";

export async function forgotPasswordService(data: { email: string }) {
  const response = await api.post("/user/forgot-password", data);
  return response.data;
}
