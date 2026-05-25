import type { Metadata } from "next";
import Link from "next/link";
import { DirectionHistorySection } from "@/components/direction/DirectionHistorySection";
import { PortableTextContent } from "@/components/content/PortableTextContent";
import { ImagePageHero } from "@/components/ui/ImagePageHero";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { resolveDirectionContent } from "@/lib/direction-content";
import { getSchools, getSiteSettings } from "@/lib/sanity/fetch";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "La Direction",
  description:
    "Découvrez LA DECADES, direction d'écoles chrétiennes des Assemblées de Dieu au Sénégal : mission, vision et valeurs.",
};

export default async function DirectionPage() {
  const [settings, schools] = await Promise.all([
    getSiteSettings(),
    getSchools(),
  ]);

  const content = resolveDirectionContent(settings);
  const cities = [...new Set(schools.map((s) => s.city))];

  return (
    <>
      <ImagePageHero
        label={content.hero.label}
        title={content.hero.title}
        description={content.hero.description}
        imageUrl={content.hero.imageUrl}
        size="tall"
      />

      <section className="border-b border-stone-200 bg-white py-8 shadow-sm">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-10 px-4 sm:gap-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="font-serif text-3xl font-semibold text-decades-orange">
              {schools.length}+
            </p>
            <p className="mt-1 text-sm font-medium text-stone">Écoles du réseau</p>
          </div>
          <div className="text-center">
            <p className="font-serif text-3xl font-semibold text-decades-orange">
              {cities.length}+
            </p>
            <p className="mt-1 text-sm font-medium text-stone">Villes au Sénégal</p>
          </div>
          <div className="text-center">
            <p className="font-serif text-3xl font-semibold text-decades-orange">
              100%
            </p>
            <p className="mt-1 text-sm font-medium text-stone">Valeurs chrétiennes</p>
          </div>
        </div>
      </section>

      <DirectionHistorySection
        sectionLabel={content.history.sectionLabel}
        title={content.history.title}
        intro={content.history.intro}
        body={content.history.body}
        imageUrl={content.history.imageUrl}
        imageCaption={content.history.imageCaption}
        foundedYear={content.history.foundedYear}
        acronymMeaning={content.history.acronymMeaning}
      />

      <section className="section-padding">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <article className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-md ring-1 ring-stone-200/60 transition hover:shadow-lg">
              <div className="absolute left-0 top-0 h-full w-1 bg-decades-orange" />
              <div className="pl-4">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-decades-orange/10 text-decades-orange">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </span>
                <SectionHeading
                  label={content.mission.label}
                  title={content.mission.title}
                />
                <p className="prose-readable mt-5">{content.mission.text}</p>
              </div>
            </article>

            <article className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-md ring-1 ring-stone-200/60 transition hover:shadow-lg">
              <div className="absolute left-0 top-0 h-full w-1 bg-decades-orange" />
              <div className="pl-4">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-decades-orange/10 text-decades-orange">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </span>
                <SectionHeading
                  label={content.vision.label}
                  title={content.vision.title}
                />
                <p className="prose-readable mt-5">{content.vision.text}</p>
              </div>
            </article>
          </div>

          <div className="mt-16 overflow-hidden rounded-2xl bg-ink text-cream lg:grid lg:grid-cols-2">
            <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
              <SectionHeading
                label={content.identity.label}
                title={content.identity.title}
                description={content.identity.description}
                light
              />
              <Button
                href={content.identity.buttonHref}
                variant="primary"
                className="mt-8 w-fit"
              >
                {content.identity.buttonLabel}
              </Button>
            </div>
            <div className="relative min-h-[240px] bg-gradient-to-br from-decades-orange/30 to-ink lg:min-h-full">
              <div className="absolute inset-0 flex items-center justify-center p-10">
                <blockquote className="text-center font-serif text-xl italic leading-relaxed text-cream/90 sm:text-2xl">
                  « {content.identity.quote} »
                </blockquote>
              </div>
            </div>
          </div>

          {content.values.items.length > 0 && (
            <div className="mt-20">
              <SectionHeading
                label={content.values.label}
                title={content.values.title}
                description={content.values.description}
                align="center"
              />
              <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {content.values.items.map((value, i) => (
                  <div
                    key={value}
                    className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cream/80 to-white p-6 ring-1 ring-stone-200/80 transition hover:ring-decades-orange/40"
                  >
                    <span className="font-mono text-3xl font-bold text-decades-orange/25">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-3 font-serif text-xl font-semibold text-ink">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {content.about.body && content.about.body.length > 0 && (
            <article className="mx-auto mt-20 max-w-3xl">
              <div className="rounded-2xl border border-stone-200/80 bg-white p-8 shadow-sm sm:p-10">
                <SectionHeading
                  label={content.about.label}
                  title={content.about.title}
                />
                <div className="mt-8 border-t border-stone-100 pt-8">
                  <PortableTextContent value={content.about.body} />
                </div>
              </div>
            </article>
          )}
        </div>
      </section>

      <section className="border-t border-stone-200 bg-gradient-to-br from-cream/70 to-white py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-serif text-3xl font-semibold text-ink">
            {content.cta.title}
          </h2>
          <p className="mt-4 text-stone">{content.cta.description}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href={content.cta.primaryHref}>{content.cta.primaryLabel}</Button>
            <Link
              href={content.cta.secondaryHref}
              className="inline-flex items-center justify-center rounded-full border-2 border-decades-orange/80 px-7 py-3 text-sm font-semibold text-decades-orange transition hover:bg-cream"
            >
              {content.cta.secondaryLabel}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
