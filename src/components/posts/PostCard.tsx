import Link from "next/link";
import type { Post } from "@/lib/sanity/types";
import { formatDate } from "@/lib/utils";
import { PostTypeBadge } from "./PostTypeBadge";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/actualites/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-stone-200/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-decades-orange/25"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-cream to-stone-100">
        {post.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.imageUrl}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full min-h-[140px] items-center justify-center p-6">
            <PostTypeBadge type={post.postType} />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <PostTypeBadge type={post.postType} />
          <time className="text-xs font-medium text-stone" dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
        </div>
        <h3 className="font-serif text-xl font-semibold leading-snug text-ink group-hover:text-decades-orange">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-stone">
            {post.excerpt}
          </p>
        )}
        <span className="mt-5 text-sm font-semibold text-decades-orange">
          Lire la suite →
        </span>
      </div>
    </Link>
  );
}
