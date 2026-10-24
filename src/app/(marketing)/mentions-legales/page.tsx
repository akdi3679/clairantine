import { Metadata } from "next";
import { legalData } from "@/data/legal";

export const metadata: Metadata = {
  title: "Mentions Légales | Clairantine",
  description: "Mentions légales et informations légales du site Clairantine.",
  robots: { index: true, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">Mentions Légales</h1>
        
        <div className="mt-12 space-y-12 text-foreground/80 leading-relaxed">
          <section>
            <h2 className="font-sans text-xl font-semibold text-foreground mb-4">1. Éditeur du site</h2>
            <p>Le site <strong>Clairantine</strong> est édité par :</p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>Raison sociale : {legalData.editor.status}</li>
              <li>Adresse : {legalData.editor.address}</li>
              <li>Email : {legalData.editor.email}</li>
              <li>Téléphone : {legalData.editor.phone}</li>
              <li>SIRET : {legalData.editor.siret}</li>
              <li>Directeur de la publication : {legalData.editor.director}</li>
            </ul>
          </section>

          <section>
            <h2 className="font-sans text-xl font-semibold text-foreground mb-4">2. Hébergeur</h2>
            <p>Le site est hébergé par :</p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>{legalData.host.name}</li>
              <li>{legalData.host.address}</li>
              <li>Téléphone : {legalData.host.phone}</li>
            </ul>
          </section>

          <section>
            <h2 className="font-sans text-xl font-semibold text-foreground mb-4">3. Propriété intellectuelle</h2>
            <p>L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.</p>
          </section>
        </div>
      </div>
    </div>
  );
}