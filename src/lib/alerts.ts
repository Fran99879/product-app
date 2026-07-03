/**
 * Fase 9 — Capa centralizada de feedback (SweetAlert2).
 *
 * Reglas (ver FASE-9 §8):
 *  - Mensajes en español, claros y amigables.
 *  - Nunca exponer errores técnicos crudos del backend.
 *  - Confirmaciones destructivas → botón rojo; normales → brand.
 *  - Toasts para acciones rápidas/no críticas; modales para lo importante.
 *
 * Toda la app debe consumir estos helpers en vez de llamar a Swal directo,
 * así el theming y la UX quedan consistentes.
 */
import Swal, { type SweetAlertIcon } from "sweetalert2";

const brand = "#7c5cff";
const danger = "#f87171";
const muted = "#7c8394";

/** Config común para modales (theming dark vía clase swal-app). */
const baseModal = {
  customClass: { popup: "swal-app" },
  buttonsStyling: true,
  reverseButtons: true,
  confirmButtonColor: brand,
  cancelButtonColor: muted,
} as const;

// ---------------------------------------------------------------------------
// Feedback simple
// ---------------------------------------------------------------------------

export function showSuccess(message: string, title = "Listo") {
  return Swal.fire({
    ...baseModal,
    icon: "success",
    title,
    text: message,
    confirmButtonText: "Aceptar",
  });
}

export function showError(
  message = "Ocurrió un error inesperado. Intentá nuevamente.",
  title = "Ups"
) {
  return Swal.fire({
    ...baseModal,
    icon: "error",
    title,
    text: message,
    confirmButtonText: "Entendido",
  });
}

export function showWarning(message: string, title = "Atención") {
  return Swal.fire({
    ...baseModal,
    icon: "warning",
    title,
    text: message,
    confirmButtonText: "Aceptar",
  });
}

export function showInfo(message: string, title = "Información") {
  return Swal.fire({
    ...baseModal,
    icon: "info",
    title,
    text: message,
    confirmButtonText: "Aceptar",
  });
}

// ---------------------------------------------------------------------------
// Confirmaciones
// ---------------------------------------------------------------------------

interface ConfirmOptions {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

/** Confirmación destructiva (botón rojo). Devuelve true si el usuario confirma. */
export async function confirmDelete({
  title = "¿Eliminar?",
  message = "Esta acción no se puede deshacer.",
  confirmText = "Sí, eliminar",
  cancelText = "Cancelar",
}: ConfirmOptions = {}): Promise<boolean> {
  const res = await Swal.fire({
    ...baseModal,
    icon: "warning",
    title,
    text: message,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    confirmButtonColor: danger,
    focusCancel: true,
  });
  return res.isConfirmed;
}

/** Confirmación normal (botón brand). Devuelve true si el usuario confirma. */
export async function confirmAction({
  title = "¿Confirmás la acción?",
  message = "",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
}: ConfirmOptions = {}): Promise<boolean> {
  const res = await Swal.fire({
    ...baseModal,
    icon: "question",
    title,
    text: message,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
  });
  return res.isConfirmed;
}

// ---------------------------------------------------------------------------
// Loading bloqueante
// ---------------------------------------------------------------------------

export function showLoading(message = "Procesando…") {
  Swal.fire({
    ...baseModal,
    title: message,
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => Swal.showLoading(),
  });
}

export function closeLoading() {
  Swal.close();
}

// ---------------------------------------------------------------------------
// Toasts (esquina superior, auto-cierre)
// ---------------------------------------------------------------------------

export type ToastType = "success" | "error" | "warning" | "info";

const ToastApi = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: { popup: "swal-toast" },
  didOpen: (el) => {
    el.addEventListener("mouseenter", Swal.stopTimer);
    el.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export function showToast(type: ToastType, message: string) {
  return ToastApi.fire({ icon: type as SweetAlertIcon, title: message });
}
