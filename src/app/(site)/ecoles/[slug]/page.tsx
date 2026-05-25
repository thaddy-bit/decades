import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { getSchoolBySlug, getSchools } from "@/lib/sanity/fetch";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const schools = await getSchools();
  return schools.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const school = await getSchoolBySlug(slug);
  if (!school) return { title: "École introuvable" };
  return {
    title: school.name,
    description: school.description ?? `École chrétienne LA DECADES — ${school.city}`,
  };
}

export default async function EcoleDetailPage({ params }: Props) {
  const { slug } = await params;
  const school = await getSchoolBySlug(slug);
  if (!school) notFound();

  return (
    <>
      <section className="relative overflow-hidden bg-ink pb-16 pt-28 text-cream sm:pb-20 sm:pt-32">
        {school.imageUrl && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={school.imageUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/70" />
          </>
        )}
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/ecoles"
            className="text-sm font-medium text-cream/70 transition hover:text-decades-orange"
          >
            ← Nos écoles
          </Link>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-decades-orange">
            {school.city} · École chrétienne
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
            {school.name}
          </h1>
          {school.levels && (
            <p className="mt-4 text-lg text-cream/80">{school.levels.join(" · ")}</p>
          )}
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-3 lg:px-8">
          <article className="lg:col-span-2">
            {school.imageUrl && (
              <div className="mb-10 overflow-hidden rounded-2xl shadow-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={school.imageUrl}
                  alt={school.name}
                  className="aspect-[16/10] w-full object-cover"
                />
              </div>
            )}
            {school.description ? (
              <p className="prose-readable text-lg text-stone">{school.description}</p>
            ) : (
              <p className="text-stone">
                Établissement du réseau LA DECADES à {school.city}.
              </p>
            )}
          </article>

          <aside className="h-fit rounded-2xl border border-stone-200/80 bg-white p-8 shadow-lg lg:sticky lg:top-24">
            <h2 className="font-serif text-xl font-semibold text-ink">Contact</h2>
            <dl className="mt-6 space-y-5 text-sm">
              {school.address && (
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wide text-decades-orange">
                    Adresse
                  </dt>
                  <dd className="mt-1 text-ink">{school.address}</dd>
                </div>
              )}
              {school.phone && (
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wide text-decades-orange">
                    Téléphone
                  </dt>
                  <dd>
                    <a
                      href={`tel:${school.phone}`}
                      className="font-medium text-decades-orange hover:underline"
                    >
                      {school.phone}
                    </a>
                  </dd>
                </div>
              )}
              {school.email && (
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wide text-decades-orange">
                    E-mail
                  </dt>
                  <dd>
                    <a
                      href={`mailto:${school.email}`}
                      className="font-medium text-decades-orange hover:underline"
                    >
                      {school.email}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
            <Button href="/contact" variant="outline" className="mt-8 w-full justify-center">
              Nous contacter
            </Button>
          </aside>
        </div>
      </section>
    </>
  );
}
