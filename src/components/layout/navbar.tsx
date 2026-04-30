"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";

export function Navbar() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
  <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
    
    {/* Logo */}
    <Link href="/" className="text-base font-semibold tracking-tight">
      ElectroStore
    </Link>

    {/* Links */}
    <div className="flex items-center gap-1">
      {!isAuthenticated ? (
        <>
          <Link
            href="/login"
            className="px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-3 py-1.5 rounded-lg text-sm font-medium border hover:bg-accent transition-colors"
          >
            Register
          </Link>
        </>
      ) : (
        <>
          <Link
            href="/cart"
            className="px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            Carrito
          </Link>
          <Link
            href="/orders"
            className="px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            Órdenes
          </Link>

          {user?.role === "seller" && (
            <Link
              href="/seller"
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-blue-800 bg-blue-50 hover:bg-blue-100 dark:text-blue-200 dark:bg-blue-950 dark:hover:bg-blue-900 transition-colors"
            >
              Seller
            </Link>
          )}

          {user?.role === "admin" && (
            <Link
              href="/admin"
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-red-800 bg-red-50 hover:bg-red-100 dark:text-red-200 dark:bg-red-950 dark:hover:bg-red-900 transition-colors"
            >
              Admin
            </Link>
          )}

          {/* Separator */}
          <div className="w-px h-4 bg-border mx-1" />

          <Link
            href="/profile"
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-accent transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-800 dark:text-blue-100 text-xs font-medium">
              {user?.username?.slice(0, 2).toUpperCase()}
            </div>
            <span className="text-sm text-muted-foreground">Perfil</span>
          </Link>

          <button
            onClick={handleLogout}
            className="px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent border border-transparent hover:border-border transition-colors"
          >
            Logout
          </button>
        </>
      )}
    </div>
  </div>
</nav>
  );
}