export const stats = [
  { value: "42", label: "Événements réalisés" },
  { value: "1,850+", label: "Personnes réunies" },
  { value: "12", label: "Villes investies" },
  { value: "3,200+", label: "Connexions créées" },
];

export const mockEvents = [
  {
    id: "1", title: "L'Art de Pitcher son Projet Créatif", category: "Atelier", 
    date: "2024-11-12T18:30:00", location: { city: "Paris", name: "Le Compt9", address: "123 Rue de la Roquette" },
    speaker: { name: "Sophie Martin", role: "Ex-Google Design Lead" }, status: "almost_full", spotsLeft: 3, slug: "art-pitcher-projet",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800", 
    description: "Transformez votre idée complexe en un récit de 2 minutes qui captive et convertit."
  },
  {
    id: "2", title: "Entreprendre avec Sens : Le Modèle Hybride", category: "Conférence", 
    date: "2024-11-24T19:00:00", location: { city: "Lyon", name: "La Ruche", address: "45 Rue de la République" },
    speaker: { name: "Thomas Dubois", role: "Fondateur de 3 marques éthiques" }, status: "full", spotsLeft: 0, slug: "entreprendre-sens",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800", 
    description: "Comment bâtir une entreprise rentable sans compromettre ses valeurs ? Le guide pratique."
  },
  {
    id: "3", title: "Le Futur du Design et de l'Artisanat", category: "Table Ronde", 
    date: "2024-12-05T18:00:00", location: { city: "Bordeaux", name: "Atelier 4", address: "8 Quai de Bacalan" },
    speaker: { name: "Collectif Clairantine", role: "Curateurs & Créateurs" }, status: "open", spotsLeft: 25, slug: "futur-design",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800", 
    description: "Quand l'IA rencontre le fait main. Table ronde sur les matériaux de demain."
  }
];

export const pastEvents = [
  { 
    id: "p1", title: "Pourquoi on rêve tous d'un travail qui n'existe pas ?", date: "2024-09-15", city: "Paris", attendees: 58, status: "Terminé", speaker: "Le Télétravailleur", 
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=800" 
  },
  { 
    id: "p2", title: "Le cerveau du créatif est-il fait pour le business ?", date: "2024-08-22", city: "Lyon", attendees: 45, status: "Terminé", speaker: "Dr. Marie Curie", 
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800" 
  },
  { 
    id: "p3", title: "L'architecture émotionnelle des lieux de vie", date: "2024-07-10", city: "Bordeaux", attendees: 30, status: "Terminé", speaker: "Jean Nouvel", 
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800" 
  },
];

export const topics = [
  { title: "Psychologie & Décision", desc: "Comprendre les biais cognitifs et l'art de convaincre sans manipuler." },
  { title: "Société & Pouvoir", desc: "Les nouvelles dynamiques de leadership et d'influence dans un monde hybride." },
  { title: "Art, Culture & Création", desc: "L'intersection fascinante entre l'esthétique pure et la réalité du marché." },
  { title: "Travail, Argent & Ambition", desc: "Redéfinir le succès, la valeur et l'équilibre dans le monde moderne." },
];

export const venues = [
  { name: "Le Compt9", city: "Paris", vibe: "Industriel & Chaleureux" },
  { name: "La Ruche", city: "Lyon", vibe: "Épuré & Lumineux" },
  { name: "Atelier 4", city: "Bordeaux", vibe: "Brut & Artistique" },
];

export const partners = {
  presentateur: ["Studio Néon", "Galerie Joseph"],
  platine: ["L'ADN", "Le Bonbon"],
  or: ["Maison des Créatifs", "Sorbonne IA"],
  communaute: ["Freelance.fr", "Artisteo"],
};

export const mockArticles = [
  {
    id: "a1", title: "Comment Clara a transformé une passion en marque internationale", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    subtitle: "Le secret n'est pas de travailler plus, mais de créer un univers auquel les gens veulent appartenir.",
    category: "Portrait", author: "Clairantine", readTime: 6, isFeatured: true, slug: "clara-marque-internationale"
  },
  {
    id: "a2", title: "5 leçons d'un fondateur qui a tout quitté pour son atelier", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1200",
    subtitle: "Quand la raison dit de rester, l'intuition de créer parle plus fort.",
    category: "Interview", author: "Marc Lefevre", readTime: 4, isFeatured: false, slug: "lecons-fondateur-atelier"
  },
  {
    id: "a3", title: "Quand l'architecture rencontre l'artisanat local", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200",
    subtitle: "Plongée dans un projet qui redéfinit les espaces de travail collaboratifs.",
    category: "Projet Créatif", author: "Sarah Chen", readTime: 5, isFeatured: false, slug: "architecture-artisanat"
  }
];