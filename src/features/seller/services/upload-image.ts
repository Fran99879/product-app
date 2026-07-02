import { api } from "@/lib/api/client";

interface UploadSignature {
  signature: string;
  timestamp: number;
  folder: string;
  apiKey: string;
  cloudName: string;
}

export interface UploadedImage {
  url: string;
  publicId: string;
}

/**
 * Sube una imagen a Cloudinary con "signed direct upload":
 * 1. pide una firma al backend (`POST /uploads/signature`, con auth),
 * 2. sube el archivo DIRECTO a Cloudinary (los bytes no pasan por nuestro server),
 * 3. devuelve la `secure_url` y el `public_id`.
 */
export async function uploadProductImage(file: File): Promise<UploadedImage> {
  const { data: sig } = await api.post<UploadSignature>("/uploads/signature");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", sig.apiKey);
  formData.append("timestamp", String(sig.timestamp));
  formData.append("signature", sig.signature);
  formData.append("folder", sig.folder);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!res.ok) {
    throw new Error("No se pudo subir la imagen a Cloudinary");
  }

  const json = await res.json();
  return { url: json.secure_url, publicId: json.public_id };
}
