"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Target, Megaphone, Handshake, Send } from "lucide-react";

const benefits = [
  { icon: Target, title: "Audience Qualifiée", desc: "Touchez des fondateurs, des créatifs et des décideurs qui ont du pouvoir d'achat et d'influence." },
  { icon: Megaphone, title: "Visibilité Premium", desc: "Votre marque associée à l'excellence éditoriale, sur nos scènes, notre magazine et nos réseaux." },
  { icon: Handshake, title: "Expériences Sur-Mesure", desc: "Création d'ateliers co-brandés, privatisation d'événements pour vos clients, ou contenu dédié." },
];

export default function DevenirPartenairePage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6 bg-[#EBE5D9]">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-lg">
          <CheckCircle2 size={64} className="mx-auto text-accent mb-6" />
          <h2 className="font-sans text-3xl font-bold text-black">Demande reçue !</h2>
          <p className="mt-4 text-slate-600">Notre équipe B2B vous recontacte sous 48h pour discuter des meilleures façons de collaborer.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EBE5D9]">
      <section className="mx-auto max-w-5xl px-6 pt-32 pb-16 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-sans text-4xl md:text-6xl font-bold tracking-tight text-black">
          Associez votre marque à<br />
          <span className="text-accent italic">l'élite créative.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-8 text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Clairantine n'est pas juste un événement. C'est un carrefour d'influence. Devenons partenaires pour écrire la suite.
        </motion.p>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 border-t border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((b, i) => (
            <motion.div key={b.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-slate-200 bg-white/60 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent mb-4"><b.icon size={24} /></div>
              <h3 className="font-sans text-xl font-bold tracking-tight text-black">{b.title}</h3>
              <p className="mt-2 text-slate-600 text-sm leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 border-t border-slate-200">
        <h2 className="font-sans text-3xl font-bold tracking-tight text-black text-center mb-12">Parlons de votre vision</h2>
        <form onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }} className="space-y-8 rounded-2xl border border-slate-200 bg-white/60 p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className="block text-sm font-medium text-black mb-2">Entreprise *</label><input type="text" required className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-black placeholder:text-slate-400 focus:border-accent outline-none" /></div>
            <div><label className="block text-sm font-medium text-black mb-2">Votre rôle *</label><input type="text" required className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-black placeholder:text-slate-400 focus:border-accent outline-none" /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className="block text-sm font-medium text-black mb-2">Email *</label><input type="email" required className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-black placeholder:text-slate-400 focus:border-accent outline-none" /></div>
            <div><label className="block text-sm font-medium text-black mb-2">Budget indicatif</label>
              <select className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-black focus:border-accent outline-none">
                <option>Moins de 5k</option><option>5k - 15k</option><option>15k - 50k</option><option>Sur-mesure</option>
              </select>
            </div>
          </div>
          <div><label className="block text-sm font-medium text-black mb-2">Quel type de collaboration ? *</label>
            <textarea required rows={4} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-black placeholder:text-slate-400 focus:border-accent outline-none resize-none" placeholder="Sponsoring d'événements, article dédié, atelier co-brandé..." />
          </div>
          <button type="submit" className="w-full bg-accent text-white text-base md:text-lg py-4 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 md:gap-3 hover:bg-accent/90 transition-colors text-center leading-tight">Initier la collaboration <Send size={18} className="flex-shrink-0" /></button>
        </form>
      </section>
    </div>
  );
}