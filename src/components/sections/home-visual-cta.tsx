"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export function HomeVisualCta() {
  return (
    <section className="py-12 px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }} 
        whileInView={{ opacity: 1, scale: 1 }} 
        viewport={{ once: true }} 
        className="mx-auto max-w-6xl rounded-3xl overflow-hidden relative h-[400px] md:h-[500px] flex items-center"
      >
        {/* Unsplash Background Image */}
        <Image 
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200"
          alt="Ambiance incroyable d'un talk"
          fill
          className="object-cover"
          priority
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        
        {/* Content */}
        <div className="relative z-10 p-8 md:p-12 max-w-xl">
          <h3 className="font-sans text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
            Un soir. Un espace.<br />
            <span className="text-accent">Un expert.</span>
          </h3>
          <p className="mt-4 text-white/80 text-lg">
            Ne regardez plus les autres vivre des expériences incroyables. Rejoignez-nous.
          </p>
          <Link href="/evenements" className="mt-8 inline-flex items-center justify-center rounded-full bg-accent text-white px-8 py-4 font-bold transition-all hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20 active:scale-95">
            Réserver ma place
          </Link>
        </div>
      </motion.div>
    </section>
  );
}