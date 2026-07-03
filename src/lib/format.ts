/** Formatea un monto en pesos argentinos con 2 decimales, consistente en toda la app. */
export function formatMoney(n: number): string {
  return `$${n.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
