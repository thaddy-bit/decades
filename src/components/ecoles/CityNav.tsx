"use client";

type CityNavProps = {
  cities: { name: string; slug: string; count: number }[];
};

export function CityNav({ cities }: CityNavProps) {
  if (cities.length <= 1) return null;

  return (
    <nav
      className="sticky top-[57px] z-40 border-b border-stone-200 bg-white/95 py-3 backdrop-blur-md"
      aria-label="Navigation par ville"
    >
      <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 scrollbar-none sm:px-6 lg:px-8">
        {cities.map((city) => (
          <a
            key={city.slug}
            href={`#ville-${city.slug}`}
            className="shrink-0 rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-sm font-medium text-ink transition hover:border-decades-orange hover:bg-cream hover:text-decades-orange"
          >
            {city.name}
            <span className="ml-1.5 text-xs text-stone">({city.count})</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
