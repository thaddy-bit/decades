import type { PostType } from "./sanity/types";

const postTypeLabels: Record<PostType, string> = {
  article: "Article",
  annonce: "Annonce",
  publicite: "Publicité",
  partenariat: "Partenariat",
  evenement: "Événement",
};

export function formatPostType(type: PostType): string {
  return postTypeLabels[type] ?? type;
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getYouTubeEmbedUrl(url?: string): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    let id: string | null = null;
    if (parsed.hostname.includes("youtu.be")) {
      id = parsed.pathname.slice(1);
    } else if (parsed.hostname.includes("youtube.com")) {
      id = parsed.searchParams.get("v");
    }
    return id ? `https://www.youtube.com/embed/${id}` : null;
  } catch {
    return null;
  }
}
