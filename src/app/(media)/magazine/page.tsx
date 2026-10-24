"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { mockArticles } from "@/data/mock-content";
import { Clock, ArrowRight } from "lucide-react";

const categories = ["Tous", "Portraits", "Interviews", "Projets Créatifs", "Coulisses"];

export default function MagazinePage() {
  const featured = mockArticles.find(a => a.isFeatured);
  const recent = mockArticles.filter(a => !a.isFeatured);

  return (
    <div className="min-h-screen bg-[#EBE5D9]">
      
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-12 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-sans text-4xl font-bold tracking-tight md:text-6xl text-black">
          Le Magazine Clairantine
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
          Portraits, interviews et récits de ceux qui réinventent les règles de l'art et de l'entreprise.
        </motion.p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat, i) => (
            <Link key={cat} href={cat === "Tous" ? "/magazine" : `/magazine/${cat.toLowerCase().replace(/\s/g, '-')}`} className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all active:scale-95 ${i === 0 ? "bg-accent text-white shadow-lg" : "bg-white/60 text-slate-700 hover:bg-white hover:shadow-md backdrop-blur-sm border border-slate-200"}`}>
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {featured && (
        <section className="mx-auto max-w-7xl px-6 pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-400 font-sans text-4xl">Portrait</div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">{featured.category}</span>
              <Link href={`/magazine/${featured.slug}`}><h2 className="mt-3 font-sans text-3xl md:text-4xl font-bold tracking-tight leading-tight text-black hover:text-accent transition-colors">{featured.title}</h2></Link>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">{featured.subtitle}</p>
              <div className="mt-6 flex items-center gap-4 text-sm text-slate-600">
                <span>Par {featured.author}</span>
                <span className="flex items-center gap-1"><Clock size={14} className="text-accent" /> Lecture : {featured.readTime} min</span>
              </div>
              <Link href={`/magazine/${featured.slug}`} className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent text-white px-6 py-3 font-semibold transition-all active:scale-95 hover:bg-accent/90">Lire l'article <ArrowRight size={16} /></Link>
            </div>
          </motion.div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <h2 className="font-sans text-2xl font-bold tracking-tight text-black mb-8">À lire ensuite</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recent.map((article, i) => (
            <motion.article key={article.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group">
              <div className="aspect-[16/9] rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 mb-4 flex items-center justify-center text-slate-400 font-sans text-2xl">Image</div>
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">{article.category}</span>
              <Link href={`/magazine/${article.slug}`}><h3 className="mt-2 font-sans text-xl font-bold tracking-tight leading-snug text-black group-hover:text-accent transition-colors">{article.title}</h3></Link>
              <div className="mt-2 text-sm text-slate-600 flex items-center gap-1"><Clock size={12} className="text-accent" /> Lecture : {article.readTime} min</div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="bg-black py-24 px-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="mx-auto max-w-3xl text-center">
          <h2 className="font-sans text-3xl md:text-5xl font-bold tracking-tight text-white">
            Vous êtes artiste ou entrepreneur et votre histoire mérite d'être racontée ?
          </h2>
          <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto">
            Nous sommes toujours à la recherche de nouveaux profils inspirants pour notre magazine.
          </p>
          <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-white text-black px-8 py-4 text-lg font-semibold transition-transform active:scale-95 hover:bg-white/90 mt-10">
            Proposer mon profil ou mon projet
          </Link>
        </motion.div>
      </section>
    </div>
  );
}