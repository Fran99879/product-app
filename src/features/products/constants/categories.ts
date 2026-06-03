export const CATEGORIES = [
  "smartphone",
  "tablet",
  "laptop",
  "desktop",
  "monitor",
  "tv",
  "smartwatch",
  "headphones",
  "speaker",
  "gaming",
  "storage",
  "networking",
  "camera",
  "accessories",
  "other",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABELS: Record<Category, string> = {
  smartphone: "Smartphone",
  tablet: "Tablet",
  laptop: "Laptop",
  desktop: "Desktop",
  monitor: "Monitor",
  tv: "Televisor",
  smartwatch: "Smartwatch",
  headphones: "Audífonos",
  speaker: "Parlante",
  gaming: "Gaming",
  storage: "Almacenamiento",
  networking: "Redes",
  camera: "Cámara",
  accessories: "Accesorios",
  other: "Otro",
};
