import type { PostType } from "@/lib/sanity/types";
import { formatPostType } from "@/lib/utils";

const typeStyles: Record<PostType, string> = {
  article: "bg-stone-100 text-stone-700",
  annonce: "bg-blue-50 text-blue-800",
  publicite: "bg-amber-50 text-amber-800",
  partenariat: "bg-emerald-50 text-emerald-800",
  evenement: "bg-decades-orange/10 text-decades-orange",
};

export function PostTypeBadge({ type }: { type: PostType }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${typeStyles[type]}`}
    >
      {formatPostType(type)}
    </span>
  );
}
