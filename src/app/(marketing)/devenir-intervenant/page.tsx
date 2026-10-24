"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Mic, Clock, Users, Send } from "lucide-react";

const expectations = [
  { icon: Mic, title: "Pas de pitch corporate", desc: "Oubliez les slides PowerPoint remplies de texte. Nous voulons une histoire, une idée, une conviction." },
  { icon: Clock, title: "Le format 45/15", desc: "45 minutes pour captiver l'auditoire, 15 minutes pour répondre aux questions les plus brutales et honnêtes." },
  { icon: Users, title: "L'après-talk", desc: "Vous ne repartez pas juste après votre talk. Vous restez, vous échangez, vous faites partie de la communauté." },
];

export default function DevenirIntervenantPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6 bg-[#EBE5D9]">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-lg">
          <CheckCircle2 size={64} className="mx-auto text-accent mb-6" />
          <h2 className="font-sans text-3xl font-bold text-black">Candidature reçue !</h2>
          <p className="mt-4 text-slate-600">Notre comité éditorial étudie chaque proposition. Nous vous recontactons sous 14 jours si votre sujet correspond à notre prochaine programmation.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EBE5D9]">
      <section className="mx-auto max-w-5xl px-6 pt-32 pb-16 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-sans text-4xl md:text-6xl font-bold tracking-tight text-black">
          Vous avez une idée qui peut<br />
          <span className="text-accent italic">changer leur regard.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-8 text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Nous cherchons des experts, des artistes et des visionnaires qui ont vécu ce dont ils parlent. Pas de théoriciens. Des praticiens.
        </motion.p>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 border-t border-slate-200">
        <h2 className="font-sans text-3xl font-bold tracking-tight text-black text-center mb-12">Ce que nous attendons de vous</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {expectations.map((exp, i) => (
            <motion.div key={exp.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-slate-200 bg-white/60 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent mb-4"><exp.icon size={24} /></div>
              <h3 className="font-sans text-xl font-bold tracking-tight text-black">{exp.title}</h3>
              <p className="mt-2 text-slate-600 text-sm leading-relaxed">{exp.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 border-t border-slate-200">
        <h2 className="font-sans text-3xl font-bold tracking-tight text-black text-center mb-4">Proposer votre intervention</h2>
        <p className="text-center text-slate-600 mb-12">Convainquez-nous en quelques lignes.</p>
        
        <form onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }} className="space-y-8 rounded-2xl border border-slate-200 bg-white/60 p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className="block text-sm font-medium text-black mb-2">Nom complet *</label><input type="text" required className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-black placeholder:text-slate-400 focus:border-accent outline-none" /></div>
            <div><label className="block text-sm font-medium text-black mb-2">Email *</label><input type="email" required className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-black placeholder:text-slate-400 focus:border-accent outline-none" /></div>
          </div>
          <div><label className="block text-sm font-medium text-black mb-2">Votre domaine d'expertise *</label><input type="text" required className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-black placeholder:text-slate-400 focus:border-accent outline-none" placeholder="Ex: Design émotionnel, Neurosciences..." /></div>
          <div><label className="block text-sm font-medium text-black mb-2">Le titre de votre talk *</label><input type="text" required className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-black placeholder:text-slate-400 focus:border-accent outline-none" placeholder="Ex: Pourquoi votre cerveau sabote votre créativité" /></div>
          <div><label className="block text-sm font-medium text-black mb-2">Le pitch (en 3 phrases max) *</label><textarea required rows={4} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-black placeholder:text-slate-400 focus:border-accent outline-none resize-none" placeholder="Quel est le problème ? Quelle est votre perspective unique ?" /></div>
          <div><label className="block text-sm font-medium text-black mb-2">Lien vers votre profil (LinkedIn, Instagram, Site) *</label><input type="url" required className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-black placeholder:text-slate-400 focus:border-accent outline-none" /></div>
          <button type="submit" className="w-full bg-accent text-white text-base md:text-lg py-4 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 md:gap-3 hover:bg-accent/90 transition-colors text-center leading-tight">Soumettre ma proposition <Send size={18} className="flex-shrink-0" /></button>
        </form>
      </section>
    </div>
  );
}