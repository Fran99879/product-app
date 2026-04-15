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
    <nav className="border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold">
          ElectroStore
        </Link>

        <div className="flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          ) : (
            <>
              <Link href="/profile">Perfil</Link>

              {user?.role === "seller" && (
                <Link href="/seller">Seller</Link>
              )}

              {user?.role === "admin" && (
                <Link href="/admin">Admin</Link>
              )}


              <button
                onClick={handleLogout}
                className="rounded-lg border px-3 py-1"
              >
                Logout
              </button>
            </>
          )}
        <Link href="/cart">Carrito</Link>
        <Link href="/orders">Órdenes</Link>
        </div>
      </div>
    </nav>
  );
}