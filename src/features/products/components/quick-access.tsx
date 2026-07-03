"use client";

import Link from "next/link";
import {
  TagIcon,
  FireIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import type { SortOption } from "../hooks/use-product-filters";

interface Props {
  onSortChange: (value: SortOption) => void;
  activeSort: SortOption;
}

/**
 * Accesos rápidos tipo "burbujas": Ofertas (ordena por precio ascendente),
 * Más comprados (ordena por mejor valorados) y Ayuda (centro de ayuda).
 */
export function QuickAccess({ onSortChange, activeSort }: Props) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:max-w-xl">
      <QuickCard
        icon={<TagIcon />}
        title="Ofertas"
        subtitle="Menor precio"
        tone="brand"
        active={activeSort === "price-asc"}
        onClick={() => onSortChange("price-asc")}
      />
      <QuickCard
        icon={<FireIcon />}
        title="Más comprados"
        subtitle="Mejor valorados"
        tone="warning"
        active={activeSort === "rate-desc"}
        onClick={() => onSortChange("rate-desc")}
      />
      <QuickCard
        icon={<QuestionMarkCircleIcon />}
        title="Ayuda"
        subtitle="Centro de ayuda"
        tone="info"
        href="/ayuda"
      />
    </div>
  );
}

const TONES = {
  brand: "bg-brand-soft text-brand",
  warning: "bg-warning-soft text-warning",
  info: "bg-info-soft text-info",
} as const;

function QuickCard({
  icon,
  title,
  subtitle,
  tone,
  active,
  onClick,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  tone: keyof typeof TONES;
  active?: boolean;
  onClick?: () => void;
  href?: string;
}) {
  const inner = (
    <>
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full [&>svg]:h-5 [&>svg]:w-5 ${TONES[tone]}`}
      >
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold text-text-primary">
          {title}
        </span>
        <span className="block truncate text-xs text-text-muted">
          {subtitle}
        </span>
      </span>
    </>
  );

  const className = `flex items-center gap-2.5 rounded-2xl border p-3 text-left transition-all duration-200 ${
    active
      ? "border-brand bg-brand-soft/40"
      : "border-border-subtle bg-elevated hover:border-border-strong hover:bg-hover"
  }`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {inner}
    </button>
  );
}
