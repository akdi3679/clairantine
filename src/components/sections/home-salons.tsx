"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";

const salons = [
  { id: 1, name: "Le Comptoir", city: "Paris", capacity: "40-60 personnes", vibe: "Industriel & Chaleureux", description: "Une ancienne imprimerie réhabilitée avec des verrières d'atelier, des murs en briques apparentes et une acoustique parfaite.", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80" },
  { id: 2, name: "La Ruche", city: "Lyon", capacity: "20-30 personnes", vibe: "Épuré & Lumineux", description: "Un espace contemporain avec des plafonds cathédrale et une lumière naturelle incroyable. Idéal pour les dîners-débats.", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80" }
];

export function HomeSalons() {
  const [activeId, setActiveId] = useState(1);
  const activeSalon = salons.find(s => s.id === activeId) || salons[0];

  return (
    <section className="w-full min-h-screen flex items-center px-4 sm:px-6 py-16 bg-surface">
      <div className="mx-auto max-w-7xl w-full flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-20">
        
        {/* 1. HEADER : Titre à gauche, Bouton à droite (sans chevauchement) */}
        <div className="order-1 lg:col-span-2 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 lg:mb-4">
          <div className="flex-1 min-w-0">
            <h2 className="font-sans text-3xl md:text-4xl font-black tracking-tighter text-foreground uppercase leading-tight">
              Nos Salons.
            </h2>
            <p className="text-base text-foreground/60 mt-2">
              Des lieux choisis pour leur âme, leur énergie et leur accueil.
            </p>
          </div>
          
          {/* CTA BUTTON : Reste à droite sur mobile (sm+), ne rétrécit pas */}
          <div className="sm:mt-0 flex-shrink-0">
            <Link href="/accueillir" className="inline-flex items-center justify-center gap-2 bg-accent text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-full font-bold text-xs sm:text-sm hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 whitespace-nowrap">
              Accueillir un salon
            </Link>
          </div>
        </div>

        {/* 2. SELECTOR BTNS */}
        <div className="order-2 lg:order-2 flex flex-col gap-3">
          {salons.map((salon) => {
            const isActive = salon.id === activeId;
            return (
              <button key={salon.id} onClick={() => setActiveId(salon.id)} className={`w-full text-left px-5 py-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between group ${isActive ? "bg-background border-accent shadow-md" : "bg-transparent border-border/50 hover:border-foreground/20 hover:bg-background/50"}`}>
                <div className="flex items-center gap-3">
                  <MapPin size={16} className={isActive ? "text-accent" : "text-foreground/40"} />
                  <div>
                    <h4 className={`font-sans text-sm font-bold tracking-tight transition-colors ${isActive ? "text-accent" : "text-foreground group-hover:text-accent"}`}>{salon.name}</h4>
                    <p className={`text-[11px] transition-colors ${isActive ? "text-foreground/70" : "text-foreground/50"}`}>{salon.city} · {salon.capacity}</p>
                  </div>
                </div>
                {isActive && <div className="w-2 h-2 rounded-full bg-accent" />}
              </button>
            );
          })}
        </div>

        {/* 4. IMAGE */}
        <div className="order-4 lg:order-1 flex flex-col gap-6">
          <AnimatePresence mode="wait">
            <motion.div key={activeSalon.id} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.4 }} className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-xl group">
              <img src={activeSalon.image} alt={activeSalon.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-foreground shadow-sm">{activeSalon.city}</div>
            </motion.div>
          </AnimatePresence>
          
          {/* 5. CONTENT DETAILS */}
          <div className="order-5">
            <h3 className="font-sans text-2xl md:text-3xl font-black tracking-tight text-foreground">{activeSalon.name}</h3>
            <p className="text-sm md:text-base text-foreground/70 leading-relaxed mt-3">{activeSalon.description}</p>
            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-border/50">
              <div className="flex items-center gap-1.5 text-xs font-medium text-foreground/80">
                <Users size={14} className="text-accent" /> {activeSalon.capacity}
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-foreground/80">
                <Sparkles size={14} className="text-accent" /> {activeSalon.vibe}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}