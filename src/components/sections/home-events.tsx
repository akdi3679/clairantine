"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { EventCard } from "@/components/events/event-card";
import { mockEvents } from "@/data/mock-content";

export function HomeEvents() {
  return (
    <section className="py-24 px-6 bg-white/50">
      <div className="mx-auto max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
        >
          <div className="max-w-2xl">
            <h2 className="font-sans text-3xl md:text-5xl font-black tracking-tighter text-slate-900 uppercase leading-[0.9]">
              Les prochaines rencontres.
            </h2>
            <p className="mt-4 text-base md:text-lg text-slate-600">
              Des formats courts, pratiques et animés par des experts de terrain.
            </p>
          </div>
          
          <Link href="/evenements" className="text-sm font-bold text-slate-900 hover:text-accent transition-colors flex items-center gap-2 group shrink-0">
            Voir tous <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockEvents.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}