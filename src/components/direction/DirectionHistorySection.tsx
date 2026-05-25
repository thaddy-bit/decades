import { PortableTextContent } from "@/components/content/PortableTextContent";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { PortableTextBlock } from "@portabletext/types";

type DirectionHistorySectionProps = {
  sectionLabel?: string;
  title?: string;
  intro?: string;
  body?: PortableTextBlock[];
  imageUrl?: string;
  imageCaption?: string;
  foundedYear?: string;
  acronymMeaning?: string;
};

export function DirectionHistorySection({
  sectionLabel = "Histoire",
  title = "Notre histoire",
  intro,
  body,
  imageUrl,
  imageCaption = "Une histoire au service de l'éducation",
  foundedYear,
  acronymMeaning,
}: DirectionHistorySectionProps) {
  if (!intro && (!body || body.length === 0)) return null;

  return (
    <section className="bg-gradient-to-b from-cream/50 to-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Image ou encadré visuel */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-stone-200/60">
              {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl}
                  alt=""
                  className="aspect-[4/5] w-full object-cover sm:aspect-[3/4]"
                />
              ) : (
                <div className="flex aspect-[4/5] flex-col items-center justify-center bg-gradient-to-br from-ink to-decades-orange/40 p-10 text-center text-cream sm:aspect-[3/4]">
                  {foundedYear ? (
                    <p className="font-serif text-6xl font-bold text-decades-orange">
                      {foundedYear}
                    </p>
                  ) : (
                    <p className="font-serif text-3xl font-semibold">LA DECADES</p>
                  )}
                  <p className="mt-4 text-sm uppercase tracking-widest text-cream/70">
                    Une histoire au service de l&apos;éducation
                  </p>
                </div>
              )}
              {foundedYear && imageUrl && (
                <div className="absolute bottom-4 left-4 rounded-full bg-decades-orange px-4 py-2 text-sm font-bold text-white shadow-lg">
                  Depuis {foundedYear}
                </div>
              )}
            </div>
          </div>

          {/* Texte */}
          <div className="lg:col-span-7">
            <SectionHeading label={sectionLabel} title={title} />
            {acronymMeaning && (
              <p className="mt-4 rounded-xl border-l-4 border-decades-orange bg-white px-5 py-4 text-sm font-medium leading-relaxed text-ink shadow-sm">
                <span className="text-decades-orange">DECADES</span> —{" "}
                {acronymMeaning}
              </p>
            )}
            {intro && (
              <p className="prose-readable mt-6 text-lg text-stone">{intro}</p>
            )}
            {body && body.length > 0 && (
              <div className="mt-6">
                <PortableTextContent value={body} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
