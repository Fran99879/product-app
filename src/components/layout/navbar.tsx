"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

export function Navbar() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    setOpen(false);
    router.push("/login");
  };

  // Cerrar el menú al hacer click fuera
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">

        {/* Logo */}
        <Link href="/" className="text-base font-semibold tracking-tight">
          ElectroStore
        </Link>

        {/* Right side */}
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
              {/* Carrito — siempre visible */}
              <Link
                href="/cart"
                className="px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                Carrito
              </Link>

              {/* Perfil — siempre visible */}
              <Link
                href="/profile"
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-accent transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-800 dark:text-blue-100 text-xs font-medium">
                  {user?.username?.slice(0, 2).toUpperCase()}
                </div>
                <span className="text-sm text-muted-foreground hidden sm:inline">Perfil</span>
              </Link>

              {/* Separator */}
              <div className="w-px h-4 bg-border mx-1" />

              {/* Dropdown trigger */}
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setOpen((v) => !v)}
                  aria-expanded={open}
                  aria-haspopup="true"
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent border border-transparent hover:border-border transition-colors"
                >
                  <span>Menú</span>
                  {/* Chevron */}
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 4l4 4 4-4" />
                  </svg>
                </button>

                {/* Dropdown panel */}
                {open && (
                  <div className="absolute right-0 mt-2 w-52 rounded-xl border border-border bg-background shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">

                    <Link
                      href="/orders"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    >
                      <svg className="w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="12" height="12" rx="2" />
                        <path d="M5 6h6M5 9h4" />
                      </svg>
                      Mis Órdenes
                    </Link>

                    {(user?.role === "seller" || user?.role === "admin") && (
                      <Link
                        href="/seller/orders"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                      >
                        <svg className="w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M8 2l1.5 3 3.5.5-2.5 2.5.5 3.5L8 10l-3 1.5.5-3.5L3 5.5 6.5 5z" />
                        </svg>
                        Órdenes de Usuarios
                      </Link>
                    )}

                    {user?.role === "seller" && (
                      <>
                        <div className="my-1 h-px bg-border mx-3" />
                        <Link
                          href="/seller"
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors"
                        >
                          <svg className="w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 3h12l-1.5 7H3.5L2 3z" />
                            <circle cx="6" cy="13" r="1" />
                            <circle cx="11" cy="13" r="1" />
                          </svg>
                          Panel Seller
                        </Link>
                      </>
                    )}

                    {user?.role === "admin" && (
                      <>
                        <div className="my-1 h-px bg-border mx-3" />
                        <Link
                          href="/admin"
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm font-medium text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors"
                        >
                          <svg className="w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="8" cy="8" r="6" />
                            <path d="M8 5v3l2 1" />
                          </svg>
                          Panel Admin
                        </Link>
                      </>
                    )}

                    <div className="my-1 h-px bg-border mx-3" />

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    >
                      <svg className="w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 3H3a1 1 0 00-1 1v8a1 1 0 001 1h3M10 11l3-3-3-3M13 8H6" />
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}