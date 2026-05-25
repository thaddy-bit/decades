import type { PostGalleryImage } from "@/lib/sanity/types";

type PostGalleryProps = {
  images: PostGalleryImage[];
  eventTitle: string;
};

export function PostGallery({ images, eventTitle }: PostGalleryProps) {
  const items = images.filter((item) => item.url);
  if (items.length === 0) return null;

  return (
    <section className="mt-12" aria-labelledby="post-gallery-heading">
      <h2
        id="post-gallery-heading"
        className="font-serif text-2xl font-semibold text-ink"
      >
        En images
      </h2>
      <p className="mt-2 text-sm text-stone">
        {items.length} photo{items.length > 1 ? "s" : ""} de cet événement
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {items.map((item, index) => (
          <li
            key={`${item.url}-${index}`}
            className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200/70"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.url}
              alt={item.alt ?? item.caption ?? `${eventTitle} — photo ${index + 1}`}
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
            {item.caption && (
              <p className="border-t border-stone-100 px-4 py-3 text-sm text-stone">
                {item.caption}
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
