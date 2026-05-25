import Link from "next/link";
import type { School } from "@/lib/sanity/types";

export function SchoolCard({ school }: { school: School }) {
  return (
    <Link
      href={`/ecoles/${school.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-stone-200/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-decades-orange/30"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-cream to-stone-100">
        {school.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={school.imageUrl}
            alt={school.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-ink/5 to-decades-orange/10">
            <span className="font-serif text-5xl text-decades-orange/30">
              {school.name.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-decades-orange shadow">
          {school.city}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-xl font-semibold text-ink transition-colors group-hover:text-decades-orange">
          {school.name}
        </h3>
        {school.levels && school.levels.length > 0 && (
          <p className="mt-2 text-sm text-stone">{school.levels.join(" · ")}</p>
        )}
        {school.description && (
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-stone">
            {school.description}
          </p>
        )}
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-decades-orange">
          Découvrir
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
