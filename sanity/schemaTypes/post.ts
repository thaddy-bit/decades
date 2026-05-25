import { defineField, defineType } from "sanity";

const postTypes = [
  { title: "Article", value: "article" },
  { title: "Annonce", value: "annonce" },
  { title: "Publicité", value: "publicite" },
  { title: "Partenariat", value: "partenariat" },
  { title: "Événement", value: "evenement" },
] as const;

export const post = defineType({
  name: "post",
  title: "Actualité",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Identifiant URL",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "postType",
      title: "Type de publication",
      type: "string",
      options: { list: [...postTypes], layout: "radio" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Résumé court",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "body",
      title: "Contenu",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "image",
      title: "Image principale",
      type: "image",
      options: { hotspot: true },
      description:
        "Photo de une : cartes actualités, bannière et partage. Obligatoire pour une bonne mise en avant.",
    }),
    defineField({
      name: "gallery",
      title: "Galerie photos",
      type: "array",
      description:
        "Photos supplémentaires du même événement (ordre = affichage sur la page). La image principale reste séparée.",
      of: [
        {
          type: "object",
          name: "galleryImage",
          title: "Photo",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Légende",
              type: "string",
            }),
            defineField({
              name: "alt",
              title: "Texte alternatif",
              type: "string",
              description: "Pour l'accessibilité (décrivez brièvement la scène)",
            }),
          ],
          preview: {
            select: { title: "caption", media: "image" },
            prepare({ title, media }) {
              return {
                title: title || "Photo",
                media,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "videoUrl",
      title: "Lien vidéo (YouTube)",
      type: "url",
    }),
    defineField({
      name: "publishedAt",
      title: "Date de publication",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "schools",
      title: "Écoles concernées",
      type: "array",
      of: [{ type: "reference", to: [{ type: "school" }] }],
    }),
    defineField({
      name: "city",
      title: "Ville (si applicable)",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "postType",
      media: "image",
      date: "publishedAt",
    },
    prepare({ title, subtitle, media, date }) {
      return {
        title,
        subtitle: `${subtitle ?? "article"} · ${date ? new Date(date).toLocaleDateString("fr-FR") : ""}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Date, récent d'abord",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
