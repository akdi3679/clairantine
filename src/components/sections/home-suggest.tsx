"use client";
import { motion } from "framer-motion";
import { Lightbulb, MapPin, Mic } from "lucide-react";

export function HomeSuggest() {
  return (
    <section className="py-24 px-6 bg-foreground/[0.02]">
      <div className="mx-auto max-w-4xl text-center">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif text-4xl font-bold tracking-tight">Façonnez la suite.</motion.h2>
        <p className="mt-4 text-lg text-foreground/60">Clairantine est co-créé avec sa communauté. Qui devrions-nous inviter ? Où devrions-nous aller ?</p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="/contact" className="p-6 rounded-2xl border border-border bg-background hover:border-accent transition-colors text-left">
            <Mic size={24} className="text-accent mb-4" />
            <h3 className="font-bold text-foreground">Suggérer un intervenant</h3>
            <p className="mt-2 text-sm text-foreground/60">Vous connaissez un expert brillant ?</p>
          </a>
          <a href="/contact" className="p-6 rounded-2xl border border-border bg-background hover:border-accent transition-colors text-left">
            <Lightbulb size={24} className="text-accent mb-4" />
            <h3 className="font-bold text-foreground">Proposer un sujet</h3>
            <p className="mt-2 text-sm text-foreground/60">Quelle question vous hante en ce moment ?</p>
          </a>
          <a href="/contact" className="p-6 rounded-2xl border border-border bg-background hover:border-accent transition-colors text-left">
            <MapPin size={24} className="text-accent mb-4" />
            <h3 className="font-bold text-foreground">Demander une ville</h3>
            <p className="mt-2 text-sm text-foreground/60">Vous voulez nous accueillir chez vous ?</p>
          </a>
        </div>
      </div>
    </section>
  );
}