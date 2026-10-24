"use client";
import { motion } from "framer-motion";
import { User, Heart, Users } from "lucide-react";

const dynamics = [
  { icon: User, title: "Seul·e", desc: "La plupart viennent seuls. La plupart repartent en discutant encore. C'est le meilleur endroit pour briser la glace." },
  { icon: Heart, title: "En date", desc: "Le date qui ne ressemble pas à un date. Apprendre quelque chose de nouveau ensemble crée une connexion unique." },
  { icon: Users, title: "Entre amis", desc: "Une soirée où vous apprenez un truc ensemble au lieu de faire la même chose que d'habitude. Ça change tout." },
];

export function HomeSocialDynamics() {
  return (
    <section className="py-24 px-6 bg-foreground/[0.02]">
      <div className="mx-auto max-w-5xl">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center font-serif text-4xl font-bold tracking-tight">
          Et après ?
        </motion.h2>
        <p className="mt-4 text-center text-lg text-foreground/60">On vient pour le talk. On reste pour ce qui se passe autour.</p>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {dynamics.map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              className="text-center p-8 rounded-2xl border border-border bg-background hover:border-accent/50 transition-colors">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent"><item.icon size={24} /></div>
              <h3 className="mt-6 font-serif text-2xl font-bold tracking-tight">{item.title}</h3>
              <p className="mt-3 text-foreground/70 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}