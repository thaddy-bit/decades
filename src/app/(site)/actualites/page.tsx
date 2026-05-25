import type { Metadata } from "next";
import { FeaturedPostCard } from "@/components/actualites/FeaturedPostCard";
import { PostTypeNav } from "@/components/actualites/PostTypeNav";
import { PostCard } from "@/components/posts/PostCard";
import { Button } from "@/components/ui/Button";
import { ImagePageHero } from "@/components/ui/ImagePageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPosts, getSiteSettings } from "@/lib/sanity/fetch";
import { formatPostType } from "@/lib/utils";
import type { PostType } from "@/lib/sanity/types";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "Actualités",
  description:
    "Articles, annonces, partenariats, événements et publicités du réseau LA DECADES.",
};

const filterTypes: { value: PostType | "all"; label: string }[] = [
  { value: "all", label: "Tout" },
  { value: "article", label: "Articles" },
  { value: "annonce", label: "Annonces" },
  { value: "evenement", label: "Événements" },
  { value: "partenariat", label: "Partenariats" },
  { value: "publicite", label: "Publicités" },
];

function countByType(posts: Awaited<ReturnType<typeof getPosts>>, type: PostType) {
  return posts.filter((p) => p.postType === type).length;
}

export default async function ActualitesPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const [posts, settings] = await Promise.all([getPosts(), getSiteSettings()]);

  const activeType = type as PostType | undefined;
  const isValidFilter =
    activeType && filterTypes.some((f) => f.value === activeType);
  const filtered = isValidFilter
    ? posts.filter((p) => p.postType === activeType)
    : posts;

  const filtersWithCounts = filterTypes.map((f) => ({
    ...f,
    count:
      f.value === "all" ? posts.length : countByType(posts, f.value as PostType),
  }));

  const showFeatured = !activeType && filtered.length > 0;
  const featuredPost = showFeatured ? filtered[0] : null;
  const gridPosts = showFeatured ? filtered.slice(1) : filtered;

  const eventCount = countByType(posts, "evenement");
  const articleCount = countByType(posts, "article");

  return (
    <>
      <ImagePageHero
        label="Communication"
        title="Actualités & médias"
        description="Événements, annonces, partenariats et articles — la vitrine du réseau LA DECADES."
        imageUrl={settings.newsHeroImageUrl}
        size="tall"
      />

      {/* Chiffres */}
      <section className="border-b border-stone-200 bg-white py-8 shadow-sm">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-10 px-4 sm:gap-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="font-serif text-3xl font-semibold text-decades-orange">
              {posts.length}
            </p>
            <p className="mt-1 text-sm font-medium text-stone">Publications</p>
          </div>
          <div className="text-center">
            <p className="font-serif text-3xl font-semibold text-decades-orange">
              {eventCount}
            </p>
            <p className="mt-1 text-sm font-medium text-stone">Événements</p>
          </div>
          <div className="text-center">
            <p className="font-serif text-3xl font-semibold text-decades-orange">
              {articleCount}
            </p>
            <p className="mt-1 text-sm font-medium text-stone">Articles</p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-gradient-to-b from-cream/40 to-white py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <SectionHeading
            label="Vie du réseau"
            title="Restez informés"
            description={
              settings.newsIntro ??
              "Suivez l'actualité de nos écoles chrétiennes au Sénégal."
            }
            align="center"
          />
        </div>
      </section>

      <PostTypeNav filters={filtersWithCounts} activeType={activeType} />

      <section className="section-padding">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {activeType && (
            <p className="mb-10 text-center text-sm font-medium text-stone">
              Filtre actif :{" "}
              <span className="text-decades-orange">
                {formatPostType(activeType)}
              </span>{" "}
              · {filtered.length} publication{filtered.length > 1 ? "s" : ""}
            </p>
          )}

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-stone-300 bg-cream/30 px-8 py-16 text-center">
              <p className="font-serif text-xl text-ink">
                Aucune publication pour le moment
              </p>
              <p className="mt-2 text-stone">
                {activeType
                  ? `Aucun contenu de type « ${formatPostType(activeType)} » pour l'instant.`
                  : "Revenez bientôt pour découvrir les nouvelles du réseau."}
              </p>
              {activeType && (
                <Button href="/actualites" variant="outline" className="mt-6">
                  Voir toutes les actualités
                </Button>
              )}
            </div>
          ) : (
            <>
              {featuredPost && (
                <div className="mb-14">
                  <p className="mb-6 text-sm font-bold uppercase tracking-[0.2em] text-decades-orange">
                    Dernière publication
                  </p>
                  <FeaturedPostCard post={featuredPost} />
                </div>
              )}

              {gridPosts.length > 0 && (
                <>
                  <SectionHeading
                    label={featuredPost ? "Archives" : "Publications"}
                    title={
                      featuredPost ? "Toutes les actualités" : "Publications récentes"
                    }
                    align={featuredPost ? "left" : "center"}
                  />
                  <div
                    className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-3 ${featuredPost ? "mt-10" : "mt-0"}`}
                  >
                    {gridPosts.map((post) => (
                      <PostCard key={post._id} post={post} />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>

      {/* Partage / CTA */}
      <section className="border-t border-stone-200 bg-ink py-16 text-cream">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-serif text-3xl font-semibold">
            Partagez nos actualités
          </h2>
          <p className="mt-4 text-cream/75">
            Aidez à la visibilité du réseau LA DECADES — parlez de nos écoles
            autour de vous et suivez-nous sur WhatsApp.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/ecoles">Nos écoles</Button>
            <Button
              href="/contact"
              variant="outline"
              className="border-cream/40 text-cream hover:bg-cream/10 hover:text-white"
            >
              Nous contacter
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
