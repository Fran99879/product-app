"use client";

import { useState } from "react";
import Link from "next/link";
import {
  UsersIcon,
  CubeIcon,
  ChartBarIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { useProfile } from "@/features/auth/hooks/use-profile";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/cn";
import { UsersTable } from "./users-table";
import { ProductsModeration } from "./products-moderation";

type Tab = "users" | "products";

export function AdminPanel() {
  const { data: profile, isLoading } = useProfile();
  const [tab, setTab] = useState<Tab>("users");

  if (isLoading) return <Skeleton className="h-96 w-full rounded-2xl" />;

  // El backend igual devuelve 403 en cada endpoint; esto es solo UX.
  if (profile && profile.role !== "admin") {
    return (
      <p className="text-sm text-text-muted">
        Esta sección es solo para administradores.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <TabButton
          active={tab === "users"}
          onClick={() => setTab("users")}
          icon={<UsersIcon className="h-4 w-4" />}
        >
          Usuarios
        </TabButton>
        <TabButton
          active={tab === "products"}
          onClick={() => setTab("products")}
          icon={<CubeIcon className="h-4 w-4" />}
        >
          Productos
        </TabButton>
        <Link
          href="/admin/metrics"
          className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-border-strong px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-hover hover:text-text-primary"
        >
          <ChartBarIcon className="h-4 w-4" />
          Métricas de la API
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>

      {tab === "users" ? <UsersTable /> : <ProductsModeration />}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-brand text-brand-fg"
          : "border border-border-strong text-text-secondary hover:bg-hover hover:text-text-primary"
      )}
    >
      {icon}
      {children}
    </button>
  );
}
