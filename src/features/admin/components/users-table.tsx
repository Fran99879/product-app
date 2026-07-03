"use client";

import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { useUsers, useUpdateUserRole } from "../hooks/use-users";
import { useProfile } from "@/features/auth/hooks/use-profile";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ErrorState } from "@/components/ui/states";
import { Avatar } from "@/components/ui/avatar";
import { confirmAction } from "@/lib/alerts";
import type { UserRole } from "../services/users";

const ROLES: UserRole[] = ["user", "seller", "admin"];

const roleTone: Record<string, "info" | "error" | "success"> = {
  seller: "info",
  admin: "error",
  user: "success",
};

export function UsersTable() {
  const { data: profile } = useProfile();
  const { data, isLoading, error, refetch } = useUsers();
  const updateRole = useUpdateUserRole();

  if (isLoading) return <Skeleton className="h-64 w-full rounded-2xl" />;

  if (error || !data) {
    return (
      <ErrorState
        title="No pudimos cargar los usuarios"
        onRetry={() => refetch()}
      />
    );
  }

  const handleRoleChange = async (
    userId: string,
    username: string,
    role: UserRole
  ) => {
    const ok = await confirmAction({
      title: "¿Cambiar rol?",
      message: `Vas a asignar el rol "${role}" a ${username}.`,
      confirmText: "Cambiar rol",
    });
    if (ok) updateRole.mutate({ userId, role });
  };

  return (
    <Card padded={false} className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-subtle text-left text-xs uppercase tracking-wide text-text-muted">
              <th className="px-4 py-3 font-medium">Usuario</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Verificado</th>
              <th className="px-4 py-3 font-medium">Alta</th>
              <th className="px-4 py-3 font-medium">Rol</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {data.map((user) => {
              const isSelf = profile?.id === user.id;
              const isUpdating =
                updateRole.isPending &&
                updateRole.variables?.userId === user.id;

              return (
                <tr key={user.id} className="transition-colors hover:bg-hover/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={user.username} size="sm" />
                      <span className="font-medium text-text-primary">
                        {user.username}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">{user.email}</td>
                  <td className="px-4 py-3">
                    {user.emailVerified ? (
                      <CheckBadgeIcon className="h-5 w-5 text-success" />
                    ) : (
                      <span className="text-text-muted">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-text-muted">
                    {new Date(user.createdAt).toLocaleDateString("es-AR")}
                  </td>
                  <td className="px-4 py-3">
                    {isSelf ? (
                      <Badge tone={roleTone[user.role]}>{user.role} (vos)</Badge>
                    ) : (
                      <select
                        value={user.role}
                        disabled={isUpdating}
                        onChange={(e) =>
                          handleRoleChange(
                            user.id,
                            user.username,
                            e.target.value as UserRole
                          )
                        }
                        className="cursor-pointer rounded-lg border border-border-strong bg-surface px-2 py-1 text-sm text-text-primary outline-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:opacity-50"
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
    </Card>
  );
}
