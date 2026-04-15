import { api } from "@/lib/api/client";

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export async function registerService(data: RegisterPayload) {
  const response = await api.post("/user/register", data);
  return response.data;
}