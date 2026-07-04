"use client";

import { useState } from "react";
import { MapPinIcon, ViewfinderCircleIcon } from "@heroicons/react/24/outline";
import { useLocationStore } from "@/store/location-store";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { showToast, showError } from "@/lib/alerts";
import { detectDeviceLocation } from "@/lib/geolocation";
import { cn } from "@/lib/cn";

/**
 * Selector de ubicación de entrega (estilo Mercado Libre). Se guarda localmente
 * y viaja como dirección de envío al crear una orden, para que el vendedor
 * coordine el envío a domicilio.
 */
export function LocationSelector({ variant = "bar" }: { variant?: "bar" | "menu" }) {
  const { location, setLocation } = useLocationStore();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(location);
  const [detecting, setDetecting] = useState(false);

  const label = location || "Elegí dónde recibir";

  const handleDetect = async () => {
    setDetecting(true);
    try {
      const address = await detectDeviceLocation();
      setDraft(address);
      showToast("success", "Ubicación detectada");
    } catch (err) {
      showError(err instanceof Error ? err.message : "No pudimos obtener tu ubicación.");
    } finally {
      setDetecting(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const value = draft.trim();
    if (!value) return;
    setLocation(value);
    setOpen(false);
    showToast("success", "Ubicación guardada");
  };

  const openModal = () => {
    setDraft(location);
    setOpen(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        aria-label="Elegir ubicación de entrega"
        className={cn(
          "flex items-center gap-1.5 rounded-lg text-sm transition-colors",
          variant === "bar"
            ? "max-w-[180px] px-2 py-1.5 text-text-secondary hover:bg-hover hover:text-text-primary"
            : "w-full px-3 py-2.5 text-text-secondary hover:bg-hover hover:text-text-primary"
        )}
      >
        <MapPinIcon className="h-5 w-5 shrink-0 text-brand" />
        <span className="flex min-w-0 flex-col items-start leading-tight">
          <span className="text-[10px] uppercase tracking-wide text-text-muted">
            Enviar a
          </span>
          <span className="max-w-full truncate font-medium">{label}</span>
        </span>
      </button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="¿Dónde querés recibir tu pedido?"
        description="Se la pasamos al vendedor para coordinar el envío a domicilio."
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Button
            type="button"
            variant="secondary"
            fullWidth
            loading={detecting}
            onClick={handleDetect}
            leftIcon={<ViewfinderCircleIcon className="h-5 w-5" />}
          >
            {detecting ? "Detectando…" : "Usar mi ubicación actual"}
          </Button>

          <div className="flex items-center gap-3 text-xs text-text-muted">
            <span className="h-px flex-1 bg-border-subtle" />o cargala a mano
            <span className="h-px flex-1 bg-border-subtle" />
          </div>

          <Input
            autoFocus
            label="Dirección de entrega"
            placeholder="Ej: Av. Corrientes 1234, Palermo, CABA"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            leftIcon={<MapPinIcon />}
            hint="Detectala automáticamente o completá calle, número, barrio y ciudad."
          />
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={!draft.trim()}>
              Guardar ubicación
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
