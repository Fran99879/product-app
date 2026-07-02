"use client";

import { useState } from "react";
import Link from "next/link";
import { useProfile } from "@/features/auth/hooks/use-profile";
import { Skeleton } from "@/components/ui/skeleton";
import { UsersTable } from "./users-table";
import { ProductsModeration } from "./products-moderation";

type Tab = "users" | "products";

export function AdminPanel() {
  const { data: profile, isLoading } = useProfile();
  const [tab, setTab] = useState<Tab>("users");

  if (isLoading) return <Skeleton className="h-96 w-full" />;

  // El backend igual devuelve 403 en cada endpoint; esto es solo UX.
  if (profile && profile.role !== "admin") {
    return (
      <p className="text-sm text-muted-foreground">
        Esta sección es solo para administradores.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setTab("users")}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            tab === "users" ? "bg-black text-white" : "border"
          }`}
        >
          Usuarios
        </button>
        <button
          type="button"
          onClick={() => setTab("products")}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            tab === "products" ? "bg-black text-white" : "border"
          }`}
        >
          Productos
        </button>
        <Link
          href="/admin/metrics"
          className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-900"
        >
          Métricas de la API →
        </Link>
      </div>

      {tab === "users" ? <UsersTable /> : <ProductsModeration />}
    </div>
  );
}
