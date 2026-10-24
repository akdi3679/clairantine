"use client";
import { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowLeft } from "lucide-react";
import { mockArticles } from "@/data/mock-content";

export default function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const article = mockArticles.find(a => a.slug === slug) || mockArticles[0];

  return (
    <div className="min-h-screen bg-[#EBE5D9]">
      
      <div className="mx-auto max-w-3xl px-6 pt-32 pb-8">
        <Link href="/magazine" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-accent transition-colors">
          <ArrowLeft size={16} /> Retour au magazine
        </Link>
      </div>

      <header className="mx-auto max-w-3xl px-6 py-12 text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">{article.category}</span>
        <h1 className="mt-4 font-sans text-4xl font-bold tracking-tight md:text-5xl leading-[1.1] text-black">{article.title}</h1>
        <p className="mt-6 text-xl text-slate-600 italic leading-relaxed">{article.subtitle}</p>
        <div className="mt-8 flex items-center justify-center gap-4 text-sm text-slate-600">
          <span>Par {article.author}</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Clock size={14} className="text-accent" /> Lecture : {article.readTime} min</span>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6">
        <div className="aspect-[16/9] rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 mb-16 overflow-hidden flex items-center justify-center text-slate-400 font-sans text-4xl">Image de couverture</div>
      </div>

      <article className="mx-auto max-w-3xl px-6 pb-24">
        <div className="space-y-8 text-lg text-slate-600 leading-[1.7]">
          <p className="first-letter:text-5xl first-letter:font-sans first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8] first-letter:text-accent">
            C'est une histoire que l'on entend souvent dans les cafés parisiens. Celle d'un cadre sup' qui, un mardi pluvieux de novembre, décide de tout plaquer pour suivre sa passion. Mais l'histoire de Clara est différente.
          </p>
          <p>"Le secret n'est pas de travailler plus, mais de créer un univers auquel les gens veulent appartenir", me dit-elle en ajustant les prototypes sur son établi.</p>
          <blockquote className="my-12 p-8 rounded-2xl bg-white/60 border border-slate-200">
            <p className="font-sans text-3xl italic text-black leading-snug">
              "On ne vend pas un objet. On vend le temps que les gens gagnent pour se consacrer à ce qu'ils aiment vraiment."
            </p>
          </blockquote>
          <p>En trois ans, Clara a transformé sa passion en une marque internationale. Mais ce qui frappe le plus, c'est la communauté qu'elle a bâtie.</p>
          
          <p>
            La suite de cette histoire révèle les chiffres exacts de sa première année, les trois erreurs fatales qu'elle a commises avant de trouver son modèle, et la méthode exacte qu'elle utilise aujourd'hui pour transformer ses clients en ambassadeurs. 
          </p>
          <p>
            Ces coulisses exclusives, nous les partageons régulièrement avec notre communauté. Rejoignez-nous pour accéder à l'intégralité de nos portraits, aux interviews non publiées, et aux invitations en avant-première pour nos prochains événements.
          </p>
        </div>

        {/* Author Bio */}
        <div className="mt-24 flex items-center gap-6 rounded-2xl border border-slate-200 bg-white/60 p-8">
          <div className="h-16 w-16 rounded-full bg-accent/20 flex items-center justify-center text-xl font-sans font-bold text-accent">{article.author.charAt(0)}</div>
          <div>
            <h3 className="font-bold text-black">{article.author}</h3>
            <p className="text-sm text-slate-600 mt-1">Rédacteur en chef chez Clairantine. Passionné par les entrepreneurs qui réinventent les règles.</p>
          </div>
        </div>

        {/* Cross-Pollination CTA */}
        <div className="mt-16 rounded-2xl bg-black p-10 text-center">
          <h3 className="font-sans text-2xl font-bold tracking-tight text-white">Cet article vous a inspiré ?</h3>
          <p className="mt-4 text-white/70">Découvrez nos prochains événements pour rencontrer ces créateurs en vrai.</p>
          <Link href="/evenements" className="mt-8 inline-flex items-center justify-center rounded-full bg-white text-black px-8 py-3 font-semibold transition-transform active:scale-95 hover:bg-white/90">Voir les événements</Link>
        </div>
      </article>
    </div>
  );
}