export const BRANDS = [
  "Apple",
  "Samsung",
  "Xiaomi",
  "Google",
  "Motorola",
] as const;

export type Brand = (typeof BRANDS)[number];