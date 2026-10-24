"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export function HomeCta() {
  return (
    <section className="py-24 px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", damping: 20 }}
        className="mx-auto max-w-4xl rounded-3xl bg-foreground p-12 md:p-16 text-center"
      >
        <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-background">
          Vous avez un projet, une idée, ou un talent à partager ?
        </h2>
        <p className="mt-6 text-lg text-background/70 max-w-2xl mx-auto">
          Que vous souhaitiez animer un atelier ou être mis à l'honneur dans notre magazine, nous sommes à votre écoute.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-background text-foreground px-8 py-4 text-lg font-medium transition-transform active:scale-95 hover:bg-background/90">
            Nous contacter
          </Link>
          <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-background/30 text-background px-8 py-4 text-lg font-medium transition-colors hover:bg-background/10">
            Proposer un profil
          </Link>
        </div>
      </motion.div>
    </section>
  );
}