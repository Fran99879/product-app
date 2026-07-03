"use client";

import {
  Squares2X2Icon,
  DevicePhoneMobileIcon,
  DeviceTabletIcon,
  ComputerDesktopIcon,
  TvIcon,
  ClockIcon,
  SpeakerWaveIcon,
  PuzzlePieceIcon,
  CircleStackIcon,
  WifiIcon,
  CameraIcon,
  CpuChipIcon,
  RectangleGroupIcon,
  MusicalNoteIcon,
} from "@heroicons/react/24/outline";
import { CATEGORIES, CATEGORY_LABELS } from "../constants/categories";
import type { CategoryFilter } from "../hooks/use-product-filters";
import { cn } from "@/lib/cn";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  smartphone: DevicePhoneMobileIcon,
  tablet: DeviceTabletIcon,
  laptop: ComputerDesktopIcon,
  desktop: ComputerDesktopIcon,
  monitor: RectangleGroupIcon,
  tv: TvIcon,
  smartwatch: ClockIcon,
  headphones: MusicalNoteIcon,
  speaker: SpeakerWaveIcon,
  gaming: PuzzlePieceIcon,
  storage: CircleStackIcon,
  networking: WifiIcon,
  camera: CameraIcon,
  accessories: CpuChipIcon,
  other: Squares2X2Icon,
};

interface Props {
  category: CategoryFilter;
  onCategoryChange: (value: CategoryFilter) => void;
}

/** Tira de "burbujas" de categorías, con scroll horizontal en mobile. */
export function CategoryCircles({ category, onCategoryChange }: Props) {
  const items: Array<{ key: CategoryFilter; label: string; Icon: React.ComponentType<{ className?: string }> }> = [
    { key: "all", label: "Todas", Icon: Squares2X2Icon },
    ...CATEGORIES.map((c) => ({
      key: c as CategoryFilter,
      label: CATEGORY_LABELS[c],
      Icon: ICONS[c] ?? Squares2X2Icon,
    })),
  ];

  return (
    <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {items.map(({ key, label, Icon }) => {
        const active = category === key;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onCategoryChange(key)}
            aria-pressed={active}
            className="group flex w-16 shrink-0 flex-col items-center gap-1.5"
          >
            <span
              className={cn(
                "flex h-14 w-14 items-center justify-center rounded-full border transition-all duration-200 [&>svg]:h-6 [&>svg]:w-6",
                active
                  ? "border-brand bg-brand-soft text-brand shadow-[0_0_0_3px_var(--brand-soft)]"
                  : "border-border-subtle bg-elevated text-text-secondary group-hover:border-border-strong group-hover:bg-hover group-hover:text-text-primary"
              )}
            >
              <Icon />
            </span>
            <span
              className={cn(
                "line-clamp-1 text-center text-[11px] leading-tight transition-colors",
                active ? "font-medium text-brand" : "text-text-muted"
              )}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
