"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getMpConnection,
  connectMp,
  disconnectMp,
} from "../services/payments";
import { showToast, showError } from "@/lib/alerts";

export function useMpConnection() {
  return useQuery({
    queryKey: ["mp-connection"],
    queryFn: getMpConnection,
  });
}

export function useConnectMp() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: connectMp,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["mp-connection"] });
      showToast("success", "Mercado Pago conectado");
    },
    onError: () =>
      showError(
        "No pudimos validar el Access Token. Revisá que sea correcto y esté activo."
      ),
  });
}

export function useDisconnectMp() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: disconnectMp,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["mp-connection"] });
      showToast("info", "Mercado Pago desconectado");
    },
  });
}
