import { DecadesLogo } from "./DecadesLogo";

type ImagePageHeroProps = {
  label?: string;
  title: string;
  description?: string;
  imageUrl?: string;
  size?: "default" | "tall";
};

const heights = {
  default: "min-h-[min(55vh,520px)]",
  tall: "min-h-[min(72vh,680px)] sm:min-h-[min(75vh,720px)]",
};

export function ImagePageHero({
  label,
  title,
  description,
  imageUrl,
  size = "default",
}: ImagePageHeroProps) {
  return (
    <section
      className={`relative flex ${heights[size]} items-end overflow-hidden bg-ink text-cream`}
    >
      {imageUrl ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/40 to-transparent" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-ink via-[#2a2018] to-decades-orange/35" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(217,95,35,0.2),transparent_55%)]" />
          <div className="pointer-events-none absolute right-8 top-1/2 hidden -translate-y-1/2 opacity-[0.07] lg:block">
            <DecadesLogo size="lg" />
          </div>
        </>
      )}

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-14 pt-32 sm:px-6 sm:pb-16 sm:pt-36 lg:px-8">
        {label && (
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-decades-orange">
            {label}
          </p>
        )}
        <h1 className="mt-3 max-w-3xl font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-cream/85 sm:text-xl">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
