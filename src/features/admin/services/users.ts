import { api } from "@/lib/api/client";

export type UserRole = "user" | "seller" | "admin";

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  emailVerified: boolean;
  createdAt: string;
}

export async function getUsersService(): Promise<AdminUser[]> {
  const response = await api.get("/admin/users");
  return response.data;
}

export async function updateUserRoleService(params: {
  userId: string;
  role: UserRole;
}) {
  const response = await api.patch(`/admin/users/${params.userId}/role`, {
    role: params.role,
  });
  return response.data;
}
