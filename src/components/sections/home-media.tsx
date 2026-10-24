"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { mockArticles } from "@/data/mock-content";

export function HomeMedia() {
  const featured = mockArticles.find(a => a.isFeatured);
  const recent = mockArticles.filter(a => !a.isFeatured);

  return (
    <section className="py-24 px-6 bg-foreground/[0.02]">
      <div className="mx-auto max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="mb-16 flex items-end justify-between"
        >
          <div>
            <h2 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">Le Média</h2>
            <p className="mt-4 text-lg text-foreground/60 max-w-xl">Portraits, interviews et récits de ceux qui réinventent les règles.</p>
          </div>
          <Link href="/media" className="hidden md:inline-flex btn-secondary text-sm py-2 px-4">
            Tout lire
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {featured && (
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              className="lg:col-span-2 group"
            >
              <div className="aspect-[16/9] rounded-2xl bg-foreground/5 mb-6 overflow-hidden relative">
                <img 
                  src={featured.image || "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80"} 
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">{featured.category}</span>
              <Link href={`/media/${featured.slug}`}>
                <h3 className="mt-3 font-serif text-3xl md:text-4xl font-bold tracking-tight leading-tight group-hover:text-accent transition-colors">
                  {featured.title}
                </h3>
              </Link>
              <p className="mt-4 text-lg text-foreground/70 leading-relaxed">{featured.subtitle}</p>
              <div className="mt-4 flex items-center gap-4 text-sm text-foreground/50">
                <span>Par {featured.author}</span>
                <span className="flex items-center gap-1"><Clock size={14} /> {featured.readTime} min de lecture</span>
              </div>
            </motion.div>
          )}

          <div className="flex flex-col gap-8">
            {recent.map((article, i) => (
              <motion.div 
                key={article.id} 
                initial={{ opacity: 0, x: 30 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group border-b border-border pb-8 last:border-0 last:pb-0"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-foreground/50">{article.category}</span>
                <Link href={`/media/${article.slug}`}>
                  <h4 className="mt-2 font-serif text-xl font-bold tracking-tight leading-snug group-hover:text-accent transition-colors">
                    {article.title}
                  </h4>
                </Link>
                <div className="mt-2 text-sm text-foreground/50 flex items-center gap-1">
                  <Clock size={12} /> {article.readTime} min de lecture
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}