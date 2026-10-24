"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Users, MapPin } from "lucide-react";

const cities = ["Paris", "Lyon", "Bordeaux", "Marseille", "Toulouse", "Lille", "Nantes"];
const avatars = ["SM", "TD", "CV", "ML", "SC", "JD", "ER", "DK"];

export default function ListeAttentePage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6 bg-[#EBE5D9]">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-lg">
          <CheckCircle2 size={64} className="mx-auto text-accent mb-6" />
          <h2 className="font-sans text-3xl font-bold text-black">Vous êtes sur la liste.</h2>
          <p className="mt-4 text-slate-600">Vous faites maintenant partie des privilégiés. Surveillez votre boîte mail.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EBE5D9]">
      <div className="mx-auto max-w-4xl px-6 py-32">
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-4">Liste Prioritaire</p>
          <h1 className="font-sans text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] text-black">
            Ne soyez plus jamais<br />
            <span className="text-accent italic">celui qui arrive trop tard.</span>
          </h1>
          <p className="mt-8 text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Nos places partent en moyenne en 48 heures. Les abonnés de la liste d'attente sont prévenus en premier, et bénéficient d'un lien de réservation prioritaire.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-12 flex flex-col items-center">
          <div className="flex -space-x-3 mb-4">
            {avatars.map((initials, i) => (
              <div key={i} className="h-10 w-10 rounded-full bg-accent/10 border-2 border-[#EBE5D9] flex items-center justify-center text-accent text-xs font-bold">
                {initials}
              </div>
            ))}
            <div className="h-10 w-10 rounded-full bg-slate-100 border-2 border-[#EBE5D9] flex items-center justify-center text-slate-600 text-xs font-bold">
              +1.8k
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Users size={16} className="text-accent" />
            <p className="text-sm font-medium">Rejoignez les 1,850+ curieux qui ne ratent plus jamais nos événements.</p>
          </div>
        </motion.div>

        <motion.form 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3 }}
          onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }} 
          className="mt-12 max-w-lg mx-auto space-y-4"
        >
          <input 
            type="email" 
            required 
            placeholder="Votre meilleur email" 
            className="w-full rounded-full bg-white border border-slate-200 px-6 py-4 text-black placeholder:text-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all" 
          />
          <div className="relative">
            <MapPin size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
            <select 
              required 
              className="w-full rounded-full bg-white border border-slate-200 pl-12 pr-6 py-4 text-slate-700 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all appearance-none"
            >
              <option value="" disabled>Quelle est votre ville ?</option>
              {cities.map(city => <option key={city} value={city}>{city}</option>)}
            </select>
          </div>
          <button 
            type="submit" 
            className="w-full rounded-full bg-accent text-white px-8 py-4 font-semibold transition-transform active:scale-[0.98] hover:bg-accent/90 shadow-lg shadow-accent/20"
          >
            Rejoindre la liste prioritaire
          </button>
        </motion.form>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-12 text-center">
          <p className="text-sm text-slate-500 italic">
            "J'ai eu mon billet pour la soirée de Lyon grâce à la liste d'attente. Une mine d'or." — <span className="font-semibold not-italic text-black">Marc D.</span>
          </p>
        </motion.div>

      </div>
    </div>
  );
}