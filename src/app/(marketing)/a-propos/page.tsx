"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="bg-[#EBE5D9]">
      {/* HERO */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden pt-32">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="text-center px-6 z-10">
          <h1 className="font-sans text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] text-black">
            Nous ne créons pas<br />
            <span className="text-accent italic">des événements.</span>
          </h1>
          <p className="mt-8 text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto font-sans italic">
            Nous créons des catalyseurs.
          </p>
        </motion.div>
      </section>

      {/* MANIFESTO */}
      <section className="mx-auto max-w-3xl px-6 py-32">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <p className="text-2xl md:text-3xl text-slate-600 leading-relaxed font-sans">
            Clairantine est née d'une frustration. D'un côté, des créateurs brillants qui ignorent comment structurer leur impact. De l'autre, des entrepreneurs strategiques qui ont perdu le sens de l'esthétique.
          </p>
          <p className="mt-8 text-2xl md:text-3xl text-slate-600 leading-relaxed font-sans">
            Nous avons décidé de briser le mur. De créer un espace où le design rencontre le business model, où l'art rencontre la data, où l'intuition rencontre la stratégie.
          </p>
        </motion.div>
      </section>

      {/* THE TEAM */}
      <section className="bg-black text-white py-32 px-6">
        <div className="mx-auto max-w-5xl">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-sans text-4xl md:text-5xl font-bold tracking-tight text-center mb-16">
            Les architectes de ce pont.
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="aspect-[4/5] rounded-3xl bg-white/10 flex items-center justify-center text-white/20 font-sans text-2xl">
              [ Photo des fondateurs ]
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-xl text-white/80 leading-relaxed">
                Nous sommes une équipe de curateurs, d'anciens fondateurs et de passionnés de design. Nous avons passé la dernière décennie à observer ce qui fait qu'une idée prend, ou meurt.
              </p>
              <p className="mt-6 text-xl text-white/80 leading-relaxed">
                Notre métier ? Trouver les voix qui comptent, les mettre dans les plus beaux lieux de la ville, et vous inviter à la table.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 px-6 text-center">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-sans text-4xl md:text-5xl font-bold tracking-tight text-black">
          Prêt à rejoindre le mouvement ?
        </motion.h2>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/evenements" className="bg-accent text-white text-lg px-8 py-4 rounded-full font-semibold hover:bg-accent/90 transition-colors">Voir les événements</Link>
          <Link href="/magazine" className="bg-white text-black border border-slate-200 text-lg px-8 py-4 rounded-full font-semibold hover:bg-slate-50 transition-colors">Lire le magazine</Link>
        </div>
      </section>
    </div>
  );
}