import Link from "next/link";
import type { Post } from "@/lib/sanity/types";
import { formatDate } from "@/lib/utils";
import { PostTypeBadge } from "@/components/posts/PostTypeBadge";

export function FeaturedPostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/actualites/${post.slug}`}
      className="group grid overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-stone-200/60 transition hover:shadow-xl hover:ring-decades-orange/30 lg:grid-cols-2"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-cream to-stone-100 lg:aspect-auto lg:min-h-[320px]">
        {post.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.imageUrl}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full min-h-[200px] items-center justify-center lg:min-h-[320px]">
            <PostTypeBadge type={post.postType} />
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full bg-decades-orange px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow">
          À la une
        </span>
      </div>
      <div className="flex flex-col justify-center p-8 sm:p-10">
        <div className="flex flex-wrap items-center gap-3">
          <PostTypeBadge type={post.postType} />
          <time className="text-sm text-stone" dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
        </div>
        <h2 className="mt-4 font-serif text-2xl font-semibold leading-tight text-ink transition-colors group-hover:text-decades-orange sm:text-3xl">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="mt-4 line-clamp-4 text-base leading-relaxed text-stone">
            {post.excerpt}
          </p>
        )}
        {(post.city || post.schoolNames?.length) && (
          <p className="mt-3 text-sm text-stone">
            {[post.city, ...(post.schoolNames ?? [])].filter(Boolean).join(" · ")}
          </p>
        )}
        <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-decades-orange">
          Lire l&apos;article complet
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
