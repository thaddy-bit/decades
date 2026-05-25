import { FeaturedPostCard } from "@/components/actualites/FeaturedPostCard";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { PostCard } from "@/components/posts/PostCard";
import { SchoolCard } from "@/components/schools/SchoolCard";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatsBar } from "@/components/ui/StatsBar";
import { DECADES_ACRONYM_MEANING } from "@/lib/decades";
import { getHomePageData } from "@/lib/sanity/fetch";

export const revalidate = 120;

export default async function HomePage() {
  const { settings, schools, featured, spotlightPost, latestPosts, heroSlides, cities } =
    await getHomePageData();

  return (
    <>
      <HeroCarousel slides={heroSlides} />

      <StatsBar
        stats={[
          { value: String(schools.length || "4+"), label: "Écoles" },
          { value: String(cities.length || "4+"), label: "Villes" },
          { value: "100%", label: "Valeurs chrétiennes" },
          { value: "1", label: "Direction unie" },
        ]}
      />

      <section className="section-padding">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Nos établissements"
            title="Des écoles chrétiennes à travers le Sénégal"
            description="Chaque école du réseau LA DECADES allie excellence académique, valeurs chrétiennes et accompagnement attentif de chaque élève."
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((school) => (
              <SchoolCard key={school._id} school={school} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button href="/ecoles" variant="outline">
              Explorer toutes les écoles
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding bg-ink text-cream">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                label="LA DECADES"
                title="Une direction, une vision"
                description={
                  settings.mission ??
                  "Former des jeunes éclairés par la foi et prêts à servir leur communauté."
                }
                light
              />
              <p className="prose-readable mt-6 text-cream/75">
                <span className="font-medium text-cream">DECADES</span> —{" "}
                {settings.acronymMeaning ?? DECADES_ACRONYM_MEANING} Un réseau
                qui fédère des établissements chrétiens des Assemblées de Dieu,
                avec la même exigence et la même humanité.
              </p>
              <Button href="/direction" variant="primary" className="mt-8">
                Découvrir la direction
              </Button>
            </div>
            {settings.values && settings.values.length > 0 && (
              <ul className="grid gap-4 sm:grid-cols-2">
                {settings.values.map((value, i) => (
                  <li
                    key={value}
                    className="rounded-2xl border border-cream/10 bg-white/5 px-5 py-4 backdrop-blur-sm"
                  >
                    <span className="font-mono text-xs text-decades-orange">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-2 font-serif text-lg font-medium text-white">
                      {value}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Actualités"
            title="Vie du réseau & communication"
            description="Événements, annonces, partenariats et articles pour suivre l'actualité de nos écoles."
            align="center"
          />

          {spotlightPost && (
            <div className="mt-12">
              <p className="mb-6 text-center text-sm font-bold uppercase tracking-[0.2em] text-decades-orange">
                À la une
              </p>
              <FeaturedPostCard post={spotlightPost} />
            </div>
          )}

          {latestPosts.length > 0 && (
            <div className={spotlightPost ? "mt-14" : "mt-12"}>
              {spotlightPost && (
                <SectionHeading
                  label="Récent"
                  title="Autres actualités"
                  align="center"
                />
              )}
              <div
                className={`grid gap-8 sm:grid-cols-2 ${spotlightPost ? "mt-10" : ""} ${!spotlightPost ? "lg:grid-cols-3" : ""}`}
              >
                {latestPosts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            </div>
          )}

          {!spotlightPost && latestPosts.length === 0 && (
            <p className="mt-12 text-center text-stone">
              Aucune actualité pour le moment.
            </p>
          )}

          <div className="mt-12 text-center">
            <Button href="/actualites">Toutes les actualités</Button>
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-gradient-to-br from-cream/60 to-white py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-serif text-3xl font-semibold text-ink sm:text-4xl">
            Rejoignez le réseau LA DECADES
          </h2>
          <p className="prose-readable mx-auto mt-4 text-stone">
            Inscriptions, partenariats ou simple demande d&apos;information —
            notre équipe est à votre écoute.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/contact">Nous contacter</Button>
            <Button href="/ecoles" variant="outline">
              Trouver une école
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
