"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const steps = [
  { time: "45'", title: "Le Talk", desc: "Quelqu'un qui sait de quoi il parle, qui raconte ça bien. Pas de jargon, juste une bonne histoire." },
  { time: "15'", title: "Les Questions", desc: "Vous posez les questions que tout le monde se pose tout bas. Pas de filtre, pas de chichi." },
  { time: "∞", title: "L'Échange", desc: "On reste, on boit un verre, et on continue la discussion avec des gens qu'on ne connaissait pas une heure avant." },
];

export function HomeFormat() {
  return (
    <section className="py-24 px-6 bg-foreground/[0.02]">
      <div className="mx-auto max-w-5xl">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center font-serif text-4xl font-bold tracking-tight">
          Le format tient en 3 temps
        </motion.h2>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, i) => (
            <motion.div key={step.time} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }}
              className="relative text-center p-8">
              <div className="font-serif text-6xl font-bold text-accent">{step.time}</div>
              <h3 className="mt-4 text-xl font-bold tracking-tight">{step.title}</h3>
              <p className="mt-3 text-foreground/70 leading-relaxed">{step.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 -right-4 text-foreground/20">
                  <ArrowRight size={32} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}