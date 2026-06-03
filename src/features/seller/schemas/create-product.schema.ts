import { z } from "zod";
import { CATEGORIES } from "../../products/constants/categories";

export const createProductSchema = z.object({
  name: z.string().min(1, "Nombre requerido"),

  description: z.string().min(1, "Descripción requerida"),

  image: z.string().url("Debe ser una URL válida"),

  price: z.number().int().positive("Debe ser un entero positivo"),

  brand: z.string().min(1, "Marca requerida"),

  category: z.enum(CATEGORIES, {
    message: "Categoría inválida",
  }),

  model: z.string().min(1, "Modelo requerido"),

  quantity: z.number().int().min(0, "Stock inválido"),

  specs: z.record(z.string(), z.string()).default({}),

  isActive: z.boolean().default(true),
});

export const productResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  brand: z.string(),
  category: z.enum(CATEGORIES),
  model: z.string(),
  description: z.string(),
  image: z.string(),
  price: z.number(),
  quantity: z.number(),
  rate: z.number(),
  isActive: z.boolean(),
  specs: z.record(z.string(), z.string()),
  owner: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type ProductResponse =
  z.infer<typeof productResponseSchema>;

export type CreateProductSchema =
  z.output<typeof createProductSchema>;

export type CreateProductInput =
  z.input<typeof createProductSchema>;
