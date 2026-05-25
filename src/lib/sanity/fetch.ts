import { cache } from "react";
import { isSanityConfigured } from "../../../sanity/env";
import { client } from "./client";
import {
  featuredSchoolsQuery,
  heroSlidesQuery,
  latestPostsQuery,
  postBySlugQuery,
  postsQuery,
  schoolBySlugQuery,
  schoolsQuery,
  siteSettingsQuery,
} from "./queries";
import type { Post, School, SiteSettings } from "./types";
import { buildHeroSlides, type HeroSlide } from "../hero-slides";
import {
  fallbackFeaturedSchools,
  fallbackHeroSlides,
  fallbackPosts,
  fallbackSchools,
  fallbackSettings,
} from "../data/fallback";

const FETCH_TIMEOUT_MS = 8_000;
const REVALIDATE_SECONDS = 120;

type SanityHeroSlide = {
  _id: string;
  eyebrow?: string;
  title: string;
  description: string;
  imageUrl?: string;
  ctaPrimaryLabel?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
};

const fetchOptions = {
  next: { revalidate: REVALIDATE_SECONDS },
} as const;

async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  fallback: T,
): Promise<T> {
  if (!isSanityConfigured) return fallback;

  try {
    const result = await Promise.race([
      client.fetch<T>(query, params, fetchOptions),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Sanity timeout")),
          FETCH_TIMEOUT_MS,
        ),
      ),
    ]);
    return result ?? fallback;
  } catch {
    return fallback;
  }
}

function mapSanityHeroSlide(slide: SanityHeroSlide): HeroSlide {
  return {
    id: slide._id,
    eyebrow: slide.eyebrow ?? "LA DECADES",
    title: slide.title,
    description: slide.description,
    imageUrl: slide.imageUrl,
    ctaPrimary:
      slide.ctaPrimaryLabel && slide.ctaPrimaryHref
        ? { label: slide.ctaPrimaryLabel, href: slide.ctaPrimaryHref }
        : undefined,
    ctaSecondary:
      slide.ctaSecondaryLabel && slide.ctaSecondaryHref
        ? { label: slide.ctaSecondaryLabel, href: slide.ctaSecondaryHref }
        : undefined,
  };
}

export const getSchools = cache(async (): Promise<School[]> => {
  const schools = await sanityFetch<School[]>(schoolsQuery, {}, fallbackSchools);
  return schools.length > 0 ? schools : fallbackSchools;
});

export const getFeaturedSchools = cache(async (): Promise<School[]> => {
  const schools = await sanityFetch<School[]>(
    featuredSchoolsQuery,
    {},
    fallbackFeaturedSchools,
  );
  if (schools.length > 0) return schools;
  const all = await getSchools();
  const featured = all.filter((s) => s.featured);
  return featured.length > 0 ? featured : fallbackFeaturedSchools;
});

export const getSchoolBySlug = cache(
  async (slug: string): Promise<School | null> => {
    if (!isSanityConfigured) {
      return fallbackSchools.find((s) => s.slug === slug) ?? null;
    }
    const school = await sanityFetch<School | null>(
      schoolBySlugQuery,
      { slug },
      null,
    );
    return school ?? fallbackSchools.find((s) => s.slug === slug) ?? null;
  },
);

export const getPosts = cache(async (): Promise<Post[]> => {
  const posts = await sanityFetch<Post[]>(postsQuery, {}, fallbackPosts);
  return posts.length > 0 ? posts : fallbackPosts;
});

export const getPostBySlug = cache(async (slug: string): Promise<Post | null> => {
  if (!isSanityConfigured) {
    return fallbackPosts.find((p) => p.slug === slug) ?? null;
  }
  const post = await sanityFetch<Post | null>(postBySlugQuery, { slug }, null);
  return post ?? fallbackPosts.find((p) => p.slug === slug) ?? null;
});

export const getLatestPosts = cache(async (): Promise<Post[]> => {
  const posts = await sanityFetch<Post[]>(
    latestPostsQuery,
    {},
    fallbackPosts.slice(0, 3),
  );
  if (posts.length > 0) return posts;
  const all = await getPosts();
  return all.slice(0, 3);
});

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const settings = await sanityFetch<SiteSettings | null>(
    siteSettingsQuery,
    {},
    null,
  );
  return settings ?? fallbackSettings;
});

export const getHeroSlidesForHome = cache(async (): Promise<HeroSlide[]> => {
  if (!isSanityConfigured) return fallbackHeroSlides;

  const cmsSlides = await sanityFetch<SanityHeroSlide[]>(
    heroSlidesQuery,
    {},
    [],
  );

  if (cmsSlides.length > 0) {
    return cmsSlides.map(mapSanityHeroSlide);
  }

  const [settings, schools, posts] = await Promise.all([
    getSiteSettings(),
    getSchools(),
    getPosts(),
  ]);

  return buildHeroSlides(settings, schools, posts);
});

/** Une seule vague de requêtes pour l'accueil (évite les doublons). */
export const getHomePageData = cache(async () => {
  const [settings, schools, posts, heroSlides] = await Promise.all([
    getSiteSettings(),
    getSchools(),
    getPosts(),
    getHeroSlidesForHome(),
  ]);

  const featuredList = schools.filter((s) => s.featured).slice(0, 6);
  const featured =
    featuredList.length > 0 ? featuredList : fallbackFeaturedSchools;

  return {
    settings,
    schools,
    featured,
    /** Dernière publication = actualité à la une (même logique que /actualites) */
    spotlightPost: posts[0] ?? null,
    latestPosts: posts.slice(1, 3),
    heroSlides,
    cities: [...new Set(schools.map((s) => s.city))],
  };
});
