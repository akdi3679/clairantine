"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Send, Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6 bg-[#EBE5D9]">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-lg">
          <CheckCircle2 size={64} className="mx-auto text-accent mb-6" />
          <h2 className="font-sans text-3xl font-bold text-black">Message envoyé !</h2>
          <p className="mt-4 text-slate-600">Merci de nous avoir contactés. Notre équipe vous répondra dans les plus brefs délais, généralement sous 24 à 48 heures.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EBE5D9] pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-6">
        
        {/* Editorial Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
          <h1 className="font-sans text-4xl md:text-6xl font-bold tracking-tight text-black">
            Prendre contact.
          </h1>
          <p className="mt-6 text-xl text-slate-600 max-w-2xl mx-auto">
            Une question sur notre programmation, une envie de collaborer, ou simplement un mot à nous dire ? Nous sommes à votre écoute.
          </p>
        </motion.div>

        {/* Professional Routing (Since you have specific pages) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-24">
          <h2 className="font-sans text-sm font-bold uppercase tracking-widest text-slate-500 text-center mb-8">Vous cherchez plutôt à...</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/accueillir" className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-accent hover:shadow-lg transition-all">
              <h3 className="font-sans text-xl font-bold text-black mb-2">Accueillir un événement</h3>
              <p className="text-slate-600 text-sm mb-4">Vous avez un lieu d'exception et souhaitez recevoir nos soirées ?</p>
              <span className="inline-flex items-center gap-2 text-accent text-sm font-semibold group-hover:gap-3 transition-all">
                Découvrir la marche à suivre <ArrowRight size={16} />
              </span>
            </Link>
            <Link href="/devenir-intervenant" className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-accent hover:shadow-lg transition-all">
              <h3 className="font-sans text-xl font-bold text-black mb-2">Devenir intervenant</h3>
              <p className="text-slate-600 text-sm mb-4">Vous êtes expert, artiste ou visionnaire et voulez prendre la parole ?</p>
              <span className="inline-flex items-center gap-2 text-accent text-sm font-semibold group-hover:gap-3 transition-all">
                Soumettre votre sujet <ArrowRight size={16} />
              </span>
            </Link>
            <Link href="/devenir-partenaire" className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-accent hover:shadow-lg transition-all">
              <h3 className="font-sans text-xl font-bold text-black mb-2">Devenir partenaire</h3>
              <p className="text-slate-600 text-sm mb-4">Vous représentez une marque et souhaitez nous associer ?</p>
              <span className="inline-flex items-center gap-2 text-accent text-sm font-semibold group-hover:gap-3 transition-all">
                Voir nos offres <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </motion.div>

        {/* Main Contact Area: Info + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          
          {/* Left: Contact Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 space-y-8">
            <h2 className="font-sans text-2xl font-bold text-black">Nos coordonnées</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-black text-sm uppercase tracking-wider">Email</h3>
                  <a href="mailto:hello@clairantine.com" className="text-slate-600 hover:text-accent transition-colors">hello@clairantine.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-black text-sm uppercase tracking-wider">Téléphone</h3>
                  <a href="tel:+33123456789" className="text-slate-600 hover:text-accent transition-colors">+33 1 23 45 67 89</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-black text-sm uppercase tracking-wider">Bureau</h3>
                  <p className="text-slate-600">123 Rue de l'Innovation<br />75011 Paris, France</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-200">
              <h3 className="font-sans font-bold text-black text-sm uppercase tracking-wider mb-4">Suivez-nous</h3>
              <div className="flex gap-4">
                <a href="#" className="h-10 w-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-accent hover:text-white hover:border-accent transition-all text-xs font-bold">IG</a>
                <a href="#" className="h-10 w-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-accent hover:text-white hover:border-accent transition-all text-xs font-bold">LI</a>
                <a href="#" className="h-10 w-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-accent hover:text-white hover:border-accent transition-all text-xs font-bold">TW</a>
              </div>
            </div>
          </motion.div>

          {/* Right: General Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-3">
            <h2 className="font-sans text-2xl font-bold text-black mb-6">Autre demande ?</h2>
            <form onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }} className="p-8 rounded-2xl bg-white border border-slate-200 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">Nom *</label>
                  <input type="text" required className="w-full rounded-xl border border-slate-200 bg-[#EBE5D9]/30 px-4 py-3 text-black placeholder:text-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all" placeholder="Jean Dupont" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">Email *</label>
                  <input type="email" required className="w-full rounded-xl border border-slate-200 bg-[#EBE5D9]/30 px-4 py-3 text-black placeholder:text-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all" placeholder="jean@exemple.com" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-black mb-2">Message *</label>
                <textarea required rows={5} className="w-full rounded-xl border border-slate-200 bg-[#EBE5D9]/30 px-4 py-3 text-black placeholder:text-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all resize-none" placeholder="Écrivez votre message ici..." />
              </div>

              <button type="submit" className="w-full bg-accent text-white text-lg py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-accent/90 transition-colors">
                Envoyer <Send size={18} />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}