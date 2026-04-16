import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2, "Nombre requerido"),
  brand: z.string().min(2, "Marca requerida"),
  description: z.string().min(5, "Descripción muy corta"),
  image: z.string().url("Debe ser una URL válida"),
  price: z.coerce.number().min(1),
  quantity: z.coerce.number().min(1),
});

export type CreateProductSchema = z.infer<
  typeof createProductSchema
>;