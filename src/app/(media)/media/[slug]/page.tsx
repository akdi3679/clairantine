"use client";
import { use } from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowLeft } from "lucide-react";
import { mockArticles } from "@/data/mock-content";

export default function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const article = mockArticles.find(a => a.slug === slug) || mockArticles[0];
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(Math.min((scrollTop / docHeight) * 100, 100));
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* FIXED: Progress bar with high z-index and visible background */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-1.5 bg-slate-100">
        <div className="h-full bg-slate-900 transition-all duration-150 ease-out" style={{ width: `${progress}%` }} />
      </div>

      {/* FIXED: Adequate top padding (pt-32) */}
      <div className="mx-auto max-w-3xl px-6 pt-32 pb-8">
        <Link href="/media" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Retour au média
        </Link>
      </div>

      <header className="mx-auto max-w-3xl px-6 py-8 text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{article.category}</span>
        <h1 className="mt-4 font-sans text-4xl font-bold tracking-tight md:text-5xl leading-[1.1] text-slate-900">{article.title}</h1>
        <p className="mt-6 text-xl text-slate-600 leading-relaxed">{article.subtitle}</p>
        <div className="mt-8 flex items-center justify-center gap-4 text-sm text-slate-500">
          <span>Par {article.author}</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Clock size={14} /> Lecture : {article.readTime} min</span>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6">
        <div className="aspect-[16/9] rounded-2xl bg-slate-100 mb-16 overflow-hidden flex items-center justify-center text-slate-400 font-sans text-2xl font-medium">Image de couverture</div>
      </div>

      <article className="mx-auto max-w-3xl px-6 pb-24">
        <div className="space-y-8 text-lg text-slate-700 leading-[1.8]">
          <p className="first-letter:text-5xl first-letter:font-sans first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8] first-letter:text-slate-900">
            C'est une histoire que l'on entend souvent dans les cafés parisiens. Celle d'un cadre sup' qui, un mardi pluvieux de novembre, décide de tout plaquer pour suivre sa passion. Mais l'histoire de Clara est différente.
          </p>
          <p>"Le secret n'est pas de travailler plus, mais de créer un univers auquel les gens veulent appartenir", me dit-elle en ajustant les prototypes sur son établi.</p>
          
          {/* Clean pull quote without heavy orange */}
          <blockquote className="my-12 p-8 rounded-2xl bg-slate-50 border border-slate-200">
            <p className="font-sans text-2xl font-semibold text-slate-900 leading-snug italic">
              "On ne vend pas un objet. On vend le temps que les gens gagnent pour se consacrer à ce qu'ils aiment vraiment."
            </p>
          </blockquote>
          
          <p>En trois ans, Clara a transformé sa passion en une marque internationale. Mais ce qui frappe le plus, c'est la communauté qu'elle a bâtie.</p>
        </div>

        <div className="mt-24 flex items-center gap-6 rounded-2xl border border-slate-200 p-8 bg-slate-50">
          <div className="h-16 w-16 rounded-full bg-slate-200 flex items-center justify-center text-xl font-sans font-bold text-slate-500">{article.author.charAt(0)}</div>
          <div>
            <h3 className="font-bold text-slate-900">{article.author}</h3>
            <p className="text-sm text-slate-600 mt-1">Rédacteur en chef chez Clairantine. Passionné par les entrepreneurs qui réinventent les règles.</p>
          </div>
        </div>

        <div className="mt-16 rounded-2xl bg-slate-900 p-10 text-center">
          <h3 className="font-sans text-2xl font-bold tracking-tight text-white">Cet article vous a inspiré ?</h3>
          <p className="mt-4 text-slate-400">Découvrez nos prochains événements pour rencontrer ces créateurs en vrai.</p>
          <Link href="/evenements" className="mt-8 inline-flex items-center justify-center rounded-xl bg-white text-slate-900 px-8 py-3 font-semibold transition-transform active:scale-95 hover:bg-slate-100">Voir les événements</Link>
        </div>
      </article>
    </div>
  );
}