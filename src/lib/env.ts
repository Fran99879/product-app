import { z } from "zod";

/**
 * Validación de variables de entorno públicas.
 * Las `NEXT_PUBLIC_*` se inlinean en build, por eso se referencian explícitamente
 * (no se puede iterar `process.env` en el cliente).
 */
const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z
    .string()
    .url("NEXT_PUBLIC_API_URL debe ser una URL válida"),
});

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
    .join("\n");
  throw new Error(
    `❌ Variables de entorno inválidas:\n${issues}\n\nRevisá tu archivo .env.local`
  );
}

export const env = parsed.data;
