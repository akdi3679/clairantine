"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";

interface Event {
  id: string;
  title: string;
  slug: string;
  date: string;
  category: string;
  location: { name: string; city: string };
  speaker: { name: string; role: string };
  spotsLeft: number;
  status: string;
  image?: string;
}

export function EventCard({ event, index }: { event: Event; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/evenements/${event.slug}`} className="group block h-full">
        <div className="h-full flex flex-col rounded-2xl bg-white border border-slate-200 overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-2">
          
          <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden flex-shrink-0">
            {event.image ? (
              <Image src={event.image} alt={event.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-slate-400">[ Image ]</div>
            )}
            <div className="absolute top-4 left-4">
              <span className="rounded-full bg-accent text-white px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-lg">
                {event.category}
              </span>
            </div>
          </div>

          <div className="flex flex-col flex-1 p-6">
            <h3 className="font-sans text-xl font-bold tracking-tight text-slate-900 group-hover:text-accent transition-colors leading-tight mb-4">
              {event.title}
            </h3>
            
            <div className="space-y-2 text-sm text-slate-600 mb-4 flex-1">
              <div className="flex items-center gap-2"><Calendar size={14} className="text-accent flex-shrink-0" /><span>{new Date(event.date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}</span></div>
              <div className="flex items-center gap-2"><MapPin size={14} className="text-accent flex-shrink-0" /><span>{event.location.city}</span></div>
              <div className="flex items-center gap-2"><Users size={14} className="text-accent flex-shrink-0" /><span>{event.speaker.name}</span></div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">{event.spotsLeft} places restantes</span>
              <span className="text-sm font-semibold text-accent flex items-center gap-2 group-hover:gap-3 transition-all">
                Voir <ArrowRight size={14} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}