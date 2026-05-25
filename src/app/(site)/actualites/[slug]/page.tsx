import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableTextContent } from "@/components/content/PortableTextContent";
import { PostGallery } from "@/components/posts/PostGallery";
import { PostTypeBadge } from "@/components/posts/PostTypeBadge";
import { getPostBySlug, getPosts } from "@/lib/sanity/fetch";
import { formatDate, getYouTubeEmbedUrl } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Publication introuvable" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function ActualiteDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const embedUrl = getYouTubeEmbedUrl(post.videoUrl);

  return (
    <article>
      <section className="relative overflow-hidden bg-ink pb-14 pt-28 text-cream sm:pb-16 sm:pt-32">
        {post.imageUrl && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.imageUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/60" />
          </>
        )}
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/actualites"
            className="text-sm font-medium text-cream/70 hover:text-decades-orange"
          >
            ← Actualités
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <PostTypeBadge type={post.postType} />
            <time className="text-sm text-cream/70" dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
          </div>
          <h1 className="mt-5 font-serif text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          {(post.city || post.schoolNames?.length) && (
            <p className="mt-4 text-cream/75">
              {[post.city, ...(post.schoolNames ?? [])].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {post.imageUrl && (
            <div className="-mt-20 mb-10 overflow-hidden rounded-2xl shadow-2xl ring-4 ring-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.imageUrl}
                alt=""
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
          )}

          {post.excerpt && (
            <p className="text-xl leading-relaxed text-ink font-medium">
              {post.excerpt}
            </p>
          )}

          {post.body && post.body.length > 0 && (
            <div className="mt-10 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-stone-200/60">
              <PortableTextContent value={post.body} />
            </div>
          )}

          {post.gallery && post.gallery.length > 0 && (
            <PostGallery images={post.gallery} eventTitle={post.title} />
          )}

          {embedUrl && (
            <div className="mt-10 aspect-video overflow-hidden rounded-2xl shadow-lg ring-1 ring-stone-200/60">
              <iframe
                src={embedUrl}
                title={post.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          <div className="mt-12 flex flex-wrap gap-4 border-t border-stone-200 pt-10">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`${post.title} — LA DECADES`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
            >
              Partager sur WhatsApp
            </a>
            <Link
              href="/actualites"
              className="inline-flex items-center rounded-full border border-stone-200 px-6 py-3 text-sm font-semibold text-ink transition hover:bg-cream"
            >
              ← Retour aux actualités
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
