import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { env } from "@/lib/env";

export const revalidate = 3600; // regenerar el sitemap 1x/hora

/** Trae los ids de producto para las URLs dinámicas (best-effort). */
async function getProductEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    // La API topea limit en 50; para un catálogo mayor haría falta paginar.
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/products?limit=50`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];

    const json = (await res.json()) as {
      data?: { id: string; updatedAt?: string }[];
    };

    return (json.data ?? []).map((p) => ({
      url: `${SITE_URL}/product/${p.id}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : undefined,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  return [...staticRoutes, ...(await getProductEntries())];
}
