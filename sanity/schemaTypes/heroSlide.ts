import { defineField, defineType } from "sanity";

export const heroSlide = defineType({
  name: "heroSlide",
  title: "Slide accueil",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre principal",
      type: "string",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "eyebrow",
      title: "Sur-titre",
      type: "string",
      description: "Petit texte au-dessus du titre (ex. « Direction d'écoles chrétiennes »)",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(280),
    }),
    defineField({
      name: "image",
      title: "Image de fond",
      type: "image",
      options: { hotspot: true },
      description: "Recommandé : 1920×1080 px, format paysage",
    }),
    defineField({
      name: "ctaPrimaryLabel",
      title: "Bouton principal — texte",
      type: "string",
    }),
    defineField({
      name: "ctaPrimaryHref",
      title: "Bouton principal — lien",
      type: "string",
      description: "Ex. /ecoles ou /direction",
    }),
    defineField({
      name: "ctaSecondaryLabel",
      title: "Bouton secondaire — texte",
      type: "string",
    }),
    defineField({
      name: "ctaSecondaryHref",
      title: "Bouton secondaire — lien",
      type: "string",
    }),
    defineField({
      name: "order",
      title: "Ordre d'affichage",
      type: "number",
      description: "1 = premier slide, 2 = deuxième, etc.",
      initialValue: 1,
      validation: (rule) => rule.min(1).max(20),
    }),
    defineField({
      name: "active",
      title: "Afficher sur l'accueil",
      type: "boolean",
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: "Ordre d'affichage",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "eyebrow",
      media: "image",
      order: "order",
      active: "active",
    },
    prepare({ title, subtitle, media, order, active }) {
      return {
        title: active === false ? `⏸ ${title}` : title,
        subtitle: `Ordre ${order ?? "—"} · ${subtitle ?? "Slide accueil"}`,
        media,
      };
    },
  },
});
