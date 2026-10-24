export const eventSchema = {
  name: "event",
  type: "document",
  title: "Événement",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Titre de l'événement",
      validation: (Rule: any) => Rule.required().min(5).max(100),
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
      title: "Catégorie",
      options: { list: ["Atelier", "Conférence", "Table Ronde"] },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "date",
      type: "datetime",
      title: "Date et heure",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "location",
      type: "object",
      title: "Lieu",
      fields: [
        { name: "name", type: "string", title: "Nom du lieu" },
        { name: "city", type: "string", title: "Ville" },
        { name: "address", type: "string", title: "Adresse complète" },
      ],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "speaker",
      type: "object",
      title: "Intervenant(e)",
      fields: [
        { name: "name", type: "string", title: "Nom" },
        { name: "role", type: "string", title: "Titre / Rôle" },
        { name: "bio", type: "text", title: "Courte biographie (crédibilité)" },
      ],
    },
    {
      name: "status",
      type: "string",
      title: "Statut des inscriptions",
      options: { 
        list: [
          { title: "Inscriptions ouvertes", value: "open" },
          { title: "Presque complet", value: "almost_full" },
          { title: "Complet", value: "full" },
          { title: "Terminé", value: "ended" },
        ] 
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "spotsLeft",
      type: "number",
      title: "Places restantes (pour déclencheur de rareté)",
      validation: (Rule: any) => Rule.min(0).integer(),
    },
    {
      name: "description",
      type: "array",
      title: "Description détaillée",
      of: [{ type: "block" }],
    },
    {
      name: "price",
      type: "string",
      title: "Prix (ex: '45 (boissons incluses)')",
    },
    {
      name: "registrationLink",
      type: "url",
      title: "Lien de réservation / billet",
    },
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
      status: "status",
    },
    prepare: ({ title, date, status }: any) => ({
      title,
      subtitle: `${new Date(date).toLocaleDateString("fr-FR")} • ${status}`,
    }),
  },
};