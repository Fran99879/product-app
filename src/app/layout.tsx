import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { QueryProvider } from "@/providers/query-provider";
import { AuthProvider } from "@/providers/auth-provider";
import { PostHogProvider } from "@/providers/posthog-provider";
import { Navbar } from "@/components/layout/navbar";
import { Toaster } from "sonner";
import { SITE_URL } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
    <html lang="es" className={inter.variable}>
      <body className="min-h-screen bg-app text-text-primary antialiased">
        <PostHogProvider>
          <QueryProvider>
            <AuthProvider>
              <Navbar />
              {children}
              <Toaster richColors theme="dark" position="top-right" />
            </AuthProvider>
          </QueryProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}