"use client";
import { motion } from "framer-motion";
import { User, Heart, Users } from "lucide-react";

const dynamics = [
  { icon: User, title: "Seul·e", desc: "La plupart viennent seuls. La plupart repartent en discutant encore. C'est le meilleur endroit pour briser la glace." },
  { icon: Heart, title: "En date", desc: "Le date qui ne ressemble pas à un date. Apprendre quelque chose de nouveau ensemble crée une connexion unique." },
  { icon: Users, title: "Entre amis", desc: "Une soirée où vous apprenez un truc ensemble au lieu de faire la même chose que d'habitude. Ça change tout." },
];

export function EventSocialDynamic() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16 border-t border-border">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }}
        className="font-serif text-3xl font-bold tracking-tight text-center"
      >
        Et après ?
      </motion.h2>
      <p className="mt-4 text-center text-lg text-foreground/70 max-w-2xl mx-auto">
        On vient pour le talk. On reste pour ce qui se passe autour.
      </p>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {dynamics.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", damping: 20, delay: i * 0.15 }}
            className="text-center p-6 rounded-2xl border border-border hover:border-accent/50 hover:shadow-lg transition-all"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
              <item.icon size={24} />
            </div>
            <h3 className="mt-6 font-serif text-xl font-bold tracking-tight">{item.title}</h3>
            <p className="mt-3 text-foreground/70 leading-relaxed text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}