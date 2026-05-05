const STATUS_MAP = {
  pending: {
    label: "Pendiente",
    style: "bg-yellow-100 text-yellow-800",
  },
  paid: {
    label: "Pagado",
    style: "bg-blue-100 text-blue-800",
  },
  shipped: {
    label: "Enviado",
    style: "bg-purple-100 text-purple-800",
  },
  delivered: {
    label: "Entregado",
    style: "bg-green-100 text-green-800",
  },
  cancelled: {
    label: "Cancelado",
    style: "bg-red-100 text-red-800",
  },
} as const;

export function OrderStatusBadge({ status }: { status: keyof typeof STATUS_MAP }) {
  const config = STATUS_MAP[status];

  if (!config) {
  return <span>Estado desconocido</span>;
}

  return (
    <span className={`px-2 py-1 rounded text-sm ${config.style}`}>
      {config.label}
    </span>
  );
}