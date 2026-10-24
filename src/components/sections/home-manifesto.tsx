"use client";
import { motion } from "framer-motion";
import { Handshake, Lightbulb, Sparkles } from "lucide-react";

const pillars = [
  { icon: Handshake, title: "Rencontrer", desc: "Briser les silos entre les mondes de l'art et de l'entreprise pour créer des connexions authentiques." },
  { icon: Lightbulb, title: "Apprendre", desc: "Des formats courts, pratiques et animés par des experts de terrain qui partagent leurs vraies leçons." },
  { icon: Sparkles, title: "Célébrer", desc: "Donner de la visibilité et une voix à ceux qui créent, innovent et construisent avec authenticité." },
];

export function HomeManifesto() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="mx-auto max-w-7xl">
        {/* Updated Title Font */}
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center font-sans text-3xl md:text-4xl font-black tracking-tighter text-foreground uppercase mb-16">
          Pourquoi Clairantine ?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {pillars.map((pillar, i) => (
            <motion.div key={pillar.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", damping: 20, delay: i * 0.15 }} className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                <pillar.icon size={32} />
              </div>
              <h3 className="mt-6 font-sans text-xl font-bold tracking-tight">{pillar.title}</h3>
              <p className="mt-4 text-foreground/70 leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}