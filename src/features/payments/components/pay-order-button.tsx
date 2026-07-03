"use client";

import { useState } from "react";
import { CreditCardIcon } from "@heroicons/react/24/outline";
import { createPreference } from "../services/payments";
import { Button } from "@/components/ui/button";
import { showError } from "@/lib/alerts";
import { getErrorMessage } from "@/lib/utils/get-error-message";

/**
 * Botón para pagar una orden con Mercado Pago. Crea la preferencia en el
 * backend (con el token del vendedor dueño) y redirige al checkout de MP.
 */
export function PayOrderButton({ orderId }: { orderId: string }) {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    try {
      const { initPoint, sandboxInitPoint } = await createPreference(orderId);
      const url = initPoint || sandboxInitPoint;
      if (!url) throw new Error("No se pudo iniciar el pago");
      window.location.href = url;
    } catch (err) {
      showError(getErrorMessage(err));
      setLoading(false);
    }
  };

  return (
    <Button
      size="sm"
      onClick={handlePay}
      loading={loading}
      leftIcon={<CreditCardIcon className="h-4 w-4" />}
    >
      {loading ? "Redirigiendo…" : "Pagar con Mercado Pago"}
    </Button>
  );
}
