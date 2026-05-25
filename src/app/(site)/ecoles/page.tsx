import type { Metadata } from "next";
import { SchoolCard } from "@/components/schools/SchoolCard";
import { CityNav } from "@/components/ecoles/CityNav";
import { Button } from "@/components/ui/Button";
import { ImagePageHero } from "@/components/ui/ImagePageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { slugifyCity } from "@/lib/slugify";
import { getSchools, getSiteSettings } from "@/lib/sanity/fetch";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "Nos Écoles",
  description:
    "Découvrez les écoles chrétiennes du réseau LA DECADES au Sénégal, par ville.",
};

export default async function EcolesPage() {
  const [schools, settings] = await Promise.all([
    getSchools(),
    getSiteSettings(),
  ]);

  const byCity = schools.reduce<Record<string, typeof schools>>((acc, school) => {
    if (!acc[school.city]) acc[school.city] = [];
    acc[school.city].push(school);
    return acc;
  }, {});

  const cities = Object.keys(byCity).sort();
  const cityNav = cities.map((name) => ({
    name,
    slug: slugifyCity(name),
    count: byCity[name].length,
  }));

  const featured = schools.filter((s) => s.featured);
  const featuredIds = new Set(featured.map((s) => s._id));

  return (
    <>
      <ImagePageHero
        label="Réseau LA DECADES"
        title="Nos écoles"
        description="Des établissements chrétiens au Sénégal, unis par la foi, l'excellence et l'accompagnement de chaque enfant."
        imageUrl={settings.schoolsHeroImageUrl}
        size="tall"
      />

      {/* Chiffres clés */}
      <section className="border-b border-stone-200 bg-white py-8 shadow-sm">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-10 px-4 sm:gap-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="font-serif text-3xl font-semibold text-decades-orange">
              {schools.length}
            </p>
            <p className="mt-1 text-sm font-medium text-stone">
              École{schools.length > 1 ? "s" : ""} au Sénégal
            </p>
          </div>
          <div className="text-center">
            <p className="font-serif text-3xl font-semibold text-decades-orange">
              {cities.length}
            </p>
            <p className="mt-1 text-sm font-medium text-stone">
              Ville{cities.length > 1 ? "s" : ""} représentée{cities.length > 1 ? "s" : ""}
            </p>
          </div>
          <div className="text-center">
            <p className="font-serif text-3xl font-semibold text-decades-orange">
              1
            </p>
            <p className="mt-1 text-sm font-medium text-stone">Direction unie</p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-gradient-to-b from-cream/40 to-white py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <SectionHeading
            label="Le réseau"
            title="Une famille d'écoles chrétiennes"
            align="center"
          />
          <p className="prose-readable mx-auto mt-6 text-lg text-stone">
            {settings.schoolsIntro ??
              "Chaque école du réseau LA DECADES allie ancrage local et valeurs partagées."}
          </p>
        </div>
      </section>

      <CityNav cities={cityNav} />

      {/* Écoles en vedette */}
      {featured.length > 0 && (
        <section className="section-padding border-b border-stone-100 bg-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              label="À la une"
              title="Écoles mises en avant"
              description="Découvrez quelques établissements phares du réseau."
            />
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((school) => (
                <SchoolCard key={school._id} school={school} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Liste par ville */}
      <section className="section-padding">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Par ville"
            title="Toutes nos écoles"
            description="Retrouvez chaque établissement selon sa localisation au Sénégal."
            align="center"
          />

          <div className="mt-14 space-y-20">
            {cities.map((city) => {
              const slug = slugifyCity(city);
              return (
                <div key={city} id={`ville-${slug}`} className="scroll-mt-32">
                  <div className="mb-10 flex flex-col gap-4 border-b border-stone-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex items-center gap-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-decades-orange/10 text-decades-orange">
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </span>
                      <div>
                        <h2 className="font-serif text-3xl font-semibold text-ink sm:text-4xl">
                          {city}
                        </h2>
                        <p className="mt-1 text-sm text-stone">
                          {byCity[city].length} établissement
                          {byCity[city].length > 1 ? "s" : ""} chrétien
                          {byCity[city].length > 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {byCity[city]
                      .filter((s) => !featuredIds.has(s._id))
                      .map((school) => (
                        <SchoolCard key={school._id} school={school} />
                      ))}
                  </div>
                  {byCity[city].every((s) => featuredIds.has(s._id)) && (
                    <p className="mt-4 text-center text-sm text-stone">
                      Toutes les écoles de {city} sont présentées ci-dessus.
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-stone-200 bg-ink py-16 text-cream">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-serif text-3xl font-semibold">
            Une question sur nos écoles ?
          </h2>
          <p className="mt-4 text-cream/75">
            Inscriptions, visites ou renseignements — la direction et chaque
            établissement sont à votre disposition.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/contact">Nous contacter</Button>
            <Button
              href="/direction"
              variant="outline"
              className="border-cream/40 text-cream hover:bg-cream/10 hover:text-white"
            >
              La Direction
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
