"use client";

import type { PostType } from "@/lib/sanity/types";

type FilterItem = {
  value: PostType | "all";
  label: string;
  count: number;
};

type PostTypeNavProps = {
  filters: FilterItem[];
  activeType?: PostType;
};

export function PostTypeNav({ filters, activeType }: PostTypeNavProps) {
  return (
    <nav
      className="sticky top-[57px] z-40 border-b border-stone-200 bg-white/95 py-3 backdrop-blur-md"
      aria-label="Filtrer les actualités"
    >
      <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 scrollbar-none sm:flex-wrap sm:justify-center sm:px-6 lg:px-8">
        {filters.map((f) => {
          const href =
            f.value === "all" ? "/actualites" : `/actualites?type=${f.value}`;
          const active =
            f.value === "all" ? !activeType : activeType === f.value;
          return (
            <a
              key={f.value}
              href={href}
              className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                active
                  ? "bg-decades-orange text-white shadow-md shadow-decades-orange/20"
                  : "bg-stone-100 text-stone hover:bg-cream hover:text-ink"
              }`}
            >
              {f.label}
              <span
                className={`rounded-full px-1.5 py-0.5 text-xs ${
                  active ? "bg-white/25 text-white" : "bg-white text-stone"
                }`}
              >
                {f.count}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
