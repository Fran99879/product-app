import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Rutas privadas/transaccionales fuera del índice.
      disallow: ["/seller", "/profile", "/cart", "/orders", "/login", "/register", "/admin"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
