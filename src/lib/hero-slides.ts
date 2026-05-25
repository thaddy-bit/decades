import type { Post, School, SiteSettings } from "./sanity/types";

export type HeroSlide = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  imageUrl?: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
};

const defaultSlides: HeroSlide[] = [
  {
    id: "intro",
    eyebrow: "Direction d'écoles chrétiennes",
    title: "LA DECADES",
    description:
      "Un réseau d'établissements au Sénégal, unis par la foi, l'excellence éducative et l'accompagnement de chaque enfant.",
    ctaPrimary: { label: "Découvrir nos écoles", href: "/ecoles" },
    ctaSecondary: { label: "La Direction", href: "/direction" },
  },
  {
    id: "valeurs",
    eyebrow: "Notre engagement",
    title: "Former avec foi et exigence",
    description:
      "Éducation chrétienne, respect, fraternité et service : des valeurs vécues au quotidien dans chaque école du réseau.",
    ctaPrimary: { label: "Nos valeurs", href: "/direction" },
    ctaSecondary: { label: "Nous contacter", href: "/contact" },
  },
  {
    id: "reseau",
    eyebrow: "Présence nationale",
    title: "Plusieurs villes, une même vision",
    description:
      "Dakar, Thiès, Saint-Louis et au-delà — LA DECADES fédère des écoles ancrées dans leurs communautés.",
    ctaPrimary: { label: "Voir le réseau", href: "/ecoles" },
    ctaSecondary: { label: "Actualités", href: "/actualites" },
  },
];

export function buildHeroSlides(
  settings: SiteSettings,
  schools: School[],
  posts: Post[],
): HeroSlide[] {
  const slides: HeroSlide[] = [];

  slides.push({
    ...defaultSlides[0],
    description: settings.tagline ?? defaultSlides[0].description,
  });

  for (const school of schools.filter((s) => s.imageUrl).slice(0, 2)) {
    slides.push({
      id: `school-${school._id}`,
      eyebrow: `${school.city} · École chrétienne`,
      title: school.name,
      description:
        school.description ??
        `Établissement du réseau LA DECADES à ${school.city}.`,
      imageUrl: school.imageUrl,
      ctaPrimary: { label: "Visiter l'école", href: `/ecoles/${school.slug}` },
      ctaSecondary: { label: "Toutes les écoles", href: "/ecoles" },
    });
  }

  for (const post of posts.filter((p) => p.imageUrl).slice(0, 2)) {
    slides.push({
      id: `post-${post._id}`,
      eyebrow: "Actualité",
      title: post.title,
      description: post.excerpt ?? "Découvrez les dernières nouvelles du réseau.",
      imageUrl: post.imageUrl,
      ctaPrimary: { label: "Lire la suite", href: `/actualites/${post.slug}` },
      ctaSecondary: { label: "Toutes les actualités", href: "/actualites" },
    });
  }

  slides.push(defaultSlides[1], defaultSlides[2]);

  const seen = new Set<string>();
  return slides.filter((s) => {
    if (seen.has(s.id)) return false;
    seen.add(s.id);
    return true;
  }).slice(0, 6);
}
