"use client";

import { useState } from "react";
import {
  CheckCircleIcon,
  CreditCardIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import {
  useMpConnection,
  useConnectMp,
  useDisconnectMp,
} from "../hooks/use-mp-connection";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { confirmDelete } from "@/lib/alerts";

/**
 * Panel del vendedor para conectar su cuenta de Mercado Pago pegando su
 * Access Token (token manual por seller). Los cobros de sus productos van
 * directo a su cuenta.
 */
export function MercadoPagoCard() {
  const { data, isLoading } = useMpConnection();
  const connect = useConnectMp();
  const disconnect = useDisconnectMp();
  const [token, setToken] = useState("");

  const connected = data?.connected;

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) return;
    connect.mutate(token.trim(), { onSuccess: () => setToken("") });
  };

  const handleDisconnect = async () => {
    const ok = await confirmDelete({
      title: "¿Desconectar Mercado Pago?",
      message: "Dejarás de recibir pagos hasta que vuelvas a conectar tu cuenta.",
      confirmText: "Desconectar",
    });
    if (ok) disconnect.mutate();
  };

  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-info-soft text-info">
            <CreditCardIcon className="h-6 w-6" />
          </span>
          <div>
            <h2 className="text-base font-semibold text-text-primary">
              Cobros con Mercado Pago
            </h2>
            <p className="mt-0.5 text-sm text-text-secondary">
              Conectá tu cuenta para cobrar tus ventas directamente.
            </p>
          </div>
        </div>
        {isLoading ? (
          <Skeleton className="h-6 w-24" />
        ) : connected ? (
          <Badge tone="success" icon={<CheckCircleIcon className="h-3.5 w-3.5" />}>
            Conectada
          </Badge>
        ) : (
          <Badge tone="warning">Sin conectar</Badge>
        )}
      </div>

      {!isLoading && (
        <div className="mt-5">
          {connected ? (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border-subtle bg-surface p-4">
              <p className="text-sm text-text-secondary">
                Tu cuenta está lista para recibir pagos. 🎉
              </p>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleDisconnect}
                loading={disconnect.isPending}
                className="text-error"
              >
                Desconectar
              </Button>
            </div>
          ) : (
            <form onSubmit={handleConnect} className="space-y-3">
              <Input
                label="Access Token de Mercado Pago"
                placeholder="APP_USR-..."
                value={token}
                onChange={(e) => setToken(e.target.value)}
                hint="Lo encontrás en tu panel de Mercado Pago → Tus integraciones → Credenciales de producción."
                leftIcon={<LinkIcon />}
              />
              <Button
                type="submit"
                loading={connect.isPending}
                disabled={!token.trim()}
              >
                Conectar cuenta
              </Button>
            </form>
          )}
        </div>
      )}
    </Card>
  );
}
