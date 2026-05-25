type Stat = { value: string; label: string };

export function StatsBar({ stats }: { stats: Stat[] }) {
  return (
    <section className="border-y border-stone-200/80 bg-white py-10 shadow-sm">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 sm:grid-cols-4 sm:px-6 lg:px-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-serif text-3xl font-semibold text-decades-orange sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-2 text-sm font-medium tracking-wide text-stone uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
