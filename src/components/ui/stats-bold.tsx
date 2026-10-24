"use client";

import React from "react";
import { motion } from "framer-motion";

export const BoldStats = () => {
  return (
    <section className="bg-background flex flex-col justify-center">
      <div className="flex flex-col gap-12 md:gap-16 py-16 md:py-24 max-w-7xl mx-auto px-6 w-full">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:flex justify-between items-start gap-8 md:gap-12"
        >
          {/* Left Side: Big Number + Small Stats */}
          <div className="flex flex-col gap-6 shrink-0">
            
            {/* 1. The Big Number */}
            <span className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-accent leading-none">
              1,850+
            </span>

            {/* 2. Small Stats immediately under the big number */}
            <div className="flex flex-row gap-8 md:gap-12">
              <div>
                <p className="text-2xl md:text-3xl font-black tracking-tighter text-foreground leading-none">42</p>
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-foreground/50 mt-1">Événements</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-black tracking-tighter text-foreground leading-none">12</p>
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-foreground/50 mt-1">Villes</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-black tracking-tighter text-foreground leading-none">98%</p>
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-foreground/50 mt-1">Satisfaction</p>
              </div>
            </div>
          </div>

          {/* Middle: Description Text Block (Fills the empty space) */}
          <div className="flex-1 pt-12 md:pt-20">
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground mb-2">
              Personnes Réunies
            </h3>
            <p className="text-sm md:text-base text-foreground/60 text-pretty leading-relaxed">
              Nous créons des espaces de dialogue authentique, à travers des événements soigneusement curatés et un média qui donne la parole aux acteurs de demain.
            </p>
          </div>

          {/* Right Side: Image with text strictly INSIDE the boundaries */}
          <div className="relative shrink-0 mt-8 md:mt-0 group">
            <img
              src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&auto=format&fit=crop&q=80"
              alt="Communauté Clairantine"
              className="sm:w-80 w-full h-56 md:h-72 object-cover rounded-xl shadow-lg"
            />
            
            {/* Elegant typography strictly inside the image (no overflow) */}
            <span className="absolute bottom-4 right-4 text-3xl md:text-5xl font-serif font-black text-white tracking-tighter pointer-events-none select-none leading-none drop-shadow-lg z-10">
              Clairantine
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default BoldStats;