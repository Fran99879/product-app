import { api } from "@/lib/api/client";

export async function getProfileService() {
  const response = await api.get("/user/profile");
  return response.data;
}