"use client";
import { motion } from "framer-motion";

const partners = ["Le Compt9", "La Ruche", "Atelier 4", "Sorbonne IA", "Maison des Créatifs"];

export function SocialProofBar() {
  return (
    <section className="py-12 border-y border-border/50 bg-foreground/[0.02]">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-foreground/40 mb-8">
          Ils nous font confiance pour créer les rencontres de demain
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {partners.map((partner, i) => (
            <motion.div
              key={partner}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="font-serif text-xl md:text-2xl font-bold text-foreground/20 hover:text-foreground/60 transition-colors duration-300 cursor-default"
            >
              {partner}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}