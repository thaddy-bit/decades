export const schoolsQuery = `*[_type == "school"] | order(city asc, name asc) {
  _id,
  name,
  "slug": slug.current,
  city,
  address,
  phone,
  email,
  levels,
  description,
  featured,
  "imageUrl": image.asset->url
}`;

export const featuredSchoolsQuery = `*[_type == "school" && featured == true] | order(name asc)[0...6] {
  _id,
  name,
  "slug": slug.current,
  city,
  description,
  levels,
  "imageUrl": image.asset->url
}`;

export const schoolBySlugQuery = `*[_type == "school" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  city,
  address,
  phone,
  email,
  levels,
  description,
  "imageUrl": image.asset->url
}`;

export const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  postType,
  excerpt,
  publishedAt,
  city,
  videoUrl,
  "imageUrl": image.asset->url,
  "schoolNames": schools[]->name
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  postType,
  excerpt,
  body,
  publishedAt,
  city,
  videoUrl,
  "imageUrl": image.asset->url,
  "schoolNames": schools[]->name
}`;

export const latestPostsQuery = `*[_type == "post"] | order(publishedAt desc)[0...3] {
  _id,
  title,
  "slug": slug.current,
  postType,
  excerpt,
  publishedAt,
  "imageUrl": image.asset->url
}`;

export const heroSlidesQuery = `*[_type == "heroSlide" && active != false] | order(order asc, _createdAt asc) {
  _id,
  eyebrow,
  title,
  description,
  order,
  ctaPrimaryLabel,
  ctaPrimaryHref,
  ctaSecondaryLabel,
  ctaSecondaryHref,
  "imageUrl": image.asset->url
}`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  fullName,
  tagline,
  acronymMeaning,
  directionHeroLabel,
  directionHeroTitle,
  directionHeroDescription,
  "directionHeroImageUrl": directionHeroImage.asset->url,
  historySectionLabel,
  historyTitle,
  historyIntro,
  history,
  "historyImageUrl": historyImage.asset->url,
  historyImageCaption,
  foundedYear,
  missionSectionLabel,
  missionSectionTitle,
  mission,
  visionSectionLabel,
  visionSectionTitle,
  vision,
  identitySectionLabel,
  identitySectionTitle,
  identityDescription,
  identityQuote,
  identityButtonLabel,
  identityButtonHref,
  valuesSectionLabel,
  valuesSectionTitle,
  valuesSectionDescription,
  values,
  aboutSectionLabel,
  aboutSectionTitle,
  about,
  directionCtaTitle,
  directionCtaDescription,
  directionCtaPrimaryLabel,
  directionCtaPrimaryHref,
  directionCtaSecondaryLabel,
  directionCtaSecondaryHref,
  contactEmail,
  contactPhone,
  contactAddress,
  "contactHeroImageUrl": contactHeroImage.asset->url,
  contactIntro,
  "newsHeroImageUrl": newsHeroImage.asset->url,
  newsIntro,
  "schoolsHeroImageUrl": schoolsHeroImage.asset->url,
  schoolsIntro
}`;
