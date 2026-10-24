"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { venues } from "@/data/mock-content";
import { MapPin, ArrowRight } from "lucide-react";

export function HomeVenues() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center font-serif text-4xl font-bold tracking-tight">
          Nos Salons
        </motion.h2>
        <p className="mt-4 text-center text-lg text-foreground/60">
          Des lieux choisis pour leur âme, leur énergie et leur accueil.
        </p>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {venues.map((venue, i) => (
            <motion.div key={venue.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-background p-6 hover:border-accent/50 transition-colors">
              <div className="aspect-[16/9] rounded-xl bg-foreground/5 mb-4 flex items-center justify-center text-foreground/20 font-serif">
                [ Photo du lieu ]
              </div>
              <h3 className="font-serif text-xl font-bold tracking-tight">{venue.name}</h3>
              <div className="mt-2 flex items-center gap-2 text-sm text-foreground/60">
                <MapPin size={14} /> {venue.city}
              </div>
              <p className="mt-2 text-sm text-foreground/70 italic">{venue.vibe}</p>
            </motion.div>
          ))}
        </div>

        {/* NEW: Accueillir CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16 text-center">
          <Link href="/accueillir" className="btn-secondary inline-flex items-center gap-2 text-lg px-8 py-4">
            Vous avez un lieu d'exception ? Accueillez-nous <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}