import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialité | Clairantine",
  description: "Politique de confidentialité et gestion des données personnelles (RGPD).",
  robots: { index: true, follow: true },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">Politique de Confidentialité</h1>
        
        <div className="mt-12 space-y-12 text-foreground/80 leading-relaxed">
          <section>
            <h2 className="font-sans text-xl font-semibold text-foreground mb-4">1. Collecte des données</h2>
            <p>Nous collectons uniquement les données strictement nécessaires au fonctionnement du site et à la gestion de nos événements (nom, email via le formulaire de contact ou d'inscription).</p>
          </section>

          <section>
            <h2 className="font-sans text-xl font-semibold text-foreground mb-4">2. Utilisation des cookies</h2>
            <p>Ce site utilise des cookies essentiels au bon fonctionnement du site (session, sécurité). Aucun cookie publicitaire ou de tracking tiers n'est déposé sans votre consentement explicite.</p>
          </section>

          <section>
            <h2 className="font-sans text-xl font-semibold text-foreground mb-4">3. Vos droits (RGPD)</h2>
            <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données. Pour exercer ce droit, contactez-nous à l'adresse : <strong>contact@clairantine.fr</strong>.</p>
          </section>

          <section>
            <h2 className="font-sans text-xl font-semibold text-foreground mb-4">4. Hébergement des données</h2>
            <p>Les données sont hébergées de manière sécurisée via nos prestataires (Vercel, Sanity), qui garantissent un niveau de conformité RGPD et une localisation des données en Europe ou dans des pays bénéficiant d'une décision d'adéquation.</p>
          </section>
        </div>
      </div>
    </div>
  );
}