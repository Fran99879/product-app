/**
 * URL pública canónica del frontend (para sitemap, robots, canonical, OG).
 * Configurable vía `NEXT_PUBLIC_SITE_URL`; en dev cae a localhost:3001.
 * Sin barra final.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001"
).replace(/\/$/, "");
