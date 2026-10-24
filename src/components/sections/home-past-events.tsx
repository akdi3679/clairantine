"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { pastEvents } from "@/data/mock-content";
import { Users, User } from "lucide-react";

export function HomePastEvents() {
  return (
    <section className="py-24 px-6 bg-[#EBE5D9]">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <h2 className="font-sans text-3xl md:text-4xl font-black tracking-tight text-slate-900 uppercase">Ils ont vécu l'expérience</h2>
          <p className="mt-4 text-lg text-slate-600">Des soirées complètes, des échanges intenses, des connexions réelles.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pastEvents.map((event, i) => (
            <motion.div 
              key={event.id} 
              initial={{ opacity: 0, scale: 0.95 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="aspect-[16/9] relative">
                <Image 
                  src={event.image} 
                  alt={event.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="rounded-full bg-black/80 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                    {event.status}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-accent">{event.city}</span>
                  <span className="text-xs text-slate-500">{new Date(event.date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</span>
                </div>
                <h3 className="font-sans text-xl font-bold tracking-tight leading-snug mb-4 text-slate-900">{event.title}</h3>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2"><User size={14} className="text-accent" /> <span>{event.speaker}</span></div>
                  <div className="flex items-center gap-2"><Users size={14} className="text-accent" /> <span>{event.attendees} participants</span></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}