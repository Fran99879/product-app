import { api } from "@/lib/api/client";

export async function resetPasswordService(data: {
  token: string;
  password: string;
}) {
  const response = await api.post("/user/reset-password", data);
  return response.data;
}
