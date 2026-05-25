import { DECADES_OFFICIAL_FULL_NAME } from "../decades";
import { directionPageDefaults } from "../direction-page-defaults";
import type { HeroSlide } from "../hero-slides";
import type { Post, School, SiteSettings } from "../sanity/types";

export const fallbackSettings: SiteSettings = {
  fullName: DECADES_OFFICIAL_FULL_NAME,
  tagline: "Réseau d'écoles chrétiennes au Sénégal",
  ...directionPageDefaults,
  contactEmail: "contact@ladecades.sn",
  contactPhone: "+221 33 000 00 00",
  contactAddress: "Dakar, Sénégal",
  contactIntro:
    "Pour les inscriptions, les partenariats ou toute question sur le réseau LA DECADES, notre équipe est à votre écoute. Choisissez le canal qui vous convient le mieux.",
  newsIntro:
    "Suivez la vie du réseau LA DECADES : événements scolaires, annonces aux familles, partenariats, articles et moments forts de nos écoles chrétiennes à travers le Sénégal.",
  schoolsIntro:
    "Le réseau LA DECADES regroupe des écoles chrétiennes réparties dans plusieurs villes du Sénégal. Chaque établissement conserve son ancrage local et sa personnalité, tout en partageant les mêmes fondements : la foi, l'excellence académique et l'accompagnement attentif de chaque élève.",
  foundedYear: "",
};

export const fallbackHeroSlides: HeroSlide[] = [
  {
    id: "demo-1",
    eyebrow: "Direction d'écoles chrétiennes",
    title: "LA DECADES",
    description:
      "Un réseau d'établissements au Sénégal, unis par la foi, l'excellence éducative et l'accompagnement de chaque enfant.",
    ctaPrimary: { label: "Découvrir nos écoles", href: "/ecoles" },
    ctaSecondary: { label: "La Direction", href: "/direction" },
  },
  {
    id: "demo-2",
    eyebrow: "Notre engagement",
    title: "Former avec foi et exigence",
    description:
      "Éducation chrétienne, respect, fraternité et service : des valeurs vécues au quotidien dans chaque école du réseau.",
    ctaPrimary: { label: "Nos valeurs", href: "/direction" },
    ctaSecondary: { label: "Nous contacter", href: "/contact" },
  },
];

export const fallbackSchools: School[] = [
  {
    _id: "1",
    name: "École Sainte-Famille",
    slug: "sainte-famille-dakar",
    city: "Dakar",
    address: "Plateau, Dakar",
    phone: "+221 33 111 11 11",
    email: "sainte-famille@ladecades.sn",
    levels: ["Maternelle", "Primaire", "Collège"],
    description:
      "Établissement phare de LA DECADES à Dakar, alliant tradition chrétienne et pédagogie moderne.",
    featured: true,
  },
  {
    _id: "2",
    name: "Collège Saint-Joseph",
    slug: "saint-joseph-thies",
    city: "Thiès",
    address: "Centre-ville, Thiès",
    phone: "+221 33 222 22 22",
    email: "saint-joseph@ladecades.sn",
    levels: ["Primaire", "Collège", "Lycée"],
    description:
      "Un collège-lycée dynamique au cœur de Thiès, reconnu pour son encadrement et ses résultats.",
    featured: true,
  },
  {
    _id: "3",
    name: "École Notre-Dame",
    slug: "notre-dame-saint-louis",
    city: "Saint-Louis",
    address: "Sor, Saint-Louis",
    phone: "+221 33 333 33 33",
    email: "notredame@ladecades.sn",
    levels: ["Maternelle", "Primaire"],
    description:
      "École accueillante dans le patrimoine historique de Saint-Louis, ancrée dans les valeurs chrétiennes.",
    featured: true,
  },
  {
    _id: "4",
    name: "École Lumière",
    slug: "lumiere-kaolack",
    city: "Kaolack",
    address: "Kaolack",
    phone: "+221 33 444 44 44",
    email: "lumiere@ladecades.sn",
    levels: ["Maternelle", "Primaire", "Collège"],
    description:
      "Établissement en pleine croissance, au service des familles de la région de Kaolack.",
    featured: false,
  },
];

export const fallbackFeaturedSchools = fallbackSchools.filter((s) => s.featured);

export const fallbackPosts: Post[] = [
  {
    _id: "p1",
    title: "Journée portes ouvertes — Dakar",
    slug: "portes-ouvertes-dakar-2026",
    postType: "evenement",
    excerpt:
      "Venez découvrir nos locaux, rencontrer l'équipe pédagogique et les familles de l'école Sainte-Famille.",
    publishedAt: "2026-03-15T10:00:00.000Z",
    city: "Dakar",
    schoolNames: ["École Sainte-Famille"],
  },
  {
    _id: "p2",
    title: "Inscriptions ouvertes pour l'année 2026-2027",
    slug: "inscriptions-2026-2027",
    postType: "annonce",
    excerpt:
      "Les inscriptions sont ouvertes dans toutes les écoles du réseau LA DECADES. Dossiers disponibles en ligne ou sur place.",
    publishedAt: "2026-02-01T08:00:00.000Z",
  },
  {
    _id: "p3",
    title: "Partenariat avec la Caritas locale",
    slug: "partenariat-caritas",
    postType: "partenariat",
    excerpt:
      "LA DECADES et la Caritas s'engagent pour des actions solidaires au profit des élèves et des communautés.",
    publishedAt: "2026-01-20T14:00:00.000Z",
  },
  {
    _id: "p4",
    title: "Remise des prix — Collège Saint-Joseph",
    slug: "remise-prix-saint-joseph",
    postType: "article",
    excerpt:
      "Une cérémonie émouvante pour célébrer l'excellence et l'engagement de nos élèves à Thiès.",
    publishedAt: "2025-12-10T16:00:00.000Z",
    city: "Thiès",
    schoolNames: ["Collège Saint-Joseph"],
  },
];
