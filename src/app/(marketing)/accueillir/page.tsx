"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, MapPin, Users, Wine, Mic, Send } from "lucide-react";

const rules = [
  { icon: Users, title: "Capacité", desc: "Minimum 40, maximum 80 personnes. L'intimité est la clé." },
  { icon: Wine, title: "Le Bar", desc: "Un service de boisson fluide et généreux. Nos participants consomment." },
  { icon: Mic, title: "L'Espace", desc: "Un coin calme pour le talk de 45 min, puis un espace ouvert pour le networking." },
  { icon: MapPin, title: "L'Âme", desc: "Nous choisissons des lieux avec du caractère. Pas de salles de conférence corporate." },
];

export default function AccueillirPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6 bg-[#EBE5D9]">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-lg">
          <CheckCircle2 size={64} className="mx-auto text-accent mb-6" />
          <h2 className="font-sans text-3xl font-bold text-black">Candidature reçue !</h2>
          <p className="mt-4 text-slate-600">Notre équipe visite les lieux personnellement. Nous vous recontactons sous 7 jours si votre espace correspond à notre prochaine programmation.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EBE5D9]">
      <section className="mx-auto max-w-5xl px-6 pt-32 pb-16 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-sans text-4xl md:text-6xl font-bold tracking-tight text-black">
          Ouvrez vos portes.<br />
          <span className="text-accent italic">Nous vous apportons l'élite.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-8 text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Accueillir une Clairantine, ce n'est pas juste louer une salle. C'est inviter 60 fondateurs, artistes et décideurs à consommer, échanger et créer dans votre lieu. Nous gérons le programme, vous profitez du bar et de la visibilité.
        </motion.p>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 border-t border-slate-200">
        <h2 className="font-sans text-3xl font-bold tracking-tight text-black text-center mb-12">Nos critères d'exigence</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rules.map((rule, i) => (
            <motion.div key={rule.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="flex gap-4 p-6 rounded-2xl border border-slate-200 bg-white/60">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <rule.icon size={24} />
              </div>
              <div>
                <h3 className="font-sans text-xl font-bold tracking-tight text-black">{rule.title}</h3>
                <p className="mt-2 text-slate-600">{rule.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 border-t border-slate-200">
        <h2 className="font-sans text-3xl font-bold tracking-tight text-black text-center mb-4">Proposer votre lieu</h2>
        <p className="text-center text-slate-600 mb-12">Remplissez ce questionnaire. Nous visitons personnellement chaque candidat.</p>
        
        <form onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }} className="space-y-8 rounded-2xl border border-slate-200 bg-white/60 p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-black mb-2">Nom du lieu *</label>
              <input type="text" required className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-black placeholder:text-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none" placeholder="Le Comptoir" />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">Ville *</label>
              <input type="text" required className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-black placeholder:text-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none" placeholder="Paris" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-2">Capacité maximale *</label>
            <input type="number" required className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-black placeholder:text-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none" placeholder="60" />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-2">Pourquoi votre lieu est-il parfait pour Clairantine ? *</label>
            <textarea required rows={4} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-black placeholder:text-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none resize-none" placeholder="Décrivez l'ambiance, la lumière..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-2">Lien vers le site web ou Instagram *</label>
            <input type="url" required className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-black placeholder:text-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none" placeholder="https://instagram.com/..." />
          </div>
          <button type="submit" className="w-full bg-accent text-white text-base md:text-lg py-4 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 md:gap-3 hover:bg-accent/90 transition-colors text-center leading-tight">
            Soumettre ma candidature <Send size={18} className="flex-shrink-0" />
          </button>
        </form>
      </section>
    </div>
  );
}