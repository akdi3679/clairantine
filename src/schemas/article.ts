export const articleSchema = {
  name: "article",
  type: "document",
  title: "Article / Portrait",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Titre de l'article",
      validation: (Rule: any) => Rule.required().min(5).max(120),
    },
    {
      name: "subtitle",
      type: "text",
      title: "Sous-titre (extrait accrocheur)",
      validation: (Rule: any) => Rule.max(200),
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug (URL)",
      options: { source: "title", maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "category",
      type: "string",
      title: "Catégorie éditoriale",
      options: { list: ["Portrait", "Interview", "Projet Créatif", "Coulisses"] },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "author",
      type: "string",
      title: "Auteur",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "publishedAt",
      type: "datetime",
      title: "Date de publication",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "readTime",
      type: "number",
      title: "Temps de lecture estimé (en minutes)",
      validation: (Rule: any) => Rule.min(1).integer(),
    },
    {
      name: "coverImage",
      type: "image",
      title: "Image de couverture",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Texte alternatif (obligatoire pour l'accessibilité)",
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },
    {
      name: "body",
      type: "array",
      title: "Contenu de l'article",
      of: [{ type: "block" }, { type: "image" }],
    },
    {
      name: "isFeatured",
      type: "boolean",
      title: "Mettre en avant sur la page d'accueil du média ?",
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: "title",
      author: "author",
      category: "category",
    },
    prepare: ({ title, author, category }: any) => ({
      title,
      subtitle: `${category} • par ${author}`,
    }),
  },
};