"use client";

import { useState } from "react";
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@/components/ui/icon-button";

interface SpecsEditorProps {
  value?: Record<string, string>;
  onChange: (specs: Record<string, string>) => void;
}

const inputClass =
  "flex-1 rounded-lg border border-border-strong bg-surface p-2 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export function SpecsEditor({ value = {}, onChange }: SpecsEditorProps) {
  const [specs, setSpecs] = useState<Array<[string, string]>>(
    Object.entries(value)
  );
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  const handleAddSpec = () => {
    if (newKey.trim() && newValue.trim()) {
      const updated: Array<[string, string]> = [
        ...specs,
        [newKey.trim(), newValue.trim()],
      ];
      setSpecs(updated);
      onChange(Object.fromEntries(updated));
      setNewKey("");
      setNewValue("");
    }
  };

  const handleRemoveSpec = (index: number) => {
    const updated = specs.filter((_, i) => i !== index);
    setSpecs(updated);
    onChange(Object.fromEntries(updated));
  };

  const handleUpdateSpec = (index: number, key: string, value: string) => {
    const updated = [...specs];
    updated[index] = [key, value];
    setSpecs(updated);
    onChange(Object.fromEntries(updated));
  };

  return (
    <div className="space-y-4 rounded-xl border border-border-subtle bg-surface/50 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary">
          Especificaciones Técnicas
        </h3>
        <span className="text-xs text-text-muted">{specs.length} specs</span>
      </div>

      {/* Lista de especificaciones existentes */}
      <div className="space-y-2">
        {specs.map((spec, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={spec[0]}
              onChange={(e) => handleUpdateSpec(index, e.target.value, spec[1])}
              placeholder="Ej: RAM"
              className={inputClass}
            />
            <input
              type="text"
              value={spec[1]}
              onChange={(e) => handleUpdateSpec(index, spec[0], e.target.value)}
              placeholder="Ej: 8GB"
              className={inputClass}
            />
            <IconButton
              type="button"
              variant="danger"
              label="Quitar especificación"
              icon={<XMarkIcon />}
              onClick={() => handleRemoveSpec(index)}
            />
          </div>
        ))}
      </div>

      {/* Formulario para agregar nueva especificación */}
      <div className="flex gap-2 border-t border-border-subtle pt-4">
        <input
          type="text"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
          placeholder="Nueva clave (Ej: Procesador)"
          className={inputClass}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddSpec();
            }
          }}
        />
        <input
          type="text"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          placeholder="Valor (Ej: Apple M2)"
          className={inputClass}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddSpec();
            }
          }}
        />
        <IconButton
          type="button"
          variant="solid"
          label="Agregar especificación"
          icon={<PlusIcon />}
          onClick={handleAddSpec}
        />
      </div>
    </div>
  );
}
