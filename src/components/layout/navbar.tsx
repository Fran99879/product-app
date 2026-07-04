"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import {
  HomeIcon,
  ShoppingCartIcon,
  ClipboardDocumentListIcon,
  BuildingStorefrontIcon,
  ShieldCheckIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useAuthStore } from "@/store/auth-store";
import { useCartStore } from "@/store/cart-store";
import { logoutService } from "@/features/auth/services/logout";
import { confirmAction, showToast } from "@/lib/alerts";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { LocationSelector } from "@/components/layout/location-selector";
import { cn } from "@/lib/cn";

const ROLE_LABEL: Record<string, string> = {
  admin: "Admin",
  seller: "Seller",
  user: "Usuario",
};

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuthStore();
  const cartCount = useCartStore((s) => s.items.length);
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    setOpen(false);
    setMobileOpen(false);
    const ok = await confirmAction({
      title: "¿Cerrar sesión?",
      message: "Tendrás que volver a iniciar sesión para continuar.",
      confirmText: "Cerrar sesión",
    });
    if (!ok) return;
    await logoutService();
    logout();
    showToast("success", "Sesión cerrada");
    router.push("/login");
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cierra menús al navegar
  useEffect(() => {
    setOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="sticky top-0 z-50 border-b border-border-subtle bg-app/80 backdrop-blur supports-[backdrop-filter]:bg-app/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-brand-fg shadow-sm">
            <BuildingStorefrontIcon className="h-5 w-5" />
          </span>
          <span className="text-base font-bold tracking-tight text-text-primary">
            ElectroStore
          </span>
        </Link>

        {/* Nav central (desktop) */}
        <div className="hidden items-center gap-1 md:flex">
          <NavLink href="/" active={isActive("/")} icon={<HomeIcon />}>
            Inicio
          </NavLink>
          {isAuthenticated && (
            <NavLink
              href="/orders"
              active={isActive("/orders")}
              icon={<ClipboardDocumentListIcon />}
            >
              Mis pedidos
            </NavLink>
          )}
          <div className="mx-1 h-6 w-px bg-border-subtle" />
          <LocationSelector />
        </div>

        {/* Right side (desktop) */}
        <div className="hidden items-center gap-2 md:flex">
          {!isAuthenticated ? (
            <>
              <Link
                href="/login"
                className="rounded-lg px-3 py-1.5 text-sm text-text-secondary transition-colors hover:bg-hover hover:text-text-primary"
              >
                Ingresar
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-brand px-3.5 py-1.5 text-sm font-medium text-brand-fg transition-colors hover:bg-brand-hover"
              >
                Crear cuenta
              </Link>
            </>
          ) : (
            <>
              <CartLink count={cartCount} />

              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setOpen((v) => !v)}
                  aria-expanded={open}
                  aria-haspopup="true"
                  className="flex items-center gap-2 rounded-lg border border-transparent px-2 py-1.5 transition-colors hover:border-border-subtle hover:bg-hover"
                >
                  <Avatar name={user?.username} size="sm" />
                  <span className="hidden text-sm text-text-secondary lg:inline">
                    {user?.username}
                  </span>
                  <ChevronDownIcon
                    className={cn(
                      "h-4 w-4 text-text-muted transition-transform",
                      open && "rotate-180"
                    )}
                  />
                </button>

                {open && (
                  <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-border-subtle bg-elevated py-1 shadow-[var(--shadow-elevated)] animate-[slide-up_0.15s_ease-out]">
                    <div className="flex items-center gap-3 px-4 py-3">
                      <Avatar name={user?.username} />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-text-primary">
                          {user?.username}
                        </p>
                        <Badge
                          tone={user?.role === "admin" ? "error" : "brand"}
                          className="mt-0.5"
                        >
                          {ROLE_LABEL[user?.role ?? "user"]}
                        </Badge>
                      </div>
                    </div>
                    <div className="h-px bg-border-subtle" />

                    <MenuLink href="/profile" icon={<UserCircleIcon />}>
                      Mi perfil
                    </MenuLink>
                    <MenuLink
                      href="/orders"
                      icon={<ClipboardDocumentListIcon />}
                    >
                      Mis pedidos
                    </MenuLink>

                    {(user?.role === "seller" || user?.role === "admin") && (
                      <MenuLink
                        href="/seller/orders"
                        icon={<ClipboardDocumentListIcon />}
                      >
                        Pedidos recibidos
                      </MenuLink>
                    )}

                    {user?.role === "seller" && (
                      <>
                        <div className="my-1 h-px bg-border-subtle" />
                        <MenuLink
                          href="/seller"
                          icon={<BuildingStorefrontIcon />}
                          accent
                        >
                          Panel Seller
                        </MenuLink>
                      </>
                    )}

                    {user?.role === "admin" && (
                      <>
                        <div className="my-1 h-px bg-border-subtle" />
                        <MenuLink href="/admin" icon={<ShieldCheckIcon />} accent>
                          Panel Admin
                        </MenuLink>
                      </>
                    )}

                    <div className="my-1 h-px bg-border-subtle" />
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-text-secondary transition-colors hover:bg-hover hover:text-error"
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5 shrink-0" />
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 md:hidden">
          {isAuthenticated && <CartLink count={cartCount} />}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Abrir menú"
            aria-expanded={mobileOpen}
            className="rounded-lg p-2 text-text-secondary transition-colors hover:bg-hover hover:text-text-primary"
          >
            {mobileOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="border-t border-border-subtle bg-app px-4 py-3 md:hidden animate-[slide-up_0.15s_ease-out]">
          {isAuthenticated && user && (
            <div className="mb-3 flex items-center gap-3 rounded-xl bg-elevated p-3">
              <Avatar name={user.username} />
              <div>
                <p className="text-sm font-medium text-text-primary">
                  {user.username}
                </p>
                <Badge tone={user.role === "admin" ? "error" : "brand"}>
                  {ROLE_LABEL[user.role]}
                </Badge>
              </div>
            </div>
          )}

          <div className="mb-1 border-b border-border-subtle pb-2">
            <LocationSelector variant="menu" />
          </div>

          <div className="flex flex-col gap-1">
            <MobileLink href="/" icon={<HomeIcon />}>
              Inicio
            </MobileLink>
            {!isAuthenticated ? (
              <>
                <MobileLink href="/login" icon={<UserCircleIcon />}>
                  Ingresar
                </MobileLink>
                <MobileLink href="/register" icon={<UserCircleIcon />}>
                  Crear cuenta
                </MobileLink>
              </>
            ) : (
              <>
                <MobileLink href="/profile" icon={<UserCircleIcon />}>
                  Mi perfil
                </MobileLink>
                <MobileLink href="/orders" icon={<ClipboardDocumentListIcon />}>
                  Mis pedidos
                </MobileLink>
                {(user?.role === "seller" || user?.role === "admin") && (
                  <MobileLink
                    href="/seller/orders"
                    icon={<ClipboardDocumentListIcon />}
                  >
                    Pedidos recibidos
                  </MobileLink>
                )}
                {user?.role === "seller" && (
                  <MobileLink href="/seller" icon={<BuildingStorefrontIcon />}>
                    Panel Seller
                  </MobileLink>
                )}
                {user?.role === "admin" && (
                  <MobileLink href="/admin" icon={<ShieldCheckIcon />}>
                    Panel Admin
                  </MobileLink>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text-secondary transition-colors hover:bg-hover hover:text-error"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  Cerrar sesión
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({
  href,
  active,
  icon,
  children,
}: {
  href: string;
  active: boolean;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors [&>svg]:h-5 [&>svg]:w-5",
        active
          ? "bg-brand-soft text-brand"
          : "text-text-secondary hover:bg-hover hover:text-text-primary"
      )}
    >
      {icon}
      {children}
    </Link>
  );
}

function CartLink({ count }: { count: number }) {
  return (
    <Link
      href="/cart"
      aria-label="Carrito"
      className="relative rounded-lg p-2 text-text-secondary transition-colors hover:bg-hover hover:text-text-primary"
    >
      <ShoppingCartIcon className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-semibold text-brand-fg">
          {count}
        </span>
      )}
    </Link>
  );
}

function MenuLink({
  href,
  icon,
  accent,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  accent?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2.5 px-4 py-2 text-sm transition-colors [&>svg]:h-5 [&>svg]:w-5 [&>svg]:shrink-0",
        accent
          ? "font-medium text-brand hover:bg-brand-soft"
          : "text-text-secondary hover:bg-hover hover:text-text-primary"
      )}
    >
      {icon}
      {children}
    </Link>
  );
}

function MobileLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text-secondary transition-colors hover:bg-hover hover:text-text-primary [&>svg]:h-5 [&>svg]:w-5"
    >
      {icon}
      {children}
    </Link>
  );
}
