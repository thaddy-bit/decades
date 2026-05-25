type PageHeroProps = {
  label?: string;
  title: string;
  description?: string;
  variant?: "light" | "dark";
};

export function PageHero({
  label,
  title,
  description,
  variant = "dark",
}: PageHeroProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={
        isDark
          ? "relative overflow-hidden bg-ink pb-20 pt-28 text-cream sm:pb-24 sm:pt-32"
          : "relative overflow-hidden border-b border-stone-200 bg-gradient-to-b from-cream/80 to-white pb-16 pt-28 sm:pb-20 sm:pt-32"
      }
    >
      {isDark && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(217,95,35,0.12),transparent_50%)]" />
      )}
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {label && (
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-decades-orange">
            {label}
          </p>
        )}
        <h1
          className={`mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl ${
            isDark ? "text-white" : "text-ink"
          }`}
        >
          {title}
        </h1>
        {description && (
          <p
            className={`mt-5 max-w-2xl text-lg leading-relaxed ${
              isDark ? "text-cream/80" : "text-stone"
            }`}
          >
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
