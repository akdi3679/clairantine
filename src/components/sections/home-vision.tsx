"use client";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const current = ["Paris", "Lyon", "Bordeaux"];
const future = ["Marseille", "Toulouse", "Lille", "Nantes"];

export function HomeVision() {
  return (
    <section className="py-24 px-6 bg-foreground text-background">
      <div className="mx-auto max-w-5xl text-center">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif text-4xl font-bold tracking-tight">
          Où nous sommes. Où nous allons.
        </motion.h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-background/50 mb-6">Déjà implantés</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {current.map(city => (
                <div key={city} className="flex items-center gap-2 bg-background/10 px-4 py-2 rounded-full"><MapPin size={16} className="text-accent" /> <span className="font-medium">{city}</span></div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-background/50 mb-6">Bientôt dans votre ville</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {future.map(city => (
                <div key={city} className="flex items-center gap-2 border border-background/20 px-4 py-2 rounded-full text-background/70"><span>{city}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}