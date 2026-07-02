"use client";

import { useUsers, useUpdateUserRole } from "../hooks/use-users";
import { useProfile } from "@/features/auth/hooks/use-profile";
import { Skeleton } from "@/components/ui/skeleton";
import type { UserRole } from "../services/users";

const ROLES: UserRole[] = ["user", "seller", "admin"];

const roleBadge: Record<string, string> = {
  seller: "bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-200",
  admin: "bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200",
  user: "bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200",
};

export function UsersTable() {
  const { data: profile } = useProfile();
  const { data, isLoading, error } = useUsers();
  const updateRole = useUpdateUserRole();

  if (isLoading) return <Skeleton className="h-64 w-full" />;

  if (error || !data) {
    return (
      <p className="text-sm text-red-500">No pudimos cargar los usuarios.</p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left text-muted-foreground">
            <th className="p-3 font-medium">Usuario</th>
            <th className="p-3 font-medium">Email</th>
            <th className="p-3 font-medium">Verificado</th>
            <th className="p-3 font-medium">Alta</th>
            <th className="p-3 font-medium">Rol</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => {
            const isSelf = profile?.id === user.id;
            const isUpdating =
              updateRole.isPending && updateRole.variables?.userId === user.id;

            return (
              <tr key={user.id} className="border-b last:border-0">
                <td className="p-3 font-medium">{user.username}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  {user.emailVerified ? (
                    <span className="text-green-600">✓</span>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>
                <td className="p-3 text-muted-foreground">
                  {new Date(user.createdAt).toLocaleDateString("es-AR")}
                </td>
                <td className="p-3">
                  {isSelf ? (
                    // No permitir que el admin se degrade a sí mismo por accidente.
                    <span
                      className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium ${roleBadge[user.role]}`}
                    >
                      {user.role} (vos)
                    </span>
                  ) : (
                    <select
                      value={user.role}
                      disabled={isUpdating}
                      onChange={(e) =>
                        updateRole.mutate({
                          userId: user.id,
                          role: e.target.value as UserRole,
                        })
                      }
                      className="rounded-md border px-2 py-1 text-sm disabled:opacity-50"
                    >
                      {ROLES.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
