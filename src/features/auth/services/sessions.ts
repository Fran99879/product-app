import { api } from "@/lib/api/client";

export interface Session {
  id: string;
  userAgent: string | null;
  createdAt: string;
  expiresAt: string;
  current: boolean;
}

export async function getSessionsService(): Promise<Session[]> {
  const response = await api.get("/user/sessions");
  return response.data;
}

export async function revokeSessionService(id: string) {
  const response = await api.delete(`/user/sessions/${id}`);
  return response.data;
}

export async function revokeOtherSessionsService() {
  const response = await api.delete("/user/sessions");
  return response.data;
}
