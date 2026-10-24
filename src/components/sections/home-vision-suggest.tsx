"use client";
import { motion } from "framer-motion";
import { MapPin, Lightbulb, Mic, Plus } from "lucide-react";
import Link from "next/link";

export function HomeVisionSuggest() {
  return (
    <section className="relative py-24 px-6 overflow-visible">
      <div className="absolute inset-0 -z-10 sky-clouds" />
      
      <style jsx>{`
        .sky-clouds {
          background:
            /* Warm golden yellow clouds - much more visible */
            radial-gradient(ellipse 90% 50% at 20% 30%, rgba(255, 235, 150, 0.9), transparent 70%),
            radial-gradient(ellipse 80% 45% at 80% 65%, rgba(255, 230, 140, 0.85), transparent 70%),
            radial-gradient(ellipse 70% 40% at 50% 85%, rgba(255, 240, 160, 0.8), transparent 70%),
            linear-gradient(180deg, #5A9BD5 0%, #87CEEB 100%);
          background-size: 160% 160%;
          animation: skyDrift 40s ease-in-out infinite alternate;
        }
        @keyframes skyDrift {
          from { background-position: 0% 10%; }
          to { background-position: 100% 90%; }
        }
      `}</style>

      <div className="relative z-10 mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0">
        <div className="flex flex-col justify-center pr-0 lg:pr-12">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-sans text-3xl md:text-4xl font-black tracking-tighter text-slate-900 uppercase mb-6 drop-shadow-sm">
            Façonnez la suite avec nous.
          </motion.h2>
          <p className="text-base md:text-lg text-slate-800 leading-relaxed mb-10 font-medium drop-shadow-sm">
            Clairantine est co-créé avec sa communauté. Nous sommes déjà présents dans ces villes, et nous voulons venir chez vous.
          </p>
          
          <div className="flex flex-wrap gap-4 items-center">
            {["Paris", "Lyon", "Bordeaux"].map((city) => (
              <div key={city} className="flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-white/50 px-5 py-3 rounded-full font-bold text-slate-900 text-sm shadow-sm">
                <MapPin size={16} className="text-accent" /> {city}
              </div>
            ))}
            
            <Link 
              href="/accueillir" 
              className="flex items-center gap-2 bg-white border-2 border-dashed border-accent text-accent px-5 py-3 rounded-full font-bold text-sm hover:bg-accent hover:text-white transition-all cursor-pointer group shadow-sm"
            >
              <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
              Votre ville ?
            </Link>
          </div>
        </div>

        <div className="relative min-h-[400px] lg:min-h-full flex items-center lg:justify-end">
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full max-w-md space-y-4">
            <a href="/contact" className="flex items-center gap-4 p-5 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/30 shadow-lg hover:border-accent hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors"><Mic size={20} /></div>
              <div><h3 className="font-bold text-slate-900 text-lg">Suggérer un intervenant</h3><p className="text-sm text-slate-700">Vous connaissez un expert brillant ?</p></div>
            </a>
            <a href="/contact" className="flex items-center gap-4 p-5 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/30 shadow-lg hover:border-accent hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors"><Lightbulb size={20} /></div>
              <div><h3 className="font-bold text-slate-900 text-lg">Proposer un sujet</h3><p className="text-sm text-slate-700">Quelle question vous hante en ce moment ?</p></div>
            </a>
            <a href="/accueillir" className="flex items-center gap-4 p-5 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/30 shadow-lg hover:border-accent hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors"><MapPin size={20} /></div>
              <div><h3 className="font-bold text-slate-900 text-lg">Proposer un lieu</h3><p className="text-sm text-slate-700">Vous avez un espace d'exception ?</p></div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}