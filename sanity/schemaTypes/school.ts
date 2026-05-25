import { defineField, defineType } from "sanity";

export const school = defineType({
  name: "school",
  title: "École",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nom de l'école",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Identifiant URL",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "city",
      title: "Ville",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "address",
      title: "Adresse",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Téléphone",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "E-mail",
      type: "string",
    }),
    defineField({
      name: "levels",
      title: "Niveaux enseignés",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "image",
      title: "Photo principale",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "featured",
      title: "Mettre en avant sur l'accueil",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "city", media: "image" },
  },
});
