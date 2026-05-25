import type { PortableTextBlock } from "@portabletext/types";

export type PostType =
  | "article"
  | "annonce"
  | "publicite"
  | "partenariat"
  | "evenement";

export type School = {
  _id: string;
  name: string;
  slug: string;
  city: string;
  address?: string;
  phone?: string;
  email?: string;
  levels?: string[];
  description?: string;
  imageUrl?: string;
  featured?: boolean;
};

export type Post = {
  _id: string;
  title: string;
  slug: string;
  postType: PostType;
  excerpt?: string;
  body?: PortableTextBlock[];
  imageUrl?: string;
  videoUrl?: string;
  publishedAt: string;
  city?: string;
  schoolNames?: string[];
};

export type SiteSettings = {
  fullName?: string;
  tagline?: string;
  acronymMeaning?: string;
  /* Hero Direction */
  directionHeroLabel?: string;
  directionHeroTitle?: string;
  directionHeroDescription?: string;
  directionHeroImageUrl?: string;
  /* Histoire */
  historySectionLabel?: string;
  historyTitle?: string;
  historyIntro?: string;
  history?: PortableTextBlock[];
  historyImageUrl?: string;
  historyImageCaption?: string;
  foundedYear?: string;
  /* Mission & vision */
  missionSectionLabel?: string;
  missionSectionTitle?: string;
  mission?: string;
  visionSectionLabel?: string;
  visionSectionTitle?: string;
  vision?: string;
  /* Identité */
  identitySectionLabel?: string;
  identitySectionTitle?: string;
  identityDescription?: string;
  identityQuote?: string;
  identityButtonLabel?: string;
  identityButtonHref?: string;
  /* Valeurs */
  valuesSectionLabel?: string;
  valuesSectionTitle?: string;
  valuesSectionDescription?: string;
  values?: string[];
  /* Présentation */
  aboutSectionLabel?: string;
  aboutSectionTitle?: string;
  about?: PortableTextBlock[];
  /* CTA Direction */
  directionCtaTitle?: string;
  directionCtaDescription?: string;
  directionCtaPrimaryLabel?: string;
  directionCtaPrimaryHref?: string;
  directionCtaSecondaryLabel?: string;
  directionCtaSecondaryHref?: string;
  /* Autres pages */
  contactEmail?: string;
  contactPhone?: string;
  contactAddress?: string;
  contactHeroImageUrl?: string;
  contactIntro?: string;
  newsHeroImageUrl?: string;
  newsIntro?: string;
  schoolsHeroImageUrl?: string;
  schoolsIntro?: string;
};
