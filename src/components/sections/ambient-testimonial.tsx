"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2 } from "lucide-react";

export function AmbientTestimonial() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl bg-foreground p-8 md:p-12"
      >
        {/* Ambient visual background */}
        <div className={`absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent transition-opacity duration-1000 ${isPlaying ? 'opacity-100' : 'opacity-30'}`} />
        
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1">
            <p className="font-serif text-2xl md:text-3xl italic text-background/90 leading-snug">
              "L'ambiance était électrique. Je suis venu pour le pitch, je suis reparti avec mon associé actuel. Clairantine ne crée pas des événements, ils créent des catalyseurs."
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-background/20 flex items-center justify-center text-background font-bold">M</div>
              <div>
                <p className="font-semibold text-background">Marc D.</p>
                <p className="text-sm text-background/60">Co-fondateur, Studio Néon</p>
              </div>
            </div>
          </div>
          
          {/* Audio/Video Atmosphere Control */}
          <div className="flex flex-col items-center gap-3">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-background text-foreground transition-transform active:scale-90 hover:scale-105"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
            </button>
            <span className="text-xs text-background/50 uppercase tracking-widest">
              {isPlaying ? "Atmosphère live" : "Écouter l'ambiance"}
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}