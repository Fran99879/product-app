import { api } from "@/lib/api/client";

interface LoginPayload {
  email: string;
  password: string;
}

export async function loginService(data: LoginPayload) {
  const response = await api.post("/user/login", data);
  return response.data;
}