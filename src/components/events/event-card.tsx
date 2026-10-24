"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";

interface Event {
  id: string;
  title: string;
  slug: string;
  date: string;
  category: string;
  location: {
    name: string;
    city: string;
  };
  speaker: {
    name: string;
    role: string;
  };
  spotsLeft: number;
  status: string;
}

export function EventCard({ event, index }: { event: Event; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/evenements/${event.slug}`} className="group block">
        <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-2">
          
          {/* Image Placeholder */}
          <div className="aspect-[16/10] bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-sans text-lg font-medium">
              [ Photo événement ]
            </div>
            <div className="absolute top-4 left-4">
              <span className="rounded-full bg-accent text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider shadow-lg">
                {event.category}
              </span>
            </div>
            {event.status === "full" && (
              <div className="absolute top-4 right-4">
                <span className="rounded-full bg-black/80 text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                  Complet
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="font-sans text-xl font-bold tracking-tight text-black group-hover:text-accent transition-colors leading-tight mb-4 line-clamp-2">
              {event.title}
            </h3>
            
            <div className="space-y-2.5 text-sm text-slate-600 mb-5">
              <div className="flex items-center gap-2.5">
                <Calendar size={15} className="text-accent flex-shrink-0" />
                <span className="font-medium">{new Date(event.date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin size={15} className="text-accent flex-shrink-0" />
                <span>{event.location.name}, {event.location.city}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Users size={15} className="text-accent flex-shrink-0" />
                <span className="font-medium">{event.speaker.name}</span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-500">{event.speaker.role}</span>
              </div>
              <div className="flex items-center gap-2.5 pt-2 border-t border-slate-100">
                <div className="h-2 w-2 rounded-full bg-accent"></div>
                <span className="text-xs font-semibold text-slate-700">{event.spotsLeft} places restantes</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <span className="text-sm font-bold text-accent flex items-center gap-2 group-hover:gap-3 transition-all">
                Voir les détails <ArrowRight size={15} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}