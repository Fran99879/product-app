import { z } from "zod";
import { BRANDS } from "../../products/constants/brands";

export const createProductSchema = z.object({
  name: z.string().min(1, "Nombre requerido"),

  description: z.string(),

  image: z.string().url("Debe ser una URL válida"),

  price: z.number().int().positive("Debe ser un entero positivo"),

  brand: z.enum(BRANDS, {
    message: "Seleccioná una marca",
  }),

  quantity: z.number().int().min(0, "Stock inválido"),
});

export const productResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  brand: z.enum(BRANDS),
  description: z.string(),
  image: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export type ProductResponse = z.infer<typeof productResponseSchema>;

export type CreateProductSchema = z.infer<typeof createProductSchema>;
