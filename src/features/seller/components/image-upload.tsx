"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import {
  uploadProductImage,
  deleteProductImage,
} from "../services/upload-image";
import { getErrorMessage } from "@/lib/utils/get-error-message";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  error?: string;
}

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export function ImageUpload({ value, onChange, error }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  // Preview local (blob) mientras sube; una vez subida se usa la URL de Cloudinary.
  const [preview, setPreview] = useState<string | null>(null);
  // public_id de la imagen subida EN ESTA SESIÓN y aún no guardada. Nos deja
  // borrarla del storage si el seller la reemplaza o la quita (evita huérfanas).
  // No incluye la `value` inicial (esa sí está referenciada por el producto).
  const [uploadedPublicId, setUploadedPublicId] = useState<string | null>(null);

  const shown = preview ?? value;

  // Borra del storage la imagen subida en esta sesión, si hay. Best-effort: un
  // fallo de borrado no debe romper el flujo del form.
  const deleteOrphan = () => {
    if (!uploadedPublicId) return;
    deleteProductImage(uploadedPublicId).catch(() => {});
    setUploadedPublicId(null);
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLocalError(null);

    if (!file.type.startsWith("image/")) {
      setLocalError("El archivo debe ser una imagen");
      return;
    }
    if (file.size > MAX_SIZE) {
      setLocalError("La imagen no puede superar los 5MB");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setUploading(true);

    try {
      const { url, publicId } = await uploadProductImage(file);
      // Si veníamos reemplazando una imagen ya subida esta sesión, la vieja
      // quedó huérfana → borrarla del storage antes de registrar la nueva.
      deleteOrphan();
      onChange(url);
      setUploadedPublicId(publicId);
      // Pasar del preview local (blob) a la URL final de Cloudinary.
      setPreview(url);
    } catch (err) {
      setLocalError(getErrorMessage(err));
      setPreview(null);
    } finally {
      setUploading(false);
      URL.revokeObjectURL(objectUrl);
    }
  };

  const clear = () => {
    deleteOrphan();
    setPreview(null);
    onChange("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const shownError = error ?? localError;

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />

      {shown ? (
        <div className="relative w-full overflow-hidden rounded-lg border">
          {/* eslint-disable-next-line @next/next/no-img-element -- preview de blob/URL en el form; el display público usa next/image (3.3) */}
          <img
            src={shown}
            alt="Preview del producto"
            className="h-48 w-full object-contain bg-gray-50"
          />

          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white">
              <Loader2 className="mr-2 animate-spin" size={18} />
              Subiendo...
            </div>
          )}

          {!uploading && (
            <div className="absolute right-2 top-2 flex gap-2">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="rounded-md bg-white/90 px-2 py-1 text-xs font-medium shadow hover:bg-white"
              >
                Cambiar
              </button>
              <button
                type="button"
                onClick={clear}
                aria-label="Quitar imagen"
                className="rounded-md bg-white/90 p-1 shadow hover:bg-white"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={`flex h-48 w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed text-gray-500 hover:border-gray-400 hover:text-gray-600 ${
            shownError ? "border-red-500" : "border-gray-300"
          }`}
        >
          <ImagePlus size={28} />
          <span className="text-sm">Subir imagen del producto</span>
          <span className="text-xs text-gray-400">PNG, JPG · máx 5MB</span>
        </button>
      )}

      {shownError && (
        <p className="mt-1 text-sm text-red-500">{shownError}</p>
      )}
    </div>
  );
}
