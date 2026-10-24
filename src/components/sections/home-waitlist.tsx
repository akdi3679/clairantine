"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function HomeWaitlist() {
  return (
    <section className="py-16 px-6 bg-background">
      {/* Container: Rounded, floating, and more compact */}
      <div className="mx-auto max-w-5xl rounded-[2rem] bg-surface p-6 md:p-10 border border-border/50 shadow-sm">
        
        {/* Header: Balanced sizes, no massive text */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          <div className="max-w-xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-2">
              ACCÈS PRIORITAIRE
            </p>
            {/* Scaled down to feel balanced with the tag */}
            <h2 className="font-sans text-xl md:text-2xl font-bold tracking-tight text-foreground leading-snug">
              Les places partent en <span className="text-accent">48 heures.</span>
            </h2>
          </div>
          
          <p className="text-sm text-foreground/70 max-w-sm leading-relaxed">
            Les abonnés sont prévenus en premier. Rejoignez la liste pour être alerté avant tout le monde.
          </p>
        </div>

        {/* Form: Clean, rounded, no horizontal divider */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row gap-4 items-center"
        >
          <div className="flex-1 w-full relative">
            <input
              type="email"
              placeholder="Votre email"
              className="w-full rounded-full border border-border/50 bg-background px-6 py-3 text-base font-medium text-foreground placeholder:text-foreground/40 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
            />
          </div>
          
          {/* Solid, rounded button */}
          <Link 
            href="/liste-attente" 
            className="w-full md:w-auto bg-accent text-white rounded-full px-8 py-3 font-bold text-sm hover:bg-accent/90 transition-colors shrink-0 flex items-center justify-center gap-2"
          >
            Rejoindre la liste <ArrowRight size={16} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}