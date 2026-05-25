"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { HeroSlide } from "@/lib/hero-slides";

const INTERVAL_MS = 7000;

type HeroCarouselProps = {
  slides: HeroSlide[];
};

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const goTo = useCallback(
    (index: number) => {
      setActive(((index % count) + count) % count);
    },
    [count],
  );

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (paused || count <= 1) return;
    const timer = setInterval(next, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [paused, count, next]);

  if (count === 0) return null;

  return (
    <section
      className="hero-carousel relative h-[min(92vh,820px)] w-full overflow-hidden bg-ink"
      aria-roledescription="carousel"
      aria-label="Présentation LA DECADES"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, index) => {
        const isActive = index === active;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "z-10 opacity-100" : "z-0 opacity-0"
            }`}
            aria-hidden={!isActive}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} sur ${count}`}
          >
            {slide.imageUrl ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.imageUrl}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/40" />
              </>
            ) : (
              <div
                className={`absolute inset-0 bg-gradient-to-br ${
                  index % 2 === 0
                    ? "from-ink via-[#2a2018] to-decades-orange/40"
                    : "from-[#1a1510] via-ink to-decades-orange/25"
                }`}
              />
            )}

            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(217,95,35,0.15),transparent_55%)]" />

            <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-4 pb-24 pt-28 sm:px-6 lg:px-8">
              <p className="animate-fade-up text-sm font-semibold uppercase tracking-[0.2em] text-decades-orange">
                {slide.eyebrow}
              </p>
              <h1 className="animate-fade-up animation-delay-100 mt-4 max-w-3xl font-serif text-4xl font-semibold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
                {slide.title}
              </h1>
              <p className="animate-fade-up animation-delay-200 mt-6 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">
                {slide.description}
              </p>
              <div className="animate-fade-up animation-delay-300 mt-10 flex flex-wrap gap-4">
                {slide.ctaPrimary && (
                  <Link
                    href={slide.ctaPrimary.href}
                    className="inline-flex items-center justify-center rounded-full bg-decades-orange px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-decades-orange/25 transition hover:bg-decades-orange-dark"
                  >
                    {slide.ctaPrimary.label}
                  </Link>
                )}
                {slide.ctaSecondary && (
                  <Link
                    href={slide.ctaSecondary.href}
                    className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                  >
                    {slide.ctaSecondary.label}
                  </Link>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Logo watermark */}
      <div className="pointer-events-none absolute bottom-28 right-4 z-20 hidden opacity-20 lg:block lg:right-12">
        <Image
          src="/logo.png"
          alt=""
          width={120}
          height={160}
          className="h-32 object-contain"
          style={{ width: "auto", height: "auto" }}
          aria-hidden
        />
      </div>

      {/* Controls */}
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-3 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-ink/40 text-white backdrop-blur-md transition hover:bg-ink/60 sm:left-6"
            aria-label="Diapositive précédente"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-3 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-ink/40 text-white backdrop-blur-md transition hover:bg-ink/60 sm:right-6"
            aria-label="Diapositive suivante"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goTo(index)}
                className={`h-2 rounded-full transition-all ${
                  index === active
                    ? "w-8 bg-decades-orange"
                    : "w-2 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Aller à la diapositive ${index + 1}`}
                aria-current={index === active}
              />
            ))}
          </div>

          <div className="absolute bottom-8 right-4 z-30 hidden font-mono text-xs text-white/50 sm:block sm:right-8">
            {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </div>
        </>
      )}
    </section>
  );
}
