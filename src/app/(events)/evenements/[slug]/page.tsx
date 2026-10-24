"use client";
import { use } from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, CheckCircle2, ArrowLeft, Sparkles, Target } from "lucide-react";
import { mockEvents } from "@/data/mock-content";
import { EventTicketing } from "@/components/events/event-ticketing";

export default function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const event = mockEvents.find(e => e.slug === slug) || mockEvents[0];
  const [isStickyVisible, setIsStickyVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsStickyVisible(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#EBE5D9] pb-24 md:pb-0">
      
      <div className="mx-auto max-w-4xl px-6 pt-32 pb-8">
        <Link href="/evenements" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-accent transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Retour aux événements
        </Link>
      </div>

      {/* HEADER */}
      <div className="mx-auto max-w-4xl px-6 pb-12 text-center">
        <p className="font-sans text-sm font-semibold uppercase tracking-widest text-slate-500 mb-6">Un soir. Un espace. Un expert.</p>
        <span className="inline-block rounded-full bg-accent/10 text-accent px-4 py-1.5 text-xs font-bold uppercase tracking-wider">{event.category}</span>
        <h1 className="mt-6 font-sans text-4xl md:text-6xl font-bold tracking-tight text-black leading-[1.1]">{event.title}</h1>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-slate-600">
          <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-full border border-slate-200">
            <Calendar size={16} className="text-accent" /> {new Date(event.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </div>
          <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-full border border-slate-200">
            <MapPin size={16} className="text-accent" /> {event.location.name}, {event.location.city}
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <section className="mx-auto max-w-3xl px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="font-sans text-3xl font-bold tracking-tight text-black mb-6">Pourquoi cet événement va changer votre regard.</h2>
          <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
            <p>Nous vivons dans une ère où l'information est partout, mais où la <strong className="text-black">véritable compréhension</strong> est devenue rare. Vous avez lu les articles, vous avez écouté les podcasts. Mais il vous manque ce déclic.</p>
            <p>Cette soirée n'est pas une conférence de plus. C'est une <strong className="text-black">immersion de 3 heures</strong> conçue pour bousculer vos certitudes.</p>
          </div>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-6 rounded-2xl border border-slate-200 bg-white/60">
            <Target size={24} className="text-accent mb-3" />
            <h3 className="font-sans text-xl font-bold tracking-tight text-black mb-2">Ce que vous allez vivre</h3>
            <p className="text-slate-600">Un format intimiste de 45 minutes suivi d'un face-à-face sans filtre avec l'expert.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-6 rounded-2xl border border-slate-200 bg-white/60">
            <Sparkles size={24} className="text-accent mb-3" />
            <h3 className="font-sans text-xl font-bold tracking-tight text-black mb-2">Ce que vous allez repartir</h3>
            <p className="text-slate-600">Des frameworks applicables dès le lendemain, une vision clarifiée, et un réseau de pairs.</p>
          </motion.div>
        </div>
      </section>

      {/* BAB Hook */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="p-8 md:p-10 rounded-2xl bg-white/60 border border-slate-200">
          <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
            <span className="font-semibold text-black">Vous avez une idée de projet, mais vous ne savez pas comment la présenter avec impact ?</span> À la fin de cet atelier, vous repartirez avec un pitch de 2 minutes, clair, percutant et prêt à être utilisé devant des investisseurs ou des partenaires.
          </p>
        </div>
      </section>

      {/* PROGRAM */}
      <section className="mx-auto max-w-4xl px-6 py-16 border-t border-slate-200">
        <h2 className="font-sans text-3xl font-bold tracking-tight text-black mb-8">Le déroulé de la soirée</h2>
        <div className="space-y-8">
          {[{ time: "18h30", title: "Accueil et networking", desc: "Rencontrez les autres participants autour d'un verre." }, { time: "19h00", title: "Le Talk", desc: "La structure exacte pour captiver l'attention." }, { time: "20h00", title: "Mise en pratique", desc: "Testez votre pitch et recevez des feedbacks." }].map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white"><CheckCircle2 size={18} /></div>
                {i < 2 && <div className="mt-2 h-full w-px bg-slate-200" />}
              </div>
              <div className="pb-8">
                <div className="text-sm font-semibold text-accent uppercase tracking-wider">{step.time}</div>
                <h3 className="mt-1 text-xl font-bold tracking-tight text-black">{step.title}</h3>
                <p className="mt-2 text-slate-600">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SPEAKER */}
      <section className="mx-auto max-w-4xl px-6 py-16 bg-white/40 border-y border-slate-200">
        <h2 className="font-sans text-3xl font-bold tracking-tight text-black mb-8">Votre intervenant(e)</h2>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="h-24 w-24 rounded-full bg-accent/20 flex items-center justify-center text-3xl font-sans font-bold text-accent">{event.speaker.name.charAt(0)}</div>
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-black">{event.speaker.name}</h3>
            <p className="text-accent font-medium mt-1">{event.speaker.role}</p>
            <p className="mt-4 text-slate-600 leading-relaxed">A accompagné plus de 50 startups et créatifs dans le développement de leur message.</p>
          </div>
        </div>
      </section>

      {/* TICKETING */}
      <EventTicketing eventName={event.title} />

      <div className="h-24"></div>
      <motion.div initial={{ y: 100 }} animate={{ y: isStickyVisible ? 0 : 100 }} transition={{ type: "spring", damping: 20, stiffness: 300 }} className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-[#EBE5D9]/95 backdrop-blur-xl p-4 md:hidden">
        <a href="#ticketing" className="w-full bg-accent text-white text-lg py-4 block text-center rounded-xl font-semibold transition-all active:scale-95 hover:bg-accent/90">Réserver ma place ({event.spotsLeft} restantes)</a>
      </motion.div>
    </div>
  );
}
