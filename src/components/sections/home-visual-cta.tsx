"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export function HomeVisualCta() {
  return (
    <section className="py-12 px-6">
      <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="mx-auto max-w-6xl rounded-3xl overflow-hidden relative h-[400px] flex items-center">
        <div className="absolute inset-0 bg-foreground/5 flex items-center justify-center text-foreground/20 font-serif text-4xl">[ Photo ambiance incroyale d'un talk ]</div>
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 to-transparent" />
        <div className="relative z-10 p-12 max-w-xl">
          <h3 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-background">Un soir. Un espace. Un expert.</h3>
          <p className="mt-4 text-background/80 text-lg">Ne regardez plus les autres vivre des expériences incroyables. Rejoignez-nous.</p>
          <Link href="/evenements" className="mt-8 inline-flex btn-primary bg-background text-foreground hover:bg-background/90">Réserver ma place</Link>
        </div>
      </motion.div>
    </section>
  );
}