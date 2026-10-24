"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Lightbulb, Mic, Calendar, User, Users } from "lucide-react";
import { mockEvents, pastEvents } from "@/data/mock-content";
import { EventCard } from "@/components/events/event-card";

const categories = ["Tous", "Ateliers", "Conférences", "En ligne", "À venir", "Passés"];

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState("Tous");
  const filteredEvents = activeFilter === "Tous" 
    ? mockEvents 
    : activeFilter === "À venir" 
      ? mockEvents.filter(e => e.status !== "full")
      : mockEvents.filter(e => e.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#EBE5D9]">
      
      {/* HERO */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="mx-auto max-w-7xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="font-sans text-sm font-semibold uppercase tracking-widest text-accent mb-4">
              Rencontres · Idées · Connexions
            </p>
            <h1 className="font-sans text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-black leading-[1.1]">
              Nos événements
            </h1>
            <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Des soirées conçues pour bousculer vos certitudes, élargir votre réseau et faire avancer vos idées.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {categories.map((cat) => (
              <button 
                key={cat} 
                onClick={() => setActiveFilter(cat)} 
                className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all active:scale-95 ${
                  activeFilter === cat 
                    ? "bg-accent text-white shadow-lg" 
                    : "bg-white/60 text-slate-700 hover:bg-white hover:shadow-md backdrop-blur-sm border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* EVENTS GRID */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <AnimatePresence mode="wait">
          {filteredEvents.length > 0 ? (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event, i) => (<EventCard key={event.id} event={event} index={i} />))}
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="flex flex-col items-center justify-center py-24 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/60 text-slate-400 backdrop-blur-sm border border-slate-200"><Search size={32} /></div>
              <h2 className="mt-8 font-sans text-3xl font-bold tracking-tight text-black">Aucun événement trouvé</h2>
              <p className="mt-4 max-w-md text-slate-600">Nous préparons quelque chose d'exceptionnel. Rejoignez la liste d'attente ci-dessous.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SIGNATURE SECTION - Sky Blue + Clouds */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 sky-clouds" />
        
        <style jsx>{`
          .sky-clouds {
            background:
              radial-gradient(ellipse 90% 50% at 20% 30%, rgba(255, 252, 235, 0.85), transparent 70%),
              radial-gradient(ellipse 80% 45% at 80% 65%, rgba(255, 250, 225, 0.75), transparent 70%),
              radial-gradient(ellipse 70% 40% at 50% 85%, rgba(255, 253, 230, 0.65), transparent 70%),
              linear-gradient(180deg, #5A9BD5 0%, #87CEEB 100%);
            background-size: 160% 160%;
            animation: skyDrift 40s ease-in-out infinite alternate;
          }
          @keyframes skyDrift {
            from { background-position: 0% 10%; }
            to { background-position: 100% 90%; }
          }
        `}</style>

        <div className="relative z-10 mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left: Waitlist */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="font-sans text-4xl md:text-5xl font-bold tracking-tight text-black leading-tight">Ne ratez plus aucune soirée.</h2>
            <p className="mt-6 text-lg text-slate-700 leading-relaxed">Les places partent en 48h. Laissez votre email pour être alerté de la prochaine programmation avant tout le monde.</p>
            <form className="mt-8 flex flex-col sm:flex-row gap-3">
              <input type="email" placeholder="Votre email" className="flex-1 rounded-full bg-white/90 backdrop-blur-sm border border-white/50 px-6 py-4 text-black placeholder:text-slate-500 focus:border-accent outline-none shadow-lg" />
              <button type="submit" className="rounded-full bg-accent text-white px-8 py-4 font-semibold transition-all active:scale-95 hover:bg-accent/90 shadow-lg hover:shadow-xl">Être alerté</button>
            </form>
          </motion.div>

          {/* Right: Suggest */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="font-sans text-4xl md:text-5xl font-bold tracking-tight text-black leading-tight">Façonnez la suite avec nous.</h2>
            <p className="mt-6 text-lg text-slate-700 leading-relaxed mb-8">Clairantine est co-créé avec sa communauté. Qui devrions-nous inviter ? Où devrions-nous aller ?</p>
            <div className="space-y-4">
              <Link href="/contact" className="flex items-start gap-4 p-5 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/30 shadow-lg hover:border-accent hover:shadow-xl hover:-translate-y-1 transition-all group">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors"><Mic size={20} /></div>
                <div><h3 className="font-bold text-black text-lg">Suggérer un intervenant</h3><p className="text-sm text-slate-700">Vous connaissez un expert brillant ?</p></div>
              </Link>
              <Link href="/contact" className="flex items-start gap-4 p-5 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/30 shadow-lg hover:border-accent hover:shadow-xl hover:-translate-y-1 transition-all group">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors"><Lightbulb size={20} /></div>
                <div><h3 className="font-bold text-black text-lg">Proposer un sujet</h3><p className="text-sm text-slate-700">Quelle question vous hante en ce moment ?</p></div>
              </Link>
              <Link href="/contact" className="flex items-start gap-4 p-5 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/30 shadow-lg hover:border-accent hover:shadow-xl hover:-translate-y-1 transition-all group">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors"><MapPin size={20} /></div>
                <div><h3 className="font-bold text-black text-lg">Proposer un lieu</h3><p className="text-sm text-slate-700">Vous avez un espace d'exception ?</p></div>
              </Link>
            </div>
          </motion.div>

        </div>
      </section>

      {/* PAST EVENTS */}
      <section className="py-24 px-6 bg-white/40 backdrop-blur-sm border-t border-slate-200">
        <div className="mx-auto max-w-7xl">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-sans text-3xl font-bold tracking-tight text-center text-black mb-12">Ils ont vécu l'expérience</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pastEvents.map((event, i) => (
              <motion.div key={event.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group flex flex-col rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200 overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-2">
                <div className="aspect-[16/9] bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-sans text-xl">[ Photo de l'événement ]</div>
                  <div className="absolute top-4 right-4"><span className="rounded-full bg-black/80 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">Terminé</span></div>
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">{event.city}</span>
                  <h3 className="mt-2 font-sans text-xl font-bold tracking-tight leading-tight text-black group-hover:text-accent transition-colors">{event.title}</h3>
                  <div className="mt-auto pt-6 space-y-3 text-sm text-slate-600">
                    <div className="flex items-center gap-2"><User size={14} className="text-accent" /> {event.speaker}</div>
                    <div className="flex items-center gap-2"><Users size={14} className="text-accent" /> {event.attendees} participants</div>
                    <div className="flex items-center gap-2"><Calendar size={14} className="text-accent" /> {new Date(event.date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
