import "./globals.css";
import type { Metadata } from "next";
import { QueryProvider } from "@/providers/query-provider";
import { AuthProvider } from "@/providers/auth-provider";
import { Navbar } from "@/components/layout/navbar";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "Product App — Catálogo de productos",
    template: "%s | Product App",
  },
  description:
    "Catálogo de productos online: explorá, buscá y comprá productos de distintas categorías y marcas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <QueryProvider>
          <AuthProvider>
            <Navbar />
            {children}
            <Toaster richColors position="top-right" />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}