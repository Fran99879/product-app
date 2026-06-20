"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";

interface SpecsEditorProps {
  value?: Record<string, string>;
  onChange: (specs: Record<string, string>) => void;
}

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

  const handleUpdateSpec = (
    index: number,
    key: string,
    value: string
  ) => {
    const updated = [...specs];
    updated[index] = [key, value];
    setSpecs(updated);
    onChange(Object.fromEntries(updated));
  };

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Especificaciones Técnicas</h3>
        <span className="text-sm text-muted-foreground">{specs.length} specs</span>
      </div>

      {/* Lista de especificaciones existentes */}
      <div className="space-y-2">
        {specs.map((spec, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={spec[0]}
              onChange={(e) =>
                handleUpdateSpec(index, e.target.value, spec[1])
              }
              placeholder="Ej: RAM"
              className="flex-1 rounded-lg border p-2 text-sm"
            />
            <input
              type="text"
              value={spec[1]}
              onChange={(e) =>
                handleUpdateSpec(index, spec[0], e.target.value)
              }
              placeholder="Ej: 8GB"
              className="flex-1 rounded-lg border p-2 text-sm"
            />
            <button
              type="button"
              onClick={() => handleRemoveSpec(index)}
              className="rounded-lg border border-red-200 bg-red-50 p-2 text-red-600 hover:bg-red-100 dark:border-red-800 dark:bg-red-950 dark:text-red-400 dark:hover:bg-red-900"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Formulario para agregar nueva especificación */}
      <div className="flex gap-2 border-t pt-4">
        <input
          type="text"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
          placeholder="Nueva clave (Ej: Procesador)"
          className="flex-1 rounded-lg border p-2 text-sm"
          onKeyPress={(e) => {
            if (e.key === "Enter") handleAddSpec();
          }}
        />
        <input
          type="text"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          placeholder="Valor (Ej: Apple M2)"
          className="flex-1 rounded-lg border p-2 text-sm"
          onKeyPress={(e) => {
            if (e.key === "Enter") handleAddSpec();
          }}
        />
        <button
          type="button"
          onClick={handleAddSpec}
          className="rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-green-700 hover:bg-green-100 dark:border-green-800 dark:bg-green-950 dark:text-green-400 dark:hover:bg-green-900"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}
