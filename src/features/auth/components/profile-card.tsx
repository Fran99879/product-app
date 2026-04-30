"use client";

import { useProfile } from "../hooks/use-profile";
import { Skeleton } from "@/components/ui/skeleton";

export function ProfileCard() {
  const { data, isLoading } = useProfile();

if (isLoading) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-40 w-full" />
      ))}
    </div>
  );
}
const roleBadge: Record<string, string> = {
  seller: "bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-200",
  admin:  "bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200",
  user:  "bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200",
}

  return (
 <div className="rounded-2xl border border-border-tertiary bg-background-primary p-6 shadow-sm max-w-sm">
  <div className="flex items-center gap-4 mb-6">
    <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-800 dark:text-blue-100 font-medium text-lg shrink-0">
      {data.username?.slice(0, 2).toUpperCase()}
    </div>
    <div>
      <h1 className="text-lg font-medium leading-tight">{data.username}</h1>
      <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-800 dark:text-blue-200 text-xs font-medium">
        {data.role}
      </span>
    </div>
  </div>

  <div className="border-t border-border-tertiary mb-4" />

  <div className="space-y-3">
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground w-16 shrink-0">Usuario</span>
      <span className="text-sm font-medium truncate">{data.username}</span>
    </div>

    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground w-16 shrink-0">Email</span>
      <span className="text-sm font-medium truncate">{data.email}</span>
    </div>

    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground w-16 shrink-0">Rol</span>
      <span className={`inline-flex items-center mt-1 px-2 py-0.5 rounded-md text-xs font-medium ${roleBadge[data.role] ?? "bg-gray-50 text-gray-800"}`}>
  {data.role}
</span>
    </div>
  </div>
</div>
  );
}