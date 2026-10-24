"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { mockArticles } from "@/data/mock-content";
import { Clock, ArrowRight } from "lucide-react";

const categories = ["Tous", "Portraits", "Interviews", "Projets Créatifs", "Coulisses"];

export default function MédiaPage() {
  const featured = mockArticles.find(a => a.isFeatured);
  const recent = mockArticles.filter(a => !a.isFeatured);

  return (
    <div className="min-h-screen bg-white">
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-12 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-sans text-4xl font-bold tracking-tight md:text-6xl text-slate-900">Le Média</motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">Portraits, interviews et récits de ceux qui réinventent les règles de l'art et de l'entreprise.</motion.p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat, i) => (
            <Link key={cat} href={cat === "Tous" ? "/media" : `/media/${cat.toLowerCase().replace(/\s/g, '-')}`} className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all active:scale-95 ${i === 0 ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{cat}</Link>
          ))}
        </div>
      </section>

      {featured && (
        <section className="mx-auto max-w-7xl px-6 pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/3] rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-sans text-2xl font-medium">Portrait</div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{featured.category}</span>
              <Link href={`/media/${featured.slug}`}><h2 className="mt-3 font-sans text-3xl md:text-4xl font-bold tracking-tight leading-tight text-slate-900 hover:text-slate-700 transition-colors">{featured.title}</h2></Link>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">{featured.subtitle}</p>
              <div className="mt-6 flex items-center gap-4 text-sm text-slate-500">
                <span>Par {featured.author}</span>
                <span className="flex items-center gap-1"><Clock size={14} /> Lecture : {featured.readTime} min</span>
              </div>
              <Link href={`/media/${featured.slug}`} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-900 text-white px-6 py-3 font-semibold transition-all active:scale-95 hover:bg-slate-800">Lire l'article <ArrowRight size={16} /></Link>
            </div>
          </motion.div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <h2 className="font-sans text-2xl font-bold tracking-tight text-slate-900 mb-8">À lire ensuite</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recent.map((article, i) => (
            <motion.article key={article.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group">
              <div className="aspect-[16/9] rounded-xl bg-slate-100 mb-4 flex items-center justify-center text-slate-400 font-sans text-lg font-medium">Image</div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{article.category}</span>
              <Link href={`/media/${article.slug}`}><h3 className="mt-2 font-sans text-xl font-bold tracking-tight leading-snug text-slate-900 group-hover:text-slate-700 transition-colors">{article.title}</h3></Link>
              <div className="mt-2 text-sm text-slate-500">Lecture : {article.readTime} min</div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 py-24 px-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="mx-auto max-w-3xl text-center">
          <h2 className="font-sans text-3xl md:text-5xl font-bold tracking-tight text-white">Votre histoire mérite d'être racontée.</h2>
          <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">Nous sommes toujours à la recherche de nouveaux profils inspirants pour notre Média.</p>
          <Link href="/contact" className="inline-flex items-center justify-center rounded-xl bg-white text-slate-900 px-8 py-4 text-lg font-semibold transition-transform active:scale-95 hover:bg-slate-100 mt-10">Proposer mon profil ou mon projet</Link>
        </motion.div>
      </section>
    </div>
  );
}