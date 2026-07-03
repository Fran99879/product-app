"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { confirmPayment } from "@/features/payments/services/payments";
import { PageContainer } from "@/components/layout/page-container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/ui/states";

function Resultado() {
  const params = useSearchParams();
  const orderId = params.get("order") ?? "";
  const paymentId =
    params.get("payment_id") ?? params.get("collection_id") ?? undefined;
  // Estado que reporta MP en la URL de retorno (approved/pending/rejected).
  const mpStatus =
    params.get("status") ?? params.get("collection_status") ?? undefined;

  const [state, setState] = useState<"loading" | "paid" | "pending" | "failed">(
    "loading"
  );

  useEffect(() => {
    let active = true;
    if (!orderId) {
      setState("failed");
      return;
    }
    // Confirmamos contra el backend (que consulta el pago real en MP), sin
    // confiar solo en el query param de la URL.
    confirmPayment(orderId, paymentId ?? undefined)
      .then((res) => {
        if (!active) return;
        if (res.status === "paid") setState("paid");
        else if (mpStatus === "pending" || mpStatus === "in_process")
          setState("pending");
        else setState("failed");
      })
      .catch(() => active && setState("failed"));
    return () => {
      active = false;
    };
  }, [orderId, paymentId, mpStatus]);

  if (state === "loading") {
    return <LoadingState message="Confirmando tu pago…" />;
  }

  const config = {
    paid: {
      icon: <CheckCircleIcon />,
      tone: "bg-success-soft text-success",
      title: "¡Pago aprobado!",
      desc: "Tu pago se acreditó y el vendedor ya fue notificado. Podés seguir el estado en Mis pedidos.",
    },
    pending: {
      icon: <ClockIcon />,
      tone: "bg-warning-soft text-warning",
      title: "Pago pendiente",
      desc: "Tu pago está siendo procesado. Te avisaremos cuando se acredite. Podés revisar el estado en Mis pedidos.",
    },
    failed: {
      icon: <XCircleIcon />,
      tone: "bg-error-soft text-error",
      title: "No pudimos confirmar el pago",
      desc: "El pago no se completó o fue rechazado. Podés volver a intentarlo desde Mis pedidos.",
    },
  }[state];

  return (
    <Card className="mx-auto max-w-md text-center">
      <div
        className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${config.tone} [&>svg]:h-10 [&>svg]:w-10`}
      >
        {config.icon}
      </div>
      <h1 className="mt-5 text-2xl font-bold text-text-primary">
        {config.title}
      </h1>
      <p className="mt-2 text-sm text-text-secondary">{config.desc}</p>
      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
        <Link href="/orders">
          <Button fullWidth>Ir a mis pedidos</Button>
        </Link>
        <Link href="/">
          <Button variant="secondary" fullWidth>
            Seguir comprando
          </Button>
        </Link>
      </div>
    </Card>
  );
}

export default function CheckoutResultPage() {
  return (
    <PageContainer size="narrow">
      <Suspense fallback={<LoadingState message="Cargando…" />}>
        <Resultado />
      </Suspense>
    </PageContainer>
  );
}
