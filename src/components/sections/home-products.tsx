"use client";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";

const products = [
  { id: 1, name: "Le Carnet de Terrain", price: "24", description: "Un carnet grand format pour capturer vos idées, annoté par nos intervenants.", image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&auto=format&fit=crop&q=80" },
  { id: 2, name: "Le Tote Bag Édition", price: "18", description: "Tote bag en coton bio, sérigraphié à la main. L'accessoire indispensable des créatifs.", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80" },
  { id: 3, name: "La Mug Signature", price: "16", description: "Mug en céramique matte, parfait pour les matins inspirés et les pauses réflexives.", image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&auto=format&fit=crop&q=80" }
];

export function HomeProducts() {
  return (
    <section className="py-24 px-6 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
          <div className="max-w-2xl">
            <h2 className="font-sans text-3xl md:text-5xl font-black tracking-tighter text-foreground uppercase leading-[0.9]">L'esprit Clairantine, chez vous.</h2>
            <p className="mt-4 text-base md:text-lg text-foreground/60">Des objets pensés pour les créatifs qui ne se contentent pas.</p>
          </div>
          <Link href="/boutique" className="text-sm font-bold text-foreground hover:text-accent transition-colors flex items-center gap-2 group shrink-0">
            Voir la boutique <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Scroll Hint for Mobile */}
        <div className="relative">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-foreground/40 mb-4 md:hidden flex items-center justify-center gap-2">
            Glisser pour voir plus <ArrowRight size={12} />
          </p>
          
          {/* Horizontal scroll on mobile, grid on desktop */}
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 md:grid md:grid-cols-3 md:overflow-visible scrollbar-hide">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", damping: 20, delay: i * 0.1 }}
                className="group flex flex-col rounded-2xl border border-border bg-surface overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all min-w-[85vw] md:min-w-0 snap-start aspect-[3/4]"
              >
                <div className="relative aspect-[4/3] bg-foreground/5 overflow-hidden shrink-0">
                  <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-foreground shadow-sm">{product.price}</div>
                </div>
                <div className="flex flex-col flex-1 p-5">
                  <h3 className="font-sans text-lg font-bold tracking-tight text-foreground group-hover:text-accent transition-colors">{product.name}</h3>
                  <p className="mt-2 text-sm text-foreground/60 leading-relaxed line-clamp-2 flex-1">{product.description}</p>
                  <button className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-full border border-border text-sm font-bold text-foreground hover:bg-accent hover:text-white hover:border-accent transition-all">
                    <ShoppingBag size={14} /> Ajouter
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Fade indicator on the right for mobile */}
          <div className="absolute right-0 top-0 bottom-8 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none md:hidden" />
        </div>
      </div>
      <style jsx>{`.scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
    </section>
  );
}